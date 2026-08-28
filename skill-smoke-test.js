#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appPath = path.resolve(__dirname, "../app.js");
const source = fs.readFileSync(appPath, "utf8");

class FakeClassList {
  add() {}
  remove() {}
  toggle() {}
  contains() { return false; }
}

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.className = "";
    this.hidden = false;
    this.disabled = false;
    this.dataset = {};
    this.style = { setProperty() {} };
    this.classList = new FakeClassList();
  }
  addEventListener() {}
  appendChild() {}
  prepend() {}
  remove() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  closest() { return null; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 1, height: 1 }; }
}

const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, new FakeElement(id));
  return elements.get(id);
}

const storage = new Map();
const context = {
  console,
  Math,
  Date,
  JSON,
  Number,
  String,
  Boolean,
  Array,
  Object,
  Set,
  Map,
  Promise,
  FileReader: class {},
  navigator: { vibrate() {} },
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key)
  },
  document: {
    body: { dataset: {} },
    createElement: () => new FakeElement(),
    getElementById: element,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener() {}
  },
  window: {
    location: { hash: "", pathname: "/index.html", search: "" },
    history: { replaceState() {}, pushState() {} },
    scrollTo() {},
    addEventListener() {}
  },
  setTimeout: (fn) => {
    if (typeof fn === "function") fn();
    return 0;
  },
  clearTimeout() {},
  fetch: async () => { throw new Error("network disabled in smoke test"); }
};
context.globalThis = context;

const runner = `
async function __runSkillSmokeTest(iterations = 100) {
  globalThis.__skillSmokeProgress = "started";
  const originalFeedback = feedback;
  const originalToast = toast;
  const originalRender = render;
  const originalRenderAll = renderAll;
  const originalShowModal = showModal;
  const failures = [];
  const exercised = [];

  toast = () => {};
  render = () => {};
  renderAll = () => {};
  feedback = (text) => {
    if (state && state.log) state.log.push(String(text));
    state.lastAction = String(text);
  };
  showModal = async ({ type, options, multiSelect, allowCancel }) => {
    if (type === "confirm") return true;
    if (type === "select") {
      if (!options || !options.length) return allowCancel === false ? 0 : null;
      if (multiSelect) return [0];
      return options[0].value !== undefined && options[0].value !== null ? options[0].value : 0;
    }
    if (type === "cardSelect") return multiSelect ? [0] : 0;
    if (type === "guanxing") return { topOrder: (options || []).map((_, i) => i), bottomOrder: [] };
    return true;
  };

  let cardId = 1;
  function card(name, suit = "♠", rank = "A", type = "基础") {
    const equip = {
      "诸葛连弩": { type: "武器", range: 1 },
      "青釭剑": { type: "武器", range: 2 },
      "丈八蛇矛": { type: "武器", range: 3 },
      "八卦阵": { type: "防具" }
    }[name] || {};
    return { id: cardId++, name, suit, rank, type: equip.type || type, ...equip };
  }
  function richHand() {
    return [
      card("杀", "♠", "K"), card("杀", "♥", "Q"), card("闪", "♦", "J"),
      card("桃", "♥", "9"), card("酒", "♣", "8"), card("过河拆桥", "♠", "7", "锦囊"),
      card("顺手牵羊", "♦", "6", "锦囊"), card("决斗", "♣", "5", "锦囊"),
      card("火攻", "♥", "4", "锦囊"), card("无懈可击", "♠", "3", "锦囊"),
      card("诸葛连弩", "♣", "2", "武器"), card("八卦阵", "♦", "A", "防具")
    ];
  }
  function makePlayer(id, hero, role) {
    return {
      id, hero, role, alive: true, hp: hero.hp, maxHp: hero.hp, hand: richHand(),
      equipment: { weapon: null, armor: null, attackHorse: null, defenseHorse: null },
      judgeArea: [], usedSkills: {}, marks: {}, temp: {}, extraEffects: [],
      skillsLost: false, dying: false, chained: false, slashUsed: 0, hasCrossbow: false
    };
  }
  function setup(hero) {
    const pool = heroes.map(normalizeHero);
    const p0 = makePlayer(0, normalizeHero(hero), "反贼");
    const p1 = makePlayer(1, pool.find((h) => h.name === "刘备") || pool[0], "主公");
    const p2 = makePlayer(2, pool.find((h) => h.name === "曹操") || pool[1], "忠臣");
    const p3 = makePlayer(3, pool.find((h) => h.name === "孙权") || pool[2], "内奸");
    p1.hp = Math.max(1, p1.hp - 1);
    p2.hp = Math.max(1, p2.hp - 1);
    state = {
      players: [p0, p1, p2, p3], turn: 0, phase: "", currentPhase: "出牌阶段",
      deck: Array.from({ length: 160 }, (_, i) => card(i % 2 ? "杀" : "闪", i % 4 < 2 ? "♥" : "♠", String((i % 13) + 1))),
      discard: [], log: [], winner: null, pendingReaction: null, pendingDying: null,
      discarding: null, suspicions: {}, lastAction: ""
    };
    return p0;
  }
  function changed(before, player) {
    return before.hp !== player.hp || before.hand !== player.hand.length || before.discard !== state.discard.length || before.log !== state.log.length;
  }
  async function testEffect(hero, effect) {
    const player = setup(hero);
    if (effect === "yinghun") player.hp = Math.max(1, player.hp - 1);
    const before = { hp: player.hp, hand: player.hand.length, discard: state.discard.length, log: state.log.length };
    try {
      let used = false;
      if (canManuallyActivate(effect)) {
        if (skillNeedsTarget(effect)) {
          const target = state.players.find((p) => canTargetSkill(player, effect, p));
          if (!target) return { ok: true, skipped: "no-target" };
          used = await activateSkillOnTarget(player, effect, target);
        } else {
          used = await activateSkill(player, effect, false);
        }
      } else if (effect === "guanxing" || effect === "luoshen" || effect === "yinghun") {
        await runPreparePhase(player);
        used = changed(before, player);
      } else if (["yingzi", "haoshi", "luoyi", "tuxi", "qiaobian", "zaiqi", "shuangxiong"].includes(effect)) {
        await drawForTurn(player);
        used = changed(before, player);
      } else if (["jianxiong", "fankui", "ganglie", "yiji", "tiandu", "jieming"].includes(effect)) {
        await damage(player, state.players[1], 1, { cardName: "杀", damageCard: card("杀") });
        used = changed(before, player);
      } else if (effect === "drawPlusOne") {
        await drawForTurn(player);
        used = player.hand.length > before.hand;
      } else if (effect === "slashDamagePlusOne") {
        used = slashDamage(player) > 1;
      } else if (effect === "slashLimitPlusOne") {
        used = slashLimit(player) > 1;
      } else if (effect === "handLimitPlusTwo") {
        used = handLimit(player) > Math.max(player.hp, 0);
      } else {
        return { ok: true, skipped: "unsupported-passive" };
      }
      if (state.pendingReaction || state.pendingDying) {
        state.pendingReaction = null;
        state.pendingDying = null;
      }
      return { ok: Boolean(used || changed(before, player)), used };
    } catch (error) {
      return { ok: false, error: error && error.stack ? error.stack.split("\\n")[0] : String(error) };
    }
  }

  const official = heroes.map(normalizeHero);
  globalThis.__skillSmokeProgress = "distance";
  const distancePlayer = setup(official[0]);
  state.players[1].alive = false;
  const distanceAfterDeath = distanceBetween(state.players[0], state.players[2]);
  if (distanceAfterDeath !== 1) {
    failures.push({ hero: "距离", effect: "死亡角色", reason: "dead-seat-distance=" + distanceAfterDeath });
  }

  for (let i = 0; i < iterations; i++) {
    const hero = official[i % official.length];
    const effects = heroEffects(hero);
    if (!effects.length) continue;
    const effect = effects[Math.floor(i / official.length) % effects.length];
    globalThis.__skillSmokeProgress = "case " + i + " " + hero.name + ":" + effect;
    if (["qiaobian", "tuntian", "jixi", "fangquan", "guzheng", "beige", "tiaoxin", "shensu", "luanwu", "luanji"].includes(effect)) {
      exercised.push({ hero: hero.name, effect, result: { ok: true, skipped: "stage-flow-skill" } });
      continue;
    }
    const result = await testEffect(hero, effect);
    exercised.push({ hero: hero.name, effect, result });
    if (!result.ok) {
      failures.push({ hero: hero.name, effect, reason: result.error || result.skipped || "no observable effect" });
    }
  }

  const weak = exercised
    .filter((item) => item.result.skipped === "unsupported-passive")
    .slice(0, 20)
    .map((item) => item.hero + ":" + item.effect);
  globalThis.__skillSmokeProgress = "done";
  globalThis.__skillSmokeResult = {
    iterations,
    exercised: exercised.length,
    failures,
    skippedUnsupportedSample: weak,
    distanceAfterDeath,
    ok: failures.length === 0
  };

  feedback = originalFeedback;
  toast = originalToast;
  render = originalRender;
  renderAll = originalRenderAll;
  showModal = originalShowModal;
}
__runSkillSmokeTest(Number(globalThis.__iterations || 100)).then(() => globalThis.__skillSmokeResult).catch((error) => {
  globalThis.__skillSmokeResult = {
    ok: false,
    iterations: Number(globalThis.__iterations || 100),
    exercised: 0,
    distanceAfterDeath: null,
    skippedUnsupportedSample: [],
    failures: [{ hero: "runner", effect: "bootstrap", reason: error && error.stack ? error.stack.split("\\n").slice(0, 3).join(" | ") : String(error) }]
  };
  return globalThis.__skillSmokeResult;
});
`;

vm.createContext(context);
vm.runInContext(`${source}\n${runner}`, context, { filename: "sgs-skill-smoke-vm.js", timeout: 10000 });

(async () => {
  const started = Date.now();
  while (!context.__skillSmokeResult && Date.now() - started < 5000) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  const result = context.__skillSmokeResult || { ok: false, iterations: 100, exercised: 0, distanceAfterDeath: null, failures: [{ reason: "test did not finish", progress: context.__skillSmokeProgress || "none" }], skippedUnsupportedSample: [] };
  const summary = {
    ok: result.ok,
    iterations: result.iterations,
    exercised: result.exercised,
    failureCount: result.failures.length,
    distanceAfterDeath: result.distanceAfterDeath,
    failures: result.failures.slice(0, 30),
    skippedUnsupportedSample: result.skippedUnsupportedSample
  };
  console.log(JSON.stringify(summary, null, 2));
  process.exit(result.ok ? 0 : 1);
})();
