const camps = {
  魏: "#455e87",
  蜀: "#5f8f58",
  吴: "#4d8d8a",
  群: "#8b5f5a",
  神: "#8c7c49",
  自: "#8365a0"
};

const CUSTOM_HERO_KEY = "sgsDemoCustomHeroes";
const CUSTOM_CARD_KEY = "sgsDemoCustomCards";
const SELECTED_HERO_KEY = "sgsDemoSelectedHeroId";
const SELECTED_ROLE_KEY = "sgsDemoSelectedRole";
const skillEffectOptions = [
  { id: "none", label: "只显示文字", timing: "资料展示", text: "不改变规则。" },
  { id: "drawPlusOne", label: "摸牌阶段多摸1张", timing: "摸牌阶段", text: "摸牌阶段，你多摸一张牌。" },
  { id: "slashLimitPlusOne", label: "出杀次数+1", timing: "出牌阶段", text: "出牌阶段，你使用【杀】的次数上限+1。" },
  { id: "slashDamagePlusOne", label: "杀伤害+1", timing: "造成伤害时", text: "你使用【杀】造成的伤害+1。" },
  { id: "recoverOnTurn", label: "回合开始回复", timing: "准备阶段", text: "回合开始时，若你已受伤，你回复1点体力。" },
  { id: "handLimitPlusTwo", label: "手牌上限+2", timing: "弃牌阶段", text: "你的手牌上限+2。" },
  { id: "startDrawTwo", label: "开局多摸2张", timing: "游戏开始", text: "游戏开始时，你多摸两张牌。" },
  { id: "limitedDrawTwo", label: "限定技：摸两张", timing: "出牌阶段主动发动", text: "出牌阶段一局一次，你摸两张牌。" },
  { id: "awakeningRecover", label: "觉醒技：加上限并回复", timing: "准备阶段强制检测", text: "准备阶段，若体力值不大于2，你加1点体力上限，回复1点体力并摸一张牌。" },
  { id: "rebelRewardPlusOne", label: "击杀反贼奖励+1", timing: "击杀结算", text: "你击杀反贼后，额外摸一张牌。" }
];

const customSkillRuleOptions = {
  timing: {
    none: "只显示文字",
    play: "出牌阶段主动发动",
    prepare: "准备阶段触发",
    draw: "摸牌阶段触发",
    damageTaken: "受到伤害后触发",
    slashDamage: "使用杀造成伤害时",
    handLimit: "弃牌阶段手牌上限"
  },
  limit: {
    phase: "每阶段一次",
    none: "不限次数",
    game: "限定技/一局一次",
    forced: "锁定技"
  },
  cost: {
    none: "无代价",
    discard1: "弃1张手牌",
    loseHp1: "失去1点体力"
  },
  target: {
    self: "自己",
    other: "一名其他角色",
    damaged: "一名受伤角色",
    enemy: "一名敌方倾向角色",
    source: "伤害来源"
  },
  action: {
    draw: "摸牌",
    heal: "回复体力",
    damage: "造成普通伤害",
    fireDamage: "造成火焰伤害",
    discardTarget: "弃置目标一张牌",
    stealTarget: "获得目标一张牌",
    slashLimit: "本回合杀次数+数值",
    slashDamage: "本回合杀伤害+数值",
    handLimit: "手牌上限+数值"
  }
};

const cardTypeClass = {
  基础: "card-basic",
  锦囊: "card-trick",
  延时锦囊: "card-delay",
  武器: "card-equip",
  防具: "card-equip",
  坐骑: "card-equip"
};

const cardEffectOptions = [
  { id: "damageOne", label: "对目标造成1点伤害", needsTarget: true, hint: "选目标" },
  { id: "drawTwo", label: "你摸两张牌", needsTarget: false, hint: "立即使用" },
  { id: "healSelf", label: "你回复1点体力", needsTarget: false, hint: "回复" },
  { id: "discardTarget", label: "弃置目标一张手牌", needsTarget: true, hint: "选目标" },
  { id: "stealTarget", label: "获得目标一张手牌", needsTarget: true, hint: "选目标" },
  { id: "allDamage", label: "其他角色各受1点伤害", needsTarget: false, hint: "群体" },
  { id: "allDraw", label: "所有存活角色各摸一张牌", needsTarget: false, hint: "群体" },
  { id: "equipCrossbow", label: "装备：本回合杀无限", needsTarget: false, hint: "装备" },
  { id: "selfDrawOne", label: "你摸一张牌", needsTarget: false, hint: "立即使用" }
];

const officialHeroImages = {
  曹操: "https://www.sanguosha.cn/storage/uploads/images/pic_index/15.jpg",
  司马懿: "https://www.sanguosha.cn/storage/uploads/images/pic_index/16.jpg",
  夏侯惇: "https://www.sanguosha.cn/storage/uploads/images/pic_index/17.jpg",
  张辽: "https://www.sanguosha.cn/storage/uploads/images/pic_index/18.jpg",
  许褚: "https://www.sanguosha.cn/storage/uploads/images/pic_index/19.jpg",
  郭嘉: "https://www.sanguosha.cn/storage/uploads/images/pic_index/20.jpg",
  甄姬: "https://www.sanguosha.cn/storage/uploads/images/pic_index/21.jpg",
  刘备: "https://www.sanguosha.cn/storage/uploads/images/pic_index/1.png",
  关羽: "https://www.sanguosha.cn/storage/uploads/images/pic_index/2.png",
  张飞: "https://www.sanguosha.cn/storage/uploads/images/pic_index/3.png",
  诸葛亮: "https://www.sanguosha.cn/storage/uploads/images/pic_index/4.jpg",
  赵云: "https://www.sanguosha.cn/storage/uploads/images/pic_index/5.jpg",
  马超: "https://www.sanguosha.cn/storage/uploads/images/pic_index/6.jpg",
  黄月英: "https://www.sanguosha.cn/storage/uploads/images/pic_index/7.jpg",
  孙权: "https://www.sanguosha.cn/storage/uploads/images/pic_index/8.jpg",
  甘宁: "https://www.sanguosha.cn/storage/uploads/images/pic_index/9.jpg",
  吕蒙: "https://www.sanguosha.cn/storage/uploads/images/pic_index/10.jpg",
  黄盖: "https://www.sanguosha.cn/storage/uploads/images/pic_index/11.jpg",
  周瑜: "https://www.sanguosha.cn/storage/uploads/images/pic_index/12.jpg",
  大乔: "https://www.sanguosha.cn/storage/uploads/images/pic_index/13.jpg",
  陆逊: "https://www.sanguosha.cn/storage/uploads/images/pic_index/14.jpg",
  孙尚香: "https://www.sanguosha.cn/storage/uploads/images/pic_index/25.jpg",
  华佗: "https://www.sanguosha.cn/storage/uploads/images/pic_index/22.jpg",
  吕布: "https://www.sanguosha.cn/storage/uploads/images/pic_index/23.jpg",
  貂蝉: "https://www.sanguosha.cn/storage/uploads/images/pic_index/24.jpg",
  夏侯渊: "https://www.sanguosha.cn/storage/uploads/images/pic_index/28.jpg",
  曹仁: "https://www.sanguosha.cn/storage/uploads/images/pic_index/29.jpg",
  黄忠: "https://www.sanguosha.cn/storage/uploads/images/pic_index/26.jpg",
  魏延: "https://www.sanguosha.cn/storage/uploads/images/pic_index/27.jpg",
  小乔: "https://www.sanguosha.cn/storage/uploads/images/pic_index/30.jpg",
  周泰: "https://www.sanguosha.cn/storage/uploads/images/pic_index/31.jpg",
  张角: "https://www.sanguosha.cn/storage/uploads/images/pic_index/32.jpg",
  于吉: "https://www.sanguosha.cn/storage/uploads/images/pic_index/33.jpg",
  荀彧: "https://www.sanguosha.cn/storage/uploads/images/pic_index/35.jpg",
  典韦: "https://www.sanguosha.cn/storage/uploads/images/pic_index/34.jpg",
  庞统: "https://www.sanguosha.cn/storage/uploads/images/pic_index/36.jpg",
  卧龙诸葛亮: "https://www.sanguosha.cn/storage/uploads/images/pic_index/4.jpg",
  太史慈: "https://www.sanguosha.cn/storage/uploads/images/pic_index/38.jpg",
  庞德: "https://www.sanguosha.cn/storage/uploads/images/pic_index/39.jpg",
  袁绍: "https://www.sanguosha.cn/storage/uploads/images/pic_index/41.jpg",
  颜良文丑: "https://www.sanguosha.cn/storage/uploads/images/pic_index/40.jpg",
  徐晃: "https://www.sanguosha.cn/storage/uploads/images/pic_index/42.jpg",
  曹丕: "https://www.sanguosha.cn/storage/uploads/images/pic_index/43.jpg",
  孟获: "https://www.sanguosha.cn/storage/uploads/images/pic_index/47.jpg",
  祝融: "https://www.sanguosha.cn/storage/uploads/images/pic_index/46.jpg",
  孙坚: "https://www.sanguosha.cn/storage/uploads/images/pic_index/44.jpg",
  鲁肃: "https://www.sanguosha.cn/storage/uploads/images/pic_index/49.jpg",
  董卓: "https://www.sanguosha.cn/storage/uploads/images/pic_index/45.jpg",
  贾诩: "https://www.sanguosha.cn/storage/uploads/images/pic_index/48.jpg",
  张郃: "https://www.sanguosha.cn/storage/uploads/images/pic_index/50.jpg",
  邓艾: "https://www.sanguosha.cn/storage/uploads/images/pic_index/51.jpg",
  姜维: "https://www.sanguosha.cn/storage/uploads/images/pic_index/52.jpg",
  刘禅: "https://www.sanguosha.cn/storage/uploads/images/pic_index/53.jpg",
  孙策: "https://www.sanguosha.cn/storage/uploads/images/pic_index/54.jpg",
  张昭张纮: "https://www.sanguosha.cn/storage/uploads/images/pic_index/55.jpg",
  蔡文姬: "https://www.sanguosha.cn/storage/uploads/images/pic_index/57.jpg",
  左慈: "https://www.sanguosha.cn/storage/uploads/images/pic_index/56.jpg",
  "界·徐盛": "https://www.sanguosha.cn/storage/uploads/images/skins/49100.jpg",
  "势·魏延": "https://www.sanguosha.cn/storage/uploads/images/83501.jpg",
  "势·周瑜": "https://www.sanguosha.cn/storage/uploads/images/91401.jpg"
};

const lockedSkillEffects = new Set(["drawPlusOne", "slashLimitPlusOne", "slashDamagePlusOne", "recoverOnTurn", "handLimitPlusTwo", "startDrawTwo", "rebelRewardPlusOne", "awakeningRecover"]);
const oncePerGameSkillEffects = new Set(["startDrawTwo", "limitedDrawTwo", "awakeningRecover"]);
const lordSkillEffects = new Set(["hujia", "jijiang", "jiuyuan", "huangtian", "xueyi", "songwei", "baonue", "ruoyu", "zhiba"]);
const aiExcludedHeroNames = new Set(["界·徐盛", "势·魏延", "势·周瑜", "神姜维"]);

const heroes = [
  ["曹操", "魏", "标准", 4, ["奸雄：受到伤害后可获得造成伤害的牌。", "护驾：主公技，魏势力可帮你出闪。"]],
  ["司马懿", "魏", "标准", 3, ["反馈：受到伤害后可拿伤害来源一张牌。", "鬼才：可用手牌修改一次判定。"]],
  ["夏侯惇", "魏", "标准", 4, ["刚烈：受到伤害后可令伤害来源判定，失败则弃牌或受伤。"]],
  ["张辽", "魏", "标准", 4, ["突袭：摸牌阶段可少摸牌，改为获得其他角色手牌。"]],
  ["许褚", "魏", "标准", 4, ["裸衣：摸牌少摸一张，本回合杀和决斗伤害更高。"]],
  ["郭嘉", "魏", "标准", 3, ["天妒：判定牌生效后可获得。", "遗计：受到伤害后可摸牌并分配。"]],
  ["甄姬", "魏", "标准", 3, ["倾国：可将黑色手牌当闪。", "洛神：回合开始可连续判定黑牌并获得。"]],
  ["刘备", "蜀", "标准", 4, ["仁德：可把手牌交给他人，交出足量后回复。", "激将：主公技，蜀势力可帮你出杀。"]],
  ["关羽", "蜀", "标准", 4, ["武圣：红色牌可当杀使用或打出。"]],
  ["张飞", "蜀", "标准", 4, ["咆哮：出牌阶段使用杀无次数限制。"]],
  ["诸葛亮", "蜀", "标准", 3, ["观星：回合开始可调整牌堆顶。", "空城：无手牌时不能成为杀或决斗目标。"]],
  ["赵云", "蜀", "标准", 4, ["龙胆：杀可当闪，闪可当杀。"]],
  ["马超", "蜀", "标准", 4, ["马术：与其他角色距离视为更近。", "铁骑：使用杀可判定限制目标出闪。"]],
  ["黄月英", "蜀", "标准", 3, ["集智：使用非延时锦囊后摸牌。", "奇才：锦囊距离无限。"]],
  ["孙权", "吴", "标准", 4, ["制衡：可弃任意牌并摸等量牌。", "救援：主公技，吴势力对你使用桃收益更高。"]],
  ["甘宁", "吴", "标准", 4, ["奇袭：黑色牌可当过河拆桥使用。"]],
  ["吕蒙", "吴", "标准", 4, ["克己：若未使用或打出杀，可跳过弃牌。"]],
  ["黄盖", "吴", "标准", 4, ["苦肉：可失去体力摸牌。"]],
  ["周瑜", "吴", "标准", 3, ["英姿：摸牌阶段多摸一张。", "反间：令一名角色猜花色，猜错受伤。"]],
  ["大乔", "吴", "标准", 3, ["国色：方片牌可当乐不思蜀。", "流离：可转移杀的目标。"]],
  ["陆逊", "吴", "标准", 3, ["谦逊：不能成为顺手牵羊和乐不思蜀目标。", "连营：失去最后手牌后摸牌。"]],
  ["孙尚香", "吴", "标准", 3, ["结姻：可弃牌与受伤男性角色各回复。", "枭姬：失去装备后摸牌。"]],
  ["华佗", "群", "标准", 3, ["急救：回合外红色牌可当桃。", "青囊：出牌阶段可弃牌令一人回复。"]],
  ["吕布", "群", "标准", 4, ["无双：杀和决斗需要对方连续响应两张牌。"]],
  ["貂蝉", "群", "标准", 3, ["离间：可令两名男性角色决斗。", "闭月：结束阶段摸牌。"]],
  ["夏侯渊", "魏", "风", 4, ["神速：可跳过阶段，视为对一名角色使用杀。"]],
  ["曹仁", "魏", "风", 4, ["据守：结束阶段可摸牌并翻面。"]],
  ["黄忠", "蜀", "风", 4, ["烈弓：满足条件时杀不可被闪响应。"]],
  ["魏延", "蜀", "风", 4, ["狂骨：对距离近的角色造成伤害后回复。"]],
  ["小乔", "吴", "风", 3, ["天香：可弃红桃牌转移伤害。", "红颜：黑桃牌视为红桃。"]],
  ["周泰", "吴", "风", 4, ["不屈：濒死时以创牌维持存活。"]],
  ["张角", "群", "风", 3, ["雷击：打出闪后可令一人判定受雷伤。", "鬼道：可用黑牌替换判定。", "黄天：主公技，群势力可交给你闪或闪电。"]],
  ["于吉", "群", "风", 3, ["蛊惑：可声明一张基本牌或锦囊让他人质疑。"]],
  ["荀彧", "魏", "火", 3, ["驱虎：拼点赢后令目标攻击其范围内角色。", "节命：受伤后令角色补牌至体力上限。"]],
  ["典韦", "魏", "火", 4, ["强袭：可失去体力或弃武器，对距离近角色造成伤害。"]],
  ["庞统", "蜀", "火", 3, ["连环：梅花牌可当铁索连环。", "涅槃：限定技，濒死时重整状态。"]],
  ["卧龙诸葛亮", "蜀", "火", 3, ["八阵：无防具时视为装备八卦阵。", "火计：红色牌可当火攻。", "看破：黑色牌可当无懈可击。"]],
  ["太史慈", "吴", "火", 4, ["天义：拼点赢后本回合杀更强。"]],
  ["庞德", "群", "火", 4, ["马术：距离更近。", "猛进：杀被闪后可弃目标牌。"]],
  ["袁绍", "群", "火", 4, ["乱击：两张同花色牌可当万箭齐发。", "血裔：主公技，群势力越多手牌上限越高。"]],
  ["颜良文丑", "群", "火", 4, ["双雄：摸牌阶段改判定，获得与判定色不同的牌可当决斗。"]],
  ["徐晃", "魏", "林", 4, ["断粮：黑色基本牌或装备可当兵粮寸断。"]],
  ["曹丕", "魏", "林", 3, ["行殇：其他角色死亡时获得其牌。", "放逐：受伤后可令一人翻面摸牌。", "颂威：主公技，魏势力黑色判定后你可摸牌。"]],
  ["孟获", "蜀", "林", 4, ["祸首：南蛮入侵对你无效且伤害来源视为你。", "再起：濒危时可通过判定回复或摸牌。"]],
  ["祝融", "蜀", "林", 4, ["巨象：南蛮入侵对你无效并可获得。", "烈刃：杀造成伤害后可拼点夺牌。"]],
  ["孙坚", "吴", "林", 4, ["英魂：准备阶段可令一名角色摸弃或弃摸。"]],
  ["鲁肃", "吴", "林", 3, ["好施：摸牌阶段多摸并可能分牌。", "缔盟：可交换两名角色手牌。"]],
  ["董卓", "群", "林", 8, ["酒池：黑桃牌可当酒。", "肉林：女性角色与你互杀更难响应。", "崩坏：结束阶段若体力不是最低则失去体力或减上限。", "暴虐：主公技，群势力造成伤害后你可判定回复。"]],
  ["贾诩", "群", "林", 3, ["完杀：你的回合濒死角色只能自救。", "乱武：限定技，所有角色攻击最近角色或失去体力。", "帷幕：不能成为黑色锦囊目标。"]],
  ["张郃", "魏", "山", 4, ["巧变：可弃牌跳过阶段并获得额外效果。"]],
  ["邓艾", "魏", "山", 4, ["屯田：回合外失牌后判定获得田。", "急袭：觉醒后田可当顺手牵羊。"]],
  ["姜维", "蜀", "山", 4, ["挑衅：令目标对你出杀，否则弃其牌。", "志继：觉醒后回复并获得观星。"]],
  ["刘禅", "蜀", "山", 3, ["享乐：成为杀目标时对方需额外弃基本牌。", "放权：可跳过出牌令他人额外行动。", "若愚：主公觉醒技。"]],
  ["孙策", "吴", "山", 4, ["激昂：使用或成为决斗、红杀目标后摸牌。", "魂姿：觉醒后获得英姿、英魂。", "制霸：主公技，吴势力可与你拼点。"]],
  ["张昭张纮", "吴", "山", 3, ["直谏：可把装备置入他人装备区并摸牌。", "固政：其他角色弃牌后可帮其回收并获得剩余牌。"]],
  ["蔡文姬", "群", "山", 3, ["悲歌：角色受杀伤害后可弃牌判定产生效果。", "断肠：死亡时令凶手失去技能。"]],
  ["左慈", "群", "山", 3, ["化身：获得随机武将牌技能。", "新生：受伤后获得新的化身。"]],
  ["界·徐盛", "吴", "移动版", 4, ["破军：当你使用【杀】指定一个目标后，你可以将其至多X张牌扣置于该角色的武将牌旁（X为其体力值）；当前回合结束后，该角色获得这些牌。你使用【杀】对手牌数与装备数均不大于你的角色造成伤害时，此伤害+1。"]],
  ["势·魏延", "蜀", "移动版", 4, ["壮誓：出牌阶段开始时，你可以弃置任意张手牌令此阶段前等量张牌无距离限制且不可被响应，或失去任意点体力令此阶段前等量张牌不计入次数。", "饮战：锁定技，当你使用【杀】造成伤害时，若你的体力值小于等于其，此伤害+1；若你的手牌数小于等于其，结算后弃置其一张牌。乘势：你回复1点体力并获得其弃置的牌。", "忠傲：使命技，游戏开始时获得“狂骨※”；成功后升级“狂骨※”，失败后失去“壮誓※”并获得“困奋※”。", "狂骨：当你对距离1以内的一名角色造成伤害后，你可以选择回复1点体力或摸一张牌。", "困奋：锁定技，结束阶段，你失去1点体力，然后摸两张牌。"]],
  ["势·周瑜", "吴", "移动版", 4, ["炽沄：你每阶段首次获得牌后，可交给一名其他角色任意张手牌，其选择展示同色手牌并受到1点火焰伤害，或令你摸两张牌且其进入连环状态。", "焰洄：你使用牌指定目标后，可展示一名目标角色的一张手牌；若此牌本回合已展示过，你弃置之。此阶段结束时，你选择造成1点火焰伤害或摸牌。", "焚涛：锁定技，有连环状态的其他角色受到火焰伤害时，其选择令此次传导伤害+1，或弃置一半牌并在伤害结算后进入连环状态。", "雄姿：限定技，准备阶段，你可令本局“炽沄”“焰洄”“焚涛”只在你的回合内发动并固定选项，然后摸两张牌。"]],
  ["神姜维", "神", "一将成名", 4, ["天任：锁定技，当一张或多张基本牌或普通锦囊牌不是因使用而置入弃牌堆后，你获得等量个“天任”标记；当标记数不小于体力上限时，移去等量标记，加1点体力上限并摸两张牌。", "九伐：当你每累计使用或打出九张不同牌名的牌后，可亮出牌堆顶九张牌，获得其中每个重复点数的牌各一张，其余置入弃牌堆。", "平襄：限定技，出牌阶段，若你的体力上限大于9，可减9点体力上限，失去“九伐”，本局手牌上限改为体力上限，然后视为使用至多九张不计次数的火【杀】。"]]
].map(([name, camp, pack, hp, skills]) => ({ name, camp, pack, hp, skills }));

const officialSkillCorrections = {
  曹操: ["奸雄：当你受到伤害后，你可以获得对你造成伤害的牌。", "护驾：主公技，当你需要使用或打出【闪】时，你可以令其他魏势力角色选择是否打出一张【闪】。"],
  司马懿: ["反馈：当你受到伤害后，你可以获得伤害来源的一张牌。", "鬼才：当一名角色的判定牌生效前，你可以打出一张手牌代替之。"],
  夏侯惇: ["刚烈：当你受到伤害后，你可以判定，若结果不为红桃，伤害来源选择弃置两张手牌或受到你造成的1点伤害。"],
  张辽: ["突袭：摸牌阶段，你可以改为获得至多两名角色的各一张手牌。"],
  许褚: ["裸衣：摸牌阶段，你可以少摸一张牌。若如此做，本回合你使用【杀】或【决斗】造成的伤害+1。"],
  郭嘉: ["天妒：当你的判定牌生效后，你可以获得此牌。", "遗计：当你受到1点伤害后，你可以摸两张牌，然后可以将至多两张手牌交给其他角色。"],
  甄姬: ["倾国：你可以将一张黑色手牌当【闪】使用或打出。", "洛神：准备阶段，你可以判定，若结果为黑色，你获得此牌并可以重复此流程。"],
  刘备: ["仁德：出牌阶段，你可以将任意张手牌交给其他角色；若你于此阶段给出的牌首次达到两张，你回复1点体力。", "激将：主公技，当你需要使用或打出【杀】时，你可以令其他蜀势力角色选择是否打出一张【杀】。"],
  关羽: ["武圣：你可以将一张红色牌当【杀】使用或打出。"],
  张飞: ["咆哮：锁定技，你使用【杀】无次数限制。"],
  诸葛亮: ["观星：准备阶段，你可以观看牌堆顶的若干张牌，并以任意顺序置于牌堆顶或牌堆底。", "空城：锁定技，若你没有手牌，你不能成为【杀】或【决斗】的目标。"],
  赵云: ["龙胆：你可以将【杀】当【闪】、【闪】当【杀】使用或打出。"],
  马超: ["马术：锁定技，你计算与其他角色的距离-1。", "铁骑：当你使用【杀】指定一名角色为目标后，你可以判定，若结果为红色，该角色不能使用【闪】响应此【杀】。"],
  黄月英: ["集智：当你使用普通锦囊牌时，你可以摸一张牌。", "奇才：锁定技，你使用锦囊牌无距离限制。"],
  孙权: ["制衡：出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。", "救援：主公技，其他吴势力角色对你使用【桃】回复的体力+1。"],
  甘宁: ["奇袭：你可以将一张黑色牌当【过河拆桥】使用。"],
  吕蒙: ["克己：若你于出牌阶段未使用或打出过【杀】，你可以跳过弃牌阶段。"],
  黄盖: ["苦肉：出牌阶段，你可以失去1点体力，然后摸两张牌。"],
  周瑜: ["英姿：摸牌阶段，你可以多摸一张牌。", "反间：出牌阶段限一次，你可以令一名其他角色选择一种花色后获得你的一张手牌，然后展示之，若花色不同，其受到1点伤害。"],
  大乔: ["国色：你可以将一张方片牌当【乐不思蜀】使用。", "流离：当你成为【杀】的目标时，你可以弃置一张牌并将此【杀】转移给攻击范围内的另一名角色。"],
  陆逊: ["谦逊：锁定技，你不能成为【顺手牵羊】和【乐不思蜀】的目标。", "连营：当你失去最后的手牌后，你可以摸一张牌。"],
  孙尚香: ["结姻：出牌阶段限一次，你可以弃置两张手牌并选择一名已受伤的男性角色，你与其各回复1点体力。", "枭姬：当你失去装备区里的一张牌后，你可以摸两张牌。"],
  华佗: ["急救：你的回合外，你可以将一张红色牌当【桃】使用。", "青囊：出牌阶段限一次，你可以弃置一张手牌并令一名已受伤角色回复1点体力。"],
  吕布: ["无双：锁定技，你使用【杀】指定目标后，目标需连续使用两张【闪】抵消；你使用【决斗】时，目标每次需连续打出两张【杀】响应。"],
  貂蝉: ["离间：出牌阶段限一次，你可以弃置一张牌并选择两名男性角色，视为其中一名角色对另一名角色使用【决斗】。", "闭月：结束阶段，你可以摸一张牌。"],
  夏侯渊: ["神速：你可以跳过判定阶段和摸牌阶段，或跳过出牌阶段并弃置一张装备牌，视为对一名其他角色使用一张【杀】。"],
  曹仁: ["据守：结束阶段，你可以摸三张牌，然后将武将牌翻面。"],
  黄忠: ["烈弓：当你于出牌阶段使用【杀】指定目标后，若其手牌数不小于你的体力值或不大于你的攻击范围，其不能使用【闪】响应。"],
  魏延: ["狂骨：当你对距离1以内的一名角色造成1点伤害后，你可以回复1点体力。"],
  小乔: ["天香：当你受到伤害时，你可以弃置一张红桃手牌并将此伤害转移给一名其他角色，然后其摸X张牌。", "红颜：锁定技，你的黑桃牌视为红桃牌。"],
  周泰: ["不屈：当你处于濒死状态时，你可以将牌堆顶的一张牌置于你的武将牌上，若点数与已有牌均不同，你回复至1点体力。"],
  张角: ["雷击：当你使用或打出【闪】后，你可以令一名其他角色判定，若结果为黑桃，其受到2点雷电伤害。", "鬼道：当一名角色的判定牌生效前，你可以打出一张黑色牌替换之。", "黄天：主公技，其他群势力角色的出牌阶段限一次，其可以将一张【闪】或【闪电】交给你。"],
  于吉: ["蛊惑：你可以将一张手牌扣置于桌上并声明为一张基本牌或普通锦囊牌使用或打出，其他角色可以质疑。"],
  荀彧: ["驱虎：出牌阶段限一次，你可以与一名体力值大于你的角色拼点；若你赢，其对其攻击范围内你选择的一名角色造成1点伤害，若你没赢，其对你造成1点伤害。", "节命：当你受到1点伤害后，你可以令一名角色将手牌摸至其体力上限，最多摸至五张。"],
  典韦: ["强袭：出牌阶段限一次，你可以失去1点体力或弃置一张武器牌，对你攻击范围内的一名其他角色造成1点伤害。"],
  庞统: ["连环：你可以将一张梅花手牌当【铁索连环】使用或重铸。", "涅槃：限定技，当你处于濒死状态时，你可以弃置区域里的所有牌，然后摸三张牌，将体力回复至3点。"],
  卧龙诸葛亮: ["八阵：锁定技，若你的装备区里没有防具牌，视为你装备【八卦阵】。", "火计：你可以将一张红色手牌当【火攻】使用。", "看破：你可以将一张黑色手牌当【无懈可击】使用。"],
  太史慈: ["天义：出牌阶段限一次，你可以与一名角色拼点。若你赢，本回合你使用【杀】无距离限制且可以额外指定一个目标并多使用一张【杀】；若你没赢，本回合你不能使用【杀】。"],
  庞德: ["马术：锁定技，你计算与其他角色的距离-1。", "猛进：当你使用的【杀】被【闪】抵消后，你可以弃置目标角色的一张牌。"],
  袁绍: ["乱击：你可以将两张花色相同的手牌当【万箭齐发】使用。", "血裔：主公技，锁定技，你的手牌上限+X，X为其他群势力角色数的两倍。"],
  颜良文丑: ["双雄：摸牌阶段，你可以改为判定，你获得此判定牌；本回合你可以将与判定牌颜色不同的一张手牌当【决斗】使用。"],
  徐晃: ["断粮：你可以将一张黑色基本牌或装备牌当【兵粮寸断】使用；你使用【兵粮寸断】无距离限制。"],
  曹丕: ["行殇：当其他角色死亡时，你可以获得其所有牌。", "放逐：当你受到伤害后，你可以令一名其他角色翻面，然后其摸X张牌，X为你已损失的体力值。", "颂威：主公技，其他魏势力角色的黑色判定牌生效后，其可以令你摸一张牌。"],
  孟获: ["祸首：锁定技，【南蛮入侵】对你无效；其他角色使用【南蛮入侵】造成伤害时，伤害来源视为你。", "再起：摸牌阶段，若你已受伤，你可以改为亮出牌堆顶X张牌，其中每有一张红桃牌你回复1点体力，然后获得其余牌。"],
  祝融: ["巨象：锁定技，【南蛮入侵】对你无效；当其他角色使用的【南蛮入侵】结算完毕进入弃牌堆时，你获得之。", "烈刃：当你使用【杀】对目标角色造成伤害后，你可以与其拼点，若你赢，你获得其一张牌。"],
  孙坚: ["英魂：准备阶段，若你已受伤，你可以令一名其他角色摸X张牌弃一张牌，或摸一张牌弃X张牌，X为你已损失的体力值。"],
  鲁肃: ["好施：摸牌阶段，你可以多摸两张牌；若如此做，摸牌阶段结束时若你的手牌数大于5，你将一半手牌交给手牌数最少的一名其他角色。", "缔盟：出牌阶段限一次，你可以弃置等同于两名角色手牌数差的牌，然后交换这两名角色的手牌。"],
  董卓: ["酒池：你可以将一张黑桃手牌当【酒】使用。", "肉林：锁定技，女性角色使用【杀】指定你为目标，或你使用【杀】指定女性角色为目标时，目标需连续使用两张【闪】抵消。", "崩坏：结束阶段，若你的体力值不是全场最少，你须减1点体力上限或失去1点体力。", "暴虐：主公技，其他群势力角色造成伤害后，其可以令你判定，若为黑桃，你回复1点体力。"],
  贾诩: ["完杀：锁定技，你的回合内，除处于濒死状态的角色外，其他角色不能使用【桃】。", "乱武：限定技，出牌阶段，你可以令所有其他角色依次选择对距离最近的另一名角色使用【杀】，否则失去1点体力。", "帷幕：锁定技，你不能成为黑色锦囊牌的目标。"],
  张郃: ["巧变：你可以弃置一张手牌并跳过一个阶段；若跳过摸牌阶段，你获得至多两名角色的各一张手牌；若跳过出牌阶段，你可以移动场上的一张牌。"],
  邓艾: ["屯田：当你于回合外失去牌后，你可以判定，若结果不为红桃，将此牌置于你的武将牌上称为“田”。", "急袭：觉醒技，准备阶段，若“田”的数量不少于3，你减1点体力上限并获得“急袭”，你可以将一张“田”当【顺手牵羊】使用。"],
  姜维: ["挑衅：出牌阶段限一次，你可以令一名攻击范围内含有你的角色选择对你使用一张【杀】，否则你弃置其一张牌。", "志继：觉醒技，准备阶段，若你没有手牌，你回复1点体力或摸两张牌，然后减1点体力上限并获得“观星”。"],
  刘禅: ["享乐：锁定技，当你成为【杀】的目标后，使用者需弃置一张基本牌，否则此【杀】对你无效。", "放权：你可以跳过出牌阶段，若如此做，弃牌阶段结束时你可以弃置一张手牌并令一名其他角色进行一个额外回合。", "若愚：主公技，觉醒技，准备阶段，若你的体力值为全场最少，你加1点体力上限并回复1点体力，然后获得“激将”。"],
  孙策: ["激昂：当你使用【决斗】或红色【杀】指定目标后，或成为【决斗】或红色【杀】的目标后，你可以摸一张牌。", "魂姿：觉醒技，准备阶段，若你的体力值为1，你减1点体力上限并获得“英姿”和“英魂”。", "制霸：主公技，其他吴势力角色的出牌阶段限一次，其可以与你拼点。"],
  张昭张纮: ["直谏：出牌阶段，你可以将一张装备牌置入一名其他角色的装备区，然后摸一张牌。", "固政：其他角色的弃牌阶段结束时，你可以令其获得其于此阶段弃置的一张牌，然后你获得其余弃置牌。"],
  蔡文姬: ["悲歌：当一名角色受到【杀】造成的伤害后，你可以弃置一张牌并令其判定，根据判定结果执行对应效果。", "断肠：锁定技，当你死亡时，杀死你的角色失去所有武将技能。"],
  左慈: ["化身：游戏开始时，你随机获得两张武将牌作为“化身”牌，并亮出其中一张；你获得亮出化身牌的一个技能。", "新生：当你受到1点伤害后，你可以获得一张新的“化身”牌。"]
};

heroes.forEach((hero) => {
  if (officialSkillCorrections[hero.name]) hero.skills = officialSkillCorrections[hero.name];
});

const officialSkillEffects = {
  曹操: ["jianxiong", "hujia"],
  司马懿: ["fankui", "guicai"],
  夏侯惇: ["ganglie"],
  张辽: ["tuxi"],
  许褚: ["luoyi"],
  郭嘉: ["tiandu", "yiji"],
  甄姬: ["qingguo", "luoshen"],
  刘备: ["rende", "jijiang"],
  关羽: ["wusheng"],
  张飞: ["paoxiao"],
  诸葛亮: ["guanxing", "kongcheng"],
  赵云: ["longdan"],
  马超: ["mashu", "tieji"],
  黄月英: ["jizhi", "qicai"],
  孙权: ["zhiheng", "jiuyuan"],
  甘宁: ["qixi"],
  吕蒙: ["keji"],
  黄盖: ["kurou"],
  周瑜: ["yingzi", "fanjian"],
  大乔: ["guose", "liuli"],
  陆逊: ["qianxun", "lianying"],
  孙尚香: ["jieyin", "xiaoji"],
  华佗: ["jijiu", "qingnang"],
  吕布: ["wushuang"],
  貂蝉: ["lijian", "biyue"],
  夏侯渊: ["shensu"],
  曹仁: ["jushou"],
  黄忠: ["liegong"],
  魏延: ["kuanggu"],
  小乔: ["tianxiang", "hongyan"],
  周泰: ["buqu"],
  张角: ["leiji", "guidao", "huangtian"],
  于吉: ["guhuo"],
  荀彧: ["quhu", "jieming"],
  典韦: ["qiangxi"],
  庞统: ["lianhuan", "niepan"],
  卧龙诸葛亮: ["bazhen", "huoji", "kanpo"],
  太史慈: ["tianyi"],
  庞德: ["mashu", "mengjin"],
  袁绍: ["luanji", "xueyi"],
  颜良文丑: ["shuangxiong"],
  徐晃: ["duanliang"],
  曹丕: ["xingshang", "fangzhu", "songwei"],
  孟获: ["huoshou", "zaiqi"],
  祝融: ["juxiang", "lieren"],
  孙坚: ["yinghun"],
  鲁肃: ["haoshi", "dimeng"],
  董卓: ["jiuchi", "roulin", "benghuai", "baonue"],
  贾诩: ["wansha", "luanwu", "weimu"],
  张郃: ["qiaobian"],
  邓艾: ["tuntian", "jixi"],
  姜维: ["tiaoxin", "zhiji"],
  刘禅: ["xiangle", "fangquan", "ruoyu"],
  孙策: ["jiang", "hunzi", "zhiba"],
  张昭张纮: ["zhijian", "guzheng"],
  蔡文姬: ["beige", "duanchang"],
  左慈: ["huashen", "xinsheng"],
  "界·徐盛": ["pojun"],
  "势·魏延": ["zhuangshi", "yinzhan", "zhongao", "kuangguShi", "none"],
  "势·周瑜": ["chiyun", "yanhui", "fentao", "xiongziShi"],
  "神姜维": ["tianren", "jiufa", "pingxiang"]
};

const officialSkillLabels = {
  jianxiong: "奸雄", hujia: "护驾", fankui: "反馈", guicai: "鬼才", ganglie: "刚烈", tuxi: "突袭",
  luoyi: "裸衣", tiandu: "天妒", yiji: "遗计", qingguo: "倾国", luoshen: "洛神", rende: "仁德",
  jijiang: "激将", wusheng: "武圣", paoxiao: "咆哮", guanxing: "观星", kongcheng: "空城", longdan: "龙胆",
  mashu: "马术", tieji: "铁骑", jizhi: "集智", qicai: "奇才", zhiheng: "制衡", jiuyuan: "救援",
  qixi: "奇袭", keji: "克己", kurou: "苦肉", yingzi: "英姿", fanjian: "反间", guose: "国色",
  liuli: "流离", qianxun: "谦逊", lianying: "连营", jieyin: "结姻", xiaoji: "枭姬", jijiu: "急救",
  qingnang: "青囊", wushuang: "无双", lijian: "离间", biyue: "闭月", shensu: "神速", jushou: "据守",
  liegong: "烈弓", kuanggu: "狂骨", tianxiang: "天香", hongyan: "红颜", buqu: "不屈", leiji: "雷击",
  guidao: "鬼道", huangtian: "黄天", guhuo: "蛊惑", quhu: "驱虎", jieming: "节命", qiangxi: "强袭",
  lianhuan: "连环", niepan: "涅槃", bazhen: "八阵", huoji: "火计", kanpo: "看破", tianyi: "天义",
  mengjin: "猛进", luanji: "乱击", xueyi: "血裔", shuangxiong: "双雄", duanliang: "断粮", xingshang: "行殇",
  fangzhu: "放逐", songwei: "颂威", huoshou: "祸首", zaiqi: "再起", juxiang: "巨象", lieren: "烈刃",
  yinghun: "英魂", haoshi: "好施", dimeng: "缔盟", jiuchi: "酒池", roulin: "肉林", benghuai: "崩坏",
  baonue: "暴虐", wansha: "完杀", luanwu: "乱武", weimu: "帷幕", qiaobian: "巧变", tuntian: "屯田",
  jixi: "急袭", tiaoxin: "挑衅", zhiji: "志继", xiangle: "享乐", fangquan: "放权", ruoyu: "若愚",
  jiang: "激昂", hunzi: "魂姿", zhiba: "制霸", zhijian: "直谏", guzheng: "固政", beige: "悲歌",
  duanchang: "断肠", huashen: "化身", xinsheng: "新生", pojun: "破军", zhuangshi: "壮誓",
  yinzhan: "饮战", zhongao: "忠傲", kuangguShi: "狂骨", kunfenShi: "困奋", chiyun: "炽沄",
  yanhui: "焰洄", fentao: "焚涛", xiongziShi: "雄姿", tianren: "天任", jiufa: "九伐", pingxiang: "平襄"
};

const cardTemplates = [
  { name: "杀", type: "基础", count: 24, needsTarget: true, element: "normal", text: "出牌阶段限一次，对攻击范围内一名角色造成1点伤害；目标可使用【闪】抵消。" },
  { name: "火杀", type: "基础", count: 5, needsTarget: true, element: "fire", text: "属性【杀】。造成火焰伤害，可通过铁索连环传导；目标可使用【闪】抵消。" },
  { name: "雷杀", type: "基础", count: 4, needsTarget: true, element: "thunder", text: "属性【杀】。造成雷电伤害，可通过铁索连环传导；目标可使用【闪】抵消。" },
  { name: "闪", type: "基础", count: 15, needsTarget: false, text: "以你为目标的【杀】生效前使用，抵消此【杀】。" },
  { name: "桃", type: "基础", count: 8, needsTarget: false, text: "出牌阶段对自己使用，回复1点体力；一名角色濒死时，可对该濒死角色使用，令其回复1点体力。" },
  { name: "酒", type: "基础", count: 5, needsTarget: false, text: "出牌阶段每回合限一次，本回合你下一张【杀】伤害基数+1；濒死时可回复1点体力。" },
  { name: "无懈可击", type: "锦囊", count: 4, needsTarget: false, text: "一张锦囊牌对目标生效前使用，抵消此锦囊牌对该目标的效果。" },
  { name: "无中生有", type: "锦囊", count: 4, needsTarget: false, text: "出牌阶段对你使用，你摸两张牌。" },
  { name: "过河拆桥", type: "锦囊", count: 6, needsTarget: true, text: "弃置一名其他角色区域里的一张牌。" },
  { name: "顺手牵羊", type: "锦囊", count: 5, needsTarget: true, text: "获得距离为1的一名其他角色区域里的一张牌。" },
  { name: "火攻", type: "锦囊", count: 3, needsTarget: true, text: "目标展示一张手牌；若你弃置与之同花色的一张手牌，对其造成1点火焰伤害。" },
  { name: "铁索连环", type: "锦囊", count: 6, needsTarget: true, text: "选择至多两名角色，分别横置或重置。属性伤害会在横置角色间传导。" },
  { name: "决斗", type: "锦囊", count: 3, needsTarget: true, text: "与目标轮流出杀，先不出者受1点伤害。" },
  { name: "南蛮入侵", type: "锦囊", count: 3, needsTarget: false, text: "其他角色需出杀，否则受1点伤害。" },
  { name: "万箭齐发", type: "锦囊", count: 1, needsTarget: false, text: "其他角色需出闪，否则受1点伤害。" },
  { name: "桃园结义", type: "锦囊", count: 1, needsTarget: false, text: "所有受伤角色回复1点体力。" },
  { name: "五谷丰登", type: "锦囊", count: 2, needsTarget: false, text: "亮出等同存活角色数的牌，从你开始每名角色依次获得其中一张。" },
  { name: "乐不思蜀", type: "延时锦囊", count: 3, needsTarget: true, text: "置入一名其他角色判定区；其判定阶段判定，若结果不为红桃，跳过出牌阶段。" },
  { name: "兵粮寸断", type: "延时锦囊", count: 2, needsTarget: true, text: "置入距离为1的一名其他角色判定区；其判定阶段判定，若结果不为梅花，跳过摸牌阶段。" },
  { name: "闪电", type: "延时锦囊", count: 2, needsTarget: false, text: "置入你的判定区；判定若为黑桃2-9，受到3点无来源雷电伤害，否则移至下家判定区。" },
  { name: "诸葛连弩", type: "武器", count: 2, needsTarget: false, range: 1, text: "攻击范围1；你使用【杀】无次数限制。" },
  { name: "青釭剑", type: "武器", count: 1, needsTarget: false, range: 2, text: "攻击范围2；锁定技，你使用【杀】指定目标后，无视其防具。" },
  { name: "丈八蛇矛", type: "武器", count: 1, needsTarget: false, range: 3, text: "攻击范围3；你可以将两张手牌当【杀】使用或打出。" },
  { name: "贯石斧", type: "武器", count: 1, needsTarget: false, range: 3, text: "攻击范围3；你的【杀】被【闪】抵消时，可弃两张牌令其依然生效。" },
  { name: "方天画戟", type: "武器", count: 1, needsTarget: false, range: 4, text: "攻击范围4；若你使用的【杀】是最后手牌，额外目标数上限+2。" },
  { name: "麒麟弓", type: "武器", count: 1, needsTarget: false, range: 5, text: "攻击范围5；你使用【杀】造成伤害时，可弃置目标装备区的一张坐骑牌。" },
  { name: "雌雄双股剑", type: "武器", count: 1, needsTarget: false, range: 2, text: "攻击范围2；使用【杀】指定异性目标后，可令其弃一张手牌或令你摸一张牌。" },
  { name: "寒冰剑", type: "武器", count: 1, needsTarget: false, range: 2, text: "攻击范围2；你使用【杀】将造成伤害时，可防止伤害并弃置其两张牌。" },
  { name: "古锭刀", type: "武器", count: 1, needsTarget: false, range: 2, text: "攻击范围2；锁定技，你使用【杀】对没有手牌的目标造成伤害时，伤害+1。" },
  { name: "朱雀羽扇", type: "武器", count: 1, needsTarget: false, range: 4, text: "攻击范围4；你可以将普通【杀】改为火【杀】。" },
  { name: "仁王盾", type: "防具", count: 1, needsTarget: false, text: "装备防具；黑色【杀】对你无效。" },
  { name: "八卦阵", type: "防具", count: 2, needsTarget: false, text: "装备防具；当你需要使用或打出【闪】时，可判定，若为红色视为打出【闪】。" },
  { name: "藤甲", type: "防具", count: 2, needsTarget: false, text: "装备防具；普通【杀】、【南蛮入侵】和【万箭齐发】对你无效；你受到火焰伤害时伤害+1。" },
  { name: "白银狮子", type: "防具", count: 1, needsTarget: false, text: "装备防具；你受到大于1点的伤害时，防止多余伤害；失去装备区里的此牌后回复1点体力。" },
  { name: "的卢", type: "坐骑", count: 1, needsTarget: false, horse: "defense", text: "+1坐骑；其他角色计算与你的距离+1。" },
  { name: "赤兔", type: "坐骑", count: 1, needsTarget: false, horse: "attack", text: "-1坐骑；你计算与其他角色的距离-1。" },
  { name: "绝影", type: "坐骑", count: 1, needsTarget: false, horse: "defense", text: "+1坐骑；其他角色计算与你的距离+1。" },
  { name: "爪黄飞电", type: "坐骑", count: 1, needsTarget: false, horse: "defense", text: "+1坐骑；其他角色计算与你的距离+1。" },
  { name: "骅骝", type: "坐骑", count: 1, needsTarget: false, horse: "defense", text: "+1坐骑；其他角色计算与你的距离+1。" },
  { name: "大宛", type: "坐骑", count: 1, needsTarget: false, horse: "attack", text: "-1坐骑；你计算与其他角色的距离-1。" },
  { name: "紫骍", type: "坐骑", count: 1, needsTarget: false, horse: "attack", text: "-1坐骑；你计算与其他角色的距离-1。" }
];

let state;
let selectedCardId = null;
let pendingSkill = null;
let pendingCardTargets = [];
let inspectedPlayerId = 0;
let inspectedPile = "discard";
let heroPackFilter = "全部";
let cardTypeFilter = "全部";
let cardSearchText = "";
let selectedLibraryCardName = "";
let customHeroes = loadCustomHeroes();
let customCards = loadCustomCards();
let pendingImage = "";
let selectedPlayerHeroId = localStorage.getItem(SELECTED_HERO_KEY) || "random";
let selectedPlayerRole = localStorage.getItem(SELECTED_ROLE_KEY) || "random";
let selectedFengshenHeroId = "random";

const $ = (id) => document.getElementById(id);
let gameSpeedMs = 800;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, Math.max(10, Math.round(ms * gameSpeedMs / 800))));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadCustomHeroes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_HERO_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((hero) => hero?.name && Array.isArray(hero.skills)) : [];
  } catch {
    return [];
  }
}

function saveCustomHeroes() {
  localStorage.setItem(CUSTOM_HERO_KEY, JSON.stringify(customHeroes));
}

function loadCustomCards() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_CARD_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((card) => card?.name && card?.effect) : [];
  } catch {
    return [];
  }
}

function saveCustomCards() {
  localStorage.setItem(CUSTOM_CARD_KEY, JSON.stringify(customCards));
}

function allCardTemplates() {
  return [...cardTemplates, ...customCards];
}

function inferSkillEffect(skillText) {
  if (/开局|游戏开始|起始/.test(skillText)) return "startDrawTwo";
  if (/手牌上限/.test(skillText)) return "handLimitPlusTwo";
  if (/反贼|击杀|杀死/.test(skillText)) return "rebelRewardPlusOne";
  if (/伤害\+1|伤害增加|多造成/.test(skillText)) return "slashDamagePlusOne";
  if (/出杀次数|使用.?杀.?次数|额外.?杀|多使用.?杀/.test(skillText)) return "slashLimitPlusOne";
  if (/回复|恢复|回血/.test(skillText)) return "recoverOnTurn";
  if (/多摸|额外摸|摸牌阶段.*摸/.test(skillText)) return "drawPlusOne";
  return "none";
}

function isCustomRuleEffect(effect) {
  return typeof effect === "string" && effect.startsWith("customRule:");
}

function customRuleIndex(effect) {
  return Number(String(effect).split(":")[1]);
}

function customRuleEffect(index) {
  return `customRule:${index}`;
}

function customRuleForHero(hero, effect) {
  if (!isCustomRuleEffect(effect)) return null;
  return hero?.customRules?.[customRuleIndex(effect)] || null;
}

function customRuleForPlayer(player, effect) {
  return customRuleForHero(player?.hero, effect);
}

function customRuleSkillName(player, effect) {
  const index = customRuleIndex(effect);
  const rule = customRuleForPlayer(player, effect);
  if (rule?.skillName) return rule.skillName;
  if (Number.isInteger(rule?.skillIndex)) {
    const skill = player?.hero?.skills?.[rule.skillIndex] || "";
    return skillName(skill) || `自创技${rule.skillIndex + 1}`;
  }
  const skill = player?.hero?.skills?.[index] || "";
  return skillName(skill) || `自创技${index + 1}`;
}

function customRuleActions(rule) {
  if (Array.isArray(rule?.effects) && rule.effects.length) {
    return rule.effects
      .map((item) => ({
        action: item?.action || item?.type || "draw",
        amount: Number(item?.amount || 1),
        target: item?.target || rule.target || "self"
      }))
      .filter((item) => item.action);
  }
  if (!rule?.action) return [];
  return [{ action: rule.action, amount: Number(rule.amount || 1), target: rule.target || "self" }];
}

function customRuleLabel(rule) {
  if (!rule || rule.timing === "none") return "只显示文字";
  const actions = customRuleActions(rule);
  const text = actions.length
    ? actions.map((item) => `${customSkillRuleOptions.action[item.action] || item.action}${item.amount ? ` ${item.amount}` : ""}`).join("，")
    : "效果";
  return `${customSkillRuleOptions.timing[rule.timing] || "自定义"} · ${text}`;
}

function normalizeHero(hero) {
  const customRuleEffects = Array.isArray(hero.customRules)
    ? hero.customRules.map((rule, index) => rule?.timing && rule.timing !== "none" ? customRuleEffect(index) : "none")
    : [];
  const effects = customRuleEffects.length
    ? customRuleEffects
    : Array.isArray(hero.effects) && hero.effects.length
    ? hero.effects
    : (hero.skills || []).map(inferSkillEffect);
  const id = hero.id || `official-${hero.pack}-${hero.name}`;
  const image = hero.image || officialHeroImages[hero.name] || "";
  return { ...hero, id, image, effects };
}

function allHeroes() {
  return [...heroes.map(normalizeHero), ...customHeroes.map(normalizeHero)];
}

function aiSelectableHeroes() {
  return allHeroes().filter((hero) => !aiExcludedHeroNames.has(hero.name));
}

function heroArtStyle(hero) {
  const base = `--camp-color:${camps[hero.camp] || camps.自}`;
  const image = hero?.image || officialHeroImages[hero?.name] || "";
  if (!image) return base;
  return `${base};--hero-image:url('${String(image).replaceAll("'", "%27")}');background-image:linear-gradient(160deg, rgba(0,0,0,.05), rgba(0,0,0,.58)), var(--hero-image)`;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Real suit/rank distribution matching standard Sanguosha deck */
const REAL_CARD_ASSIGNMENTS = [
  // 杀 (24): ♠7,♠8,♠9,♠10,♠J,♠K,♥10,♥J,♣2,♣3,♣4,♣5,♣6,♣7,♣8,♣9,♣10,♣J,♦6,♦7,♦8,♦9,♦10,♦K
  {s:"♠",r:"7"},{s:"♠",r:"8"},{s:"♠",r:"9"},{s:"♠",r:"10"},{s:"♠",r:"J"},{s:"♠",r:"K"},
  {s:"♥",r:"10"},{s:"♥",r:"J"},
  {s:"♣",r:"2"},{s:"♣",r:"3"},{s:"♣",r:"4"},{s:"♣",r:"5"},{s:"♣",r:"6"},{s:"♣",r:"7"},{s:"♣",r:"8"},{s:"♣",r:"9"},{s:"♣",r:"10"},{s:"♣",r:"J"},
  {s:"♦",r:"6"},{s:"♦",r:"7"},{s:"♦",r:"8"},{s:"♦",r:"9"},{s:"♦",r:"10"},{s:"♦",r:"K"},
  // 火杀 (5): ♥4,♥7,♥Q,♦4,♦5
  {s:"♥",r:"4"},{s:"♥",r:"7"},{s:"♥",r:"Q"},{s:"♦",r:"4"},{s:"♦",r:"5"},
  // 雷杀 (4): ♠4,♠5,♠6,♣8(alt)
  {s:"♠",r:"4"},{s:"♠",r:"5"},{s:"♠",r:"6"},{s:"♣",r:"8"},
  // 闪 (15): ♥2,♥8,♥9,♥J,♥Q,♥K,♥A,♦2,♦3,♦4,♦5,♦6,♦7,♦8,♦9
  {s:"♥",r:"2"},{s:"♥",r:"8"},{s:"♥",r:"9"},{s:"♥",r:"J"},{s:"♥",r:"Q"},{s:"♥",r:"K"},{s:"♥",r:"A"},
  {s:"♦",r:"2"},{s:"♦",r:"3"},{s:"♦",r:"4"},{s:"♦",r:"5"},{s:"♦",r:"6"},{s:"♦",r:"7"},{s:"♦",r:"8"},{s:"♦",r:"9"},
  // 桃 (8): ♥3,♥4,♥6,♥7,♥8,♥9,♥Q,♦2
  {s:"♥",r:"3"},{s:"♥",r:"4"},{s:"♥",r:"6"},{s:"♥",r:"7"},{s:"♥",r:"8"},{s:"♥",r:"9"},{s:"♥",r:"Q"},{s:"♦",r:"2"},
  // 酒 (5): ♠3,♠9,♣3,♣9,♦9
  {s:"♠",r:"3"},{s:"♠",r:"9"},{s:"♣",r:"3"},{s:"♣",r:"9"},{s:"♦",r:"9"},
  // 无懈可击 (4): ♠Q,♣Q,♦Q,♣K
  {s:"♠",r:"Q"},{s:"♣",r:"Q"},{s:"♦",r:"Q"},{s:"♣",r:"K"},
  // 无中生有 (4): ♥7,♥8,♥9,♥J
  {s:"♥",r:"7"},{s:"♥",r:"8"},{s:"♥",r:"9"},{s:"♥",r:"J"},
  // 过河拆桥 (6): ♠Q,♣3,♣4,♣Q,♦3,♦4
  {s:"♠",r:"Q"},{s:"♣",r:"3"},{s:"♣",r:"4"},{s:"♣",r:"Q"},{s:"♦",r:"3"},{s:"♦",r:"4"},
  // 顺手牵羊 (5): ♠3,♠4,♠J,♦3,♦4
  {s:"♠",r:"3"},{s:"♠",r:"4"},{s:"♠",r:"J"},{s:"♦",r:"3"},{s:"♦",r:"4"},
  // 火攻 (3): ♥3,♦3,♣Q
  {s:"♥",r:"3"},{s:"♦",r:"3"},{s:"♣",r:"Q"},
  // 铁索连环 (6): ♣10,♣J,♣Q,♣K,♦10,♦J
  {s:"♣",r:"10"},{s:"♣",r:"J"},{s:"♣",r:"Q"},{s:"♣",r:"K"},{s:"♦",r:"10"},{s:"♦",r:"J"},
  // 决斗 (3): ♠A,♣A,♦A
  {s:"♠",r:"A"},{s:"♣",r:"A"},{s:"♦",r:"A"},
  // 南蛮入侵 (3): ♠7,♠K,♣7
  {s:"♠",r:"7"},{s:"♠",r:"K"},{s:"♣",r:"7"},
  // 万箭齐发 (1): ♥A
  {s:"♥",r:"A"},
  // 桃园结义 (1): ♥A
  {s:"♥",r:"A"},
  // 五谷丰登 (2): ♥3,♥4
  {s:"♥",r:"3"},{s:"♥",r:"4"},
  // 乐不思蜀 (3): ♠6,♥6,♣6
  {s:"♠",r:"6"},{s:"♥",r:"6"},{s:"♣",r:"6"},
  // 兵粮寸断 (2): ♣4,♦4
  {s:"♣",r:"4"},{s:"♦",r:"4"},
  // 闪电 (2): ♠A,♥Q
  {s:"♠",r:"A"},{s:"♥",r:"Q"},
  // 诸葛连弩 (2): ♣A,♦A
  {s:"♣",r:"A"},{s:"♦",r:"A"},
  // 青釭剑 (1): ♠6
  {s:"♠",r:"6"},
  // 丈八蛇矛 (1): ♠Q
  {s:"♠",r:"Q"},
  // 贯石斧 (1): ♦5
  {s:"♦",r:"5"},
  // 方天画戟 (1): ♦Q
  {s:"♦",r:"Q"},
  // 麒麟弓 (1): ♥5
  {s:"♥",r:"5"},
  // 雌雄双股剑 (1): ♠2
  {s:"♠",r:"2"},
  // 寒冰剑 (1): ♠2
  {s:"♠",r:"2"},
  // 古锭刀 (1): ♠A
  {s:"♠",r:"A"},
  // 朱雀羽扇 (1): ♦A
  {s:"♦",r:"A"},
  // 仁王盾 (1): ♣2
  {s:"♣",r:"2"},
  // 八卦阵 (2): ♠2,♣2
  {s:"♠",r:"2"},{s:"♣",r:"2"},
  // 藤甲 (2): ♠2,♣2
  {s:"♠",r:"2"},{s:"♣",r:"2"},
  // 白银狮子 (1): ♣A
  {s:"♣",r:"A"},
  // 的卢 (1): ♣5
  {s:"♣",r:"5"},
  // 赤兔 (1): ♥5
  {s:"♥",r:"5"},
  // 绝影 (1): ♠5
  {s:"♠",r:"5"},
  // 爪黄飞电 (1): ♦K
  {s:"♦",r:"K"},
  // 骅骝 (1): ♦5
  {s:"♦",r:"5"},
  // 大宛 (1): ♠5
  {s:"♠",r:"5"},
  // 紫骍 (1): ♦5
  {s:"♦",r:"5"},
];

function buildDeck() {
  let id = 1;
  const deck = [];
  let assignIdx = 0;
  allCardTemplates().forEach((tpl) => {
    for (let i = 0; i < tpl.count; i++) {
      const assignment = REAL_CARD_ASSIGNMENTS[assignIdx] || { s: ["♠","♥","♣","♦"][i % 4], r: String(i + 1) };
      assignIdx++;
      deck.push({ ...tpl, id: id++, suit: assignment.s, rank: assignment.r });
    }
  });
  return shuffle(deck);
}

function draw(player, amount = 1) {
  for (let i = 0; i < amount; i++) {
    if (!state.deck.length) state.deck = shuffle(state.discard.splice(0));
    const card = state.deck.pop();
    if (card) player.hand.push(card);
  }
}

function log(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 80);
}

function toast(text) {
  const layer = $("toastLayer");
  if (!layer) return;
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = text;
  layer.prepend(item);
  setTimeout(() => item.remove(), 2400);
}

function feedback(text) {
  log(text);
  toast(text);
  if (state) state.lastAction = text;
}

function displayName(player) {
  if (!player) return "天命";
  if (player.id === 0) return `你（${player.hero.name}）`;
  return player.hero?.name || player.name;
}

/* ===== Async Modal System (replaces window.prompt/confirm) ===== */
function showModal({ title, desc, type, options, multiSelect, minSelect, maxSelect, allowCancel }) {
  return new Promise((resolve) => {
    const modal = document.getElementById("gameModal");
    const titleEl = document.getElementById("modalTitle");
    const descEl = document.getElementById("modalDesc");
    const bodyEl = document.getElementById("modalBody");
    const actionsEl = document.getElementById("modalActions");
    titleEl.textContent = title || "";
    descEl.textContent = desc || "";
    descEl.style.display = desc ? "" : "none";
    bodyEl.innerHTML = "";
    actionsEl.innerHTML = "";
    modal.classList.remove("hidden");

    if (type === "confirm") {
      const yesBtn = document.createElement("button");
      yesBtn.className = "modal-btn primary";
      yesBtn.textContent = "确认";
      yesBtn.onclick = () => { modal.classList.add("hidden"); resolve(true); };
      const noBtn = document.createElement("button");
      noBtn.className = "modal-btn";
      noBtn.textContent = "取消";
      noBtn.onclick = () => { modal.classList.add("hidden"); resolve(false); };
      actionsEl.appendChild(yesBtn);
      actionsEl.appendChild(noBtn);
    } else if (type === "select") {
      const list = document.createElement("div");
      list.className = "modal-option-list";
      const selected = new Set();
      options.forEach((opt, i) => {
        const item = document.createElement("div");
        item.className = "modal-option";
        item.textContent = opt.label;
        item.onclick = () => {
          if (multiSelect) {
            if (selected.has(i)) selected.delete(i);
            else if (!maxSelect || selected.size < maxSelect) selected.add(i);
            item.classList.toggle("selected", selected.has(i));
          } else {
            modal.classList.add("hidden");
            resolve(opt.value !== undefined && opt.value !== null ? opt.value : i);
          }
        };
        list.appendChild(item);
      });
      bodyEl.appendChild(list);
      if (multiSelect) {
        const confirmBtn = document.createElement("button");
        confirmBtn.className = "modal-btn primary";
        confirmBtn.textContent = "确认选择";
        confirmBtn.onclick = () => {
          if (minSelect && selected.size < minSelect) { toast(`至少选择${minSelect}项`); return; }
          modal.classList.add("hidden");
          resolve([...selected].sort((a, b) => a - b));
        };
        actionsEl.appendChild(confirmBtn);
      }
      if (allowCancel !== false) {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "modal-btn";
        cancelBtn.textContent = "取消";
        cancelBtn.onclick = () => { modal.classList.add("hidden"); resolve(null); };
        actionsEl.appendChild(cancelBtn);
      }
    } else if (type === "cardSelect") {
      const grid = document.createElement("div");
      grid.className = "modal-card-grid";
      const selected = new Set();
      options.forEach((opt, i) => {
        const item = document.createElement("div");
        item.className = "modal-card-item";
        const nameSpan = document.createElement("span");
        nameSpan.className = "modal-card-name";
        nameSpan.textContent = opt.name || opt.label;
        const typeSpan = document.createElement("span");
        typeSpan.className = "modal-card-type";
        typeSpan.textContent = opt.type || opt.sub || "";
        item.appendChild(nameSpan);
        item.appendChild(typeSpan);
        item.onclick = () => {
          if (multiSelect) {
            if (selected.has(i)) selected.delete(i);
            else if (!maxSelect || selected.size < maxSelect) selected.add(i);
            item.classList.toggle("selected", selected.has(i));
          } else {
            modal.classList.add("hidden");
            resolve(opt.value !== undefined && opt.value !== null ? opt.value : i);
          }
        };
        grid.appendChild(item);
      });
      bodyEl.appendChild(grid);
      if (multiSelect) {
        const confirmBtn = document.createElement("button");
        confirmBtn.className = "modal-btn primary";
        confirmBtn.textContent = "确认选择";
        confirmBtn.onclick = () => {
          if (minSelect && selected.size < minSelect) { toast(`至少选择${minSelect}项`); return; }
          modal.classList.add("hidden");
          resolve([...selected].sort((a, b) => a - b));
        };
        actionsEl.appendChild(confirmBtn);
      }
      if (allowCancel !== false) {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "modal-btn";
        cancelBtn.textContent = "取消";
        cancelBtn.onclick = () => { modal.classList.add("hidden"); resolve(null); };
        actionsEl.appendChild(cancelBtn);
      }
    } else if (type === "orderSelect") {
      const list = document.createElement("div");
      list.className = "modal-option-list";
      const order = [];
      const remaining = new Set(options.map((_, i) => i));
      function renderRemaining() {
        list.innerHTML = "";
        if (!remaining.size) {
          modal.classList.add("hidden");
          resolve(order);
          return;
        }
        remaining.forEach((i) => {
          const item = document.createElement("div");
          item.className = "modal-option";
          item.textContent = `${order.length + 1}. ${options[i].label}`;
          item.onclick = () => { order.push(i); remaining.delete(i); renderRemaining(); };
          list.appendChild(item);
        });
      }
      renderRemaining();
      bodyEl.appendChild(list);
      const doneBtn = document.createElement("button");
      doneBtn.className = "modal-btn primary";
      doneBtn.textContent = "剩余放入牌堆底";
      doneBtn.onclick = () => { modal.classList.add("hidden"); resolve(order); };
      actionsEl.appendChild(doneBtn);
      if (allowCancel !== false) {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "modal-btn";
        cancelBtn.textContent = "取消";
        cancelBtn.onclick = () => { modal.classList.add("hidden"); resolve(null); };
        actionsEl.appendChild(cancelBtn);
      }
    } else if (type === "guanxing") {
      // options: array of card objects { suit, rank, name, type, id }
      const cards = options || [];
      let topZone = cards.map((_, i) => i); // indices in top zone
      let bottomZone = [];                  // indices in bottom zone
      let selectedIdx = null;               // currently selected card index (from either zone)
      let selectedFromZone = null;          // 'top' or 'bottom'

      const panel = document.createElement("div");
      panel.className = "guanxing-panel";

      // --- Top zone ---
      const topSection = document.createElement("div");
      topSection.className = "guanxing-zone top";
      const topLabel = document.createElement("div");
      topLabel.className = "guanxing-zone-label";
      topLabel.innerHTML = `<span class="zone-icon">顶</span> 置于牌堆顶 <span class="guanxing-zone-count" id="gxTopCount"></span>`;
      const topCards = document.createElement("div");
      topCards.className = "guanxing-cards";
      topSection.appendChild(topLabel);
      topSection.appendChild(topCards);

      // --- Arrow buttons ---
      const arrowDiv = document.createElement("div");
      arrowDiv.className = "guanxing-arrow";
      const moveDownBtn = document.createElement("button");
      moveDownBtn.className = "guanxing-arrow-btn";
      moveDownBtn.textContent = "▼ 移至牌堆底";
      const moveUpBtn = document.createElement("button");
      moveUpBtn.className = "guanxing-arrow-btn";
      moveUpBtn.textContent = "▲ 移至牌堆顶";
      arrowDiv.appendChild(moveDownBtn);
      arrowDiv.appendChild(moveUpBtn);

      // --- Bottom zone ---
      const botSection = document.createElement("div");
      botSection.className = "guanxing-zone bottom";
      const botLabel = document.createElement("div");
      botLabel.className = "guanxing-zone-label";
      botLabel.innerHTML = `<span class="zone-icon">底</span> 置于牌堆底 <span class="guanxing-zone-count" id="gxBotCount"></span>`;
      const botCards = document.createElement("div");
      botCards.className = "guanxing-cards";
      botSection.appendChild(botLabel);
      botSection.appendChild(botCards);

      // --- Hint ---
      const hint = document.createElement("div");
      hint.className = "guanxing-hint";
      hint.textContent = "点击卡牌选中，再点箭头移动；或直接点击另一区域移动。上方=先摸到。";

      panel.appendChild(topSection);
      panel.appendChild(arrowDiv);
      panel.appendChild(botSection);
      panel.appendChild(hint);
      bodyEl.appendChild(panel);

      function isRed(suit) { return suit === "♥" || suit === "♦"; }

      function makeCardEl(card, idx) {
        const el = document.createElement("div");
        const red = isRed(card.suit);
        el.className = `guanxing-card ${red ? "red" : "black"}`;
        if (selectedIdx === idx) el.classList.add("selected");
        el.innerHTML = `<span class="guanxing-card-suit">${card.suit}</span><span class="guanxing-card-name">${card.name}</span><span class="guanxing-card-rank">${card.rank || ""}</span>`;
        el.onclick = () => {
          if (selectedIdx === idx) {
            // Deselect
            selectedIdx = null;
            selectedFromZone = null;
          } else if (selectedIdx !== null && selectedFromZone === "top" && bottomZone.includes(idx)) {
            // Move selected from top to bottom at position of clicked card
            const insertPos = bottomZone.indexOf(idx);
            topZone = topZone.filter((x) => x !== selectedIdx);
            bottomZone.splice(insertPos, 0, selectedIdx);
            selectedIdx = null;
            selectedFromZone = null;
          } else if (selectedIdx !== null && selectedFromZone === "bottom" && topZone.includes(idx)) {
            const insertPos = topZone.indexOf(idx);
            bottomZone = bottomZone.filter((x) => x !== selectedIdx);
            topZone.splice(insertPos, 0, selectedIdx);
            selectedIdx = null;
            selectedFromZone = null;
          } else {
            // Select this card
            selectedIdx = idx;
            selectedFromZone = topZone.includes(idx) ? "top" : "bottom";
          }
          render();
        };
        return el;
      }

      function render() {
        topCards.innerHTML = "";
        botCards.innerHTML = "";
        topZone.forEach((idx) => topCards.appendChild(makeCardEl(cards[idx], idx)));
        bottomZone.forEach((idx) => botCards.appendChild(makeCardEl(cards[idx], idx)));
        document.getElementById("gxTopCount").textContent = `${topZone.length}张`;
        document.getElementById("gxBotCount").textContent = `${bottomZone.length}张`;
        moveDownBtn.disabled = selectedIdx === null || selectedFromZone !== "top";
        moveUpBtn.disabled = selectedIdx === null || selectedFromZone !== "bottom";
        topSection.classList.toggle("active-target", selectedFromZone === "bottom");
        botSection.classList.toggle("active-target", selectedFromZone === "top");
      }

      moveDownBtn.onclick = () => {
        if (selectedIdx === null || selectedFromZone !== "top") return;
        topZone = topZone.filter((x) => x !== selectedIdx);
        bottomZone.unshift(selectedIdx);
        selectedIdx = null;
        selectedFromZone = null;
        render();
      };
      moveUpBtn.onclick = () => {
        if (selectedIdx === null || selectedFromZone !== "bottom") return;
        bottomZone = bottomZone.filter((x) => x !== selectedIdx);
        topZone.push(selectedIdx);
        selectedIdx = null;
        selectedFromZone = null;
        render();
      };

      render();

      const confirmBtn = document.createElement("button");
      confirmBtn.className = "modal-btn primary";
      confirmBtn.textContent = "确认观星";
      confirmBtn.onclick = () => {
        modal.classList.add("hidden");
        resolve({ topOrder: topZone, bottomOrder: bottomZone });
      };
      actionsEl.appendChild(confirmBtn);
      if (allowCancel !== false) {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "modal-btn";
        cancelBtn.textContent = "取消";
        cancelBtn.onclick = () => { modal.classList.add("hidden"); resolve(null); };
        actionsEl.appendChild(cancelBtn);
      }
    }
  });
}

async function shouldUseSkill(player, skillName, detail = "") {
  if (player.id !== 0) return true;
  return showModal({ title: `发动【${skillName}】`, desc: detail, type: "confirm" });
}

/* Synchronous wrapper for non-async contexts — auto-confirms for human too.
   Callers in async context should use await shouldUseSkill() directly. */
function shouldUseSkillSync(player, skillName, detail = "") {
  if (player.id !== 0) return true;
  // In sync context we cannot show modal; default to true (auto-confirm)
  // Async callers should migrate to await shouldUseSkill()
  return true;
}

function heroEffects(hero) {
  if (officialSkillEffects[hero.name]) return officialSkillEffects[hero.name];
  if (Array.isArray(hero.customRules) && hero.customRules.length) {
    return hero.customRules
      .map((rule, index) => rule?.timing && rule.timing !== "none" ? customRuleEffect(index) : "none")
      .filter((effect) => effect && effect !== "none");
  }
  const effects = Array.isArray(hero.effects) && hero.effects.length
    ? hero.effects
    : (hero.skills || []).map(inferSkillEffect);
  return effects.filter((effect) => effect && effect !== "none");
}

function isLordSkillEffect(effect) {
  if (isCustomRuleEffect(effect)) return false;
  return lordSkillEffects.has(effect);
}

function playerEffects(player) {
  if (!player) return [];
  const disabled = new Set(player.disabledEffects || []);
  const base = heroEffects(player.hero).filter((effect) => !disabled.has(effect) && (!isLordSkillEffect(effect) || player.role === "主公"));
  const extra = (player.extraEffects || []).filter((effect) => effect && !disabled.has(effect) && (!isLordSkillEffect(effect) || player.role === "主公"));
  const huashen = player.marks?.huashenSkill?.effect;
  const huashenEffects = huashen && (!isLordSkillEffect(huashen) || player.role === "主公") ? [huashen] : [];
  return [...base, ...extra, ...huashenEffects];
}

function playerSkillEntries(player) {
  const disabled = new Set(player.disabledEffects || []);
  const effects = Array.isArray(player.hero.customRules) && player.hero.customRules.length
    ? player.hero.customRules.map((rule, index) => rule?.timing && rule.timing !== "none" ? customRuleEffect(index) : "none")
    : heroEffects(player.hero);
  const entries = (player.hero.skills || []).map((skill, index) => ({ skill, effect: effects[index] || "none" }))
    .filter((entry) => !disabled.has(entry.effect) && (entry.effect === "none" || !isLordSkillEffect(entry.effect) || player.role === "主公"));
  (player.extraEffects || [])
    .filter((effect) => effect && (!isLordSkillEffect(effect) || player.role === "主公"))
    .forEach((effect) => entries.push({
      skill: `${officialSkillLabels[effect] || effect}：额外获得的技能。`,
      effect
    }));
  if (player.marks?.huashenSkill?.effect) {
    const item = player.marks.huashenSkill;
    entries.push({
      skill: `化身·${item.heroName}【${item.skillName}】：${item.text}`,
      effect: item.effect
    });
  }
  return entries;
}

function huashenSkillPool() {
  return heroes.flatMap((hero) => {
    const effects = officialSkillEffects[hero.name] || [];
    return effects
      .map((effect, index) => ({
        heroName: hero.name,
        camp: hero.camp,
        skillName: officialSkillLabels[effect] || skillName(hero.skills[index] || effect),
        text: (hero.skills[index] || "").replace(/^.*?：/, ""),
        effect
      }))
      .filter((item) => item.effect && !["huashen", "xinsheng"].includes(item.effect) && !isLordSkillEffect(item.effect));
  });
}

function ensureHuashenCards(player) {
  player.marks.huashenCards = player.marks.huashenCards || [];
  return player.marks.huashenCards;
}

async function gainHuashenCards(player, count = 1, reason = "化身") {
  if (!hasSkill(player, "huashen") && !hasSkill(player, "xinsheng")) return false;
  const pool = huashenSkillPool();
  const cards = ensureHuashenCards(player);
  const picks = shuffle(pool).slice(0, count);
  if (!picks.length) return false;
  cards.push(...picks);
  feedback(`${player.name} 因【${reason}】获得${picks.length}张化身牌：${picks.map((item) => item.heroName).join("、")}。`);
  await chooseHuashenSkill(player, reason);
  return true;
}

async function chooseHuashenSkill(player, reason = "化身") {
  const cards = ensureHuashenCards(player);
  if (!cards.length) return false;
  let picked;
  if (player.id === 0) {
    const options = cards.map((item, index) => ({
      label: `${item.heroName} · ${item.skillName}：${item.text || "获得此技能"}`,
      value: index
    }));
    const choice = await showModal({
      title: `【${reason}】：选择化身技能`,
      desc: "从你已获得的所有化身牌技能中选择一个，作为当前获得的技能。",
      type: "select",
      options,
      allowCancel: Boolean(player.marks.huashenSkill)
    });
    if (choice == null) return false;
    picked = cards[choice];
  } else {
    picked = cards
      .filter((item) => skillCanResolveNow({ ...player, marks: { ...player.marks, huashenSkill: item } }, item.effect) || true)
      .sort((a, b) => (["zhiheng", "qingnang", "qixi", "huoji", "paoxiao"].includes(b.effect) ? 1 : 0) - (["zhiheng", "qingnang", "qixi", "huoji", "paoxiao"].includes(a.effect) ? 1 : 0))[0] || cards[0];
  }
  player.marks.huashenSkill = { ...picked };
  feedback(`${player.name} 选择化身为 ${picked.heroName} 的【${picked.skillName}】，当前获得该技能。`);
  return true;
}

async function initializeHuashenForAll() {
  for (const player of state.players) {
    if (hasSkill(player, "huashen")) {
      await gainHuashenCards(player, 2, "化身");
      await sleep(player.id === 0 ? 120 : 220);
    }
  }
}

function initializeMissionSkillsForAll() {
  for (const player of state.players || []) {
    if (hasSkill(player, "zhongao")) {
      ensureMission(player, "zhongao", {
        name: "忠傲",
        text: "游戏开始时获得狂骨；杀死角色后使命成功并升级狂骨；进入濒死或不执行壮誓则使命失败。",
        successText: "升级狂骨",
        failText: "失去壮誓并获得困奋"
      });
      player.marks.kuangguShiLevel = Math.max(1, player.marks.kuangguShiLevel || 1);
      feedback(`${player.name} 的使命技【忠傲】开始，获得【狂骨※】。`);
    }
  }
}

function effectCount(player, effectId) {
  return playerEffects(player).filter((effect) => effect === effectId).length;
}

function customRulePassiveAmount(player, timing, action) {
  return playerEffects(player).reduce((sum, effect) => {
    const rule = customRuleForPlayer(player, effect);
    if (!rule || rule.timing !== timing) return sum;
    return sum + customRuleActions(rule)
      .filter((item) => item.action === action)
      .reduce((inner, item) => inner + Number(item.amount || 1), 0);
  }, 0);
}

function hasSkill(player, skillId) {
  return player?.alive && !player.skillsLost && playerEffects(player).includes(skillId);
}

function effectLabels(hero) {
  return heroEffects(hero).map((effect) => isCustomRuleEffect(effect)
    ? customRuleLabel(customRuleForHero(hero, effect))
    : officialSkillLabels[effect] || skillEffectOptions.find((option) => option.id === effect)?.label || effect);
}

function effectLabelsForPlayer(player) {
  return playerEffects(player).map((effect) => isCustomRuleEffect(effect)
    ? customRuleLabel(customRuleForPlayer(player, effect))
    : officialSkillLabels[effect] || skillEffectOptions.find((option) => option.id === effect)?.label || effect);
}

function roleGoal(role) {
  if (state?.mode === "fengshen") return "目标：击败当前守关武将，连续通过五关。";
  if (role === "主公") return "目标：击败所有反贼和内奸。";
  if (role === "忠臣") return "目标：保护主公，击败反贼和内奸。";
  if (role === "反贼") return "目标：击败主公。";
  return "目标：先清场，最后击败主公。";
}

function buildRolesForNewGame() {
  const baseRoles = ["主公", "忠臣", "忠臣", "反贼", "反贼", "反贼", "反贼", "内奸"];
  if (selectedPlayerRole === "random") return shuffle(baseRoles);
  if (!baseRoles.includes(selectedPlayerRole)) selectedPlayerRole = "random";
  if (selectedPlayerRole === "random") return shuffle(baseRoles);
  const remaining = [...baseRoles];
  remaining.splice(remaining.indexOf(selectedPlayerRole), 1);
  return [selectedPlayerRole, ...shuffle(remaining)];
}

async function newGame() {
  const roles = buildRolesForNewGame();
  const playerPool = allHeroes();
  const aiPool = aiSelectableHeroes();
  let pickedHeroes = shuffle(aiPool).slice(0, 8);
  const selectedHero = playerPool.find((hero) => hero.id === selectedPlayerHeroId);
  if (selectedHero) {
    pickedHeroes = [selectedHero, ...shuffle(aiPool.filter((hero) => hero.id !== selectedHero.id)).slice(0, 7)];
  }
  state = {
    deck: buildDeck(),
    discard: [],
    players: pickedHeroes.map((hero, index) => {
      const role = roles[index];
      const maxHp = hero.hp + (role === "主公" ? 1 : 0);
      return {
        id: index,
        name: index === 0 ? "你" : hero.name,
        role,
        hero,
        hp: maxHp,
        maxHp,
        hand: [],
        alive: true,
        skippedDraw: false,
        skipDrawPhase: false,
        skipPlayPhase: false,
        slashUsed: 0,
        hasCrossbow: false,
        equipment: { weapon: null, armor: null, attackHorse: null, defenseHorse: null },
        judgeArea: [],
        usedSkills: {},
        marks: {},
        sealedCards: [],
        missions: {},
        temp: {},
        extraEffects: [],
        skillsLost: false,
        dying: false,
        chained: false
      };
    }),
    turn: 0,
    phase: "start",
    selected: null,
    log: [],
    winner: null,
    humanDrew: false,
    pendingReaction: null,
    pendingDying: null,
    discarding: null,
    suspicions: {},
    extraTurnStack: [],
    lastAction: "牌局开始"
  };
  state.players.forEach((p) => draw(p, 4));
  pendingSkill = null;
  pendingCardTargets = [];
  inspectedPlayerId = 0;
  inspectedPile = "discard";
  state.players.forEach((p) => {
    const bonus = effectCount(p, "startDrawTwo") * 2;
    if (bonus) {
      draw(p, bonus);
      log(`${p.hero.name} 的自创技能发动，开局多摸${bonus}张牌。`);
    }
  });
  feedback(`新局开始。你选择到 ${state.players[0].hero.name}，身份是${state.players[0].role}。`);
  const surrenderBtn = $("surrenderBtn");
  if (surrenderBtn) {
    surrenderBtn.hidden = false;
    surrenderBtn.onclick = async () => {
      if (!state || state.winner) return;
      const confirm = await showModal({ title: "投降", desc: "确定要投降吗？这将结束本局游戏。", type: "confirm" });
      if (confirm) {
        state.players[0].alive = false;
        state.players[0].hp = 0;
        feedback("你选择了投降。");
        state.winner = "你已投降，游戏结束。";
        render();
      }
    };
  }
  await initializeHuashenForAll();
  initializeMissionSkillsForAll();
  beginTurn(0);
  render();
}

function makePlayerForGame(hero, index, role, name) {
  const maxHp = hero.hp + (role === "主公" && index !== 0 ? 1 : 0);
  return {
    id: index,
    name,
    role,
    hero,
    hp: maxHp,
    maxHp,
    hand: [],
    alive: true,
    skippedDraw: false,
    skipDrawPhase: false,
    skipPlayPhase: false,
    slashUsed: 0,
    hasCrossbow: false,
    equipment: { weapon: null, armor: null, attackHorse: null, defenseHorse: null },
    judgeArea: [],
    usedSkills: {},
    marks: {},
    sealedCards: [],
    missions: {},
    temp: {},
    extraEffects: [],
    skillsLost: false,
    dying: false,
    chained: false
  };
}

function startFengshenRun() {
  const playerPool = allHeroes();
  const aiPool = aiSelectableHeroes();
  const chosenHero = playerPool.find((hero) => hero.id === selectedFengshenHeroId) || shuffle(aiPool)[0];
  if (!chosenHero) {
    toast("暂无可用武将。");
    return;
  }
  const opponents = shuffle(aiPool.filter((hero) => hero.id !== chosenHero.id)).slice(0, 5);
  if (opponents.length < 5) {
    toast("武将池不足，无法生成五关挑战。");
    return;
  }
  showPanel("game");
  startFengshenStage({
    playerHero: chosenHero,
    opponents,
    stageIndex: 0,
    wins: 0,
    advancing: false
  });
}

async function startFengshenStage(campaign) {
  campaign.advancing = false;
  const opponentHero = campaign.opponents[campaign.stageIndex];
  state = {
    mode: "fengshen",
    campaign,
    deck: buildDeck(),
    discard: [],
    players: [
      makePlayerForGame(campaign.playerHero, 0, "挑战者", "你"),
      makePlayerForGame(opponentHero, 1, "守关者", opponentHero.name)
    ],
    turn: 0,
    phase: "start",
    selected: null,
    log: [],
    winner: null,
    humanDrew: false,
    pendingReaction: null,
    pendingDying: null,
    discarding: null,
    suspicions: {},
    extraTurnStack: [],
    lastAction: `封神之路 第${campaign.stageIndex + 1}/5关`
  };
  state.players.forEach((p) => draw(p, 4));
  pendingSkill = null;
  pendingCardTargets = [];
  inspectedPlayerId = 0;
  inspectedPile = "discard";
  await initializeHuashenForAll();
  initializeMissionSkillsForAll();
  feedback(`封神之路第${campaign.stageIndex + 1}关开始：${campaign.playerHero.name} 对战 ${opponentHero.name}。`);
  beginTurn(0);
  render();
}

function advanceFengshenStage() {
  if (!state?.campaign || state.mode !== "fengshen") return;
  const campaign = state.campaign;
  const nextIndex = campaign.stageIndex + 1;
  if (nextIndex >= 5) {
    state.winner = "封神之路通关";
    state.phase = "游戏结束";
    feedback(`你完成五关试炼，【${campaign.playerHero.name}】封神成功！`);
    render();
    return;
  }
  startFengshenStage({
    ...campaign,
    stageIndex: nextIndex,
    wins: nextIndex,
    advancing: false
  });
}

async function beginTurn(index) {
  if (state.winner) return;
  const player = state.players[index];
  state.turn = index;
  if (!player.alive) {
    log(`${player.name} 已阵亡，跳过回合。`);
    return nextTurn();
  }
  // Flip (翻面) check: if flipped, skip entire turn and flip back
  if (player.flipped) {
    player.flipped = false;
    feedback(`${player.name} 武将牌翻回正面，跳过本回合。`);
    render();
    return nextTurn();
  }
  state.turn = index;
  state.humanDrew = false;
  player.slashUsed = 0;
  player.usedSkills = {};
  player.temp = {};
  setPhase(player, "回合开始");
  log(`${player.name}（${visibleRole(player)}）的回合开始。`);
  await runPreparePhase(player);
  if (!player.alive || state.winner) {
    render();
    return;
  }
  setPhase(player, "判定阶段");
  await processJudgeArea(player);
  if (!player.alive || state.winner) {
    render();
    return;
  }
  setPhase(player, "摸牌阶段");
  if (index === 0) {
    if (player.skipDrawPhase) {
      player.skipDrawPhase = false;
      feedback(`${player.name} 跳过摸牌阶段。`);
    } else {
      await drawForTurn(player);
    }
    state.humanDrew = true;
    if (player.skipPlayPhase) {
      player.skipPlayPhase = false;
      feedback(`${player.name} 跳过出牌阶段，直接进入弃牌阶段。`);
      setPhase(player, "出牌阶段");
      await endHumanTurn();
      return;
    }
    setPhase(player, "出牌阶段");
    await maybeStartZhuangshi(player);
    if (state.pendingDying || state.winner) {
      render();
      return;
    }
    if (await maybeStartFangquan(player)) {
      endHumanTurn();
      return;
    }
  } else {
    if (player.skipDrawPhase) {
      player.skipDrawPhase = false;
      feedback(`${player.name} 跳过摸牌阶段。`);
    } else {
      await drawForTurn(player);
    }
    setTimeout(() => aiTurn(player), 450);
  }
  render();
}

function setPhase(player, phase) {
  state.phase = `${displayName(player)} · ${phase}`;
  state.currentPhase = phase;
  state.lastAction = phase;
  if (player?.temp) player.temp.chiyunUsedPhase = false;
  render();
}

function nextTurn() {
  selectedCardId = null;
  pendingSkill = null;
  pendingCardTargets = [];
  if (state.pendingReaction || state.pendingDying) return;
  if (state.winner) {
    render();
    return;
  }
  if (state.extraTurnStack?.length) {
    const returnTo = state.extraTurnStack.pop();
    const next = nextAliveFrom(returnTo);
    if (next != null) {
      beginTurn(next);
      render();
      return;
    }
  }
  let next = (state.turn + 1) % state.players.length;
  for (let checked = 0; checked < state.players.length && !state.players[next].alive; checked++) {
    next = (next + 1) % state.players.length;
  }
  beginTurn(next);
  render();
}

function nextAliveFrom(startIndex) {
  if (!state?.players?.length) return null;
  let next = ((startIndex % state.players.length) + state.players.length) % state.players.length;
  for (let checked = 0; checked < state.players.length; checked++) {
    if (state.players[next]?.alive) return next;
    next = (next + 1) % state.players.length;
  }
  return null;
}

async function maybeStartFangquan(player) {
  if (!hasSkill(player, "fangquan") || skillUsed(player, "fangquan") || state.currentPhase !== "出牌阶段") return false;
  const targets = state.players.filter((p) => p.alive && p.id !== player.id);
  if (!targets.length) return false;
  const useIt = player.id === 0
    ? await showModal({
      title: "发动【放权】",
      desc: "是否跳过出牌阶段？若如此做，弃牌阶段结束时你可以弃置一张手牌，令一名其他角色进行一个额外回合。",
      type: "confirm"
    })
    : Boolean(chooseSupportTarget(player)) && player.hand.length >= Math.max(2, player.hp);
  if (!useIt) return false;
  player.temp.fangquanPending = true;
  markSkillUsed(player, "fangquan");
  feedback(`${player.name} 发动【放权】，跳过出牌阶段。`);
  return true;
}

async function resolveFangquanAfterTurn(player) {
  if (!player.temp?.fangquanPending || !player.alive || state.winner) return null;
  player.temp.fangquanPending = false;
  if (!player.hand.length) {
    feedback(`${player.name} 没有手牌，无法完成【放权】后续效果。`);
    return null;
  }
  const targets = state.players.filter((p) => p.alive && p.id !== player.id);
  if (!targets.length) return null;
  let target;
  let cost;
  if (player.id === 0) {
    const targetId = await showModal({
      title: "【放权】：选择额外回合目标",
      desc: "选择一名其他角色，然后弃置一张手牌令其进行一个额外回合。",
      type: "select",
      options: targets.map((p) => ({ label: `${displayName(p)}（手牌${p.hand.length}张，体力${p.hp}/${p.maxHp}）`, value: p.id })),
      allowCancel: true
    });
    if (targetId == null) {
      feedback("你取消了【放权】后续效果。");
      return null;
    }
    target = targets.find((p) => p.id === targetId);
    cost = await chooseHandCard(player, () => true, "【放权】：请选择一张手牌弃置。", true);
  } else {
    target = chooseSupportTarget(player) || targets[0];
    cost = randomHandCard(player);
  }
  if (!target || !cost) return null;
  state.discard.push(cost);
  await maybeTriggerTuntian(player);
  const normalReturn = nextAliveFrom(player.id + 1);
  if (normalReturn != null) state.extraTurnStack.push(normalReturn);
  feedback(`${player.name} 弃置【${cost.name}】完成【放权】，令 ${target.name} 获得一个额外回合。`);
  return target.id;
}

function visibleRole(player) {
  return player.role === "主公" || player.id === 0 || !player.alive ? player.role : "身份未明";
}

function relation(a, b) {
  if (state?.mode === "fengshen") return a.id === b.id ? "ally" : "enemy";
  if (a.role === "反贼") return b.role === "主公" || b.role === "忠臣" ? "enemy" : "neutral";
  if (a.role === "内奸") return b.role === "主公" && livingByRole("反贼").length + livingByRole("忠臣").length === 0 ? "enemy" : "neutral";
  return b.role === "反贼" || b.role === "内奸" ? "enemy" : "ally";
}

function livingByRole(role) {
  return state.players.filter((p) => p.alive && p.role === role);
}

function damageNatureText(element) {
  if (element === "fire") return "火焰";
  if (element === "thunder") return "雷电";
  return "";
}

function hasVineArmor(player) {
  return !player.temp?.armorIgnored && player.equipment?.armor?.name === "藤甲";
}

function shouldVinePrevent(cardName, element) {
  if (cardName === "杀") return element === "normal";
  return cardName === "南蛮入侵" || cardName === "万箭齐发";
}

function areaCardCount(player) {
  return player.hand.length + equipmentEntries(player).length + (player.judgeArea?.length || 0);
}

function ensureTurnTemp(player) {
  if (!player.temp) player.temp = {};
  return player.temp;
}

function sealedCardGroups(player) {
  if (!player.sealedCards) player.sealedCards = [];
  return player.sealedCards;
}

function sealCardsOnHero(holder, cards, data = {}) {
  const realCards = cards.filter(Boolean);
  if (!holder?.alive || !realCards.length) return null;
  const group = {
    id: data.id || `seal-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label: data.label || "扣置",
    sourceId: data.sourceId ?? null,
    returnToId: data.returnToId ?? holder.id,
    returnAt: data.returnAt || "manual",
    visible: data.visible !== false,
    cards: realCards
  };
  sealedCardGroups(holder).push(group);
  return group;
}

function sealedCardText(player) {
  const groups = sealedCardGroups(player).filter((group) => group.cards?.length);
  if (!groups.length) return "";
  return groups.map((group) => `${group.label}${group.cards.length}`).join(" ");
}

function releaseSealedCards(filter = () => true, reason = "扣置牌归还") {
  const released = [];
  for (const holder of state.players || []) {
    const keep = [];
    for (const group of sealedCardGroups(holder)) {
      if (!filter(group, holder)) {
        keep.push(group);
        continue;
      }
      const receiver = state.players[group.returnToId];
      if (receiver?.alive) {
        receiver.hand.push(...group.cards);
        feedback(`${displayName(receiver)} 收回${group.cards.length}张【${group.label}】扣置牌（${reason}）。`);
      } else {
        state.discard.push(...group.cards);
      }
      released.push(group);
    }
    holder.sealedCards = keep;
  }
  return released;
}

function ensureMission(player, id, config = {}) {
  if (!player.missions) player.missions = {};
  if (!player.missions[id]) {
    player.missions[id] = {
      id,
      name: config.name || id,
      state: "active",
      text: config.text || "",
      successText: config.successText || "",
      failText: config.failText || ""
    };
  }
  return player.missions[id];
}

function missionState(player, id) {
  return player.missions?.[id]?.state || "";
}

function missionText(player) {
  const missions = Object.values(player.missions || {});
  const marks = [];
  if (hasSkill(player, "tianren") || player.marks?.tianren) marks.push(`天任${player.marks?.tianren || 0}`);
  if (hasSkill(player, "jiufa") && player.marks?.jiufaNames?.length) marks.push(`九伐${player.marks.jiufaNames.length}/9`);
  if (player.marks?.pingxiangUsed) marks.push("平襄已用");
  if (!missions.length) return marks.join(" ");
  const label = { active: "进行中", success: "成功", failed: "失败" };
  return [...missions.map((mission) => `${mission.name}:${label[mission.state] || mission.state}`), ...marks].join(" ");
}

function completeMission(player, id, success, detail = "") {
  const mission = ensureMission(player, id);
  if (mission.state !== "active") return false;
  mission.state = success ? "success" : "failed";
  feedback(`${displayName(player)} 的使命技【${mission.name}】${success ? "成功" : "失败"}${detail ? `：${detail}` : "。"} `);
  return true;
}

function disablePlayerEffect(player, effect) {
  player.disabledEffects = [...new Set([...(player.disabledEffects || []), effect])];
}

function grantPlayerEffect(player, effect) {
  player.extraEffects = [...new Set([...(player.extraEffects || []), effect])];
}

function isBasicOrNormalTrick(card) {
  return card && (card.type === "基础" || card.type === "锦囊");
}

function maybeTriggerTianrenDiscard(cards, reason = "弃牌") {
  const count = (Array.isArray(cards) ? cards : [cards]).filter(isBasicOrNormalTrick).length;
  if (!count || !state?.players?.length) return;
  for (const player of state.players) {
    if (!player.alive || !hasSkill(player, "tianren")) continue;
    player.marks.tianren = (player.marks.tianren || 0) + count;
    feedback(`${displayName(player)} 的【天任】获得${count}枚“天任”（当前${player.marks.tianren}）。`);
    while (player.marks.tianren >= player.maxHp) {
      player.marks.tianren -= player.maxHp;
      player.maxHp += 1;
      draw(player, 2);
      feedback(`${displayName(player)} 的【天任】移去体力上限数枚标记，加1点体力上限并摸两张牌。`);
    }
  }
}

function recordJiufaName(player, cardName) {
  if (!player?.alive || !hasSkill(player, "jiufa") || player.marks?.pingxiangUsed) return;
  if (!cardName) return;
  player.marks.jiufaNames = player.marks.jiufaNames || [];
  if (!player.marks.jiufaNames.includes(cardName)) player.marks.jiufaNames.push(cardName);
  if (player.marks.jiufaNames.length >= 9) {
    player.marks.jiufaReady = true;
    player.marks.jiufaNames = [];
    feedback(`${displayName(player)} 累计使用/打出九种牌名，【九伐】准备结算。`);
    resolveJiufa(player).catch((error) => console.warn("jiufa failed", error));
  }
}

async function resolveJiufa(player) {
  if (!player?.alive || !hasSkill(player, "jiufa") || player.temp?.resolvingJiufa) return false;
  player.temp.resolvingJiufa = true;
  const revealed = [];
  while (revealed.length < 9) {
    if (!state.deck.length) state.deck = shuffle(state.discard.splice(0));
    const card = state.deck.pop();
    if (!card) break;
    revealed.push(card);
  }
  const byRank = revealed.reduce((acc, card) => {
    const key = card.rank || "无点数";
    if (!acc[key]) acc[key] = [];
    acc[key].push(card);
    return acc;
  }, {});
  const duplicated = Object.values(byRank).filter((items) => items.length >= 2);
  const gained = duplicated.map((items) => items[0]);
  const gainedIds = new Set(gained.map((card) => card.id));
  player.hand.push(...gained);
  const rest = revealed.filter((card) => !gainedIds.has(card.id));
  state.discard.push(...rest);
  maybeTriggerTianrenDiscard(rest, "九伐");
  feedback(`${displayName(player)} 发动【九伐】，亮出${revealed.length}张牌${gained.length ? `，获得${gained.map(cardBrief).join("、")}` : "，没有重复点数可获得"}。`);
  player.temp.resolvingJiufa = false;
  renderAll();
  return true;
}

async function choosePojunCards(attacker, target, maxCount) {
  const options = areaCardOptions(target, attacker.id === target.id);
  if (!options.length) return [];
  if (attacker.id !== 0) {
    const pickCount = Math.min(maxCount, options.length, 2);
    const picked = options
      .sort((a, b) => aiCardValue(b.card) - aiCardValue(a.card))
      .slice(0, pickCount);
    const removed = [];
    for (const option of picked) {
      const card = await removeAreaOption(target, option);
      if (card) removed.push(card);
    }
    return removed;
  }
  const selected = await showModal({
    title: "发动【破军】",
    desc: `选择 ${displayName(target)} 至多${maxCount}张牌扣置到其武将牌上。本回合结束后归还。`,
    type: "cardSelect",
    options: options.map((option, index) => {
      const point = `${option.card.suit || ""}${option.card.rank || ""}`;
      const hiddenHand = option.area === "hand" && attacker.id !== target.id;
      return {
        name: hiddenHand ? `手牌 第${option.index + 1}张` : option.card.name,
        type: hiddenHand ? "未知手牌" : `${option.label}${point ? ` · ${point}` : ""}`,
        value: index
      };
    }),
    multiSelect: true,
    minSelect: 1,
    maxSelect: maxCount,
    allowCancel: true
  });
  if (!selected?.length) return [];
  const removed = [];
  for (const index of selected) {
    const card = await removeAreaOption(target, options[index]);
    if (card) removed.push(card);
  }
  return removed;
}

async function triggerPojunOnSlashTarget(attacker, target) {
  if (!hasSkill(attacker, "pojun") || !target?.alive || areaCardCount(target) <= 0) return;
  const useIt = attacker.id === 0
    ? await showModal({ title: "破军", desc: `将 ${displayName(target)} 至多${target.hp}张牌扣置到武将牌旁，回合结束后归还。`, type: "confirm" })
    : true;
  if (!useIt) return;
  const count = Math.min(Math.max(1, target.hp), areaCardCount(target));
  const removed = await choosePojunCards(attacker, target, count);
  if (!removed.length) return;
  sealCardsOnHero(target, removed, {
    label: "破军",
    sourceId: attacker.id,
    returnToId: target.id,
    returnAt: "sourceTurnEnd"
  });
  feedback(`${displayName(attacker)} 发动【破军】，暂扣 ${displayName(target)} ${removed.length}张牌。`);
  feedback(`${displayName(target)} 当前手牌${target.hand.length}张、装备${equipmentEntries(target).length}张；${shouldPojunAddDamage(attacker, target) ? "已满足【破军】增伤条件" : "暂未满足【破军】增伤条件"}。`);
  renderAll();
}

function returnPojunCards(player) {
  releaseSealedCards((group) => group.label === "破军" && group.sourceId === player.id && group.returnAt === "sourceTurnEnd", "回合结束");
}

function shouldPojunAddDamage(attacker, target) {
  if (!hasSkill(attacker, "pojun") || !target?.alive) return false;
  return target.hand.length <= attacker.hand.length && equipmentEntries(target).length <= equipmentEntries(attacker).length;
}

function shouldYinzhanAddDamage(source, target, options = {}) {
  return hasSkill(source, "yinzhan") && options.cardName === "杀" && source.hp <= target.hp;
}

async function triggerYinzhanAfterSlashDamage(source, target, options = {}) {
  if (!hasSkill(source, "yinzhan") || options.cardName !== "杀" || !target?.alive || source.hand.length > target.hand.length || !hasAnyCardInArea(target)) return;
  const lost = await takeChosenAreaCard(target, source, null, `【饮战】：选择弃置 ${displayName(target)} 区域里的一张牌`);
  if (!lost) return;
  state.discard.push(lost);
  maybeTriggerTianrenDiscard(lost, "饮战");
  feedback(`${displayName(source)} 的【饮战】触发，弃置 ${displayName(target)} 的 ${cardBrief(lost)}。`);
  if (source.hp < source.maxHp) heal(source, 1, "乘势");
  const index = state.discard.findIndex((card) => card.id === lost.id);
  if (index >= 0) {
    source.hand.push(state.discard.splice(index, 1)[0]);
    feedback(`${displayName(source)} 触发【乘势】，获得被弃置的 ${cardBrief(lost)}。`);
  }
}

async function triggerShiKuanggu(source, target, amount) {
  if (!hasSkill(source, "kuangguShi") || !target?.alive || distanceBetween(source, target) > 1) return;
  if (source.marks?.kuangguShiLevel >= 2) {
    heal(source, 1, "狂骨");
    draw(source, 1);
    feedback(`${displayName(source)} 发动二级【狂骨】，回复1点体力并摸一张牌。`);
    return;
  }
  let choice = source.hp < source.maxHp ? "heal" : "draw";
  if (source.id === 0) {
    choice = await showModal({
      title: "狂骨",
      desc: `你对距离1以内的 ${displayName(target)} 造成了${amount}点伤害，选择一项。`,
      type: "select",
      options: [
        { label: "回复1点体力", value: "heal" },
        { label: "摸一张牌", value: "draw" }
      ],
      allowCancel: true
    }) || null;
  }
  if (choice === "heal") heal(source, 1, "狂骨");
  else if (choice === "draw") {
    draw(source, 1);
    feedback(`${displayName(source)} 发动【狂骨】，摸一张牌。`);
  }
}

async function triggerChiyunAfterGain(player, reason = "获得牌") {
  if (!hasSkill(player, "chiyun") || !player.hand.length || player.temp?.chiyunUsedPhase) return;
  if (player.marks?.xiongziShiLocked && state.turn !== player.id) return;
  const candidates = state.players.filter((p) => p.alive && p.id !== player.id);
  if (!candidates.length) return;
  const useIt = player.id === 0
    ? await showModal({ title: "炽沄", desc: `你因${reason}获得牌，是否交给一名其他角色任意张手牌？`, type: "confirm" })
    : true;
  if (!useIt) return;
  let target = candidates.find((p) => relation(player, p) === "enemy") || candidates[0];
  if (player.id === 0) {
    const targetId = await showModal({ title: "炽沄", desc: "选择获得你手牌的角色", type: "select", options: candidates.map((p) => ({ label: displayName(p), value: p.id })), allowCancel: true });
    target = state.players.find((p) => p.id === targetId);
  }
  if (!target) return;
  const cards = await chooseHandCardsRange(player, 1, player.hand.length, () => true, `【炽沄】：选择交给 ${displayName(target)} 的任意张手牌。`, true);
  if (!cards.length) return;
  target.hand.push(...cards);
  player.temp.chiyunUsedPhase = true;
  const colors = new Set(cards.map((card) => isRed(card) ? "red" : "black"));
  const chooseDamage = player.marks?.xiongziShiLocked
    ? player.marks.xiongziShiChoice === 1
    : target.id === 0
    ? await showModal({ title: "炽沄", desc: `${displayName(player)} 交给你 ${cards.map(cardBrief).join("、")}，选择一项。`, type: "select", options: [{ label: "展示同色手牌并受到火焰伤害", value: true }, { label: "令其摸两张牌，你进入连环", value: false }] })
    : relation(target, player) !== "ally";
  if (chooseDamage) {
    const shown = target.hand.filter((card) => colors.has(isRed(card) ? "red" : "black"));
    feedback(`${displayName(player)} 发动【炽沄】，交给 ${displayName(target)} ${cards.length}张牌；${displayName(target)} 展示同色手牌${shown.length ? `：${shown.map(cardBrief).join("、")}` : "，没有可展示牌"}。`);
    await damage(target, player, 1, { skill: "炽沄", element: "fire" });
  } else {
    draw(player, 2);
    target.chained = true;
    feedback(`${displayName(player)} 发动【炽沄】，交给 ${displayName(target)} ${cards.length}张牌后摸两张牌，${displayName(target)} 进入连环状态。`);
  }
}

async function triggerYanhuiOnCardTarget(player, targets) {
  if (!hasSkill(player, "yanhui") || !targets.length) return;
  if (player.marks?.xiongziShiLocked && state.turn !== player.id) return;
  const candidates = targets.filter((target) => target?.alive && target.hand.length);
  if (!candidates.length) return;
  let target = candidates[0];
  if (player.id === 0) {
    const targetId = await showModal({ title: "焰洄", desc: "选择一名目标角色展示一张手牌。", type: "select", options: candidates.map((p) => ({ label: displayName(p), value: p.id })), allowCancel: true });
    target = state.players.find((p) => p.id === targetId);
  }
  if (!target) return;
  const card = target.hand[0];
  const key = `${target.id}:${card.suit}:${card.rank}:${card.name}`;
  const temp = ensureTurnTemp(player);
  temp.yanhuiShown = temp.yanhuiShown || new Set();
  temp.yanhuiTargets = temp.yanhuiTargets || new Set();
  feedback(`${displayName(player)} 发动【焰洄】，展示 ${displayName(target)} 的 ${cardBrief(card)}。`);
  if (temp.yanhuiShown.has(key)) {
    const removed = randomSpecificHandCard(target, card.id);
    if (removed) {
      state.discard.push(removed);
      maybeTriggerTianrenDiscard(removed, "焰洄");
      temp.yanhuiTargets.add(target.id);
      feedback(`该牌本回合已展示过，【焰洄】弃置 ${cardBrief(removed)}。`);
    }
  }
  temp.yanhuiShown.add(key);
}

async function resolveYanhuiEnd(player) {
  const temp = player.temp;
  if (!hasSkill(player, "yanhui") || !temp?.yanhuiShown?.size) return;
  const lostTargets = [...(temp.yanhuiTargets || new Set())].map((id) => state.players[id]).filter((p) => p?.alive);
  let mode = lostTargets.length ? "damage" : "draw";
  if (player.marks?.xiongziShiLocked) mode = player.marks.xiongziShiChoice === 1 ? "damage" : "draw";
  if (player.id === 0 && !player.marks.xiongziShiLocked) {
    mode = await showModal({
      title: "焰洄",
      desc: "阶段结束，选择【焰洄】结算。",
      type: "select",
      options: [
        ...(lostTargets.length ? [{ label: "对一名被弃置牌的目标造成1点火焰伤害", value: "damage" }] : []),
        { label: `摸${Math.min(3, temp.yanhuiShown.size)}张牌`, value: "draw" }
      ],
      allowCancel: true
    }) || null;
  }
  if (mode === "damage" && lostTargets.length) {
    let target = lostTargets[0];
    if (player.id === 0 && lostTargets.length > 1) {
      const targetId = await showModal({ title: "焰洄", desc: "选择受到火焰伤害的角色。", type: "select", options: lostTargets.map((p) => ({ label: displayName(p), value: p.id })), allowCancel: true });
      target = lostTargets.find((p) => p.id === targetId) || null;
    }
    if (!target) return;
    await damage(target, player, 1, { skill: "焰洄", element: "fire" });
    feedback(`${displayName(player)} 的【焰洄】在阶段结束时对 ${displayName(target)} 造成1点火焰伤害。`);
  } else if (mode === "draw") {
    const amount = Math.min(3, temp.yanhuiShown.size);
    draw(player, amount);
    feedback(`${displayName(player)} 的【焰洄】在阶段结束时摸${amount}张牌。`);
  } else {
    feedback(`${displayName(player)} 的【焰洄】因【雄姿】保留一选项，但本阶段没有可造成伤害的目标。`);
  }
}

async function applyFentaoBeforeFireDamage(target, amount) {
  if (!target?.alive || !target.chained) return amount;
  const owner = state.players.find((p) => p.alive && p.id !== target.id && hasSkill(p, "fentao"));
  if (!owner) return amount;
  if (owner.marks?.xiongziShiLocked && state.turn !== owner.id) return amount;
  const chooseExtra = owner.marks?.xiongziShiLocked
    ? owner.marks.xiongziShiChoice === 1
    : target.id === 0
    ? await showModal({ title: "焚涛", desc: `${displayName(owner)} 的【焚涛】触发，选择一项。`, type: "select", options: [{ label: "此次火焰伤害+1", value: true }, { label: "弃置一半牌，伤害后进入连环", value: false }] })
    : areaCardCount(target) <= 2;
  if (chooseExtra) {
    feedback(`${displayName(owner)} 的【焚涛】触发，${displayName(target)} 选择火焰伤害+1。`);
    return amount + 1;
  }
  const discardCount = Math.ceil(areaCardCount(target) / 2);
  const discarded = target.id === 0
    ? await chooseMultipleAreaCards(target, discardCount, discardCount, () => true, `【焚涛】：选择弃置${discardCount}张牌。`)
    : [];
  let lost = discarded.length;
  if (target.id === 0) {
    state.discard.push(...discarded);
    maybeTriggerTianrenDiscard(discarded, "焚涛");
  } else {
    lost = await discardAnyCards(target, discardCount);
  }
  if (lost < discardCount) {
    feedback(`${displayName(target)} 未弃够牌，【焚涛】改为此次火焰伤害+1。`);
    return amount + 1;
  }
  ensureTurnTemp(target).fentaoRechain = true;
  feedback(`${displayName(owner)} 的【焚涛】触发，${displayName(target)} 弃置${lost}张牌，伤害后进入连环。`);
  return amount;
}

async function damage(target, source, amount = 1, options = {}) {
  if (!target?.alive || amount <= 0) return;
  const element = options.element || "normal";
  if (hasVineArmor(target) && shouldVinePrevent(options.cardName, element)) {
    feedback(`${target.name} 的【藤甲】生效，【${options.cardName || "伤害"}】无效。`);
    return;
  }
  let finalAmount = amount;
  if (hasVineArmor(target) && element === "fire") {
    finalAmount += 1;
    feedback(`${target.name} 的【藤甲】被火焰引燃，伤害+1。`);
  }
  if (element === "fire") {
    finalAmount = await applyFentaoBeforeFireDamage(target, finalAmount);
  }
  if (!target.temp?.armorIgnored && target.equipment?.armor?.name === "白银狮子" && finalAmount > 1) {
    finalAmount = 1;
    feedback(`${target.name} 的【白银狮子】生效，将伤害降为1点。`);
  }
  if (finalAmount > 0 && !options.noSkill && await tryTianxiang(target, source, finalAmount, options)) {
    checkWin();
    return;
  }
  target.hp -= finalAmount;
  feedback(`${target.name} 受到 ${source ? source.name : "天命"} 的${finalAmount}点${damageNatureText(element)}伤害${options.skill ? `（${options.skill}）` : ""}。`);
  if (!options.noSkill) {
    await triggerDamagedSkills(target, source, finalAmount, options);
    if (source?.alive) await triggerDamageDealtSkills(source, target, finalAmount, options);
  }
  resolveDying(target, source);
  if (target.temp?.fentaoRechain && target.alive) {
    target.chained = true;
    target.temp.fentaoRechain = false;
    feedback(`${target.name} 因【焚涛】伤害结算后进入连环状态。`);
  }
  checkWin();
  if (!state.winner && !state.pendingDying && ["fire", "thunder"].includes(element) && target.chained && !options.noChain) {
    await spreadChainDamage(target, source, finalAmount, { ...options, element });
  }
}

async function spreadChainDamage(origin, source, amount, options = {}) {
  const visited = new Set(options.chainVisited || []);
  visited.add(origin.id);
  origin.chained = false;
  feedback(`${origin.name} 的铁索连环解除，${damageNatureText(options.element)}伤害开始传导。`);
  const next = state.players.find((p) => p.alive && p.chained && !visited.has(p.id));
  if (!next) return;
  await damage(next, source, amount, {
    ...options,
    noChain: true,
    chainVisited: visited,
    skill: options.skill || "铁索连环"
  });
  if (!state.winner) await spreadChainDamage(next, source, amount, { ...options, chainVisited: visited });
}

function loseHp(player, amount = 1, source = null, reason = "失去体力") {
  if (!player.alive || amount <= 0) return true;
  player.hp -= amount;
  feedback(`${player.name} 因【${reason}】失去${amount}点体力。`);
  resolveDying(player, source);
  checkWin();
  return player.alive;
}

function resolveDying(target, source = null) {
  let dyingIterations = 0;
  const DYING_MAX_ITERATIONS = 20;
  while (target.hp <= 0 && target.alive && dyingIterations < DYING_MAX_ITERATIONS) {
    dyingIterations++;
    target.dying = true;
    feedback(`${target.name} 进入濒死状态，当前体力 ${target.hp}。`);
    if (triggerDyingSkill(target)) continue;
    const saveResult = askForDyingSaves(target, source);
    if (saveResult === "pending") return;
    if (saveResult) continue;
    killPlayer(target, source);
  }
  target.dying = false;
  if (target.temp) target.temp.dyingSkipIds = [];
}

function triggerDyingSkill(target) {
  if (hasSkill(target, "zhongao") && missionState(target, "zhongao") === "active") {
    completeMission(target, "zhongao", false, "失去【壮誓】并获得【困奋】。");
    disablePlayerEffect(target, "zhuangshi");
    grantPlayerEffect(target, "kunfenShi");
  }
  if (hasSkill(target, "niepan") && !target.marks.niepanUsed) {
    target.marks.niepanUsed = true;
    target.hand.forEach((c) => state.discard.push(c));
    target.hand = [];
    target.hp = Math.min(3, target.maxHp);
    draw(target, 3);
    feedback(`${target.name} 发动限定技【涅槃】，回复至${target.hp}点体力并摸三张牌。`);
    return true;
  }
  if (hasSkill(target, "buqu")) {
    target.hp = 1;
    draw(target, 1);
    feedback(`${target.name} 发动【不屈】，以1点体力继续战斗。`);
    return true;
  }
  return false;
}

function askForDyingSaves(target, source = null) {
  for (const responder of dyingResponders()) {
    if (!target.alive || target.hp > 0) return true;
    if (wanshaBlocksPeach(responder, target)) continue;
    if (target.temp?.dyingSkipIds?.includes(responder.id)) continue;
    let cardIndex = findDyingSaveCardIndex(responder, target);
    if (cardIndex >= 0 && responder.id === 0) {
      startDyingChoice(responder, target, source);
      return "pending";
    }
    while (cardIndex >= 0 && target.hp <= 0) {
      const card = responder.hand[cardIndex];
      if (!shouldUseDyingSave(responder, target, card)) break;
      useDyingSaveCard(responder, target, cardIndex);
      cardIndex = findDyingSaveCardIndex(responder, target);
    }
  }
  return target.hp > 0;
}

function dyingResponders() {
  const start = state.players[state.turn]?.alive ? state.players[state.turn] : state.players.find((p) => p.alive);
  return start ? orderedAliveFrom(start) : state.players.filter((p) => p.alive);
}

function wanshaBlocksPeach(responder, target) {
  const current = state.players[state.turn];
  return current?.alive && hasSkill(current, "wansha") && responder.id !== target.id;
}

function findDyingSaveCardIndex(responder, target) {
  return responder.hand.findIndex((card) => {
    if (card.name === "桃" || cardCanRespondAs(responder, card, "桃")) return true;
    return responder.id === target.id && (card.name === "酒" || cardCanRespondAs(responder, card, "酒"));
  });
}

function shouldUseDyingSave(responder, target, card) {
  if (responder.id === 0) return false;
  if (responder.id === target.id) return true;
  return relation(responder, target) === "ally" || (target.role === "主公" && responder.role === "忠臣");
}

function startDyingChoice(responder, target, source = null) {
  state.pendingDying = {
    responderId: responder.id,
    targetId: target.id,
    sourceId: source?.id ?? null
  };
  selectedCardId = null;
  feedback(`${target.name} 濒死，等待 ${responder.name} 选择【桃】${responder.id === target.id ? "或【酒】" : ""}。`);
  render();
}

function canUseForPendingDying(card) {
  const pending = state?.pendingDying;
  if (!pending) return false;
  const responder = state.players[pending.responderId];
  const target = state.players[pending.targetId];
  if (!responder || !target) return false;
  if (card.name === "桃" || cardCanRespondAs(responder, card, "桃")) return true;
  return responder.id === target.id && (card.name === "酒" || cardCanRespondAs(responder, card, "酒"));
}

function selectPendingDyingCard(card) {
  if (!canUseForPendingDying(card)) {
    toast("濒死结算中只能选择【桃】，濒死者本人也可选择【酒】。");
    return;
  }
  if (selectedCardId === card.id) {
    confirmPendingDyingCard();
    return;
  }
  selectedCardId = card.id;
  render();
}

function confirmPendingDyingCard() {
  const pending = state?.pendingDying;
  if (!pending) return;
  const responder = state.players[pending.responderId];
  const target = state.players[pending.targetId];
  const card = responder.hand.find((item) => item.id === selectedCardId);
  if (!card || !canUseForPendingDying(card)) {
    toast("请先选择一张可用于濒死结算的牌。");
    return;
  }
  const index = responder.hand.findIndex((item) => item.id === card.id);
  useDyingSaveCard(responder, target, index);
  state.pendingDying = null;
  selectedCardId = null;
  if (target.temp) target.temp.dyingSkipIds = [];
  resolveDying(target, pending.sourceId == null ? null : state.players[pending.sourceId]);
  checkWin();
  render();
  resumeAiAfterPending();
}

function skipPendingDyingChoice() {
  const pending = state?.pendingDying;
  if (!pending) return;
  const target = state.players[pending.targetId];
  if (!target.temp) target.temp = {};
  target.temp.dyingSkipIds = [...(target.temp.dyingSkipIds || []), pending.responderId];
  state.pendingDying = null;
  selectedCardId = null;
  feedback(`${state.players[pending.responderId].name} 放弃此次濒死响应。`);
  resolveDying(target, pending.sourceId == null ? null : state.players[pending.sourceId]);
  checkWin();
  render();
  resumeAiAfterPending();
}

function resumeAiAfterPending() {
  if (!state || state.winner || state.pendingReaction || state.pendingDying || state.turn === 0) return;
  const player = state.players[state.turn];
  if (player?.alive) setTimeout(() => aiTurn(player), 650);
}

function useDyingSaveCard(responder, target, cardIndex) {
  const [card] = responder.hand.splice(cardIndex, 1);
  state.discard.push(card);
  const bonus = hasSkill(target, "jiuyuan") && responder.id !== target.id && responder.hero.camp === "吴" ? 1 : 0;
  target.hp = Math.min(target.maxHp, target.hp + 1 + bonus);
  feedback(`${responder.name} 对濒死的 ${target.name} 使用【${card.name}】，${target.name} 回复${1 + bonus}点体力。`);
}

function killPlayer(target, source = null) {
  target.alive = false;
  target.dying = false;
  const caopi = state.players.find((p) => p.alive && p.id !== target.id && hasSkill(p, "xingshang"));
  if (caopi && target.hand.length) {
    caopi.hand.push(...target.hand);
    feedback(`${caopi.name} 发动【行殇】，获得 ${target.name} 的所有手牌。`);
  } else {
    target.hand.forEach((c) => state.discard.push(c));
  }
  target.hand = [];
  feedback(`${target.name} 阵亡，身份公开：${target.role}。`);
  if (source?.alive && hasSkill(target, "duanchang")) {
    source.skillsLost = true;
    feedback(`${target.name} 的【断肠】发动，${source.name} 失去所有武将技能。`);
  }
  if (target.role === "反贼" && source?.alive) {
    const reward = 3 + effectCount(source, "rebelRewardPlusOne");
    draw(source, reward);
    log(`${source.name} 击败反贼，摸${reward}张牌。`);
  }
  if (target.role === "忠臣" && source?.role === "主公") {
    source.hand.forEach((c) => state.discard.push(c));
    source.hand = [];
    feedback(`${source.name} 误杀忠臣，弃置所有手牌。`);
  }
  if (source?.alive && hasSkill(source, "zhongao") && missionState(source, "zhongao") === "active") {
    completeMission(source, "zhongao", true, "升级【狂骨】。");
    source.marks.kuangguShiLevel = 2;
    if (source.hp < source.maxHp) heal(source, 1, "忠傲");
    else {
      draw(source, 1);
      feedback(`${source.name} 因【忠傲】摸一张牌。`);
    }
  }
}

function findTianxiangCard(player) {
  return player.hand.find((card) => card.suit === "♥" || (hasSkill(player, "hongyan") && card.suit === "♠"));
}

async function tryTianxiang(target, source, amount, options = {}) {
  if (options.tianxiangTransferred) return false;
  if (!hasSkill(target, "tianxiang")) return false;
  const heart = findTianxiangCard(target);
  if (!heart) return false;
  const candidates = state.players.filter((p) => p.alive && p.id !== target.id);
  if (!candidates.length) return false;
  let transferTarget = candidates.filter((p) => relation(target, p) === "enemy")[0] || candidates[0];
  if (target.id === 0) {
    transferTarget = await chooseTianxiangTarget(candidates, amount);
  }
  const shouldUse = target.id === 0 ? Boolean(transferTarget) : target.hp <= amount || relation(target, transferTarget) === "enemy";
  if (!shouldUse) return false;
  const index = target.hand.findIndex((card) => card.id === heart.id);
  if (index >= 0) state.discard.push(target.hand.splice(index, 1)[0]);
  feedback(`${target.name} 发动【天香】，将伤害转移给 ${transferTarget.name}。`);
  await damage(transferTarget, source || target, amount, { ...options, skill: "天香", noSkill: false, tianxiangTransferred: true });
  const drawCount = Math.max(1, transferTarget.maxHp - transferTarget.hp);
  draw(transferTarget, drawCount);
  feedback(`${transferTarget.name} 因【天香】摸${drawCount}张牌（其已损失体力值）。`);
  return true;
}

async function chooseTianxiangTarget(candidates, amount) {
  if (!candidates.length) return null;
  const options = candidates.map((p) => ({ label: `${p.name}（${p.hp}/${p.maxHp}）`, value: p }));
  const result = await showModal({ title: "发动【天香】", desc: `将${amount}点伤害转移给：`, type: "select", options, allowCancel: true });
  return result || null;
}

function checkWin() {
  if (state.mode === "fengshen") {
    const me = state.players[0];
    const boss = state.players[1];
    if (!me.alive) {
      state.winner = "封神之路挑战失败";
      state.phase = "游戏结束";
      log(`封神之路失败：止步第${state.campaign.stageIndex + 1}关。`);
    } else if (!boss.alive) {
      state.winner = `封神之路 第${state.campaign.stageIndex + 1}关胜利`;
      state.phase = "关卡胜利";
      log(`封神之路第${state.campaign.stageIndex + 1}关胜利。`);
      if (!state.campaign.advancing) {
        state.campaign.advancing = true;
        setTimeout(advanceFengshenStage, 1200);
      }
    }
    return;
  }
  const lord = state.players.find((p) => p.role === "主公");
  if (!lord.alive) {
    state.winner = livingByRole("内奸").length === 1 && state.players.filter((p) => p.alive).length === 1 ? "内奸胜利" : "反贼胜利";
  } else if (!livingByRole("反贼").length && !livingByRole("内奸").length) {
    state.winner = "主忠胜利";
  }
  if (state.winner) {
    state.phase = "游戏结束";
    log(`游戏结束：${state.winner}。`);
  }
}

async function triggerDamagedSkills(target, source, amount, options = {}) {
  if (!target.alive) return;
  for (let i = 0; i < amount; i++) {
    await triggerCustomDamageTakenRules(target, source, amount, options);
    if (state.pendingReaction || state.pendingDying || state.winner || !target.alive) return;
    if (hasSkill(target, "jianxiong")) {
      if (await shouldUseSkill(target, "奸雄", "受到伤害后，获得造成伤害的牌。")) {
        const gained = takeDamageCard(target, options.damageCard);
        if (!gained) draw(target, 1);
        feedback(`${target.name} 发动【奸雄】，${gained ? `获得造成伤害的【${gained.name}】` : "没有可获得的伤害牌，改为摸一张牌"}。`);
      }
    }
    if (hasSkill(target, "fankui") && source?.alive && (source.hand.length || equipmentEntries(source).length)) {
      if (await shouldUseSkill(target, "反馈", `获得 ${source.name} 的一张牌。`)) {
        let stolen;
        if (target.id === 0) {
          const option = await chooseAreaCard(source, target, `【反馈】：选择获得 ${source.name} 的一张牌`);
          stolen = option ? await removeAreaOption(source, option) : null;
        } else {
          stolen = await randomAnyCard(source);
        }
        if (stolen) target.hand.push(stolen);
        feedback(`${target.name} 发动【反馈】，获得 ${source.name} 的一张牌。`);
      }
    }
    if (hasSkill(target, "ganglie") && source?.alive && Math.random() > 0.35) {
      if (await shouldUseSkill(target, "刚烈", `令 ${source.name} 弃两张牌，否则受到1点伤害。`)) {
        const discarded = await discardRandomCards(source, 2);
        if (discarded < 2) await damage(source, target, 1, { skill: "刚烈", noSkill: true });
        feedback(`${target.name} 发动【刚烈】，${source.name}${discarded >= 2 ? "弃置两张牌" : "受到1点伤害"}。`);
      }
    }
    if (hasSkill(target, "yiji")) {
      if (await shouldUseSkill(target, "遗计", "受到1点伤害后摸两张牌。")) {
        draw(target, 2);
        feedback(`${target.name} 发动【遗计】，摸两张牌。`);
      }
    }
    if (hasSkill(target, "jieming")) {
      const ally = chooseSupportTarget(target);
      if (ally && await shouldUseSkill(target, "节命", `令 ${ally.name} 将手牌补至体力上限，至多五张。`)) {
        const need = Math.max(0, Math.min(5, ally.maxHp) - ally.hand.length);
        draw(ally, need);
        if (need) feedback(`${target.name} 发动【节命】，令 ${ally.name} 补至${ally.hand.length}张手牌。`);
      }
    }
    if (hasSkill(target, "fangzhu")) {
      const ally = chooseSupportTarget(target);
      if (ally && await shouldUseSkill(target, "放逐", `令 ${ally.name} 翻面并摸牌。`)) {
        const amountToDraw = Math.max(1, target.maxHp - target.hp);
        ally.flipped = !ally.flipped;
        draw(ally, amountToDraw);
        feedback(`${target.name} 发动【放逐】，令 ${ally.name} ${ally.flipped ? "翻面" : "翻回正面"}并摸${amountToDraw}张牌。`);
      }
    }
    if (hasSkill(target, "xinsheng")) {
      await gainHuashenCards(target, 1, "新生");
    }
    if (options.cardName === "杀" && i === 0) {
      const caiwenji = state.players.find((p) => p.alive && hasSkill(p, "beige") && hasAnyCardInArea(p));
      if (caiwenji) {
        const useIt = caiwenji.id === 0
          ? await showModal({ title: "悲歌", desc: `${target.name} 受到【杀】伤害，是否发动【悲歌】弃一张牌令其判定？`, type: "confirm" })
          : Math.random() > 0.4;
        if (useIt) {
          const cost = await chooseAreaCard(caiwenji, caiwenji, "【悲歌】：请弃置一张牌");
          if (cost) {
            const discarded = await removeAreaOption(caiwenji, cost);
            if (discarded) state.discard.push(discarded);
            const judge = await performJudge(target, "悲歌");
            if (judge) {
              if (judge.suit === "♥") { heal(target, 1, "悲歌"); feedback(`${target.name} 因【悲歌】判定 ${judgeText(judge)}，回复1点体力。`); }
              else if (judge.suit === "♦") { draw(target, 2); feedback(`${target.name} 因【悲歌】判定 ${judgeText(judge)}，摸两张牌。`); }
              else if (judge.suit === "♣" && source?.alive) { const d = await discardRandomCards(source, 2); feedback(`${source.name} 因【悲歌】判定 ${judgeText(judge)}，弃置${d}张牌。`); }
              else if (judge.suit === "♠" && source?.alive) { source.flipped = !source.flipped; feedback(`${source.name} 因【悲歌】判定 ${judgeText(judge)}，${source.flipped ? "翻面" : "翻回正面"}。`); }
            }
          }
        }
      }
    }
  }
}

/* ===== Pindian (拼点) Mechanic ===== */
function rankValue(rank) {
  const map = { "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13 };
  return map[rank] || 0;
}

async function pindian(initiator, target) {
  if (!initiator.alive || !target.alive) return null;
  if (!initiator.hand.length || !target.hand.length) return null;
  // Initiator chooses a card
  let initCard;
  if (initiator.id === 0) {
    const opts = initiator.hand.map((c, i) => ({ label: `${c.suit}${c.rank} ${c.name}`, value: i }));
    const idx = await showModal({ title: "拼点", desc: `选择一张手牌与 ${displayName(target)} 拼点`, type: "select", options: opts });
    if (idx == null) return null;
    initCard = initiator.hand.splice(idx, 1)[0];
  } else {
    // AI picks highest rank card
    let best = 0;
    for (let i = 1; i < initiator.hand.length; i++) {
      if (rankValue(initiator.hand[i].rank) > rankValue(initiator.hand[best].rank)) best = i;
    }
    initCard = initiator.hand.splice(best, 1)[0];
  }
  // Target chooses a card
  let tgtCard;
  if (target.id === 0) {
    const opts = target.hand.map((c, i) => ({ label: `${c.suit}${c.rank} ${c.name}`, value: i }));
    const idx = await showModal({ title: "拼点", desc: `${displayName(initiator)} 对你发起拼点，选择一张手牌应对`, type: "select", options: opts, allowCancel: false });
    if (idx == null) return null;
    tgtCard = target.hand.splice(idx, 1)[0];
  } else {
    let best = 0;
    for (let i = 1; i < target.hand.length; i++) {
      if (rankValue(target.hand[i].rank) > rankValue(target.hand[best].rank)) best = i;
    }
    tgtCard = target.hand.splice(best, 1)[0];
  }
  // Show result
  state.discard.push(initCard, tgtCard);
  const iv = rankValue(initCard.rank);
  const tv = rankValue(tgtCard.rank);
  const win = iv > tv;
  feedback(`${displayName(initiator)}(${initCard.suit}${initCard.rank}) vs ${displayName(target)}(${tgtCard.suit}${tgtCard.rank}) — ${win ? displayName(initiator) + "赢" : displayName(target) + "赢"}`);
  renderAll();
  await sleep(800);
  return win; // true = initiator wins
}

async function triggerDamageDealtSkills(source, target, amount, options = {}) {
  if (!source.alive || !target) return;
  await triggerCustomSlashDamageRules(source, target, amount, options);
  if (!source.alive || state.winner || state.pendingDying) return;
  if (hasSkill(source, "kuanggu") && source.hp < source.maxHp) heal(source, amount, "狂骨");
  await triggerShiKuanggu(source, target, amount);
  await triggerYinzhanAfterSlashDamage(source, target, options);
  if (hasSkill(source, "lieren") && target.hand.length) {
    (async () => {
      const use = source.id === 0
        ? await showModal({ title: "烈刃", desc: `是否对 ${displayName(target)} 发动拼点？赢则获得其一张牌。`, type: "confirm" })
        : Math.random() > 0.4;
      if (!use) return;
      const win = await pindian(source, target);
      if (win && target.hand.length) {
        let stolen;
        if (source.id === 0) {
          stolen = await chooseHandCard(target, () => true, `【烈刃】：选择获得 ${target.name} 的一张手牌`, true);
        } else {
          stolen = randomHandCard(target);
        }
        if (stolen) source.hand.push(stolen);
        feedback(`${source.name} 发动【烈刃】，拼点获胜，获得 ${target.name} 的一张手牌。`);
      }
      renderAll();
    })();
  }
  if (hasSkill(source, "jiang") && (options.cardName === "杀" || options.cardName === "决斗")) {
    draw(source, 1);
    feedback(`${source.name} 发动【激昂】，摸一张牌。`);
  }
  const dongzhuo = state.players.find((p) => p.alive && hasSkill(p, "baonue") && p.role === "主公");
  if (dongzhuo && source.hero.camp === "群" && dongzhuo.hp < dongzhuo.maxHp && source.id !== dongzhuo.id) {
    const useIt = source.id === 0
      ? await showModal({ title: "暴虐", desc: `你造成伤害，是否令 ${dongzhuo.name} 判定？若为黑桃其回复1点体力`, type: "confirm" })
      : Math.random() > 0.45;
    if (useIt) {
      const judge = await performJudge(dongzhuo, "暴虐");
      if (judge && judge.suit === "♠") {
        heal(dongzhuo, 1, "暴虐");
        feedback(`${dongzhuo.name} 的【暴虐】触发，判定为 ${judgeText(judge)}，回复1点体力。`);
      } else {
        feedback(`${dongzhuo.name} 的【暴虐】触发，判定为 ${judgeText(judge)}，未命中。`);
      }
    }
  }
}

async function removeCard(player, cardId, toDiscard = true) {
  const index = player.hand.findIndex((c) => c.id === cardId);
  if (index < 0) return null;
  const [card] = player.hand.splice(index, 1);
  if (toDiscard) state.discard.push(card);
  await maybeTriggerTuntian(player);
  return card;
}

async function maybeTriggerTuntian(player) {
  if (!hasSkill(player, "tuntian")) return;
  if (state.turn === player.id) return;
  if (!await shouldUseSkill(player, "屯田", "回合外失去牌，可进行一次判定。")) return;
  const judge = await performJudge(player, "屯田");
  if (judge && judge.suit !== "♥") {
    if (!player.marks.tian) player.marks.tian = [];
    const idx = state.discard.findIndex((c) => c.id === judge.id);
    if (idx >= 0) player.marks.tian.push(state.discard.splice(idx, 1)[0]);
    else player.marks.tian.push(judge);
    feedback(`${player.name} 发动【屯田】，将 ${judgeText(judge)} 作为"田"置于武将牌上（当前${player.marks.tian.length}张）。`);
  }
  renderAll();
}

function takeDamageCard(player, card) {
  if (!card) return null;
  const index = state.discard.findIndex((item) => item.id === card.id);
  if (index < 0) return null;
  const [gained] = state.discard.splice(index, 1);
  player.hand.push(gained);
  return gained;
}

async function equipCard(player, card) {
  if (!player.equipment) player.equipment = { weapon: null, armor: null, attackHorse: null, defenseHorse: null };
  const slot = equipmentSlotFor(card);
  if (player.equipment?.[slot]) await removeEquipment(player, slot, true);
  player.equipment[slot] = card;
  player.hasCrossbow = player.equipment.weapon?.name === "诸葛连弩";
  feedback(`${player.name} 将【${card.name}】置入${equipmentSlotName(slot)}。`);
}

function equipmentSlotFor(card) {
  if (card.type === "武器") return "weapon";
  if (card.type === "防具") return "armor";
  if (card.horse === "attack" || ["赤兔", "大宛", "紫骍"].includes(card.name)) return "attackHorse";
  return "defenseHorse";
}

function equipmentSlotName(slot) {
  if (slot === "weapon") return "武器栏";
  if (slot === "armor") return "防具栏";
  if (slot === "attackHorse") return "-1坐骑栏";
  return "+1坐骑栏";
}

function slashLimit(player) {
  if (hasSkill(player, "paoxiao") || player.hasCrossbow) return Infinity;
  let limit = 1 + effectCount(player, "slashLimitPlusOne") + customRulePassiveAmount(player, "slashDamage", "slashLimit") + (player.temp?.customSlashLimit || 0);
  if (player.temp?.tianyiWin) limit += 1;
  if (player.temp?.zhuangshiSlashExtra) limit += player.temp.zhuangshiSlashExtra;
  return limit;
}

function canUseCard(player, card, target) {
  if (state.pendingReaction || state.pendingDying) return "请先处理当前响应。";
  if (!card || !player.alive || state.winner) return "当前不能使用这张牌。";
  if (state.turn !== player.id) return "只能在自己的回合出牌。";
  if (state.currentPhase !== "出牌阶段") return "当前还不是出牌阶段。";
  const useName = effectiveUseName(player, card);
  const needsTarget = effectiveNeedsTarget(player, card);
  if (useName === "无懈可击") return "【无懈可击】只能在锦囊结算前响应使用。";
  if (useName === "杀" && player.temp?.tianyiLose) return "【天义】拼点失败，本回合不能使用【杀】。";
  if (useName === "杀" && player.slashUsed >= slashLimit(player)) return "每个出牌阶段通常只能使用一张【杀】。";
  if (useName === "桃" && target && target.id !== player.id) return "出牌阶段【桃】只能对自己使用。";
  if (useName === "桃" && target && target.hp >= target.maxHp) return "体力已满时不能主动使用【桃】。";
  if (useName === "桃" && !target && player.hp >= player.maxHp) return "体力已满时不能主动使用【桃】。";
  if (useName === "酒" && player.temp?.wineUsed) return "【酒】每回合限使用一次。";
  if (useName === "闪电" && hasJudgeCard(player, "闪电")) return "你的判定区已有【闪电】。";
  if (needsTarget && (!target || !target.alive) && useName !== "铁索连环") return "这张牌需要选择一名存活角色。";
  if (needsTarget && target && target.id === player.id && !["铁索连环", "火攻"].includes(useName)) return "这张牌需要选择一名其他存活角色。";
  if (target && ["过河拆桥", "顺手牵羊"].includes(useName) && !hasAnyCardInArea(target)) return `【${useName}】的目标区域里没有牌。`;
  if (target && useName === "火攻" && !target.hand.length) return "【火攻】只能指定有手牌的角色。";
  if (target && ["乐不思蜀", "兵粮寸断"].includes(useName) && hasJudgeCard(target, useName)) return `${target.name} 的判定区已有【${useName}】。`;
  if (target && useName === "杀" && !player.temp?.tianyiWin && !player.temp?.zhuangshiNoDistanceLeft && distanceBetween(player, target) > attackRange(player)) return `目标不在攻击范围内（距离${distanceBetween(player, target)}，攻击范围${attackRange(player)}）。`;
  if (target && ["顺手牵羊", "兵粮寸断"].includes(useName) && distanceBetween(player, target) > 1 && !hasSkill(player, "qicai")) return `【${useName}】只能指定距离为1的角色。`;
  if (target && hasSkill(target, "kongcheng") && !target.hand.length && ["杀", "决斗"].includes(useName)) return "空城：无手牌角色不能成为【杀】或【决斗】目标。";
  if (target && hasSkill(target, "qianxun") && ["顺手牵羊", "乐不思蜀"].includes(useName)) return "谦逊：不能成为【顺手牵羊】和【乐不思蜀】目标。";
  if (target && hasSkill(target, "weimu") && card.type.includes("锦囊") && isBlack(card)) return "帷幕：不能成为黑色锦囊目标。";
  return "";
}

function effectiveUseName(player, card) {
  if (!card) return "";
  if (["火杀", "雷杀"].includes(card.name)) return "杀";
  if (card.name === "闪" && hasSkill(player, "longdan")) return "杀";
  if (card.name === "闪" && hasSkill(player, "wusheng") && isRed(card)) return "杀";
  if (player.temp?.shuangxiongColor && card.name !== "决斗") {
    const cardColor = isRed(card) ? "red" : "black";
    if (cardColor !== player.temp.shuangxiongColor) return "决斗";
  }
  return card.name;
}

function effectiveNeedsTarget(player, card) {
  const useName = effectiveUseName(player, card);
  return card?.needsTarget || ["杀", "决斗", "顺手牵羊", "过河拆桥", "火攻", "铁索连环", "乐不思蜀", "兵粮寸断"].includes(useName);
}

async function startReaction({ player, source, required, onMiss, successText, missText }) {
  if (required === "闪" && (await shouldTryBagua(player)) && await tryBaguaResponse(player)) {
    feedback(successText || `${player.name} 通过【八卦阵】响应了【闪】。`);
    checkWin();
    render();
    return Promise.resolve(true);
  }
  const hasResponse = canRespond(player, required);
  if (!hasResponse || player.id !== 0) {
    return sleep(1100).then(async () => {
      const responded = hasResponse && (await consumeResponse(player, required));
      if (responded) {
        feedback(successText || `${player.name} 打出【${required}】响应。`);
      } else {
        feedback(missText || `${player.name} 没有打出【${required}】。`);
        await onMiss?.();
      }
      checkWin();
      render();
      return responded;
    });
  }
  feedback(`${source.name} 正在逼你响应【${required}】。`);
  return new Promise((resolve) => {
    state.pendingReaction = {
      playerId: player.id,
      sourceId: source.id,
      required,
      onMiss,
      successText,
      missText,
      resolve,
      timeout: setTimeout(() => finishReaction(false), 6500)
    };
    selectedCardId = null;
    render();
  });
}

async function finishReaction(success) {
  const reaction = state?.pendingReaction;
  if (!reaction) return;
  clearTimeout(reaction.timeout);
  state.pendingReaction = null;
  selectedCardId = null;
  if (success) {
    feedback(reaction.successText || `你打出【${reaction.required}】响应。`);
    reaction.resolve(true);
  } else {
    feedback(reaction.missText || `你没有打出【${reaction.required}】。`);
    await reaction.onMiss?.();
    reaction.resolve(false);
  }
  checkWin();
  render();
}

function selectReactionCard(card) {
  const reaction = state.pendingReaction;
  const player = state.players[reaction.playerId];
  if (!player.hand.some((item) => item.id === card.id) || !cardCanRespondAs(player, card, reaction.required)) {
    toast(`此时需要打出【${reaction.required}】。`);
    return;
  }
  if (selectedCardId === card.id) {
    confirmReactionCard();
    return;
  }
  selectedCardId = card.id;
  render();
}

function confirmReactionCard() {
  const reaction = state.pendingReaction;
  if (!reaction) return;
  const player = state.players[reaction.playerId];
  const index = player.hand.findIndex((item) => item.id === selectedCardId);
  if (index < 0 || !cardCanRespondAs(player, player.hand[index], reaction.required)) {
    toast(`请先选择一张可当【${reaction.required}】打出的牌。`);
    return;
  }
  state.discard.push(player.hand.splice(index, 1)[0]);
  recordJiufaName(player, reaction.required);
  selectedCardId = null;
  maybeTriggerTuntian(state.players[0]).catch(() => {});
  finishReaction(true);
}

function randomHandCard(player) {
  if (!player.hand.length) return null;
  const index = Math.floor(Math.random() * player.hand.length);
  return player.hand.splice(index, 1)[0];
}

function equipmentEntries(player) {
  const equipment = player.equipment || {};
  return ["weapon", "armor", "attackHorse", "defenseHorse"]
    .filter((slot) => equipment[slot])
    .map((slot) => ({ slot, card: equipment[slot] }));
}

async function removeEquipment(player, slot, toDiscard = true) {
  const card = player.equipment?.[slot];
  if (!card) return null;
  player.equipment[slot] = null;
  player.hasCrossbow = player.equipment.weapon?.name === "诸葛连弩";
  if (toDiscard) state.discard.push(card);
  if (card.name === "白银狮子") {
    heal(player, 1, "白银狮子");
  }
  if (hasSkill(player, "xiaoji")) {
    draw(player, 2);
    feedback(`${player.name} 发动【枭姬】，失去装备后摸两张牌。`);
  }
  await maybeTriggerTuntian(player);
  return card;
}

async function randomAnyCard(player) {
  const pool = [
    ...player.hand.map((card) => ({ area: "hand", card })),
    ...equipmentEntries(player).map((entry) => ({ area: "equip", ...entry })),
    ...(player.judgeArea || []).map((card) => ({ area: "judge", card }))
  ];
  if (!pool.length) return null;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  if (pick.area === "hand") return randomSpecificHandCard(player, pick.card.id);
  if (pick.area === "judge") return removeJudgeCard(player, pick.card.id);
  return await removeEquipment(player, pick.slot, false);
}

function cardBrief(card) {
  return `${card.suit || ""}${card.rank || ""}【${card.name}】`;
}

async function chooseHandCard(player, predicate = () => true, title = "请选择一张手牌", allowCancel = true) {
  const candidates = player.hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => predicate(card));
  if (!candidates.length) return null;
  if (player.id !== 0) {
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    return player.hand.splice(pick.index, 1)[0];
  }
  const options = candidates.map(({ card }, i) => ({ label: `${cardBrief(card)} ${card.type}`, value: i }));
  const choice = await showModal({ title, type: "select", options, allowCancel });
  if (choice === null || !Number.isInteger(choice) || choice < 0 || choice >= candidates.length) return null;
  return player.hand.splice(candidates[choice].index, 1)[0];
}

async function chooseMultipleHandCards(player, count, predicate = () => true, title = "请选择手牌", allowCancel = true) {
  const chosen = [];
  for (let i = 0; i < count; i++) {
    const card = await chooseHandCard(player, predicate, `${title}（${i + 1}/${count}）`, allowCancel);
    if (!card) {
      player.hand.push(...chosen);
      return null;
    }
    chosen.push(card);
  }
  return chosen;
}

async function chooseHandCardsRange(player, min, max, predicate = () => true, title = "请选择手牌", allowCancel = true) {
  const candidates = player.hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => predicate(card));
  if (!candidates.length || max <= 0) return [];
  const limit = Math.min(max, candidates.length);
  if (player.id !== 0) {
    const count = Math.max(min, Math.min(limit, Math.ceil(candidates.length / 3)));
    return candidates
      .sort((a, b) => aiCardValue(a.card) - aiCardValue(b.card))
      .slice(0, count)
      .sort((a, b) => b.index - a.index)
      .map(({ index }) => player.hand.splice(index, 1)[0])
      .filter(Boolean);
  }
  const choices = await showModal({
    title,
    desc: `至少${min}张，最多${limit}张`,
    type: "cardSelect",
    options: candidates.map(({ card }) => ({ name: card.name, type: `${card.suit || ""}${card.rank || ""} · ${card.type}`, value: null })),
    multiSelect: true,
    minSelect: min,
    maxSelect: limit,
    allowCancel
  });
  if (!choices || choices.length < min) return [];
  return choices
    .map((choice) => candidates[choice])
    .filter(Boolean)
    .sort((a, b) => b.index - a.index)
    .map(({ index }) => player.hand.splice(index, 1)[0])
    .filter(Boolean);
}

async function chooseMultipleAreaCards(player, min, max, predicate = () => true, title = "请选择区域牌") {
  const options = areaCardOptions(player, true).filter((option) => predicate(option.card));
  if (!options.length) return [];
  if (player.id !== 0) {
    const aiResults = [];
    for (const option of options
      .sort((a, b) => aiCardValue(a.card) - aiCardValue(b.card))
      .slice(0, Math.min(max, options.length))) {
      aiResults.push(await removeAreaOption(player, option));
    }
    return aiResults.filter(Boolean);
  }
  const modalOptions = options.map((item) => ({ label: item.label, value: null }));
  const choices = await showModal({ title, desc: `至少${min}张，最多${max}张`, type: "select", options: modalOptions, multiSelect: true, minSelect: min, maxSelect: max, allowCancel: true });
  if (!choices || choices.length < min) return [];
  const removed = await Promise.all(choices.map((index) => removeAreaOption(player, options[index])));
  return removed.filter(Boolean);
}

function areaCardOptions(player, revealHand = true) {
  return [
    ...player.hand.map((card, index) => ({ area: "hand", label: revealHand ? `手牌 ${cardBrief(card)}` : `手牌 第${index + 1}张`, card, index })),
    ...equipmentEntries(player).map((entry) => ({ area: "equip", label: `${equipmentSlotName(entry.slot)} ${cardBrief(entry.card)}`, ...entry })),
    ...(player.judgeArea || []).map((card, index) => ({ area: "judge", label: `判定区 ${cardBrief(card)}`, card, index }))
  ];
}

async function chooseAreaCard(target, chooser, title = "请选择一张区域牌") {
  const options = areaCardOptions(target, chooser.id === target.id);
  if (!options.length) return null;
  if (chooser.id !== 0) {
    return options[Math.floor(Math.random() * options.length)];
  }
  const modalOptions = options.map((item) => ({ label: item.label, value: null }));
  const choice = await showModal({ title, type: "select", options: modalOptions, allowCancel: true });
  if (choice === null || !Number.isInteger(choice) || choice < 0 || choice >= options.length) return options[Math.floor(Math.random() * options.length)];
  return options[choice];
}

async function removeAreaOption(player, option) {
  if (!option) return null;
  if (option.area === "hand") { const card = randomSpecificHandCard(player, option.card.id); await maybeTriggerTuntian(player); return card; }
  if (option.area === "judge") { const card = removeJudgeCard(player, option.card.id); await maybeTriggerTuntian(player); return card; }
  return await removeEquipment(player, option.slot, false);
}

async function takeChosenAreaCard(fromPlayer, chooser, toPlayer = null, reason = "选择一张区域牌") {
  const option = await chooseAreaCard(fromPlayer, chooser, reason);
  const card = await removeAreaOption(fromPlayer, option);
  if (card && toPlayer) toPlayer.hand.push(card);
  return card;
}

function hasAnyCardInArea(player) {
  return Boolean(player.hand.length || equipmentEntries(player).length || player.judgeArea?.length);
}

function hasJudgeCard(player, name) {
  return Boolean(player.judgeArea?.some((card) => card.name === name));
}

function removeJudgeCard(player, cardId) {
  if (!player.judgeArea) return null;
  const index = player.judgeArea.findIndex((card) => card.id === cardId);
  if (index < 0) return null;
  return player.judgeArea.splice(index, 1)[0];
}

async function takeRandomAreaCard(fromPlayer, toPlayer = null) {
  const card = await randomAnyCard(fromPlayer);
  if (card && toPlayer) toPlayer.hand.push(card);
  return card;
}

function attackRange(player) {
  return Number(player.equipment?.weapon?.range || 1);
}

function seatDistance(from, to) {
  const aliveSeats = state.players.filter((player) => player.alive).map((player) => player.id);
  const fromIndex = aliveSeats.indexOf(from.id);
  const toIndex = aliveSeats.indexOf(to.id);
  if (fromIndex < 0 || toIndex < 0 || from.id === to.id) return 0;
  const total = aliveSeats.length;
  const clockwise = (toIndex - fromIndex + total) % total;
  const counter = (fromIndex - toIndex + total) % total;
  return Math.max(1, Math.min(clockwise || total, counter || total));
}

function distanceBetween(from, to) {
  let distance = seatDistance(from, to);
  if (from.equipment?.attackHorse) distance -= 1;
  if (to.equipment?.defenseHorse) distance += 1;
  if (hasSkill(from, "mashu")) distance -= 1;
  return Math.max(1, distance);
}

function randomSpecificHandCard(player, cardId) {
  const index = player.hand.findIndex((card) => card.id === cardId);
  if (index < 0) return null;
  return player.hand.splice(index, 1)[0];
}

function stealRandomHandCard(fromPlayer, toPlayer) {
  const stolen = randomHandCard(fromPlayer);
  if (stolen) toPlayer.hand.push(stolen);
  return stolen;
}

function isRed(card) {
  return card?.suit === "♥" || card?.suit === "♦" || (card?.suit === "♠" && card?.ownerHero === "小乔");
}

function isBlack(card) {
  return card?.suit === "♠" || card?.suit === "♣";
}

function markSkillUsed(player, skillId) {
  player.usedSkills[skillId] = true;
}

function skillUsed(player, skillId) {
  return Boolean(player.usedSkills?.[skillId]);
}

function skillTextForEffect(player, effect) {
  const entry = playerSkillEntries(player).find((item) => item.effect === effect);
  return entry?.skill || "";
}

function skillCanRepeatInPlayPhase(player, effect) {
  if (["qixi", "guose", "duanliang", "huoji", "luanji", "lianhuan", "jixi"].includes(effect)) return true;
  const text = skillTextForEffect(player, effect);
  return /出牌阶段/.test(text)
    && /可|可以/.test(text)
    && !/限一次|限一|每阶段限|每回合限|一局限|限定技|觉醒技/.test(text);
}

function skillAvailableThisPhase(player, effect) {
  if (isCustomRuleEffect(effect)) {
    const rule = customRuleForPlayer(player, effect);
    return !customRuleUsed(player, effect, rule);
  }
  return !skillUsed(player, effect) || skillCanRepeatInPlayPhase(player, effect);
}

function skillSourceCardPredicate(effect) {
  if (effect === "qixi") return isBlack;
  if (effect === "guose") return (card) => card.suit === "♦";
  if (effect === "duanliang") return (card) => isBlack(card) && (card.type === "基础" || ["武器", "防具", "坐骑"].includes(card.type));
  if (effect === "huoji") return isRed;
  if (effect === "lianhuan") return (card) => card.suit === "♣";
  return () => true;
}

function skillSourceCardOptions(player, effect) {
  const predicate = skillSourceCardPredicate(effect);
  if (effect === "huoji") {
    return player.hand
      .map((card, index) => ({ area: "hand", label: `手牌 ${cardBrief(card)}`, card, index }))
      .filter((option) => predicate(option.card));
  }
  return areaCardOptions(player, true).filter((option) => predicate(option.card));
}

function hasSkillSourceCard(player, effect) {
  if (effect === "jixi" && player.marks.jixiAwakened) return (player.marks.tian?.length || 0) > 0;
  return skillSourceCardOptions(player, effect).length > 0;
}

async function chooseSkillSourceCard(player, effect, title) {
  if (effect === "jixi" && player.marks.jixiAwakened) {
    const tian = player.marks.tian || [];
    if (!tian.length) return null;
    if (player.id !== 0) {
      const idx = Math.floor(Math.random() * tian.length);
      const card = tian.splice(idx, 1)[0];
      feedback(`${player.name} 消耗一张"田"（${cardBrief(card)}）发动【急袭】。`);
      return card;
    }
    const opts = tian.map((c, i) => ({ label: `田 ${cardBrief(c)}`, value: i }));
    const choice = await showModal({ title, type: "select", options: opts, allowCancel: true });
    if (choice === null || choice < 0 || choice >= tian.length) return null;
    const card = tian.splice(choice, 1)[0];
    feedback(`${player.name} 消耗一张"田"（${cardBrief(card)}）发动【急袭】。`);
    return card;
  }
  const options = skillSourceCardOptions(player, effect);
  if (!options.length) return null;
  if (player.id !== 0) {
    const option = options[Math.floor(Math.random() * options.length)];
    return await removeAreaOption(player, option);
  }
  const modalOptions = options.map((item) => ({ label: item.label, value: null }));
  const choice = await showModal({ title, type: "select", options: modalOptions, allowCancel: true });
  if (choice === null || !Number.isInteger(choice) || choice < 0 || choice >= options.length) return null;
  return await removeAreaOption(player, options[choice]);
}

function hasSkillTargets(player, effect) {
  return state.players.some((target) => canTargetSkill(player, effect, target));
}

function quhuDamageTargets(tiger) {
  if (!tiger?.alive) return [];
  return state.players.filter((target) =>
    target.alive
    && target.id !== tiger.id
    && distanceBetween(tiger, target) <= attackRange(tiger)
  );
}

function chooseAiQuhuVictim(skillOwner, tiger) {
  const candidates = quhuDamageTargets(tiger);
  if (!candidates.length) return null;
  return candidates
    .sort((a, b) =>
      (relation(skillOwner, b) === "enemy") - (relation(skillOwner, a) === "enemy")
      || a.hp - b.hp
      || a.hand.length - b.hand.length
    )[0];
}

async function resolveQuhuSkill(player, target) {
  feedback(`${displayName(player)} 发动【驱虎】，与 ${displayName(target)} 拼点。`);
  const win = await pindian(player, target);
  if (win === null) {
    feedback(`【驱虎】拼点未完成，技能结算中止。`);
    return false;
  }
  if (win) {
    const candidates = quhuDamageTargets(target);
    if (!candidates.length) {
      feedback(`${displayName(target)} 拼点失败，但其攻击范围内没有可受到【驱虎】伤害的角色。`);
      markSkillUsed(player, "quhu");
      renderAll();
      return true;
    }
    let victim;
    if (player.id === 0) {
      const opts = candidates.map((p) => ({ label: displayName(p), value: p.id }));
      const chosen = await showModal({ title: "驱虎", desc: `选择 ${displayName(target)} 攻击范围内的一名角色受到1点伤害`, type: "select", options: opts, allowCancel: false });
      victim = state.players.find((p) => p.id === chosen);
    } else {
      victim = chooseAiQuhuVictim(player, target);
    }
    if (!victim?.alive) {
      feedback(`【驱虎】没有选择伤害目标。`);
      markSkillUsed(player, "quhu");
      renderAll();
      return true;
    }
    feedback(`${displayName(player)} 【驱虎】拼点获胜，令 ${displayName(target)} 对 ${displayName(victim)} 造成1点伤害。`);
    await damage(victim, target, 1, { skill: "驱虎" });
  } else {
    feedback(`${displayName(player)} 【驱虎】拼点未赢，${displayName(target)} 对 ${displayName(player)} 造成1点伤害。`);
    await damage(player, target, 1, { skill: "驱虎" });
  }
  markSkillUsed(player, "quhu");
  renderAll();
  return true;
}

async function resolveTianyiSkill(player, target) {
  feedback(`${displayName(player)} 发动【天义】，与 ${displayName(target)} 拼点。`);
  const win = await pindian(player, target);
  if (win === null) {
    feedback(`【天义】拼点未完成，技能结算中止。`);
    return false;
  }
  if (win) {
    player.temp.tianyiWin = true;
    feedback(`${displayName(player)} 【天义】拼点获胜！本回合出杀无距离限制、可额外指定目标、可多出一张杀。`);
  } else {
    player.temp.tianyiLose = true;
    feedback(`${displayName(player)} 【天义】拼点失败，本回合不能使用【杀】。`);
  }
  markSkillUsed(player, "tianyi");
  renderAll();
  return true;
}

function customRuleMark(effect) {
  return `custom:${effect}`;
}

function customRuleUsed(player, effect, rule) {
  if (rule?.limit === "none" || rule?.limit === "forced") return false;
  return Boolean(player.usedSkills?.[customRuleMark(effect)] || player.marks?.[customRuleMark(effect)]);
}

function markCustomRuleUsed(player, effect, rule) {
  const mark = customRuleMark(effect);
  if (rule?.limit === "game") player.marks[mark] = true;
  else if (rule?.limit !== "none" && rule?.limit !== "forced") player.usedSkills[mark] = true;
}

function customRuleNeedsTarget(rule) {
  return Boolean(rule && customRuleActions(rule).some((item) =>
    (item.target || rule.target) !== "self"
    && ["damage", "fireDamage", "discardTarget", "stealTarget", "heal", "draw"].includes(item.action)
  ));
}

function customRuleCanTarget(player, rule, target) {
  if (!rule || !target?.alive) return false;
  if (rule.target === "self") return target.id === player.id;
  if (rule.target === "source") return target.id !== player.id;
  if (target.id === player.id) return false;
  if (rule.target === "damaged") return target.hp < target.maxHp;
  if (rule.target === "enemy") return relation(player, target) === "enemy";
  return true;
}

function customRuleTargets(player, rule) {
  return state.players.filter((target) => customRuleCanTarget(player, rule, target));
}

function chooseAiCustomRuleTarget(player, rule) {
  const targets = customRuleTargets(player, rule);
  if (!targets.length) return null;
  const actions = customRuleActions(rule).map((item) => item.action);
  if (actions.includes("heal") || actions.includes("draw")) {
    return targets.sort((a, b) => (relation(player, b) === "ally") - (relation(player, a) === "ally") || a.hp - b.hp)[0];
  }
  return targets.sort((a, b) => (relation(player, b) === "enemy") - (relation(player, a) === "enemy") || a.hp - b.hp)[0];
}

async function payCustomRuleCost(player, rule, skillNameText) {
  if (!rule || rule.cost === "none") return true;
  if (rule.cost === "discard1") {
    const cost = player.id === 0
      ? await chooseHandCard(player, () => true, `发动【${skillNameText}】：请选择一张手牌弃置。`, true)
      : randomHandCard(player);
    if (!cost) return false;
    state.discard.push(cost);
    feedback(`${displayName(player)} 为【${skillNameText}】弃置 ${cardBrief(cost)}。`);
    return true;
  }
  if (rule.cost === "loseHp1") {
    return loseHp(player, 1, null, skillNameText);
  }
  return true;
}

function customStepReceiver(player, rule, selectedTarget, step, context = {}) {
  const targetId = step.target || rule.target;
  if (targetId === "self") return player;
  if (targetId === "source") return context.source?.alive ? context.source : selectedTarget;
  if (targetId === "damaged") return context.damaged?.alive ? context.damaged : selectedTarget;
  return selectedTarget || player;
}

async function applyCustomRuleAction(player, rule, target, skillNameText, context = {}) {
  let resolved = false;
  for (const step of customRuleActions(rule)) {
    const amount = Number(step.amount || 1);
    const receiver = customStepReceiver(player, rule, target, step, context);
    if (!receiver?.alive) continue;
    if (step.action === "draw") {
    draw(receiver, amount);
    feedback(`${displayName(player)} 的【${skillNameText}】令 ${displayName(receiver)} 摸${amount}张牌。`);
      resolved = true;
      continue;
    }
    if (step.action === "heal") {
    const recovered = heal(receiver, amount, skillNameText);
    if (!recovered) feedback(`${displayName(receiver)} 体力已满，【${skillNameText}】未回复体力。`);
      resolved = true;
      continue;
    }
    if (step.action === "damage" || step.action === "fireDamage") {
      await damage(receiver, player, amount, { skill: skillNameText, element: step.action === "fireDamage" ? "fire" : "normal" });
      resolved = true;
      continue;
    }
    if (step.action === "discardTarget") {
    const lost = await randomAnyCard(receiver);
    if (lost) {
      state.discard.push(lost);
      feedback(`${displayName(player)} 的【${skillNameText}】弃置 ${displayName(receiver)} 的 ${cardBrief(lost)}。`);
        resolved = true;
        continue;
    }
    feedback(`${displayName(receiver)} 没有可弃置的牌，【${skillNameText}】无效果。`);
      continue;
    }
    if (step.action === "stealTarget") {
    const stolen = await randomAnyCard(receiver);
    if (stolen) {
      player.hand.push(stolen);
      feedback(`${displayName(player)} 的【${skillNameText}】获得 ${displayName(receiver)} 的 ${cardBrief(stolen)}。`);
        resolved = true;
        continue;
    }
    feedback(`${displayName(receiver)} 没有可获得的牌，【${skillNameText}】无效果。`);
      continue;
    }
    if (step.action === "slashLimit") {
    player.temp.customSlashLimit = (player.temp.customSlashLimit || 0) + amount;
    feedback(`${displayName(player)} 的【${skillNameText}】令本回合【杀】次数+${amount}。`);
      resolved = true;
      continue;
    }
    if (step.action === "slashDamage") {
    player.temp.customSlashDamage = (player.temp.customSlashDamage || 0) + amount;
    feedback(`${displayName(player)} 的【${skillNameText}】令本回合【杀】伤害+${amount}。`);
      resolved = true;
      continue;
    }
  }
  return resolved;
}

async function activateCustomRule(player, effect, target = null, automatic = false, context = {}) {
  const rule = customRuleForPlayer(player, effect);
  if (!rule || rule.timing === "none") return false;
  if (customRuleUsed(player, effect, rule)) return false;
  if (rule.timing === "play" && state.currentPhase !== "出牌阶段") return false;
  const name = customRuleSkillName(player, effect);
  const finalTarget = customRuleNeedsTarget(rule)
    ? target || (automatic ? chooseAiCustomRuleTarget(player, rule) : null)
    : player;
  if (customRuleNeedsTarget(rule) && !customRuleCanTarget(player, rule, finalTarget)) return false;
  if (!await payCustomRuleCost(player, rule, name)) return false;
  feedback(`${displayName(player)} 发动自创技能【${name}】。`);
  const resolved = await applyCustomRuleAction(player, rule, finalTarget, name, context);
  if (resolved) markCustomRuleUsed(player, effect, rule);
  return resolved;
}

async function triggerCustomRules(player, timing) {
  for (const effect of playerEffects(player).filter(isCustomRuleEffect)) {
    const rule = customRuleForPlayer(player, effect);
    if (!rule || rule.timing !== timing || customRuleUsed(player, effect, rule)) continue;
    if (["draw", "slashDamage", "handLimit"].includes(timing)) continue;
    if (rule.limit !== "forced") {
      const useIt = player.id === 0
        ? await showModal({ title: `发动自创技能【${customRuleSkillName(player, effect)}】`, desc: customRuleLabel(rule), type: "confirm" })
        : true;
      if (!useIt) continue;
    }
    let target = null;
    if (player.id === 0 && customRuleNeedsTarget(rule)) {
      const targets = customRuleTargets(player, rule);
      if (!targets.length) continue;
      const choice = await showModal({
        title: `自创技能【${customRuleSkillName(player, effect)}】`,
        desc: "选择技能目标",
        type: "select",
        options: targets.map((item) => ({ label: displayName(item), value: item.id })),
        allowCancel: rule.limit !== "forced"
      });
      if (choice == null) continue;
      target = targets.find((item) => item.id === choice) || null;
    }
    await activateCustomRule(player, effect, target, player.id !== 0);
    if (state.pendingReaction || state.pendingDying || state.winner) return;
  }
}

async function triggerCustomSlashDamageRules(source, damagedTarget, amount, options = {}) {
  if (!source?.alive || options.cardName !== "杀") return;
  for (const effect of playerEffects(source).filter(isCustomRuleEffect)) {
    const rule = customRuleForPlayer(source, effect);
    if (!rule || rule.timing !== "slashDamage" || customRuleUsed(source, effect, rule)) continue;
    if (customRuleActions(rule).every((item) => ["slashDamage", "slashLimit", "handLimit"].includes(item.action))) continue;
    const skillNameText = customRuleSkillName(source, effect);
    if (rule.limit !== "forced") {
      const useIt = source.id === 0
        ? await showModal({
          title: `发动自创技能【${skillNameText}】`,
          desc: `你使用【杀】对 ${displayName(damagedTarget)} 造成了${amount}点伤害。${customRuleLabel(rule)}`,
          type: "confirm"
        })
        : true;
      if (!useIt) continue;
    }
    let target = null;
    if (rule.target === "self") {
      target = source;
    } else if (rule.target === "damaged" && customRuleCanTarget(source, rule, damagedTarget)) {
      target = damagedTarget;
    } else if (source.id === 0 && customRuleNeedsTarget(rule)) {
      const targets = customRuleTargets(source, rule);
      if (!targets.length) continue;
      const choice = await showModal({
        title: `自创技能【${skillNameText}】`,
        desc: "选择技能目标",
        type: "select",
        options: targets.map((item) => ({ label: displayName(item), value: item.id })),
        allowCancel: rule.limit !== "forced"
      });
      if (choice == null) continue;
      target = targets.find((item) => item.id === choice) || null;
    }
    const used = await activateCustomRule(source, effect, target, source.id !== 0, { source, damaged: damagedTarget, amount, options });
    if (used) renderAll();
    if (state.pendingReaction || state.pendingDying || state.winner) return;
  }
}

async function triggerCustomDamageTakenRules(target, source, amount, options = {}) {
  if (!target?.alive) return;
  for (const effect of playerEffects(target).filter(isCustomRuleEffect)) {
    const rule = customRuleForPlayer(target, effect);
    if (!rule || rule.timing !== "damageTaken" || customRuleUsed(target, effect, rule)) continue;
    const skillNameText = customRuleSkillName(target, effect);
    if (rule.limit !== "forced") {
      const useIt = target.id === 0
        ? await showModal({
          title: `发动自创技能【${skillNameText}】`,
          desc: `你受到${amount}点伤害。${customRuleLabel(rule)}`,
          type: "confirm"
        })
        : true;
      if (!useIt) continue;
    }
    let selectedTarget = null;
    if (rule.target === "self") {
      selectedTarget = target;
    } else if (rule.target === "source" && source?.alive) {
      selectedTarget = source;
    } else if (target.id === 0 && customRuleNeedsTarget(rule)) {
      const targets = customRuleTargets(target, rule);
      if (!targets.length) continue;
      const choice = await showModal({
        title: `自创技能【${skillNameText}】`,
        desc: "选择技能目标",
        type: "select",
        options: targets.map((item) => ({ label: displayName(item), value: item.id })),
        allowCancel: rule.limit !== "forced"
      });
      if (choice == null) continue;
      selectedTarget = targets.find((item) => item.id === choice) || null;
    }
    const used = await activateCustomRule(target, effect, selectedTarget, target.id !== 0, { source, damaged: target, amount, options });
    if (used) renderAll();
    if (state.pendingReaction || state.pendingDying || state.winner) return;
  }
}

function skillCanResolveNow(player, effect) {
  if (!state || !player?.alive || state.winner || !hasSkill(player, effect)) return false;
  if (state.turn !== player.id || state.currentPhase !== "出牌阶段") return false;
  if (state.pendingReaction || state.pendingDying || state.discarding) return false;
  if (isCustomRuleEffect(effect)) {
    const rule = customRuleForPlayer(player, effect);
    if (!rule || rule.timing !== "play" || customRuleUsed(player, effect, rule)) return false;
    return customRuleNeedsTarget(rule) ? customRuleTargets(player, rule).length > 0 : true;
  }
  if (!skillAvailableThisPhase(player, effect)) return false;
  if (skillNeedsTarget(effect)) return hasSkillTargets(player, effect);
  if (effect === "limitedDrawTwo") return !player.marks.customLimitedDrawTwo;
  if (effect === "zhuangshi") return !skillUsed(player, effect) && (player.hand.length > 0 || player.hp > 0);
  if (effect === "zhiheng") return hasAnyCardInArea(player);
  if (effect === "pingxiang") return !player.marks.pingxiangUsed && player.maxHp > 9 && state.players.some((p) => p.alive && p.id !== player.id);
  if (effect === "qingnang") return player.hand.length > 0 && state.players.some((p) => p.alive && p.hp < p.maxHp);
  if (effect === "jieyin") return player.hand.length >= 2 && player.hp < player.maxHp && state.players.some((p) => p.alive && p.id !== player.id && p.hp < p.maxHp);
  if (effect === "lijian") return player.hand.length > 0 && chooseAnyEnemyPair(player).filter(Boolean).length >= 2;
  if (effect === "fanjian") return player.hand.length > 0 && Boolean(chooseAiTarget(player));
  if (effect === "qiangxi") return (player.hp > 1 || player.hand.some((c) => c.type === "武器") || player.equipment?.weapon) && Boolean(chooseAiTarget(player));
  if (effect === "quhu") {
    const target = state.players.find((p) => canTargetSkill(player, effect, p));
    return Boolean(target);
  }
  if (effect === "tianyi") {
    const target = state.players.find((p) => canTargetSkill(player, effect, p));
    return Boolean(target);
  }
  if (["tiaoxin", "shensu", "guhuo"].includes(effect)) return Boolean(chooseAiTarget(player));
  if (effect === "luanwu") return !player.marks.luanwuUsed;
  if (effect === "dimeng") {
    const [a, b] = chooseAnyEnemyPair(player);
    return Boolean(a && b && a.hand.length !== b.hand.length);
  }
  if (effect === "zhijian") return player.hand.some((c) => ["武器", "防具", "坐骑"].includes(c.type)) && Boolean(chooseSupportTarget(player));
  if (effect === "huashen") return !skillUsed(player, effect) && (ensureHuashenCards(player).length > 0 || huashenSkillPool().length > 0);
  if (effect === "luanji") {
    const suits = {};
    for (const c of player.hand) { suits[c.suit] = (suits[c.suit] || 0) + 1; }
    return Object.values(suits).some((n) => n >= 2);
  }
  if (effect === "kurou") return true;
  return true;
}

function skillUnavailableMessage(player, effect) {
  if (!state || !player?.alive || state.winner) return "当前不能发动技能。";
  if (!hasSkill(player, effect)) return "当前武将没有这个技能。";
  if (state.pendingReaction || state.pendingDying) return "请先处理当前响应。";
  if (state.discarding) return "请先完成当前弃牌/技能选择。";
  if (state.turn !== player.id) return "只能在自己的回合发动这个技能。";
  if (state.currentPhase !== "出牌阶段") return "这个技能当前只能在出牌阶段发动。";
  if (isCustomRuleEffect(effect)) {
    const rule = customRuleForPlayer(player, effect);
    if (!rule || rule.timing !== "play") return "这个自创技能不是出牌阶段主动技能。";
    if (customRuleUsed(player, effect, rule)) return "这个自创技能本阶段或本局已经发动过。";
    if (customRuleNeedsTarget(rule) && !customRuleTargets(player, rule).length) return "这个自创技能当前没有合法目标。";
    return "这个自创技能当前不能发动。";
  }
  if (!skillAvailableThisPhase(player, effect)) return `【${officialSkillLabels[effect] || effect}】本阶段已经不能再次发动。`;
  if (skillNeedsTarget(effect) && !hasSkillTargets(player, effect)) return `【${officialSkillLabels[effect] || effect}】当前没有可用牌或合法目标。`;
  return `【${officialSkillLabels[effect] || effect}】当前条件不足。`;
}

function heal(player, amount = 1, reason = "技能") {
  if (!player.alive || player.hp >= player.maxHp) return 0;
  const oldHp = player.hp;
  player.hp = Math.min(player.maxHp, player.hp + amount);
  feedback(`${player.name} 因【${reason}】回复${player.hp - oldHp}点体力。`);
  return player.hp - oldHp;
}

async function discardRandomCards(player, amount = 1) {
  let count = 0;
  const discarded = [];
  while (count < amount && player.hand.length) {
    const lost = randomHandCard(player);
    if (lost) {
      state.discard.push(lost);
      discarded.push(lost);
    }
    await maybeTriggerTuntian(player);
    count += 1;
  }
  maybeTriggerTianrenDiscard(discarded, "弃牌");
  if (!player.hand.length && hasSkill(player, "lianying")) {
    draw(player, 1);
    feedback(`${player.name} 发动【连营】，摸一张牌。`);
  }
  return count;
}

async function discardAnyCards(player, amount = 1) {
  let count = 0;
  const discarded = [];
  while (count < amount && hasAnyCardInArea(player)) {
    const lost = await takeRandomAreaCard(player);
    if (lost) {
      state.discard.push(lost);
      discarded.push(lost);
      count += 1;
    } else {
      break;
    }
  }
  maybeTriggerTianrenDiscard(discarded, "弃牌");
  if (!player.hand.length && hasSkill(player, "lianying")) {
    draw(player, 1);
    feedback(`${player.name} 发动【连营】，摸一张牌。`);
  }
  return count;
}

function judgeCard() {
  if (!state.deck.length) state.deck = shuffle(state.discard.splice(0));
  const card = state.deck.pop();
  if (card) state.discard.push(card);
  return card;
}

function judgeText(card) {
  return card ? `${card.suit}${card.rank || ""}【${card.name}】` : "无牌";
}

function judgeOwnerCard(card) {
  if (!card) return null;
  const index = state.discard.findIndex((item) => item.id === card.id);
  if (index < 0) return null;
  return state.discard[index];
}

function replaceJudgeCard(oldCard, replacer, newCard) {
  if (!oldCard || !replacer || !newCard) return oldCard;
  const handIndex = replacer.hand.findIndex((card) => card.id === newCard.id);
  const discardIndex = state.discard.findIndex((card) => card.id === oldCard.id);
  if (discardIndex < 0) return oldCard;
  const [replacement] = handIndex >= 0 ? replacer.hand.splice(handIndex, 1) : [newCard];
  state.discard[discardIndex] = replacement;
  state.discard.push(oldCard);
  feedback(`${replacer.name} 发动【${hasSkill(replacer, "guidao") ? "鬼道" : "鬼才"}】，以 ${judgeText(replacement)} 替换判定牌。`);
  return replacement;
}

async function maybeAlterJudge(owner, judge, reason = "判定") {
  let current = judge;
  for (const replacer of orderedAliveFrom(owner)) {
    if (!replacer.alive) continue;
    const canGuicai = hasSkill(replacer, "guicai") && replacer.hand.length;
    const canGuidao = hasSkill(replacer, "guidao") && replacer.hand.some(isBlack);
    if (!canGuicai && !canGuidao) continue;
    if (!await shouldUseSkill(replacer, canGuidao ? "鬼道" : "鬼才", `${reason}为 ${judgeText(current)}，可打出一张${canGuidao ? "黑色" : ""}手牌替换。`)) continue;
    const replacement = await chooseHandCard(replacer, (card) => canGuidao ? isBlack(card) : true, `发动【${canGuidao ? "鬼道" : "鬼才"}】：请选择替换 ${judgeText(current)} 的手牌。`, true);
    if (replacement) current = replaceJudgeCard(current, replacer, replacement);
  }
  return current;
}

async function afterJudgeResolved(owner, judge, reason = "判定") {
  if (!judge) return;
  if (hasSkill(owner, "tiandu") && await shouldUseSkill(owner, "天妒", `获得${reason}牌 ${judgeText(judge)}。`)) {
    const gained = judgeOwnerCard(judge);
    if (gained) {
      const index = state.discard.findIndex((card) => card.id === gained.id);
      owner.hand.push(state.discard.splice(index, 1)[0]);
      feedback(`${owner.name} 发动【天妒】，获得判定牌 ${judgeText(judge)}。`);
    }
  }
  const lord = state.players.find((p) => p.alive && p.role === "主公" && hasSkill(p, "songwei"));
  if (lord && lord.id !== owner.id && owner.hero.camp === "魏" && isBlack(judge) && await shouldUseSkill(owner, "颂威", `令主公 ${lord.name} 摸一张牌。`)) {
    draw(lord, 1);
    feedback(`${owner.name} 响应【颂威】，${lord.name} 摸一张牌。`);
  }
}

async function performJudge(owner, reason = "判定") {
  const original = judgeCard();
  const finalJudge = maybeAlterJudge(owner, original, reason);
  afterJudgeResolved(owner, finalJudge, reason);
  return finalJudge;
}

function isLightningHit(card) {
  return card?.suit === "♠" && ["2", "3", "4", "5", "6", "7", "8", "9"].includes(String(card.rank));
}

function addDelayedCard(target, card) {
  if (!target.judgeArea) target.judgeArea = [];
  target.judgeArea.push(card);
  feedback(`【${card.name}】置入 ${target.name} 的判定区。`);
}

function nextAlivePlayerAfter(player) {
  for (let offset = 1; offset <= state.players.length; offset++) {
    const candidate = state.players[(player.id + offset) % state.players.length];
    if (candidate.alive) return candidate;
  }
  return player;
}

function passLightning(fromPlayer, lightningCard) {
  for (let offset = 1; offset <= state.players.length; offset++) {
    const next = state.players[(fromPlayer.id + offset) % state.players.length];
    if (next.alive && !hasJudgeCard(next, "闪电")) {
      addDelayedCard(next, lightningCard);
      return;
    }
  }
  state.discard.push(lightningCard);
  feedback(`场上没有可接收【闪电】的角色，本张【闪电】置入弃牌堆。`);
}

async function processJudgeArea(player) {
  if (!player.judgeArea?.length) return;
  const delayedCards = [...player.judgeArea];
  player.judgeArea = [];
  for (const delayed of delayedCards) {
    if (!player.alive || state.winner) {
      state.discard.push(delayed);
      continue;
    }
    const judge = await performJudge(player, delayed.name);
    feedback(`${player.name} 的【${delayed.name}】判定：${judgeText(judge)}。`);
    if (delayed.name === "乐不思蜀") {
      if (judge?.suit !== "♥") {
        player.skipPlayPhase = true;
        feedback(`${player.name} 的【乐不思蜀】生效，跳过出牌阶段。`);
      } else {
        feedback(`${player.name} 的【乐不思蜀】未生效。`);
      }
      state.discard.push(delayed);
    } else if (delayed.name === "兵粮寸断") {
      if (judge?.suit !== "♣") {
        player.skipDrawPhase = true;
        feedback(`${player.name} 的【兵粮寸断】生效，跳过摸牌阶段。`);
      } else {
        feedback(`${player.name} 的【兵粮寸断】未生效。`);
      }
      state.discard.push(delayed);
    } else if (delayed.name === "闪电") {
      if (isLightningHit(judge)) {
        feedback(`${player.name} 的【闪电】命中，受到3点雷电伤害。`);
        state.discard.push(delayed);
        await damage(player, null, 3, { cardName: "闪电", element: "thunder", noSkill: false });
      } else {
        feedback(`${player.name} 的【闪电】未命中，传给下家。`);
        passLightning(player, delayed);
      }
    } else {
      state.discard.push(delayed);
    }
    render();
    await sleep(600);
  }
}

function chooseRaidTargets(player) {
  const candidates = state.players.filter((target) => target.alive && target.id !== player.id && target.hand.length);
  const enemies = candidates.filter((target) => relation(player, target) === "enemy");
  return (enemies.length ? enemies : candidates)
    .sort((a, b) => b.hand.length - a.hand.length || a.hp - b.hp)
    .slice(0, 2);
}

async function slashCannotBeDodged(attacker, target) {
  if (hasSkill(attacker, "tieji") && await shouldUseSkill(attacker, "铁骑", `对 ${target.name} 判定，若为红色其不能使用【闪】。`)) {
    const judge = await performJudge(attacker, "铁骑");
    if (isRed(judge)) {
      feedback(`${attacker.name} 发动【铁骑】，判定为红色，${target.name} 不能使用【闪】响应。`);
      return true;
    }
    feedback(`${attacker.name} 发动【铁骑】，判定未命中。`);
  }
  if (hasSkill(attacker, "liegong") && (target.hand.length >= attacker.hp || target.hand.length <= attackRange(attacker))) {
    feedback(`${attacker.name} 发动【烈弓】，${target.name} 不能使用【闪】响应。`);
    return true;
  }
  return false;
}

async function slashRequiredDodges(attacker, target) {
  let count = hasSkill(attacker, "wushuang") ? 2 : 1;
  const femaleHeroes = new Set(["甄姬", "大乔", "小乔", "孙尚香", "黄月英", "貂蝉", "祝融", "蔡文姬"]);
  if (hasSkill(attacker, "roulin") && femaleHeroes.has(target.hero?.name)) count = 2;
  if (hasSkill(target, "roulin") && femaleHeroes.has(attacker.hero?.name)) count = 2;
  if (hasSkill(target, "xiangle")) {
    const basic = await chooseHandCard(attacker, (card) => card.type === "基础", `${target.name} 的【享乐】触发：请选择一张基本牌弃置，否则此【杀】无效。`, true);
    if (basic) {
      state.discard.push(basic);
      feedback(`${target.name} 的【享乐】触发，${attacker.name} 弃置【${basic.name}】。`);
      if (!attacker.hand.length && hasSkill(attacker, "lianying")) {
        draw(attacker, 1);
        feedback(`${attacker.name} 发动【连营】，摸一张牌。`);
      }
    } else {
      feedback(`${target.name} 的【享乐】触发，【杀】无效。`);
      return Infinity;
    }
  }
  if (attacker.temp?.zhuangshiNoResponseLeft > 0) {
    attacker.temp.zhuangshiNoResponseLeft -= 1;
    feedback(`${attacker.name} 的【壮誓】生效，此【杀】不可被响应。`);
    return true;
  }
  return count;
}

function slashTargets(attacker, target) {
  const targets = [target].filter(Boolean);
  const slashLike = { name: "杀", type: "基础", needsTarget: true };
  // 天义: when winning pindian, can designate an additional target
  if (attacker.temp?.tianyiWin) {
    const extra = state.players
      .filter((p) => p.alive && p.id !== attacker.id && p.id !== target.id && !canUseCard(attacker, slashLike, p))
      .sort((a, b) => (relation(attacker, a) === "enemy" ? -1 : 1) - (relation(attacker, b) === "enemy" ? -1 : 1))[0];
    if (extra) {
      feedback(`${attacker.name} 的【天义】发动，额外指定 ${extra.name} 为目标。`);
      return [...targets, extra];
    }
  }
  if (attacker.equipment?.weapon?.name !== "方天画戟" || attacker.hand.length !== 0) return targets;
  const extras = state.players
    .filter((p) => p.alive && p.id !== attacker.id && p.id !== target.id && !canUseCard(attacker, slashLike, p))
    .filter((p) => relation(attacker, p) === relation(attacker, target))
    .slice(0, 2);
  if (extras.length) feedback(`${attacker.name} 的【方天画戟】发动，额外指定 ${extras.map((p) => p.name).join("、")}。`);
  return [...targets, ...extras];
}

async function resolveSlash(attacker, target, slashCard = null, options = {}) {
  if (!options.pojunChecked) {
    await triggerPojunOnSlashTarget(attacker, target);
  }
  // 大乔·流离: when targeted by 杀, discard a card to transfer to another player in attack range
  if (hasSkill(target, "liuli") && !options.liuliBypass && target.alive) {
    const canTransfer = state.players.some((p) => p.alive && p.id !== attacker.id && p.id !== target.id);
    if (canTransfer && target.hand.length + (target.equipment ? Object.values(target.equipment).filter(Boolean).length : 0) > 0) {
      let useLiuli = false;
      if (target.id === 0) {
        useLiuli = await showModal({ title: "流离", desc: `${displayName(attacker)} 对你使用【杀】，是否弃一张牌转移目标？`, type: "confirm" });
      } else {
        useLiuli = Math.random() > 0.4;
      }
      if (useLiuli) {
        // Discard a card
        let discarded = false;
        if (target.hand.length) {
          const idx = target.id === 0
            ? await showModal({ title: "流离", desc: "选择一张手牌弃置", type: "select", options: target.hand.map((c, i) => ({ label: `${c.suit}${c.rank} ${c.name}`, value: i })) })
            : Math.floor(Math.random() * target.hand.length);
          if (idx != null && target.hand[idx]) {
            state.discard.push(target.hand.splice(idx, 1)[0]);
            discarded = true;
          }
        } else {
          // Discard an equipment card
          const equips = Object.entries(target.equipment || {}).filter(([, v]) => v);
          if (equips.length) {
            const [slot, card] = equips[0];
            delete target.equipment[slot];
            state.discard.push(card);
            discarded = true;
          }
        }
        if (discarded) {
          // Choose new target within attacker's attack range
          const candidates = state.players.filter((p) => p.alive && p.id !== attacker.id && p.id !== target.id && distanceBetween(attacker, p) <= attackRange(attacker));
          let newTarget;
          if (candidates.length) {
            if (target.id === 0) {
              const opts = candidates.map((p) => ({ label: displayName(p), value: p.id }));
              const chosen = await showModal({ title: "流离", desc: "选择转移目标", type: "select", options: opts });
              newTarget = chosen != null ? candidates.find((p) => p.id === chosen) : candidates[0];
            } else {
              newTarget = candidates[Math.floor(Math.random() * candidates.length)];
            }
          }
          if (newTarget) {
            feedback(`${target.name} 发动【流离】，将【杀】转移给 ${newTarget.name}。`);
            renderAll();
            await sleep(400);
            return resolveSlash(attacker, newTarget, slashCard, { ...options, liuliBypass: true });
          }
        }
      }
    }
  }
  const damageAmount = options.damageAmount ?? slashDamage(attacker);
  let element = options.element || slashCardElement(slashCard);
  if (element === "normal" && attacker.equipment?.weapon?.name === "朱雀羽扇" && await shouldUseSkill(attacker, "朱雀羽扇", "将此普通【杀】改为火焰伤害。")) {
    element = "fire";
    feedback(`${attacker.name} 发动【朱雀羽扇】，此【杀】改为火杀。`);
  }
  if (options.consumeWine !== false) attacker.temp.wineDamage = 0;
  target.temp.armorIgnored = attacker.equipment?.weapon?.name === "青釭剑";
  if (target.temp.armorIgnored) {
    feedback(`${attacker.name} 的【青釭剑】生效，${target.name} 的防具无效。`);
  }
  if (!target.temp.armorIgnored && target.equipment?.armor?.name === "藤甲" && element === "normal") {
    feedback(`${target.name} 的【藤甲】生效，普通【杀】无效。`);
    target.temp.armorIgnored = false;
    return;
  }
  if (!target.temp.armorIgnored && target.equipment?.armor?.name === "仁王盾" && isBlack(slashCard)) {
    feedback(`${target.name} 的【仁王盾】生效，黑色【杀】无效。`);
    target.temp.armorIgnored = false;
    return;
  }
  const need = await slashRequiredDodges(attacker, target);
  if (need === Infinity) {
    target.temp.armorIgnored = false;
    return;
  }
  if (await slashCannotBeDodged(attacker, target)) {
    await applySlashDamage(attacker, target, damageAmount, slashCard, element);
    target.temp.armorIgnored = false;
    return;
  }
  let success = true;
  for (let i = 0; i < need; i++) {
    if (target.id === 0 && attacker.id !== 0) {
      const ok = await startReaction({
        player: target,
        source: attacker,
        required: "闪",
        successText: `你打出【闪】，响应了 ${attacker.name} 的【杀】。`,
        missText: `你没有打出足够的【闪】，受到【杀】的伤害。`,
        onMiss: () => applySlashDamage(attacker, target, damageAmount, slashCard, element)
      });
      if (!ok) {
        success = false;
        break;
      }
    } else if (!(await consumeResponse(target, "闪"))) {
      await applySlashDamage(attacker, target, damageAmount, slashCard, element);
      success = false;
      break;
    }
  }
  target.temp.armorIgnored = false;
  if (success) {
    log(`${target.name} 打出${need}张【闪】，抵消了杀。`);
    if (attacker.equipment?.weapon?.name === "贯石斧" && attacker.hand.length + equipmentEntries(attacker).length >= 2 && await shouldUseSkill(attacker, "贯石斧", "弃置两张牌，令此【杀】依然造成伤害。")) {
      await discardAnyCards(attacker, 2);
      feedback(`${attacker.name} 发动【贯石斧】，此【杀】依然生效。`);
      await applySlashDamage(attacker, target, damageAmount, slashCard, element);
    }
    if (hasSkill(attacker, "mengjin")) {
      await discardRandomCards(target, 1);
      feedback(`${attacker.name} 发动【猛进】，弃置 ${target.name} 一张牌。`);
    }
  }
}

function slashCardElement(card) {
  if (card?.element) return card.element;
  if (card?.name === "火杀") return "fire";
  if (card?.name === "雷杀") return "thunder";
  return "normal";
}

async function applySlashDamage(attacker, target, amount, slashCard, element = slashCardElement(slashCard)) {
  if (attacker.equipment?.weapon?.name === "寒冰剑" && hasAnyCardInArea(target) && await shouldUseSkill(attacker, "寒冰剑", `防止对 ${target.name} 的伤害，改为弃置其两张牌。`)) {
    const discarded = await discardAnyCards(target, 2);
    feedback(`${attacker.name} 发动【寒冰剑】，防止伤害并弃置 ${target.name} ${discarded}张牌。`);
    return;
  }
  if (attacker.equipment?.weapon?.name === "古锭刀" && !target.hand.length) {
    amount += 1;
    feedback(`${attacker.name} 的【古锭刀】生效，${target.name} 没有手牌，伤害+1。`);
  }
  if (shouldPojunAddDamage(attacker, target)) {
    amount += 1;
    feedback(`${attacker.name} 的【破军】触发，目标手牌数与装备数均不大于你，此【杀】伤害+1。`);
  }
  if (shouldYinzhanAddDamage(attacker, target, { cardName: "杀" })) {
    amount += 1;
    feedback(`${attacker.name} 的【饮战】触发，体力值不大于目标，此【杀】伤害+1。`);
  }
  const wasAlive = target.alive;
  await damage(target, attacker, amount, { cardName: "杀", damageCard: slashCard, element });
  if (wasAlive && target.alive && attacker.equipment?.weapon?.name === "麒麟弓") {
    const horseSlot = target.equipment?.defenseHorse ? "defenseHorse" : target.equipment?.attackHorse ? "attackHorse" : "";
    if (horseSlot && await shouldUseSkill(attacker, "麒麟弓", `弃置 ${target.name} 的坐骑。`)) {
      const horse = await removeEquipment(target, horseSlot, true);
      if (horse) feedback(`${attacker.name} 发动【麒麟弓】，弃置 ${target.name} 的【${horse.name}】。`);
    }
  }
}

function slashDamage(player) {
  return 1 + effectCount(player, "slashDamagePlusOne") + customRulePassiveAmount(player, "slashDamage", "slashDamage") + (player.temp?.customSlashDamage || 0) + (player.temp?.luoyi ? 1 : 0) + (player.temp?.wineDamage || 0);
}

function chooseSupportTarget(player) {
  const allies = state.players.filter((p) => p.alive && p.id !== player.id && relation(player, p) === "ally");
  const pool = allies.length ? allies : state.players.filter((p) => p.alive && p.id !== player.id);
  return pool.sort((a, b) => a.hp - b.hp || a.hand.length - b.hand.length)[0];
}

function chooseAnyEnemyPair(player) {
  const enemies = state.players.filter((p) => p.alive && p.id !== player.id && relation(player, p) === "enemy");
  const pool = enemies.length >= 2 ? enemies : state.players.filter((p) => p.alive && p.id !== player.id);
  return pool.slice(0, 2);
}

function cardCanRespondAs(player, card, required) {
  if (!card) return false;
  if (card.name === required) return true;
  if (required === "杀" && ["火杀", "雷杀"].includes(card.name)) return true;
  if (required === "酒" && hasSkill(player, "jiuchi") && card.suit === "♠") return true;
  if (required === "无懈可击" && hasSkill(player, "kanpo") && isBlack(card)) return true;
  if (required === "闪" && hasSkill(player, "qingguo") && isBlack(card)) return true;
  if (required === "闪" && hasSkill(player, "longdan") && card.name === "杀") return true;
  if (required === "杀" && hasSkill(player, "longdan") && card.name === "闪") return true;
  if (required === "杀" && hasSkill(player, "wusheng") && isRed(card)) return true;
  if (required === "桃" && hasSkill(player, "jijiu") && state.turn !== player.id && isRed(card)) return true;
  return false;
}

async function shouldNullify(responder, source, target, cardName) {
  if (responder.id === 0) {
    const desc = cardName === "无懈可击"
      ? `${source.name} 使用【无懈可击】，是否用【无懈可击】抵消？`
      : `${source.name} 对 ${target.name} 使用【${cardName}】，是否抵消？`;
    return showModal({ title: "使用【无懈可击】", desc, type: "confirm" });
  }
  const targetRelation = relation(responder, target);
  const sourceRelation = relation(responder, source);
  if (targetRelation === "ally" && sourceRelation === "enemy") return true;
  if (target.id === responder.id && sourceRelation === "enemy") return true;
  if (targetRelation === "enemy" && sourceRelation === "ally") return Math.random() > 0.65;
  return false;
}

function consumeNullify(responder) {
  const index = responder.hand.findIndex((card) => cardCanRespondAs(responder, card, "无懈可击"));
  if (index < 0) return null;
  const [card] = responder.hand.splice(index, 1);
  state.discard.push(card);
  recordJiufaName(responder, "无懈可击");
  return card;
}

async function resolveNullifyWindow(source, target, cardName, options = {}) {
  const allowSource = options.allowSource || cardName === "无懈可击";
  const excluded = new Set(options.excludeIds || []);
  for (const responder of orderedAliveFrom(source)) {
    if (excluded.has(responder.id)) continue;
    if (!allowSource && responder.id === source.id) continue;
    if (!responder.alive || !responder.hand.some((card) => cardCanRespondAs(responder, card, "无懈可击"))) continue;
    if (!(await shouldNullify(responder, source, target, cardName))) continue;
    const nullify = consumeNullify(responder);
    if (!nullify) continue;
    feedback(`${responder.name} 使用【无懈可击】${nullify.name !== "无懈可击" ? `（由【${nullify.name}】转化）` : ""}，抵消【${cardName}】${cardName === "无懈可击" ? "" : `对 ${target.name} 的效果`}。`);
    const countered = await resolveNullifyWindow(responder, source, "无懈可击", { allowSource: true, excludeIds: [responder.id] });
    await sleep(responder.id === 0 ? 150 : 500);
    if (countered) {
      feedback(`${responder.name} 的【无懈可击】被抵消，【${cardName}】继续结算。`);
      continue;
    }
    return true;
  }
  return false;
}

function findResponseIndex(player, required) {
  return player.hand.findIndex((card) => cardCanRespondAs(player, card, required));
}

function canRespond(player, required) {
  if (findResponseIndex(player, required) >= 0) return true;
  if (required === "闪" && hasSkill(player, "hujia") && player.role === "主公") {
    return state.players.some((ally) => ally.alive && ally.id !== player.id && ally.hero.camp === "魏" && findResponseIndex(ally, "闪") >= 0);
  }
  if (required === "杀" && hasSkill(player, "jijiang") && player.role === "主公") {
    return state.players.some((ally) => ally.alive && ally.id !== player.id && ally.hero.camp === "蜀" && findResponseIndex(ally, "杀") >= 0);
  }
  return false;
}

function lordAidConfig(player, required) {
  if (required === "闪" && hasSkill(player, "hujia") && player.role === "主公") {
    return { skill: "护驾", camp: "魏", card: "闪" };
  }
  if (required === "杀" && hasSkill(player, "jijiang") && player.role === "主公") {
    return { skill: "激将", camp: "蜀", card: "杀" };
  }
  return null;
}

async function shouldAnswerLordAid(responder, lord, config) {
  if (responder.id === 0) {
    return showModal({ title: `响应主公技【${config.skill}】`, desc: `${lord.name} 请求你打出一张【${config.card}】，是否响应？`, type: "confirm" });
  }
  if (relation(responder, lord) !== "ally") return false;
  if (responder.hp <= 1 && responder.hand.length <= 2) return Math.random() > 0.45;
  return Math.random() > 0.15;
}

async function findLordAidResponder(player, required) {
  const config = lordAidConfig(player, required);
  if (!config) return null;
  const candidates = orderedAliveFrom(player)
    .filter((ally) => ally.id !== player.id && ally.hero.camp === config.camp && findResponseIndex(ally, config.card) >= 0);
  for (const ally of candidates) {
    if (await shouldAnswerLordAid(ally, player, config)) return ally;
  }
  return null;
}

async function consumeResponse(player, required) {
  let responder = player;
  let index = findResponseIndex(player, required);
  if (required === "闪" && (await shouldTryBagua(player)) && await tryBaguaResponse(player)) return true;
  if (index < 0 && required === "闪" && hasSkill(player, "hujia") && player.role === "主公") {
    responder = await findLordAidResponder(player, "闪");
    index = responder ? findResponseIndex(responder, "闪") : -1;
    if (responder) feedback(`${player.name} 发动【护驾】，${responder.name} 选择代为打出【闪】。`);
    else feedback(`${player.name} 发动【护驾】，无人响应。`);
  }
  if (index < 0 && required === "杀" && hasSkill(player, "jijiang") && player.role === "主公") {
    responder = await findLordAidResponder(player, "杀");
    index = responder ? findResponseIndex(responder, "杀") : -1;
    if (responder) feedback(`${player.name} 发动【激将】，${responder.name} 选择代为打出【杀】。`);
    else feedback(`${player.name} 发动【激将】，无人响应。`);
  }
  if (!responder || index < 0) return false;
  const [card] = responder.hand.splice(index, 1);
  state.discard.push(card);
  log(`${responder.name} 打出【${required}】响应。`);
  if (required === "闪" && hasSkill(responder, "leiji")) {
    const useIt = responder.id === 0
      ? await showModal({ title: "雷击", desc: "你打出【闪】，是否发动【雷击】令一名其他角色判定？", type: "confirm" })
      : Math.random() > 0.4;
    if (useIt) {
      let target;
      const candidates = state.players.filter((p) => p.alive && p.id !== responder.id);
      if (responder.id === 0) {
        const opts = candidates.map((p) => ({ label: displayName(p), value: p.id }));
        const chosen = await showModal({ title: "雷击", desc: "选择一名角色判定，若为黑桃其受到2点雷电伤害", type: "select", options: opts });
        target = chosen != null ? candidates.find((p) => p.id === chosen) : candidates[0];
      } else {
        target = candidates.find((p) => relation(responder, p) === "enemy") || candidates[0];
      }
      if (target) {
        const judge = await performJudge(responder, "雷击");
        if (judge && judge.suit === "♠") {
          await damage(target, responder, 2, { skill: "雷击", element: "thunder", noSkill: true });
          feedback(`${responder.name} 发动【雷击】，判定为 ${judgeText(judge)}，${target.name} 受到2点雷电伤害。`);
        } else {
          feedback(`${responder.name} 发动【雷击】，判定为 ${judgeText(judge)}，未命中。`);
        }
      }
    }
  }
  if (!responder.hand.length && hasSkill(responder, "lianying")) {
    draw(responder, 1);
    feedback(`${responder.name} 发动【连营】，摸一张牌。`);
  }
  return true;
}

function hasBagua(player) {
  if (player.temp?.armorIgnored) return false;
  return player.equipment?.armor?.name === "八卦阵" || (hasSkill(player, "bazhen") && !player.equipment?.armor);
}

async function tryBaguaResponse(player) {
  if (!hasBagua(player)) return false;
  const judge = await performJudge(player, player.equipment?.armor?.name === "八卦阵" ? "八卦阵" : "八阵");
  const success = isRed(judge);
  feedback(`${player.name} ${player.equipment?.armor?.name === "八卦阵" ? "发动【八卦阵】" : "触发【八阵】"}，判定为${judge?.suit || "无"}${success ? "，视为打出【闪】" : "，未能产生【闪】"}。`);
  return success;
}

async function shouldTryBagua(player) {
  if (!hasBagua(player)) return false;
  if (player.id !== 0) return true;
  return showModal({ title: "发动【八卦阵】", desc: "判定？若为红色，视为打出【闪】。", type: "confirm" });
}

async function useCard(player, card, target) {
  const targets = Array.isArray(target) ? target.filter(Boolean) : [target].filter(Boolean);
  const primaryTarget = targets[0] || null;
  const blocked = canUseCard(player, card, primaryTarget);
  if (blocked) {
    if (player.id === 0) {
      log(blocked);
      toast(blocked);
    }
    render();
    return false;
  }
  const isEquip = ["武器", "防具", "坐骑"].includes(card.type);
  const isDelayed = card.type === "延时锦囊";
  const useName = effectiveUseName(player, card);
  const usedCard = await removeCard(player, card.id, !(isEquip || isDelayed));
  feedback(`${player.name} 使用【${useName}】${useName !== card.name ? `（由【${card.name}】转化）` : ""}${targets.length ? `，目标 ${targets.map((item) => item.name).join("、")}` : ""}。`);
  recordJiufaName(player, useName);
  if (targets.length) await triggerYanhuiOnCardTarget(player, targets);
  if (useName === "杀") {
    player.slashUsed += 1;
    if (player.temp?.zhuangshiNoDistanceLeft > 0) {
      player.temp.zhuangshiNoDistanceLeft -= 1;
      feedback(`${displayName(player)} 的【壮誓】生效，此【杀】无距离限制。`);
    }
    const slashAmount = slashDamage(player);
    player.temp.wineDamage = 0;
    const slashTargetList = slashTargets(player, primaryTarget);
    for (const slashTarget of slashTargetList) {
      if (slashTarget.alive && player.alive) await resolveSlash(player, slashTarget, usedCard, { damageAmount: slashAmount, consumeWine: false, element: slashCardElement(usedCard) });
      await sleep(250);
    }
  } else if (useName === "桃") {
    const healTarget = primaryTarget || player;
    const bonus = hasSkill(healTarget, "jiuyuan") && healTarget.role === "主公" && player.id !== healTarget.id && player.hero.camp === "吴" ? 1 : 0;
    healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + 1 + bonus);
    log(`${player.name} 对 ${healTarget.name} 使用【桃】，${healTarget.name} 回复${1 + bonus}点体力。`);
  } else if (useName === "无中生有") {
    if (!(await resolveNullifyWindow(player, player, useName))) {
      draw(player, 2);
      await triggerChiyunAfterGain(player, "无中生有");
    }
  } else if (useName === "酒") {
    player.temp.wineDamage = (player.temp.wineDamage || 0) + 1;
    player.temp.wineUsed = true;
    feedback(`${player.name} 使用【酒】，本回合下一张【杀】伤害+1。`);
  } else if (["武器", "防具", "坐骑"].includes(card.type)) {
    await equipCard(player, card);
  } else if (useName === "过河拆桥") {
    if (await resolveNullifyWindow(player, primaryTarget, useName)) {
      selectedCardId = null;
      pendingCardTargets = [];
      render();
      return true;
    }
    const lost = await takeChosenAreaCard(primaryTarget, player, null, `【过河拆桥】选择弃置 ${primaryTarget.name} 区域里的一张牌`);
    if (lost) {
      state.discard.push(lost);
      log(`${primaryTarget.name} 区域里的【${lost.name}】被弃置。`);
    }
  } else if (useName === "顺手牵羊") {
    if (await resolveNullifyWindow(player, primaryTarget, useName)) {
      selectedCardId = null;
      pendingCardTargets = [];
      render();
      return true;
    }
    const stolen = await takeChosenAreaCard(primaryTarget, player, player, `【顺手牵羊】选择获得 ${primaryTarget.name} 区域里的一张牌`);
    if (stolen) {
      log(`${player.name} 获得 ${primaryTarget.name} 区域里的【${stolen.name}】。`);
    }
  } else if (useName === "火攻") {
    if (!(await resolveNullifyWindow(player, primaryTarget, useName))) await resolveFireAttack(player, primaryTarget, usedCard);
  } else if (useName === "铁索连环") {
    if (!targets.length) {
      draw(player, 1);
      feedback(`${player.name} 重铸【铁索连环】，摸一张牌。`);
    }
    for (const chainTarget of targets.slice(0, 2)) {
      if (await resolveNullifyWindow(player, chainTarget, useName, { allowSource: targets.length > 1 })) continue;
      chainTarget.chained = !chainTarget.chained;
      feedback(`${chainTarget.name} ${chainTarget.chained ? "被横置，进入连环状态" : "重置，解除连环状态"}。`);
    }
  } else if (useName === "乐不思蜀") {
    if (await resolveNullifyWindow(player, primaryTarget, useName)) state.discard.push(usedCard);
    else addDelayedCard(primaryTarget, usedCard);
  } else if (useName === "兵粮寸断") {
    if (await resolveNullifyWindow(player, primaryTarget, useName)) state.discard.push(usedCard);
    else addDelayedCard(primaryTarget, usedCard);
  } else if (useName === "决斗") {
    if (!(await resolveNullifyWindow(player, primaryTarget, useName))) await duel(player, primaryTarget);
  } else if (useName === "南蛮入侵") {
    const nanmanSource = state.players.find((item) => item.alive && hasSkill(item, "huoshou")) || player;
    for (const p of state.players.filter((item) => item.alive && item.id !== player.id)) {
      if (hasSkill(p, "huoshou") || hasSkill(p, "juxiang")) {
        feedback(`${p.name} 的【${hasSkill(p, "huoshou") ? "祸首" : "巨象"}】生效，【南蛮入侵】对其无效。`);
        continue;
      }
      if (await resolveNullifyWindow(player, p, useName, { allowSource: true })) continue;
      if (hasVineArmor(p)) {
        feedback(`${p.name} 的【藤甲】生效，【南蛮入侵】无效。`);
        continue;
      }
      await respondOrDamage(p, "杀", nanmanSource, "南蛮入侵");
    }
  } else if (useName === "万箭齐发") {
    for (const p of state.players.filter((item) => item.alive && item.id !== player.id)) {
      if (await resolveNullifyWindow(player, p, useName, { allowSource: true })) continue;
      if (hasVineArmor(p)) {
        feedback(`${p.name} 的【藤甲】生效，【万箭齐发】无效。`);
        continue;
      }
      await respondOrDamage(p, "闪", player, "万箭齐发");
    }
  } else if (useName === "桃园结义") {
    for (const p of state.players.filter((item) => item.alive && item.hp < item.maxHp)) {
      if (await resolveNullifyWindow(player, p, useName, { allowSource: true })) continue;
      p.hp += 1;
      feedback(`${p.name} 因【桃园结义】回复1点体力。`);
    }
  } else if (useName === "五谷丰登") {
    await resolveHarvest(player);
  } else if (useName === "闪电") {
    addDelayedCard(player, usedCard);
  } else if (card.custom) {
    await resolveCustomCard(player, card, primaryTarget);
  }
  if (card.type === "锦囊" && hasSkill(player, "jizhi")) {
    draw(player, 1);
    feedback(`${player.name} 发动【集智】，摸一张牌。`);
  }
  if ((useName === "决斗" || (useName === "杀" && isRed(card))) && hasSkill(player, "jiang")) {
    draw(player, 1);
    feedback(`${player.name} 发动【激昂】，摸一张牌。`);
  }
  selectedCardId = null;
  pendingCardTargets = [];
  checkWin();
  render();
  return true;
}

async function resolveCustomCard(player, card, target) {
  const effect = card.effect;
  if (effect === "damageOne" && target) {
    await damage(target, player, 1);
  } else if (effect === "drawTwo") {
    draw(player, 2);
    feedback(`${player.name} 因【${card.name}】摸两张牌。`);
  } else if (effect === "healSelf") {
    if (player.hp < player.maxHp) {
      player.hp += 1;
      feedback(`${player.name} 因【${card.name}】回复1点体力。`);
    } else {
      draw(player, 1);
      feedback(`${player.name} 体力已满，【${card.name}】改为摸1张。`);
    }
  } else if (effect === "discardTarget" && target) {
    const lost = randomHandCard(target);
    if (lost) {
      state.discard.push(lost);
      feedback(`${target.name} 被【${card.name}】弃置一张牌。`);
    }
  } else if (effect === "stealTarget" && target) {
    const stolen = randomHandCard(target);
    if (stolen) {
      player.hand.push(stolen);
      feedback(`${player.name} 因【${card.name}】获得 ${target.name} 的一张牌。`);
    }
  } else if (effect === "allDamage") {
    for (const victim of state.players.filter((p) => p.alive && p.id !== player.id)) {
      await damage(victim, player, 1);
      await sleep(250);
    }
  } else if (effect === "allDraw") {
    state.players.filter((p) => p.alive).forEach((p) => draw(p, 1));
    feedback(`【${card.name}】令所有存活角色各摸一张牌。`);
  } else if (effect === "equipCrossbow") {
    player.hasCrossbow = true;
    feedback(`${player.name} 装备【${card.name}】，本回合【杀】无次数限制。`);
  } else if (effect === "selfDrawOne") {
    draw(player, 1);
    feedback(`${player.name} 因【${card.name}】摸一张牌。`);
  }
}

async function resolveFireAttack(player, target, damageCard = null) {
  if (!target?.alive || !target.hand.length) {
    feedback("【火攻】没有可展示的目标手牌，未造成伤害。");
    return;
  }
  const revealed = target.hand[Math.floor(Math.random() * target.hand.length)];
  feedback(`${target.name} 因【火攻】展示 ${cardBrief(revealed)}。`);
  const cost = await chooseHandCard(player, (card) => card.suit === revealed.suit, `【火攻】请选择一张${revealed.suit}花色手牌弃置，令 ${target.name} 受到1点火焰伤害。`, true);
  if (!cost) {
    feedback(`${player.name} 未能弃置同花色牌，【火攻】未造成伤害。`);
    return;
  }
  state.discard.push(cost);
  feedback(`${player.name} 弃置 ${cardBrief(cost)}，【火攻】造成火焰伤害。`);
  await damage(target, player, 1, { cardName: "火攻", damageCard: damageCard || cost, element: "fire", skill: damageCard?.skill });
}

async function resolveHarvest(player) {
  const targets = orderedAliveFrom(player);
  const revealed = [];
  targets.forEach(() => {
    if (!state.deck.length) state.deck = shuffle(state.discard.splice(0));
    const card = state.deck.pop();
    if (card) revealed.push(card);
  });
  feedback(`【五谷丰登】亮出：${revealed.map((card) => `【${card.name}】`).join("、") || "无牌"}。`);
  for (const target of targets) {
    if (!revealed.length) return;
    if (await resolveNullifyWindow(player, target, "五谷丰登", { allowSource: true })) continue;
    const index = await chooseHarvestCardIndex(target, revealed);
    const [card] = revealed.splice(index, 1);
    target.hand.push(card);
    log(`${target.name} 从【五谷丰登】获得【${card.name}】。`);
    await sleep(target.id === 0 ? 100 : 350);
  }
  if (revealed.length) state.discard.push(...revealed);
}

function orderedAliveFrom(player) {
  const order = [];
  for (let offset = 0; offset < state.players.length; offset++) {
    const candidate = state.players[(player.id + offset) % state.players.length];
    if (candidate.alive) order.push(candidate);
  }
  return order;
}

async function chooseHarvestCardIndex(player, revealed) {
  if (!revealed.length) return 0;
  if (player.id === 0) {
    const options = revealed.map((card, index) => ({ label: `${cardBrief(card)} ${card.type}`, value: index }));
    const choice = await showModal({ title: "【五谷丰登】选择一张牌", type: "select", options, allowCancel: false });
    if (Number.isInteger(choice) && choice >= 0 && choice < revealed.length) return choice;
    toast("选择无效，默认获得第一张牌。");
    return 0;
  }
  if (player.hp < player.maxHp) {
    const peach = revealed.findIndex((card) => card.name === "桃" || card.name === "酒");
    if (peach >= 0) return peach;
  }
  const useful = revealed.findIndex((card) => card.name === "杀" || card.name === "闪" || card.type === "锦囊");
  return useful >= 0 ? useful : 0;
}

async function respondOrDamage(player, required, source, cardName = "锦囊") {
  if (player.id === 0 && source.id !== 0) {
    await startReaction({
      player,
      source,
      required,
      successText: `你打出【${required}】，响应了 ${source.name} 的锦囊。`,
      missText: `你没有打出【${required}】，受到1点伤害。`,
      onMiss: () => damage(player, source, 1, { cardName })
    });
    return;
  }
  if (await consumeResponse(player, required)) {
    render();
  } else {
    await damage(player, source, 1, { cardName });
  }
}

async function duel(a, b) {
  let current = b;
  let duelRounds = 0;
  const DUEL_MAX_ROUNDS = 30;
  while (a.alive && b.alive && duelRounds < DUEL_MAX_ROUNDS) {
    duelRounds++;
    const opponent = current.id === a.id ? b : a;
    const need = hasSkill(opponent, "wushuang") ? 2 : 1;
    let played = 0;
    if (current.id === 0 && opponent.id !== 0) {
      for (let i = 0; i < need; i++) {
        const ok = await startReaction({
          player: current,
          source: opponent,
          required: "杀",
          successText: `你在决斗中打出【杀】。`,
          missText: `你没有打出【杀】，受到决斗伤害。`,
          onMiss: () => {}
        });
        if (ok) played++;
        else break;
      }
    } else {
      while (played < need && (await consumeResponse(current, "杀"))) played += 1;
    }
    if (played >= need) {
      log(`${current.name} 在决斗中打出${need}张【杀】。`);
      current = current.id === a.id ? b : a;
    } else {
      await damage(current, opponent, 1 + (opponent.temp?.luoyi ? 1 : 0), { cardName: "决斗" });
      return;
    }
  }
}

async function drawForTurn(player) {
  if ((hasSkill(player, "tuxi") || hasSkill(player, "qiaobian")) && await shouldUseSkill(player, hasSkill(player, "tuxi") ? "突袭" : "巧变", "摸牌阶段，改为获得至多两名角色的各一张手牌。")) {
    const skillName = hasSkill(player, "tuxi") ? "突袭" : "巧变";
    let targets;
    if (player.id === 0) {
      const candidates = state.players.filter((p) => p.alive && p.id !== player.id && p.hand.length);
      targets = [];
      if (candidates.length) {
        const opts = candidates.map((p) => ({ label: `${displayName(p)}（${p.hand.length}张手牌）`, value: p.id }));
        const chosen = await showModal({ title: `【${skillName}】：选择至多两名角色`, type: "select", options: opts, multiSelect: true, minSelect: 1, maxSelect: 2, allowCancel: true });
        targets = (chosen || []).map((id) => candidates.find((p) => p.id === id)).filter(Boolean);
      }
    } else {
      targets = chooseRaidTargets(player);
    }
    if (targets.length) {
      for (const target of targets) {
        let stolen;
        if (player.id === 0) {
          stolen = await chooseHandCard(target, () => true, `【${skillName}】：选择 ${target.name} 的一张手牌获得`, true);
        } else {
          stolen = randomHandCard(target);
        }
        if (stolen) player.hand.push(stolen);
      }
      feedback(`${player.name} 发动【${skillName}】，获得 ${targets.map((target) => target.name).join("、")} 的各一张手牌。`);
      return;
    }
  }
  if (hasSkill(player, "zaiqi") && player.hp < player.maxHp && await shouldUseSkill(player, "再起", "摸牌阶段，改为亮出牌堆顶已损失体力值张牌。")) {
    const lost = player.maxHp - player.hp;
    let red = 0;
    for (let i = 0; i < lost; i++) {
      const judge = await performJudge(player, "再起");
      if (isRed(judge)) red += 1;
      else {
        const gained = judgeOwnerCard(judge);
        if (gained) {
          const index = state.discard.findIndex((card) => card.id === gained.id);
          player.hand.push(state.discard.splice(index, 1)[0]);
        } else {
          draw(player, 1);
        }
      }
    }
    if (red) heal(player, red, "再起");
    feedback(`${player.name} 发动【再起】，亮出${lost}张牌。`);
    return;
  }
  if (hasSkill(player, "shuangxiong") && await shouldUseSkill(player, "双雄", "摸牌阶段，改为判定并获得判定牌。")) {
    const judge = await performJudge(player, "双雄");
    player.temp.shuangxiongColor = isRed(judge) ? "red" : "black";
    const gained = judgeOwnerCard(judge);
    if (gained) {
      const index = state.discard.findIndex((card) => card.id === gained.id);
      player.hand.push(state.discard.splice(index, 1)[0]);
    } else {
      draw(player, 1);
    }
    feedback(`${player.name} 发动【双雄】，本回合可将不同颜色手牌当【决斗】。`);
    return;
  }
  if (hasSkill(player, "luoyi") && await shouldUseSkill(player, "裸衣", "摸牌阶段少摸一张，本回合【杀】和【决斗】伤害+1。")) {
    player.temp.luoyi = true;
    draw(player, player.skippedDraw ? 1 : 1);
    player.skippedDraw = false;
    feedback(`${player.name} 发动【裸衣】，少摸一张，本回合【杀】和【决斗】伤害+1。`);
    return;
  }
  const customDrawBonus = customRulePassiveAmount(player, "draw", "draw");
  let amount = (player.skippedDraw ? 1 : 2) + effectCount(player, "drawPlusOne") + customDrawBonus;
  if (hasSkill(player, "yingzi")) amount += 1;
  if (hasSkill(player, "haoshi")) amount += 2;
  player.skippedDraw = false;
  draw(player, amount);
  log(`${player.name} 摸了${amount}张牌。`);
  state.lastAction = `${player.name} 摸了${amount}张牌`;
  if (customDrawBonus) feedback(`${displayName(player)} 的自创摸牌技能生效，额外摸${customDrawBonus}张牌。`);
  await triggerChiyunAfterGain(player, "摸牌阶段");
  if (hasSkill(player, "haoshi") && player.hand.length > 5) {
    const target = state.players.filter((p) => p.alive && p.id !== player.id).sort((a, b) => a.hand.length - b.hand.length)[0];
    const give = Math.floor(player.hand.length / 2);
    for (let i = 0; i < give; i++) {
      const card = randomHandCard(player);
      if (card) target.hand.push(card);
    }
    feedback(`${player.name} 发动【好施】，将${give}张手牌交给 ${target.name}。`);
  }
}

async function runPreparePhase(player) {
  setPhase(player, "准备阶段");
  if (hasSkill(player, "guanxing") && await shouldUseSkill(player, "观星", "准备阶段开始时，观看并调整牌堆顶牌。")) {
    await resolveGuanxing(player);
  }
  if (hasSkill(player, "luoshen") && await shouldUseSkill(player, "洛神", "准备阶段开始时，可连续判定黑色牌并获得。")) {
    let hits = 0;
    for (let i = 0; i < 5; i++) {
      const judge = await performJudge(player, "洛神");
      if (!isBlack(judge)) break;
      const gained = judgeOwnerCard(judge);
      if (gained) {
        const index = state.discard.findIndex((card) => card.id === gained.id);
        player.hand.push(state.discard.splice(index, 1)[0]);
      } else if (judge) {
        player.hand.push(judge);
      }
      hits += 1;
    }
    if (hits) feedback(`${player.name} 发动【洛神】，获得${hits}张黑色判定牌。`);
  }
  if (hasSkill(player, "yinghun") && player.hp < player.maxHp) {
    const target = chooseSupportTarget(player) || chooseAiTarget(player);
    const lost = player.maxHp - player.hp;
    if (target && await shouldUseSkill(player, "英魂", `准备阶段开始时，令 ${target.name} 摸${Math.max(1, lost)}弃1。`)) {
      draw(target, Math.max(1, lost));
      await discardRandomCards(target, 1);
      feedback(`${player.name} 发动【英魂】，令 ${target.name} 摸${Math.max(1, lost)}弃1。`);
    }
  }
  if (hasSkill(player, "xiongziShi") && !player.marks.xiongziShiUsed && await shouldUseSkill(player, "雄姿", "限定技，摸两张牌，并令本局势周瑜技能只在你的回合发动，且只保留所有技能的一选项或二选项。")) {
    const choice = player.id === 0
      ? await showModal({
        title: "雄姿",
        desc: "选择本局保留的选项。",
        type: "select",
        options: [
          { label: "保留一选项：偏伤害 / 增伤", value: 1 },
          { label: "保留二选项：偏摸牌 / 弃牌", value: 2 }
        ],
        allowCancel: false
      })
      : (chooseAiTarget(player) ? 1 : 2);
    player.marks.xiongziShiUsed = true;
    player.marks.xiongziShiLocked = true;
    player.marks.xiongziShiChoice = choice || 1;
    draw(player, 2);
    feedback(`${player.name} 发动限定技【雄姿】，摸两张牌，本局保留所有势周瑜技能的${player.marks.xiongziShiChoice === 1 ? "一选项" : "二选项"}。`);
  }
  await triggerCustomRules(player, "prepare");
  if (hasSkill(player, "ruoyu") && player.role === "主公" && !player.marks.ruoyuAwakened) {
    const minHp = Math.min(...state.players.filter((p) => p.alive).map((p) => p.hp));
    if (player.hp === minHp) {
      player.marks.ruoyuAwakened = true;
      player.maxHp += 1;
      heal(player, 1, "若愚");
      player.extraEffects = [...(player.extraEffects || []), "jijiang"];
      feedback(`${player.name} 觉醒【若愚】，获得【激将】。`);
    }
  }
  if (hasSkill(player, "hunzi") && player.hp <= 1 && !player.marks.hunziAwakened) {
    player.marks.hunziAwakened = true;
    player.maxHp = Math.max(1, player.maxHp - 1);
    player.extraEffects = [...(player.extraEffects || []), "yingzi", "yinghun"];
    feedback(`${player.name} 觉醒【魂姿】，获得【英姿】和【英魂】。`);
  }
  if (hasSkill(player, "zhiji") && !player.hand.length && !player.marks.zhijiAwakened) {
    player.marks.zhijiAwakened = true;
    player.maxHp = Math.max(1, player.maxHp - 1);
    heal(player, 1, "志继") || draw(player, 2);
    player.extraEffects = [...(player.extraEffects || []), "guanxing"];
    feedback(`${player.name} 觉醒【志继】，获得【观星】。`);
  }
  if (hasSkill(player, "tuntian") && (player.marks.tian?.length || 0) >= 3 && !player.marks.jixiAwakened) {
    player.marks.jixiAwakened = true;
    player.maxHp = Math.max(1, player.maxHp - 1);
    if (!player.extraEffects) player.extraEffects = [];
    if (!player.extraEffects.includes("jixi")) player.extraEffects.push("jixi");
    feedback(`${player.name} 觉醒【急袭】，减1点体力上限，获得【急袭】（当前${player.marks.tian?.length || 0}张田）。`);
    renderAll();
  }
  if (effectCount(player, "awakeningRecover") && player.hp <= 2 && !player.marks.customAwakeningRecover) {
    player.marks.customAwakeningRecover = true;
    player.maxHp += 1;
    heal(player, 1, "自创觉醒技");
    draw(player, 1);
    feedback(`${player.name} 的自创觉醒技强制发动：加1点体力上限、回复1点体力并摸一张牌。`);
  }
  const recover = effectCount(player, "recoverOnTurn");
  if (recover && player.hp < player.maxHp) {
    const oldHp = player.hp;
    player.hp = Math.min(player.maxHp, player.hp + recover);
    feedback(`${player.hero.name} 的自创技能发动，回复${player.hp - oldHp}点体力。`);
  }
  await sleep(player.id === 0 ? 250 : 650);
}

async function resolveGuanxing(player) {
  const count = Math.min(5, state.players.filter((p) => p.alive).length, state.deck.length);
  if (!count) return;
  const topCards = state.deck.splice(-count).reverse();
  let topOrder = topCards;
  let bottomCards = [];
  if (player.id === 0) {
    const result = await showModal({ title: "发动【观星】", desc: `观看牌堆顶${count}张牌，调整放置顺序。`, type: "guanxing", options: topCards, allowCancel: true });
    if (result !== null) {
      topOrder = result.topOrder.map((i) => topCards[i]);
      bottomCards = result.bottomOrder.map((i) => topCards[i]);
    }
  } else {
    topOrder = topCards.sort((a, b) => aiCardValue(b) - aiCardValue(a));
  }
  if (bottomCards.length) state.deck.unshift(...bottomCards.reverse());
  state.deck.push(...topOrder.reverse());
  feedback(`${player.name} 发动【观星】，观看并调整了牌堆顶${count}张牌。`);
}

function aiCardValue(card) {
  if (["桃", "酒"].includes(card.name)) return 5;
  if (card.type === "锦囊") return 4;
  if (card.name === "杀") return 3;
  if (card.name === "闪") return 2;
  return 1;
}

async function endHumanTurn() {
  if (!state || state.winner) return;
  if (state.pendingDying?.responderId === 0) {
    skipPendingDyingChoice();
    return;
  }
  if (state.pendingReaction?.playerId === 0) {
    finishReaction(false);
    return;
  }
  if (state.turn !== 0 || state.pendingReaction || state.pendingDying) return;
  if (state.currentPhase !== "出牌阶段" && !state.discarding) return;
  const me = state.players[0];
  if (state.discarding?.playerId === 0) {
    confirmHumanDiscard().then(() => {});
    return;
  }
  setPhase(me, "弃牌阶段");
  const need = discardNeed(me);
  if (need > 0) {
    state.discarding = { playerId: 0, required: need, selectedIds: [] };
    state.lastAction = `请选择 ${need} 张手牌弃置`;
    selectedCardId = null;
    render();
    return;
  }
  setPhase(me, "结束阶段");
  await applyEndPhaseSkills(me);
  const fangquanTargetId = await resolveFangquanAfterTurn(me);
  if (fangquanTargetId != null) {
    beginTurn(fangquanTargetId);
    render();
    return;
  }
  nextTurn();
}

function handLimit(player) {
  let limit = player.marks?.pingxiangHandLimit
    ? Math.max(player.maxHp, 0)
    : Math.max(player.hp, 0) + effectCount(player, "handLimitPlusTwo") * 2 + customRulePassiveAmount(player, "handLimit", "handLimit");
  if (hasSkill(player, "xueyi") && player.role === "主公") {
    limit += state.players.filter((p) => p.alive && p.id !== player.id && p.hero.camp === "群").length * 2;
  }
  return limit;
}

function discardNeed(player) {
  if (hasSkill(player, "keji") && player.slashUsed === 0) return 0;
  return Math.max(0, player.hand.length - handLimit(player));
}

function discardDown(player) {
  if (hasSkill(player, "keji") && player.slashUsed === 0) {
    feedback(`${player.name} 发动【克己】，跳过弃牌阶段。`);
    return;
  }
  const limit = handLimit(player);
  const discarded = [];
  while (player.hand.length > limit) {
    const card = player.hand.pop();
    state.discard.push(card);
    discarded.push(card);
  }
  if (discarded.length) player.temp.lastDiscarded = discarded;
}

async function triggerGuzheng(discarder) {
  if (!discarder.temp?.lastDiscarded?.length) return;
  const guzheng = state.players.find((p) => p.alive && p.id !== discarder.id && hasSkill(p, "guzheng"));
  if (!guzheng) return;
  const useIt = guzheng.id === 0
    ? await showModal({ title: "固政", desc: `${discarder.name} 弃置了${discarder.temp.lastDiscarded.length}张牌，是否发动【固政】？`, type: "confirm" })
    : relation(guzheng, discarder) === "ally";
  if (!useIt) return;
  const cards = discarder.temp.lastDiscarded;
  if (cards.length === 1) {
    guzheng.hand.push(cards[0]);
    feedback(`${guzheng.name} 发动【固政】，获得 ${discarder.name} 弃置的【${cards[0].name}】。`);
  } else {
    // Give 1 card to discarder, rest to guzheng
    let returnCard;
    if (guzheng.id === 0) {
      const opts = cards.map((c, i) => ({ label: cardBrief(c), value: i }));
      const choice = await showModal({ title: "固政", desc: `选择还给 ${discarder.name} 一张牌，其余归你`, type: "select", options: opts });
      returnCard = choice != null ? cards[choice] : cards[0];
    } else {
      returnCard = cards[cards.length - 1];
    }
    discarder.hand.push(returnCard);
    const rest = cards.filter((c) => c.id !== returnCard.id);
    guzheng.hand.push(...rest);
    feedback(`${guzheng.name} 发动【固政】，还给 ${discarder.name}【${returnCard.name}】，获得其余${rest.length}张弃牌。`);
  }
  discarder.temp.lastDiscarded = [];
  renderAll();
}

function toggleDiscardSelection(cardId) {
  const discarding = state?.discarding;
  if (!discarding || discarding.playerId !== 0) return;
  const selected = discarding.selectedIds;
  const max = discarding.max ?? discarding.required;
  if (selected.includes(cardId)) {
    discarding.selectedIds = selected.filter((id) => id !== cardId);
  } else if (selected.length < max) {
    selected.push(cardId);
  } else {
    toast(`最多选择 ${max} 张牌。`);
  }
  render();
}

async function confirmHumanDiscard() {
  const discarding = state?.discarding;
  if (!discarding || discarding.playerId !== 0) return;
  const min = discarding.min ?? discarding.required;
  const max = discarding.max ?? discarding.required;
  if (discarding.effect && discarding.selectedIds.length === 0) {
    feedback(`你取消发动【${officialSkillLabels[discarding.effect] || discarding.effect}】。`);
    state.discarding = null;
    selectedCardId = null;
    render();
    return;
  }
  if (discarding.selectedIds.length < min || discarding.selectedIds.length > max) {
    toast(min === max ? `请选择 ${min} 张牌后再确认。` : `请选择 ${min} 到 ${max} 张牌后再确认。`);
    render();
    return;
  }
  const me = state.players[0];
  const selectedCount = discarding.selectedIds.length;
  const discarded = [];
  discarding.selectedIds.forEach((id) => {
    const index = me.hand.findIndex((card) => card.id === id);
    if (index >= 0) {
      const card = me.hand.splice(index, 1)[0];
      state.discard.push(card);
      discarded.push(card);
    }
  });
  if (discarded.length) me.temp.lastDiscarded = discarded;
  maybeTriggerTianrenDiscard(discarded, "弃牌阶段");
  if (discarding.effect === "zhiheng") {
    draw(me, selectedCount);
    markSkillUsed(me, "zhiheng");
    feedback(`你发动【制衡】，弃置${selectedCount}张牌并摸${selectedCount}张牌。`);
    state.discarding = null;
    selectedCardId = null;
    render();
    return;
  }
  feedback(`你弃置了 ${selectedCount} 张手牌。`);
  state.discarding = null;
  setPhase(me, "弃牌阶段");
  discardDown(me);
  await triggerGuzheng(me);
  setPhase(me, "结束阶段");
  await applyEndPhaseSkills(me);
  const fangquanTargetId = await resolveFangquanAfterTurn(me);
  if (fangquanTargetId != null) {
    beginTurn(fangquanTargetId);
    render();
    return;
  }
  nextTurn();
}

async function applyEndPhaseSkills(player) {
  if (!player.alive) return;
  await resolveYanhuiEnd(player);
  if (hasSkill(player, "biyue")) {
    draw(player, 1);
    feedback(`${player.name} 发动【闭月】，摸一张牌。`);
  }
  if (hasSkill(player, "jushou")) {
    draw(player, 3);
    player.flipped = !player.flipped;
    feedback(`${player.name} 发动【据守】，摸三张牌并${player.flipped ? "翻面" : "翻回正面"}。`);
  }
  if (hasSkill(player, "benghuai")) {
    const minHp = Math.min(...state.players.filter((p) => p.alive).map((p) => p.hp));
    if (player.hp > minHp) {
      if (player.hp > 1) {
        loseHp(player, 1, null, "崩坏");
      } else {
        player.maxHp = Math.max(1, player.maxHp - 1);
        player.hp = Math.min(player.hp, player.maxHp);
        feedback(`${player.name} 触发【崩坏】，减1点体力上限。`);
      }
    }
  }
  if (hasSkill(player, "kunfenShi")) {
    loseHp(player, 1, null, "困奋");
    if (player.alive) {
      draw(player, 2);
      feedback(`${player.name} 的【困奋】触发，失去1点体力并摸两张牌。`);
    }
  }
  returnPojunCards(player);
}

async function aiTurn(player) {
  if (!player.alive || state.winner || state.turn !== player.id) return;
  if (player.skipPlayPhase) {
    player.skipPlayPhase = false;
    setPhase(player, "出牌阶段");
    feedback(`${player.name} 跳过出牌阶段。`);
  } else {
    setPhase(player, "出牌阶段");
    await maybeStartZhuangshi(player);
    if (state.pendingDying || state.winner) return;
    if (!(await maybeStartFangquan(player))) {
      await useAiSkills(player);
      if (state.pendingReaction || state.pendingDying) return;
      render();
      await sleep(650);
      let aiSteps = 0;
      const AI_MAX_STEPS = 20;
      while (player.alive && !state.winner && !state.pendingReaction && !state.pendingDying && aiSteps < AI_MAX_STEPS) {
        const card = chooseAiCard(player);
        if (!card) break;
        const target = effectiveNeedsTarget(player, card)
          ? effectiveUseName(player, card) === "铁索连环"
            ? chooseAiTargetsForCard(player, card, 2)
            : chooseAiTargetForCard(player, card)
          : null;
        if (effectiveNeedsTarget(player, card) && (Array.isArray(target) ? !target.length : !target)) break;
        await useCard(player, card, target);
        if (state.pendingReaction || state.pendingDying) return;
        await sleep(1100);
        aiSteps++;
      }
    }
  }
  if (state.pendingReaction || state.pendingDying) return;
  setPhase(player, "弃牌阶段");
  discardDown(player);
  await triggerGuzheng(player);
  setPhase(player, "结束阶段");
  await applyEndPhaseSkills(player);
  render();
  await sleep(800);
  const fangquanTargetId = await resolveFangquanAfterTurn(player);
  if (fangquanTargetId != null) {
    beginTurn(fangquanTargetId);
    render();
    return;
  }
  if (!state.winner) nextTurn();
}

async function useAiSkills(player) {
  const effects = playerEffects(player);
  for (const effect of effects) {
    if (!player.alive || state.winner) return;
    if (await activateSkill(player, effect, true)) {
      render();
      await sleep(700);
    }
  }
}

async function maybeStartZhuangshi(player) {
  if (!player?.alive || !hasSkill(player, "zhuangshi") || skillUsed(player, "zhuangshi")) return false;
  if (state.currentPhase !== "出牌阶段") return false;
  const choices = [];
  if (player.hand.length) choices.push({ label: `弃置手牌：选择1-${player.hand.length}张，本阶段前等量张【杀】无距离限制且不可响应`, value: "discard" });
  if (player.hp > 0) choices.push({ label: `失去体力：选择1-${player.hp}点，本阶段前等量张【杀】不计入次数`, value: "loseHp" });
  if (!choices.length) return false;
  const mode = player.id === 0
    ? await showModal({ title: "壮誓", desc: "出牌阶段开始时，你可以执行一项。取消视为不发动。", type: "select", options: choices, allowCancel: true })
    : (player.hand.length >= Math.max(2, player.hp) ? "discard" : player.hp > 1 ? "loseHp" : null);
  if (!mode) {
    if (hasSkill(player, "zhongao") && missionState(player, "zhongao") === "active") {
      completeMission(player, "zhongao", false, "选择不执行【壮誓】，失去【壮誓】并获得【困奋】。");
      disablePlayerEffect(player, "zhuangshi");
      grantPlayerEffect(player, "kunfenShi");
    }
    return false;
  }
  if (mode === "discard") {
    const cards = await chooseHandCardsRange(player, 1, player.hand.length, () => true, "发动【壮誓】：选择任意张手牌弃置。", true);
    if (!cards.length) return false;
    state.discard.push(...cards);
    maybeTriggerTianrenDiscard(cards, "壮誓");
    player.temp.zhuangshiNoResponseLeft = (player.temp.zhuangshiNoResponseLeft || 0) + cards.length;
    player.temp.zhuangshiNoDistanceLeft = (player.temp.zhuangshiNoDistanceLeft || 0) + cards.length;
    feedback(`${displayName(player)} 发动【壮誓】，弃置${cards.length}张手牌，本阶段前${cards.length}张【杀】无距离限制且不可被响应。`);
  } else {
    const max = Math.max(1, player.hp);
    let amount = 1;
    if (player.id === 0) {
      amount = await showModal({
        title: "壮誓",
        desc: "选择要失去的体力点数；可以进入濒死状态。",
        type: "select",
        options: Array.from({ length: max }, (_, i) => ({ label: `失去${i + 1}点体力`, value: i + 1 })),
        allowCancel: true
      }) || 0;
    } else {
      amount = player.hp > 2 ? 2 : 1;
    }
    if (!amount) return false;
    loseHp(player, amount, null, "壮誓");
    player.temp.zhuangshiSlashExtra = (player.temp.zhuangshiSlashExtra || 0) + amount;
    feedback(`${displayName(player)} 发动【壮誓】，失去${amount}点体力，本阶段前${amount}张【杀】不计入次数。`);
    if (state.pendingDying || !player.alive) {
      markSkillUsed(player, "zhuangshi");
      return true;
    }
  }
  markSkillUsed(player, "zhuangshi");
  renderAll();
  return true;
}

async function resolvePingxiang(player) {
  if (!player?.alive || !hasSkill(player, "pingxiang") || player.marks.pingxiangUsed || player.maxHp <= 9) return false;
  const useIt = player.id === 0
    ? await showModal({ title: "平襄", desc: "减9点体力上限，失去【九伐】，本局手牌上限改为体力上限，然后视为使用至多九张不计次数的火【杀】。", type: "confirm" })
    : Boolean(chooseAiTarget(player));
  if (!useIt) return false;
  player.marks.pingxiangUsed = true;
  player.marks.pingxiangHandLimit = true;
  disablePlayerEffect(player, "jiufa");
  player.maxHp = Math.max(1, player.maxHp - 9);
  player.hp = Math.min(player.hp, player.maxHp);
  feedback(`${displayName(player)} 发动限定技【平襄】，减9点体力上限并失去【九伐】。`);
  const virtualSlash = { id: `pingxiang-${Date.now()}`, name: "火杀", type: "基础", needsTarget: true, element: "fire", suit: "", rank: "" };
  let used = 0;
  for (let i = 0; i < 9 && player.alive && !state.winner && !state.pendingDying && !state.pendingReaction; i++) {
    const candidates = state.players.filter((target) => target.alive && target.id !== player.id);
    if (!candidates.length) break;
    let target = chooseAiTarget(player) || candidates[0];
    if (player.id === 0) {
      const targetId = await showModal({
        title: `平襄：第${i + 1}张火杀`,
        desc: used ? "选择目标继续，或取消结束平襄。" : "至少选择一次目标，或取消不使用火杀。",
        type: "select",
        options: candidates.map((p) => ({ label: `${displayName(p)}（${p.hp}/${p.maxHp}体力，手${p.hand.length}）`, value: p.id })),
        allowCancel: true
      });
      if (targetId == null) break;
      target = candidates.find((p) => p.id === targetId);
    }
    if (!target) break;
    used += 1;
    feedback(`${displayName(player)} 因【平襄】视为对 ${displayName(target)} 使用火【杀】。`);
    await resolveSlash(player, target, { ...virtualSlash, id: `${virtualSlash.id}-${i}` }, { damageAmount: 1, element: "fire" });
    await sleep(player.id === 0 ? 250 : 650);
  }
  feedback(`${displayName(player)} 的【平襄】结算完成，共视为使用${used}张火【杀】。`);
  renderAll();
  return true;
}

async function activateSkill(player, effect, automatic = false) {
  if (!state || state.turn !== player.id || state.pendingReaction || state.winner || !hasSkill(player, effect)) return false;
  if (state.currentPhase !== "出牌阶段") return false;
  if (isCustomRuleEffect(effect)) return await activateCustomRule(player, effect, null, automatic);
  if (!skillCanResolveNow(player, effect)) {
    if (player.id === 0) toast(skillUnavailableMessage(player, effect));
    return false;
  }
  const enemy = chooseAiTarget(player);
  const ally = chooseSupportTarget(player);
  const hasHand = player.hand.length > 0;
  if (effect === "rende" && hasHand && ally && ally.id !== player.id && relation(player, ally) === "ally") {
    const count = Math.min(2, player.hand.length);
    for (let i = 0; i < count; i++) ally.hand.push(player.hand.shift());
    player.temp.rendeGiven = (player.temp.rendeGiven || 0) + count;
    if (player.temp.rendeGiven >= 2 && !player.temp.rendeHealed) {
      heal(player, 1, "仁德");
      player.temp.rendeHealed = true;
    }
    feedback(`${player.name} 发动【仁德】，交给 ${ally.name} ${count}张手牌。`);
    return true;
  }
  if (effect === "limitedDrawTwo" && !player.marks.customLimitedDrawTwo) {
    player.marks.customLimitedDrawTwo = true;
    draw(player, 2);
    feedback(`${player.name} 发动自创限定技，摸两张牌。`);
    return true;
  }
  if (effect === "zhuangshi") return maybeStartZhuangshi(player);
  if (effect === "pingxiang") return resolvePingxiang(player);
  if (effect === "zhiheng" && hasAnyCardInArea(player) && !automatic && player.id === 0) {
    const costs = await chooseMultipleAreaCards(player, 1, areaCardOptions(player, true).length, () => true, "发动【制衡】：请选择任意张牌弃置，然后摸等量的牌。");
    if (!costs.length) return false;
    state.discard.push(...costs);
    draw(player, costs.length);
    markSkillUsed(player, "zhiheng");
    feedback(`你发动【制衡】，弃置${costs.length}张牌并摸${costs.length}张牌。`);
    return true;
  }
  if (effect === "zhiheng" && hasAnyCardInArea(player) && (automatic || player.hand.length > player.hp)) {
    const costs = await chooseMultipleAreaCards(player, 1, Math.min(3, areaCardOptions(player, true).length), () => true, "发动【制衡】：请选择要弃置的牌。");
    const count = costs.length;
    state.discard.push(...costs);
    draw(player, count);
    markSkillUsed(player, effect);
    feedback(`${player.name} 发动【制衡】，弃${count}摸${count}。`);
    return true;
  }
  if (effect === "kurou") {
    loseHp(player, 1, null, "苦肉");
    if (!player.alive) return true;
    draw(player, 2);
    markSkillUsed(player, effect);
    feedback(`${player.name} 发动【苦肉】，失去1点体力并摸两张牌。`);
    return true;
  }
  if (effect === "luanji") {
    const suits = {};
    for (const c of player.hand) { suits[c.suit] = (suits[c.suit] || 0) + 1; }
    const validSuit = Object.keys(suits).find((s) => suits[s] >= 2);
    if (!validSuit) return false;
    let costs;
    if (player.id === 0) {
      costs = await chooseMultipleHandCards(player, 2, (c) => c.suit === validSuit, `发动【乱击】：请选择两张${validSuit}花色手牌当【万箭齐发】使用`);
    } else {
      const sameSuit = player.hand.filter((c) => c.suit === validSuit);
      costs = [sameSuit[0], sameSuit[1]];
    }
    if (!costs || costs.length < 2) return false;
    state.discard.push(...costs);
    feedback(`${player.name} 发动【乱击】，将两张${validSuit}花色牌当【万箭齐发】使用。`);
    markSkillUsed(player, effect);
    for (const victim of state.players.filter((p) => p.alive && p.id !== player.id)) {
      await startReaction({ player: victim, source: player, required: "闪", onMiss: () => damage(victim, player, 1, { skill: "乱击", noSkill: true }), successText: `${victim.name} 响应【万箭齐发】打出【闪】。`, missText: `${victim.name} 未打出【闪】，受到1点伤害。` });
      if (state.pendingReaction || state.pendingDying) return true;
      await sleep(200);
    }
    return true;
  }
  if (effect === "qingnang" && hasHand) {
    const target = [player, ...state.players].filter((p) => p.alive && p.hp < p.maxHp).sort((a, b) => a.hp - b.hp)[0];
    if (target) {
      await discardRandomCards(player, 1);
      heal(target, 1, "青囊");
      markSkillUsed(player, effect);
      return true;
    }
  }
  if (effect === "jieyin" && player.hand.length >= 2 && player.hp < player.maxHp && ally?.hp < ally?.maxHp) {
    await discardRandomCards(player, 2);
    heal(player, 1, "结姻");
    heal(ally, 1, "结姻");
    markSkillUsed(player, effect);
    return true;
  }
  if (effect === "lijian" && hasHand) {
    const [a, b] = chooseAnyEnemyPair(player);
    if (a && b) {
      const cost = player.id === 0
        ? await chooseHandCard(player, () => true, "发动【离间】：请选择一张手牌弃置。", true)
        : randomHandCard(player);
      if (!cost) return false;
      state.discard.push(cost);
      await maybeTriggerTuntian(player);
      feedback(`${player.name} 发动【离间】，令 ${a.name} 与 ${b.name} 决斗。`);
      await duel(a, b);
      markSkillUsed(player, effect);
      return true;
    }
  }
  if (effect === "fanjian" && hasHand && enemy) {
    const gift = randomHandCard(player);
    if (gift) enemy.hand.push(gift);
    if (Math.random() > 0.25) await damage(enemy, player, 1, { skill: "反间" });
    feedback(`${player.name} 发动【反间】，交给 ${enemy.name} 一张牌。`);
    markSkillUsed(player, effect);
    return true;
  }
  if (["qiangxi", "tiaoxin"].includes(effect) && enemy) {
    if (effect === "qiangxi") {
      if (player.hp > 1) {
        if (!loseHp(player, 1, null, "强袭")) return true;
      } else {
        const weapon = player.hand.find((c) => c.type === "武器") || player.equipment?.weapon;
        if (!weapon) return false;
        if (player.equipment?.weapon?.id === weapon.id) {
          await removeEquipment(player, "weapon", true);
        } else {
          const idx = player.hand.findIndex((c) => c.id === weapon.id);
          if (idx >= 0) state.discard.push(player.hand.splice(idx, 1)[0]);
        }
        feedback(`${player.name} 弃置【${weapon.name}】发动【强袭】。`);
      }
      await damage(enemy, player, 1, { skill: "强袭", noSkill: true });
      markSkillUsed(player, effect);
      return true;
    }
    if (effect === "tiaoxin") {
      const slash = enemy.hand.find((c) => c.name === "杀");
      if (slash && Math.random() > 0.45) {
        const usedSlash = await removeCard(enemy, slash.id);
        feedback(`${enemy.name} 因【挑衅】对 ${player.name} 使用【杀】。`);
        await resolveSlash(enemy, player, usedSlash);
      } else {
        const lost = randomHandCard(enemy);
        if (lost) state.discard.push(lost);
        feedback(`${player.name} 发动【挑衅】，弃置 ${enemy.name} 一张牌。`);
      }
      markSkillUsed(player, effect);
      return true;
    }
  }
  if (["shensu", "guhuo"].includes(effect) && enemy) {
    await damage(enemy, player, 1, { skill: officialSkillLabels[effect], cardName: "杀" });
    player.slashUsed += 1;
    markSkillUsed(player, effect);
    feedback(`${player.name} 发动【${officialSkillLabels[effect]}】，视为使用【杀】。`);
    return true;
  }
  if (effect === "luanwu" && !player.marks.luanwuUsed) {
    player.marks.luanwuUsed = true;
    feedback(`${player.name} 发动限定技【乱武】。`);
    for (const victim of state.players.filter((p) => p.alive && p.id !== player.id)) {
      const target = state.players.find((p) => p.alive && p.id !== victim.id);
      const slash = victim.hand.find((c) => c.name === "杀");
      if (slash && target) {
        const usedSlash = await removeCard(victim, slash.id);
        feedback(`${victim.name} 因【乱武】对 ${target.name} 使用【杀】。`);
        await resolveSlash(victim, target, usedSlash);
      }
      else await damage(victim, player, 1, { skill: "乱武", noSkill: true });
      await sleep(200);
    }
    return true;
  }
  if (effect === "dimeng") {
    const [a, b] = chooseAnyEnemyPair(player);
    if (a && b && a.hand.length !== b.hand.length) {
      const diff = Math.abs(a.hand.length - b.hand.length);
      if (areaCardOptions(player, true).length < diff) return false;
      let costs;
      if (player.id === 0) {
        costs = await chooseMultipleAreaCards(player, diff, diff, () => true, `【缔盟】：需弃置 ${diff} 张牌（手牌差），以交换 ${a.name} 与 ${b.name} 的手牌`);
      } else {
        costs = await Promise.all(areaCardOptions(player, true).slice(0, diff).map((opt) => removeAreaOption(player, opt)));
      }
      if (!costs || costs.filter(Boolean).length < diff) return false;
      state.discard.push(...costs.filter(Boolean));
      [a.hand, b.hand] = [b.hand, a.hand];
      markSkillUsed(player, effect);
      feedback(`${player.name} 发动【缔盟】，弃置${diff}张牌，交换 ${a.name} 与 ${b.name} 的手牌。`);
      return true;
    }
  }
  if (effect === "zhijian") {
    const equipIndex = player.hand.findIndex((c) => ["武器", "防具", "坐骑"].includes(c.type));
    if (equipIndex >= 0 && ally) {
      const [equip] = player.hand.splice(equipIndex, 1);
      await maybeTriggerTuntian(player);
      await equipCard(ally, equip);
      draw(player, 1);
      markSkillUsed(player, effect);
      feedback(`${player.name} 发动【直谏】，将【${equip.name}】置入 ${ally.name} 的装备区并摸一张牌。`);
      return true;
    }
  }
  if (effect === "huashen" && !skillUsed(player, effect)) {
    const changed = ensureHuashenCards(player).length
      ? await chooseHuashenSkill(player, "化身")
      : await gainHuashenCards(player, 2, "化身");
    if (!changed) return false;
    markSkillUsed(player, effect);
    return true;
  }
  if (effect === "quhu") {
    const target = state.players
      .filter((p) => canTargetSkill(player, effect, p))
      .sort((a, b) =>
        (relation(player, b) === "enemy") - (relation(player, a) === "enemy")
        || b.hp - a.hp
        || b.hand.length - a.hand.length
      )[0];
    return target ? await resolveQuhuSkill(player, target) : false;
  }
  if (effect === "tianyi") {
    const target = state.players
      .filter((p) => canTargetSkill(player, effect, p))
      .sort((a, b) =>
        (relation(player, b) === "enemy") - (relation(player, a) === "enemy")
        || b.hand.length - a.hand.length
      )[0];
    return target ? await resolveTianyiSkill(player, target) : false;
  }
  if (["qixi", "guose", "duanliang", "huoji", "lianhuan", "jixi"].includes(effect) && hasSkillSourceCard(player, effect)) {
    const skillTarget = state.players
      .filter((target) => canTargetSkill(player, effect, target))
      .sort((a, b) => (relation(player, b) === "enemy") - (relation(player, a) === "enemy") || b.hand.length - a.hand.length)[0];
    if (!skillTarget) return false;
    const card = await chooseSkillSourceCard(player, effect, `发动【${officialSkillLabels[effect] || effect}】：请选择一张符合条件的牌。`);
    if (!card) return false;
    if (effect === "qixi") {
      state.discard.push(card);
      const lost = await takeChosenAreaCard(skillTarget, player, null, `【奇袭】选择弃置 ${skillTarget.name} 区域里的一张牌`);
      if (lost) state.discard.push(lost);
      feedback(`${player.name} 发动【奇袭】，将【${card.name}】当【过河拆桥】，弃置 ${skillTarget.name} 的【${lost?.name || "无"}】。`);
    }
    if (effect === "guose") addDelayedCard(skillTarget, { ...card, name: "乐不思蜀", type: "延时锦囊", needsTarget: true });
    if (effect === "duanliang") addDelayedCard(skillTarget, { ...card, name: "兵粮寸断", type: "延时锦囊", needsTarget: true });
    if (effect === "huoji") {
      state.discard.push(card);
      feedback(`${displayName(player)} 发动【火计】，将 ${cardBrief(card)} 当【火攻】对 ${displayName(skillTarget)} 使用。`);
      await resolveFireAttack(player, skillTarget, { ...card, name: "火攻", type: "锦囊", skill: "火计" });
    }
    if (effect === "lianhuan") {
      state.discard.push(card);
      skillTarget.chained = !skillTarget.chained;
      feedback(`${skillTarget.name} 因【连环】${skillTarget.chained ? "被横置" : "解除连环"}。`);
    }
    if (effect === "jixi") {
      state.discard.push(card);
      await takeRandomAreaCard(skillTarget, player);
    }
    markSkillUsed(player, effect);
    if (!["qixi", "huoji", "lianhuan"].includes(effect)) feedback(`${player.name} 发动【${officialSkillLabels[effect]}】。`);
    return true;
  }
  return false;
}

function skillNeedsTarget(effect) {
  if (isCustomRuleEffect(effect)) return customRuleNeedsTarget(customRuleForPlayer(state?.players?.[0], effect));
  return ["rende", "qingnang", "jieyin", "fanjian", "qiangxi", "tiaoxin", "qixi", "guose", "duanliang", "huoji", "lianhuan", "jixi", "quhu", "tianyi"].includes(effect);
}

function canTargetSkill(player, effect, target) {
  if (!target || !target.alive) return false;
  if (isCustomRuleEffect(effect)) return customRuleCanTarget(player, customRuleForPlayer(player, effect), target);
  if (effect === "rende") return target.id !== player.id && player.hand.length > 0;
  if (effect === "qingnang") return player.hand.length > 0 && target.hp < target.maxHp;
  if (effect === "jieyin") return target.id !== player.id && player.hand.length >= 2 && player.hp < player.maxHp && target.hp < target.maxHp;
  if (effect === "fanjian") return target.id !== player.id && player.hand.length > 0;
  if (effect === "qiangxi") return target.id !== player.id && (player.hp > 1 || player.hand.some((c) => c.type === "武器") || player.equipment?.weapon);
  if (effect === "tiaoxin") return target.id !== player.id && distanceBetween(target, player) <= attackRange(target);
  if (effect === "qixi") return target.id !== player.id && hasSkillSourceCard(player, effect) && hasAnyCardInArea(target);
  if (effect === "guose") return target.id !== player.id && hasSkillSourceCard(player, effect) && !hasJudgeCard(target, "乐不思蜀");
  if (effect === "duanliang") return target.id !== player.id && hasSkillSourceCard(player, effect) && !hasJudgeCard(target, "兵粮寸断");
  if (effect === "huoji") return target.id !== player.id && target.hand.length > 0 && hasSkillSourceCard(player, effect);
  if (["lianhuan"].includes(effect)) return target.id !== player.id && hasSkillSourceCard(player, effect);
  if (effect === "jixi") {
    if (!player.marks.jixiAwakened) return false;
    return target.id !== player.id && (player.marks.tian?.length || 0) > 0 && hasAnyCardInArea(target);
  }
  if (effect === "quhu") return target.id !== player.id && target.hp > player.hp && player.hand.length > 0 && target.hand.length > 0 && quhuDamageTargets(target).length > 0;
  if (effect === "tianyi") return target.id !== player.id && player.hand.length > 0 && target.hand.length > 0;
  return false;
}

async function activateSkillOnTarget(player, effect, target) {
  if (isCustomRuleEffect(effect)) {
    if (!skillCanResolveNow(player, effect)) {
      toast(skillUnavailableMessage(player, effect));
      render();
      return false;
    }
    pendingSkill = null;
    if (!canTargetSkill(player, effect, target)) {
      toast("这个目标不能成为该自创技能的目标。");
      render();
      return false;
    }
    const used = await activateCustomRule(player, effect, target, false);
    renderAll();
    return used;
  }
  if (!skillCanResolveNow(player, effect)) {
    toast(skillUnavailableMessage(player, effect));
    render();
    return false;
  }
  pendingSkill = null;
  if (!canTargetSkill(player, effect, target)) {
    toast("这个目标不能成为该技能的目标。");
    render();
    return false;
  }
  if (effect === "rende") {
    const count = Math.min(2, player.hand.length);
    for (let i = 0; i < count; i++) target.hand.push(player.hand.shift());
    player.temp.rendeGiven = (player.temp.rendeGiven || 0) + count;
    if (player.temp.rendeGiven >= 2 && !player.temp.rendeHealed) {
      heal(player, 1, "仁德");
      player.temp.rendeHealed = true;
    }
    feedback(`${player.name} 发动【仁德】，交给 ${target.name} ${count}张手牌。`);
    return true;
  }
  if (effect === "qingnang") {
    const cost = player.id === 0
      ? await chooseHandCard(player, () => true, `发动【青囊】：请选择一张手牌弃置，令 ${target.name} 回复1点体力。`, true)
      : randomHandCard(player);
    if (!cost) return false;
    state.discard.push(cost);
    heal(target, 1, "青囊");
    markSkillUsed(player, effect);
    feedback(`${player.name} 发动【青囊】，令 ${target.name} 回复1点体力。`);
    return true;
  }
  if (effect === "jieyin") {
    const costs = player.id === 0
      ? await chooseMultipleHandCards(player, 2, () => true, `发动【结姻】：请选择两张手牌弃置`)
      : [randomHandCard(player), randomHandCard(player)].filter(Boolean);
    if (!costs || costs.length < 2) return false;
    state.discard.push(...costs);
    heal(player, 1, "结姻");
    heal(target, 1, "结姻");
    markSkillUsed(player, effect);
    feedback(`${player.name} 发动【结姻】，与 ${target.name} 各回复1点体力。`);
    return true;
  }
  if (effect === "fanjian") {
    const gift = player.id === 0
      ? await chooseHandCard(player, () => true, `发动【反间】：请选择交给 ${target.name} 的一张手牌。`, true)
      : randomHandCard(player);
    if (!gift) return false;
    if (gift) target.hand.push(gift);
    if (Math.random() > 0.25) await damage(target, player, 1, { skill: "反间" });
    feedback(`${player.name} 发动【反间】，交给 ${target.name} 一张牌。`);
    markSkillUsed(player, effect);
    return true;
  }
  if (effect === "qiangxi") {
    let useWeapon = false;
    if ((player.hand.some((c) => c.type === "武器") || player.equipment?.weapon) && player.id === 0) {
      useWeapon = await showModal({ title: "强袭", desc: "选择发动方式", type: "select", options: [{ label: "失去1点体力", value: false }, { label: "弃置一张武器牌", value: true }] });
    }
    if (useWeapon) {
      const weapon = player.hand.find((c) => c.type === "武器") || player.equipment?.weapon;
      if (!weapon) return false;
      if (player.equipment?.weapon?.id === weapon.id) {
        await removeEquipment(player, "weapon", true);
      } else {
        const idx = player.hand.findIndex((c) => c.id === weapon.id);
        if (idx >= 0) state.discard.push(player.hand.splice(idx, 1)[0]);
      }
      feedback(`${player.name} 弃置【${weapon.name}】发动【强袭】。`);
    } else {
      if (!loseHp(player, 1, null, "强袭")) return true;
    }
    await damage(target, player, 1, { skill: "强袭", noSkill: true });
    markSkillUsed(player, effect);
    return true;
  }
  if (effect === "quhu") {
    return await resolveQuhuSkill(player, target);
  }
  if (effect === "tianyi") {
    return await resolveTianyiSkill(player, target);
  }
  if (effect === "tiaoxin") {
    const slash = target.hand.find((c) => c.name === "杀");
    if (slash && Math.random() > 0.45) {
      const usedSlash = await removeCard(target, slash.id);
      feedback(`${target.name} 因【挑衅】对 ${player.name} 使用【杀】。`);
      await resolveSlash(target, player, usedSlash);
    } else {
      const lost = await randomAnyCard(target);
      if (lost) state.discard.push(lost);
      feedback(`${player.name} 发动【挑衅】，弃置 ${target.name} 一张牌。`);
    }
    markSkillUsed(player, effect);
    return true;
  }
  if (["qixi", "guose", "duanliang", "huoji", "lianhuan", "jixi"].includes(effect)) {
    const card = await chooseSkillSourceCard(player, effect, `发动【${officialSkillLabels[effect] || effect}】：请选择一张符合条件的牌。`);
    if (!card) return false;
    if (effect === "qixi") {
      state.discard.push(card);
      const lost = await takeChosenAreaCard(target, player, null, `【奇袭】选择弃置 ${target.name} 区域里的一张牌`);
      if (lost) state.discard.push(lost);
      feedback(`${player.name} 发动【奇袭】，将【${card.name}】当【过河拆桥】，弃置 ${target.name} 的【${lost?.name || "无"}】。`);
    }
    if (effect === "guose") addDelayedCard(target, { ...card, name: "乐不思蜀", type: "延时锦囊", needsTarget: true });
    if (effect === "duanliang") addDelayedCard(target, { ...card, name: "兵粮寸断", type: "延时锦囊", needsTarget: true });
    if (effect === "huoji") {
      state.discard.push(card);
      feedback(`${displayName(player)} 发动【火计】，将 ${cardBrief(card)} 当【火攻】对 ${displayName(target)} 使用。`);
      await resolveFireAttack(player, target, { ...card, name: "火攻", type: "锦囊", skill: "火计" });
    }
    if (effect === "lianhuan") {
      state.discard.push(card);
      target.chained = !target.chained;
      feedback(`${target.name} 因【连环】${target.chained ? "被横置" : "解除连环"}。`);
    }
    if (effect === "jixi") {
      state.discard.push(card);
      await takeRandomAreaCard(target, player);
    }
    markSkillUsed(player, effect);
    if (!["qixi", "huoji", "lianhuan"].includes(effect)) feedback(`${player.name} 发动【${officialSkillLabels[effect]}】，目标 ${target.name}。`);
    return true;
  }
  return false;
}

function chooseAiCard(player) {
  if (player.hp < player.maxHp) {
    const tao = player.hand.find((c) => c.name === "桃");
    if (tao) return tao;
  }
  const crossbow = player.hand.find((c) => c.name === "诸葛连弩");
  if (crossbow && player.hand.filter((c) => effectiveUseName(player, c) === "杀").length > 1) return crossbow;
  const enemy = chooseAiTarget(player);
  if (!enemy) return player.hand.find((c) => !c.needsTarget && c.name !== "闪");
  return player.hand.find((c) => {
    const useName = effectiveUseName(player, c);
    const target = effectiveNeedsTarget(player, c) ? chooseAiTargetForCard(player, c) : null;
    return (["杀", "决斗", "顺手牵羊", "过河拆桥", "火攻", "铁索连环", "乐不思蜀", "兵粮寸断"].includes(useName) || c.custom)
      && !canUseCard(player, c, effectiveNeedsTarget(player, c) ? target : null);
  })
    || player.hand.find((c) => !c.needsTarget && c.name !== "闪" && !canUseCard(player, c, null));
}

function chooseAiTarget(player) {
  const enemies = state.players.filter((p) => p.alive && p.id !== player.id && relation(player, p) === "enemy");
  const pool = enemies.length ? enemies : state.players.filter((p) => p.alive && p.id !== player.id);
  return pool.sort((a, b) => a.hp - b.hp || b.hand.length - a.hand.length)[0];
}

function chooseAiTargetForCard(player, card) {
  if (effectiveUseName(player, card) === "桃") {
    return [player, ...state.players.filter((p) => p.alive && p.id !== player.id && relation(player, p) === "ally")]
      .filter((target) => target.alive && target.hp < target.maxHp && !canUseCard(player, card, target))
      .sort((a, b) => a.hp - b.hp)[0] || null;
  }
  const candidates = state.players
    .filter((target) => target.alive && target.id !== player.id && !canUseCard(player, card, target))
    .sort((a, b) => {
      const relationScore = (relation(player, a) === "enemy" ? 0 : 1) - (relation(player, b) === "enemy" ? 0 : 1);
      return relationScore || a.hp - b.hp || distanceBetween(player, a) - distanceBetween(player, b);
    });
  return candidates[0] || null;
}

function chooseAiTargetsForCard(player, card, maxTargets = 1) {
  const allowSelf = effectiveUseName(player, card) === "铁索连环";
  return state.players
    .filter((target) => target.alive && (allowSelf || target.id !== player.id) && !canUseCard(player, card, target))
    .sort((a, b) => {
      const relationScore = (relation(player, a) === "enemy" ? 0 : 1) - (relation(player, b) === "enemy" ? 0 : 1);
      return relationScore || Number(a.chained) - Number(b.chained) || a.hp - b.hp;
    })
    .slice(0, maxTargets);
}

function render() {
  if (!state) {
    renderEmptyTable();
    return;
  }
  $("phaseText").textContent = state.winner || state.phase;
  $("myRole").textContent = state.players[0].role;
  $("goalText").textContent = roleGoal(state.players[0].role);
  const humanPending = state.pendingReaction?.playerId === 0 || state.pendingDying?.responderId === 0;
  $("endTurnBtn").disabled = Boolean(state.winner) || (!humanPending && state.turn !== 0) || (Boolean(state.pendingReaction) && state.pendingReaction.playerId !== 0) || (Boolean(state.pendingDying) && state.pendingDying.responderId !== 0);
  $("endTurnBtn").textContent = state.pendingDying?.responderId === 0
    ? "放弃响应"
    : state.pendingReaction?.playerId === 0
      ? "放弃响应"
      : state.discarding?.playerId === 0
        ? (state.discarding.effect ? (state.discarding.selectedIds.length ? "确认发动" : "取消技能") : "确认弃牌")
        : "结束出牌";
  renderTable();
  renderHand();
  renderTurnGuide();
  renderIdentityBoard();
  renderResultPanel();
  renderSeatInspector();
  renderPileInspector();
  renderPhaseTrack();
  renderPlayerSkills();
  renderLog();
}

function renderAll() {
  render();
}

function renderEmptyTable() {
  $("table").innerHTML = "";
  $("hand").innerHTML = "";
  $("log").innerHTML = "";
  $("activeActor").textContent = "未开始";
  $("nextActionText").textContent = "开始新局后查看提示。";
  $("identityHint").textContent = "未开局";
  $("identityBoard").innerHTML = `<p class="identity-empty">开始新局后显示身份配置与公开身份。</p>`;
  $("resultPanel").hidden = true;
  $("resultPanel").innerHTML = "";
  $("seatInspectorHint").textContent = "点击角色";
  $("seatInspectorBody").innerHTML = `<p class="identity-empty">开局后点击牌桌上的角色查看武将、装备与技能。</p>`;
  $("pileInspectorHint").textContent = "点击牌堆";
  $("pileInspectorBody").innerHTML = `<p class="identity-empty">开局后点击中央牌堆或弃牌堆查看局内牌流。</p>`;
  $("selectedCardInfo").textContent = "点击手牌可查看用途，需要目标的牌会提示可选角色。";
  $("actionPrompt").className = "action-prompt";
  $("phaseTrack").innerHTML = "";
}

function renderIdentityBoard() {
  if (state.mode === "fengshen") {
    const campaign = state.campaign;
    const boss = state.players[1];
    $("identityHint").textContent = state.winner || `第 ${campaign.stageIndex + 1}/5 关`;
    $("identityBoard").innerHTML = `
      <div class="identity-counts">
        <div class="identity-count">
          <span>关卡</span>
          <strong>${campaign.stageIndex + 1}/5</strong>
          <small>已胜 ${campaign.wins || campaign.stageIndex}</small>
        </div>
        <div class="identity-count">
          <span>守关</span>
          <strong>${escapeHtml(boss.hero.name)}</strong>
          <small>${boss.hp}/${boss.maxHp}体力</small>
        </div>
      </div>
      <div class="revealed-list">
        ${campaign.opponents.map((hero, index) => `
          <span class="revealed-role ${index < campaign.stageIndex ? "winner" : ""} ${index === campaign.stageIndex ? "" : "dead"}">
            第${index + 1}关 · ${escapeHtml(hero.name)}
          </span>
        `).join("")}
      </div>
    `;
    return;
  }
  const roleOrder = ["主公", "忠臣", "反贼", "内奸"];
  const totals = { 主公: 1, 忠臣: 2, 反贼: 4, 内奸: 1 };
  const deadCounts = roleOrder.reduce((acc, role) => {
    acc[role] = state.players.filter((p) => !p.alive && p.role === role).length;
    return acc;
  }, {});
  const revealedPlayers = state.players.filter((p) => p.id === 0 || p.role === "主公" || !p.alive);
  const hiddenAlive = state.players.filter((p) => p.alive && p.id !== 0 && p.role !== "主公").length;

  $("identityHint").textContent = state.winner ? state.winner : `未明存活 ${hiddenAlive} 人`;
  $("identityBoard").innerHTML = `
    <div class="identity-counts">
      ${roleOrder.map((role) => `
        <div class="identity-count">
          <span>${role}</span>
          <strong>${totals[role] - deadCounts[role]}/${totals[role]}</strong>
          <small>阵亡 ${deadCounts[role]}</small>
        </div>
      `).join("")}
    </div>
    <div class="revealed-list">
      ${revealedPlayers.map((p) => `
        <span class="revealed-role ${p.alive ? "" : "dead"}">
          ${escapeHtml(displayName(p))} · ${escapeHtml(p.role)}${p.alive ? "" : " · 阵亡"}
        </span>
      `).join("")}
    </div>
  `;
}

function winnerRoles(winner) {
  if (winner === "封神之路挑战失败") return new Set(["守关者"]);
  if (/封神之路/.test(winner || "")) return new Set(["挑战者"]);
  if (winner === "主忠胜利") return new Set(["主公", "忠臣"]);
  if (winner === "反贼胜利") return new Set(["反贼"]);
  if (winner === "内奸胜利") return new Set(["内奸"]);
  return new Set();
}

function renderResultPanel() {
  const panel = $("resultPanel");
  if (!state.winner) {
    panel.hidden = true;
    panel.innerHTML = "";
    return;
  }
  // Hide surrender button when game is over
  const surrenderBtn = $("surrenderBtn");
  if (surrenderBtn) surrenderBtn.hidden = true;
  const winningRoles = winnerRoles(state.winner);
  const me = state.players[0];
  const outcome = state.mode === "fengshen"
    ? (state.winner === "封神之路挑战失败" ? "失败" : "胜利")
    : winningRoles.has(me.role) ? "胜利" : "失败";
  const resultLabel = state.mode === "fengshen" ? `第${state.campaign.stageIndex + 1}/5关` : `你的身份：${escapeHtml(me.role)}`;
  panel.hidden = false;
  panel.innerHTML = `
    <div class="result-title">
      <span>战局结算</span>
      <strong>${escapeHtml(state.winner)}</strong>
    </div>
    <div class="result-outcome ${outcome === "胜利" ? "win" : "lose"}">
      ${resultLabel} · ${outcome}
    </div>
    <div class="result-roster">
      ${state.players.map((p) => `
        <span class="${p.alive ? "" : "dead"} ${winningRoles.has(p.role) ? "winner" : ""}">
          ${escapeHtml(displayName(p))} · ${escapeHtml(p.hero.name)} · ${escapeHtml(p.role)}${p.alive ? "" : " · 阵亡"}
        </span>
      `).join("")}
    </div>
  `;
}

function renderSeatInspector() {
  let player = state.players.find((p) => p.id === inspectedPlayerId);
  if (!player) {
    inspectedPlayerId = 0;
    player = state.players[0];
  }
  const suspicion = state.suspicions[player.id] || "未标记";
  const canMark = player.id !== 0 && player.alive && visibleRole(player) === "身份未明";
  const sealedGroups = sealedCardGroups(player).filter((group) => group.cards?.length);
  const missionInfo = missionText(player);
  $("seatInspectorHint").textContent = player.alive ? visibleRole(player) : `${player.role} · 阵亡`;
  $("seatInspectorBody").innerHTML = `
    <div class="inspector-hero" style="${heroArtStyle(player.hero)}">
      <strong>${escapeHtml(displayName(player))}</strong>
      <span>${escapeHtml(player.hero.camp)} · ${escapeHtml(player.hero.pack)} · ${player.hp}/${player.maxHp}体力</span>
    </div>
    <div class="inspector-stats">
      <span>身份：${escapeHtml(visibleRole(player))}</span>
      <span>手牌：${player.hand.length} 张</span>
      <span>状态：${player.dying ? "濒死" : player.alive ? `存活${player.chained ? " · 连环" : ""}` : "阵亡"}</span>
    </div>
    <div class="suspicion-panel">
      <strong>身份标记</strong>
      ${canMark ? `<div class="suspicion-actions">
        ${["未标记", "疑忠", "疑反", "疑内"].map((label) => `<button class="${suspicion === label ? "active" : ""}" data-suspicion="${label}">${label}</button>`).join("")}
      </div>` : `<span>${escapeHtml(player.id === 0 || player.role === "主公" || !player.alive ? visibleRole(player) : suspicion)}</span>`}
    </div>
    <div class="inspector-equipment">
      <strong>装备 / 判定区</strong>
      <span>${equipmentText(player) || "无装备"}</span>
      <span>${judgeAreaText(player) || "无判定牌"}</span>
    </div>
    <div class="inspector-equipment">
      <strong>武将牌上</strong>
      ${sealedGroups.length ? sealedGroups.map((group) => `<span>${escapeHtml(group.label)}：${group.cards.map(cardBrief).map(escapeHtml).join("、")}</span>`).join("") : "<span>无扣置牌</span>"}
    </div>
    <div class="inspector-equipment">
      <strong>使命技</strong>
      <span>${escapeHtml(missionInfo || "无使命状态")}</span>
    </div>
    <div class="inspector-skills">
      <strong>技能</strong>
      ${playerSkillEntries(player).map(({ skill }) => `<p>${escapeHtml(skill)}</p>`).join("") || "<p>无技能</p>"}
      ${effectLabelsForPlayer(player).length ? `<div class="effect-tags">${effectLabelsForPlayer(player).map((label) => `<span class="effect-tag">${escapeHtml(label)}</span>`).join("")}</div>` : ""}
    </div>
  `;
  document.querySelectorAll("[data-suspicion]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mark = btn.dataset.suspicion;
      if (mark === "未标记") {
        delete state.suspicions[player.id];
      } else {
        state.suspicions[player.id] = mark;
      }
      render();
    });
  });
}

function renderPileInspector() {
  const recentDiscard = [...state.discard].slice(-8).reverse();
  $("pileInspectorHint").textContent = inspectedPile === "deck" ? `牌堆 ${state.deck.length}` : `弃牌 ${state.discard.length}`;
  if (inspectedPile === "deck") {
    const nextKnown = state.deck[state.deck.length - 1];
    $("pileInspectorBody").innerHTML = `
      <div class="pile-summary">
        <span>剩余牌堆</span>
        <strong>${state.deck.length}</strong>
        <small>洗混牌堆，通常不可查看牌序。</small>
      </div>
      <div class="pile-mini-list">
        <span>${nextKnown ? "牌堆顶未知" : "牌堆已空，将从弃牌堆重洗。"}</span>
      </div>
    `;
    return;
  }
  $("pileInspectorBody").innerHTML = `
    <div class="pile-summary">
      <span>弃牌堆</span>
      <strong>${state.discard.length}</strong>
      <small>显示最近进入弃牌堆的牌。</small>
    </div>
    <div class="pile-mini-list">
      ${recentDiscard.map((card) => `
        <button class="pile-card ${cardTypeClass[card.type] || ""}" title="${escapeHtml(cardDetail(card))}">
          <strong>${escapeHtml(card.name)}</strong>
          <span>${escapeHtml(card.type)} · ${escapeHtml(card.suit || "自")}</span>
        </button>
      `).join("") || "<span>暂无弃牌。</span>"}
    </div>
  `;
}

function renderPhaseTrack() {
  const mode = state.pendingReaction
    ? "response"
    : state.discarding?.playerId === 0
      ? "弃牌阶段"
      : state.currentPhase || "观战";
  const items = [
    ["准备阶段", "准备", "观星 / 洛神"],
    ["判定阶段", "判定", "延时锦囊"],
    ["摸牌阶段", "摸牌", "摸牌技能"],
    ["出牌阶段", "出牌", "用牌 / 技能"],
    ["弃牌阶段", "弃牌", "手牌上限"],
    ["结束阶段", "结束", "闭月 / 崩坏"]
  ];
  $("phaseTrack").innerHTML = items.map(([id, title, sub]) => `
    <div class="phase-step ${mode === id || (state.pendingReaction && id === "出牌阶段") ? "active" : ""}">
      <strong>${title}</strong>
      <span>${sub}</span>
    </div>
  `).join("");
}

function renderTurnGuide() {
  const actor = state.players[state.turn];
  $("activeActor").textContent = state.winner
    ? "游戏结束"
    : actor ? displayName(actor) : "未开始";
  $("nextActionText").textContent = getNextActionText();
}

function getNextActionText() {
  if (state.winner) return state.winner;
  if (state.pendingReaction) {
    const source = state.players[state.pendingReaction.sourceId];
    return `响应 ${source.name}：点击可打出的牌选中，再次点击该牌立即打出。`;
  }
  if (state.pendingDying) {
    const target = state.players[state.pendingDying.targetId];
    return `${target.name} 濒死：点击【桃】${state.pendingDying.responderId === state.pendingDying.targetId ? "或【酒】" : ""}选中，再次点击该牌使用。`;
  }
  if (state.discarding?.playerId === 0) {
    const left = state.discarding.required - state.discarding.selectedIds.length;
    return left > 0 ? `弃牌阶段：还需选择 ${left} 张手牌，然后点击“确认弃牌”。` : "弃牌已选够，点击“确认弃牌”进入下家。";
  }
  const selected = state.players[0].hand.find((card) => card.id === selectedCardId);
  if (pendingSkill) return `已选择【${officialSkillLabels[pendingSkill.effect] || pendingSkill.effect}】，点击桌面上高亮的角色作为目标。`;
  if (selected && effectiveUseName(state.players[0], selected) === "铁索连环") {
    return pendingCardTargets.length
      ? `已选择【铁索连环】第1个目标，可再选1名角色，或再次点击已选目标结算。`
      : "已选择【铁索连环】，可选择至多两名角色。";
  }
  if (selected?.needsTarget) return `已选【${selected.name}】，点击桌面上标有“可选目标”的角色。`;
  if (selected) return `已选【${selected.name}】，这张牌可立即使用或取消选择。`;
  if (state.turn === 0 && state.currentPhase === "出牌阶段") return "你的出牌阶段：金边手牌可用，需要目标的牌会标出目标。";
  if (state.turn === 0) return `当前是${state.currentPhase || "阶段处理中"}，请留意阶段技能与结算提示。`;
  return "电脑行动中：留意中央结算栏；被指定时会进入响应窗口。";
}

function renderTable() {
  const positions = state.mode === "fengshen" ? [
    ["50%", "calc(100% - 176px)", "-50%", "0"],
    ["50%", "8px", "-50%", "0"]
  ] : [
    ["50%", "calc(100% - 176px)", "-50%", "0"],
    ["24%", "calc(100% - 176px)", "-50%", "0"],
    ["5px", "52%", "0", "-50%"],
    ["18%", "5px", "0", "0"],
    ["50%", "5px", "-50%", "0"],
    ["82%", "5px", "-100%", "0"],
    ["calc(100% - 5px)", "52%", "-100%", "-50%"],
    ["76%", "calc(100% - 176px)", "-50%", "0"]
  ];
  const center = `<div class="table-center">
    <div id="resolveBanner" class="resolve-banner ${state.pendingReaction || state.pendingDying ? "waiting" : ""}">
      <span class="resolve-label">${state.pendingDying ? "濒死响应" : state.pendingReaction ? "响应阶段" : escapeHtml(state.phase)}</span>
      <strong>${escapeHtml(state.pendingDying ? `${state.players[state.pendingDying.targetId].name} 濒死，请选择救援牌` : state.pendingReaction ? `请选择【${state.pendingReaction.required}】并确认` : (state.lastAction || "牌局进行中"))}</strong>
    </div>
    <div class="deck-strip">
      <button class="deck-stack ${inspectedPile === "deck" ? "active" : ""}" data-pile="deck"><span>牌堆</span><strong>${state.deck.length}</strong></button>
      <button class="discard-stack ${inspectedPile === "discard" ? "active" : ""}" data-pile="discard"><span>弃牌</span><strong>${state.discard.length}</strong></button>
    </div>
  </div>`;
  $("table").innerHTML = center + state.players.map((p, i) => {
    const [left, top, tx, ty] = positions[i];
    const selectedCard = state.players[0].hand.find((card) => card.id === selectedCardId);
    const skillTargetable = !state.pendingDying && pendingSkill && state.turn === 0 && state.currentPhase === "出牌阶段" && canTargetSkill(state.players[0], pendingSkill.effect, p);
    const cardTargetable = !state.pendingDying && selectedCardId && state.turn === 0 && state.currentPhase === "出牌阶段" && p.alive && effectiveNeedsTarget(state.players[0], selectedCard) && !canUseCard(state.players[0], selectedCard, p);
    const targetable = skillTargetable || cardTargetable ? "targetable" : "";
    const chainSelected = selectedCard && effectiveUseName(state.players[0], selectedCard) === "铁索连环" && pendingCardTargets.includes(p.id);
    const targetLabel = chainSelected ? "已选" : skillTargetable ? "技能目标" : selectedCard && effectiveUseName(state.players[0], selectedCard) === "铁索连环" ? `第${pendingCardTargets.length + 1}目标` : "可选目标";
    const suspicion = state.suspicions[p.id];
    const hpText = `${"♥".repeat(Math.max(0, p.hp))}${"♡".repeat(Math.max(0, p.maxHp - p.hp))}`;
    const statusText = [p.dying ? "濒死" : "", p.chained ? "连环" : "", p.flipped ? "翻面" : ""].filter(Boolean).join(" · ");
    const seatEquip = equipmentText(p);
    const seatJudge = judgeAreaText(p);
    const sealText = sealedCardText(p);
    const missionInfo = missionText(p);
    return `<article class="seat ${state.turn === i ? "current" : ""} ${inspectedPlayerId === p.id ? "inspected" : ""} ${p.dying ? "dying" : ""} ${p.chained ? "chained" : ""} ${p.flipped ? "flipped" : ""} ${chainSelected ? "chain-picked" : ""} ${p.alive ? "" : "dead"} ${targetable}" data-seat="${p.id}" data-target-label="${escapeHtml(targetLabel)}" style="left:${left};top:${top};transform:translate(${tx}, ${ty});${heroArtStyle(p.hero)}">
      <div class="seat-frame">
        <div class="seat-top-tags">
          <span class="camp-mark">${escapeHtml(p.hero.camp)}</span>
          <span class="hand-mark">手${p.hand.length}</span>
        </div>
        <div class="avatar" style="${heroArtStyle(p.hero)}"><span>${escapeHtml(p.hero.name)}</span></div>
        <div class="seat-name"><span>${escapeHtml(p.name)}</span><span class="role-pill">${visibleRole(p)}</span></div>
        <div class="hp-row" aria-label="体力 ${p.hp}/${p.maxHp}">${hpText}</div>
        <div class="seat-stats"><span>${escapeHtml(p.hero.pack)}</span><span>${escapeHtml(p.hero.camp)}势力</span></div>
        ${sealText ? `<div class="seat-sealed" title="武将牌上:${escapeHtml(sealText)}">${escapeHtml(sealText)}</div>` : ""}
        ${missionInfo ? `<div class="seat-mission" title="使命技:${escapeHtml(missionInfo)}">${escapeHtml(missionInfo)}</div>` : ""}
        <div class="seat-equip ${seatEquip ? "" : "empty"}" title="${seatEquip || "无装备"}">${seatEquip || "无装备"}</div>
        ${seatJudge ? `<div class="seat-judge" title="判定区:${seatJudge}">判定 ${seatJudge}</div>` : ""}
      </div>
      <div class="seat-meta">
        ${suspicion ? `<span class="suspicion-pill">${escapeHtml(suspicion)}</span>` : ""}
        ${statusText ? `<span class="status-pill">${escapeHtml(statusText)}</span>` : ""}
        <span class="hp">体力 ${hpText}</span>
        <span>手牌 ${p.hand.length} 张</span>
        ${seatEquip ? `<span class="equipment-line">${seatEquip}</span>` : ""}
        ${seatJudge ? `<span class="equipment-line">判定:${seatJudge}</span>` : ""}
        ${sealText ? `<span class="equipment-line">武将牌上:${escapeHtml(sealText)}</span>` : ""}
        ${missionInfo ? `<span class="equipment-line">使命:${escapeHtml(missionInfo)}</span>` : ""}
        ${effectLabelsForPlayer(p).length ? `<span class="effect-tag">${escapeHtml(effectLabelsForPlayer(p).join(" / "))}</span>` : ""}
      </div>
    </article>`;
  }).join("");
  document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", () => {
      const target = state.players[Number(seat.dataset.seat)];
      if (pendingSkill && state.turn === 0 && state.currentPhase === "出牌阶段") {
        activateSkillOnTarget(state.players[0], pendingSkill.effect, target).then(() => render());
        return;
      }
      if (selectedCardId && state.turn === 0 && state.currentPhase === "出牌阶段") {
        const card = state.players[0].hand.find((c) => c.id === selectedCardId);
        handleSelectedCardTarget(state.players[0], card, target);
        return;
      }
      inspectedPlayerId = target.id;
      render();
    });
  });
  document.querySelectorAll("[data-pile]").forEach((button) => {
    button.addEventListener("click", () => {
      inspectedPile = button.dataset.pile;
      render();
    });
  });
}

function equipmentText(player) {
  const equipment = player.equipment || {};
  return [
    equipment.weapon ? `武器:${escapeHtml(equipment.weapon.name)}` : "",
    equipment.armor ? `防具:${escapeHtml(equipment.armor.name)}` : "",
    equipment.attackHorse ? `-1:${escapeHtml(equipment.attackHorse.name)}` : "",
    equipment.defenseHorse ? `+1:${escapeHtml(equipment.defenseHorse.name)}` : ""
  ].filter(Boolean).join(" ");
}

function judgeAreaText(player) {
  return (player.judgeArea || []).map((card) => escapeHtml(card.name)).join(" ");
}

function handleSelectedCardTarget(player, card, target) {
  if (!card) return;
  const useName = effectiveUseName(player, card);
  if (useName !== "铁索连环") {
    useCard(player, card, target);
    return;
  }
  const blocked = canUseCard(player, card, target);
  if (blocked) {
    toast(blocked);
    return;
  }
  if (pendingCardTargets.includes(target.id)) {
    useCard(player, card, pendingCardTargets.map((id) => state.players[id]).filter((p) => p?.alive));
    return;
  }
  pendingCardTargets.push(target.id);
  if (pendingCardTargets.length >= 2) {
    useCard(player, card, pendingCardTargets.map((id) => state.players[id]).filter((p) => p?.alive));
    return;
  }
  feedback(`已选择 ${target.name} 为【铁索连环】第1个目标，可继续选择第2个目标。`);
  render();
}

function skillName(skill) {
  const match = skill.match(/^([^：:]{1,8})[：:]/);
  return match ? match[1] : skill.slice(0, 4);
}

function skillBody(skill) {
  const chineseColon = skill.indexOf("：");
  const asciiColon = skill.indexOf(":");
  const index = chineseColon >= 0 ? chineseColon : asciiColon;
  return index >= 0 ? skill.slice(index + 1) : skill;
}

function renderPlayerSkills() {
  const me = state.players[0];
  const entries = playerSkillEntries(me);
  const effects = entries.map((entry) => entry.effect).filter((effect) => effect && effect !== "none");
  $("skillHint").textContent = effects.length ? `${effects.length} 个运行效果` : "展示技能";
  $("playerSkills").innerHTML = entries.map(({ skill, effect }, index) => {
    const option = skillEffectOptions.find((item) => item.id === effect);
    const rule = customRuleForPlayer(me, effect);
    const active = canManuallyActivate(effect) && skillCanResolveNow(me, effect);
    const selecting = pendingSkill?.effect === effect;
    return `<button class="skill-chip ${active ? "skill-ready" : ""} ${selecting ? "selected" : ""}" data-skill-index="${index}" data-skill-effect="${escapeHtml(effect)}" title="${escapeHtml(skill)}">
      <strong>${escapeHtml(skillName(skill))}</strong>
      <span>${escapeHtml(rule ? customRuleLabel(rule) : officialSkillLabels[effect] || option?.label || "查看技能")} · ${selecting ? "选择目标 · " : active ? "可发动 · " : ""}${escapeHtml(skillBody(skill))}</span>
    </button>`;
  }).join("");
  document.querySelectorAll(".skill-chip").forEach((chip) => {
    chip.addEventListener("click", async () => {
      const skill = chip.getAttribute("title") || "";
      const effect = chip.dataset.skillEffect;
      if (canManuallyActivate(effect) && state.turn === 0 && state.currentPhase === "出牌阶段" && !state.pendingReaction && !state.pendingDying && !state.discarding) {
        if (!skillCanResolveNow(me, effect)) {
          pendingSkill = null;
          selectedCardId = null;
          toast(skillUnavailableMessage(me, effect));
          render();
          return;
        }
        if (skillNeedsTarget(effect)) {
          const targets = state.players.filter((target) => canTargetSkill(me, effect, target));
          if (!targets.length) {
            toast(skillUnavailableMessage(me, effect));
            pendingSkill = null;
            selectedCardId = null;
            render();
            return;
          }
          pendingSkill = pendingSkill?.effect === effect ? null : { effect, skillIndex: Number(chip.dataset.skillIndex) };
          selectedCardId = null;
          render();
          return;
        }
        const used = await activateSkill(me, effect, false);
        if (used) {
          render();
          return;
        }
      }
      toast(skill);
    });
  });
}

function canManuallyActivate(effect) {
  if (isCustomRuleEffect(effect)) return customRuleForPlayer(state?.players?.[0], effect)?.timing === "play";
  return ["rende", "limitedDrawTwo", "zhiheng", "kurou", "qingnang", "jieyin", "lijian", "fanjian", "qiangxi", "tiaoxin", "shensu", "guhuo", "luanwu", "dimeng", "zhijian", "huashen", "qixi", "guose", "duanliang", "huoji", "luanji", "lianhuan", "jixi", "quhu", "tianyi", "zhuangshi", "pingxiang"].includes(effect);
}

function renderHand() {
  const me = state.players[0];
  const selected = me.hand.find((card) => card.id === selectedCardId);
  const slashLeft = Math.max(0, slashLimit(me) - me.slashUsed);
  const reaction = state.pendingReaction;
  const dyingChoice = state.pendingDying?.responderId === 0 ? state.pendingDying : null;
  const dyingTarget = dyingChoice ? state.players[dyingChoice.targetId] : null;
  const discarding = state.discarding?.playerId === 0 ? state.discarding : null;
  $("handHint").textContent = dyingChoice
    ? `濒死救援`
    : reaction
    ? `需要【${reaction.required}】`
    : discarding
      ? discarding.effect
        ? `${officialSkillLabels[discarding.effect] || "技能"} ${discarding.selectedIds.length}/${discarding.max ?? discarding.required}`
        : `弃牌 ${discarding.selectedIds.length}/${discarding.required}`
      : pendingSkill
        ? `选择【${officialSkillLabels[pendingSkill.effect] || pendingSkill.effect}】目标`
      : state.turn === 0 && state.currentPhase === "出牌阶段" ? `可出杀 ${slashLeft === Infinity ? "∞" : slashLeft} 次` : "等待电脑行动";
  $("actionPrompt").textContent = state.winner
    ? state.winner
    : dyingChoice
      ? `${dyingTarget.name} 正处于濒死状态。点击一张【桃】${dyingTarget.id === 0 ? "或【酒】" : ""}选中，再次点击该牌使用。`
    : reaction
      ? `${state.players[reaction.sourceId].name} 正在要求你打出【${reaction.required}】。点击可用牌选中，再次点击该牌打出。`
    : discarding
      ? discarding.effect
        ? (discarding.prompt || `请选择要弃置的手牌发动【${officialSkillLabels[discarding.effect] || discarding.effect}】。`)
        : `弃牌阶段：你的手牌上限为 ${handLimit(me)}，请选择 ${discarding.required} 张手牌弃置。`
    : pendingSkill
      ? `请选择【${officialSkillLabels[pendingSkill.effect] || pendingSkill.effect}】的目标。再次点击该技能可取消。`
    : selected
      ? effectiveUseName(me, selected) === "铁索连环"
        ? `请选择【铁索连环】目标：最多两名。已选 ${pendingCardTargets.length}/2，点已选目标可立即结算。`
        : `请选择【${selected.name}】的目标。再次点击该牌可取消。`
      : state.turn === 0 && state.currentPhase === "出牌阶段"
      ? "选择一张可用手牌；需要目标的牌会高亮可选角色。"
      : state.turn === 0
      ? `当前是${state.currentPhase || "阶段处理中"}。`
      : `${state.players[state.turn]?.name || "电脑"} 正在行动。`;
  $("actionPrompt").className = `action-prompt ${reaction || dyingChoice ? "response" : ""} ${discarding ? "discard-mode" : ""}`;
  $("selectedCardInfo").textContent = dyingChoice
    ? `濒死窗口：可用牌会高亮。第一次点击选中，第二次点击同一张牌使用；底部按钮用于放弃响应。`
    : reaction
    ? `响应窗口：第一次点击选中可当【${reaction.required}】打出的牌，第二次点击同一张牌立即打出。`
    : discarding
      ? discarding.effect
        ? `已选择 ${discarding.selectedIds.length} 张。至少 ${discarding.min ?? discarding.required} 张，最多 ${discarding.max ?? discarding.required} 张；确认后结算技能。`
        : `已选择 ${discarding.selectedIds.length} / ${discarding.required} 张。再次点击已选牌可取消选择。`
    : pendingSkill
      ? `技能选目标：桌面上金边角色可被【${officialSkillLabels[pendingSkill.effect] || pendingSkill.effect}】指定。`
    : selected
      ? effectiveUseName(me, selected) === "铁索连环"
        ? `【铁索连环】可选至多两名角色。已选 ${pendingCardTargets.length}/2；选择第2名后自动结算。`
        : `【${selected.name}】${selected.type}：${escapePlain(cardDetail(selected))}`
      : "点击手牌查看用途；选中需要目标的牌后，桌面会标出可选角色。";
  $("hand").innerHTML = me.hand.map((card) => {
    const needsTarget = effectiveNeedsTarget(me, card);
    const blocked = dyingChoice
      ? (canUseForPendingDying(card) ? "" : "这张牌不能用于当前濒死结算")
      : reaction
      ? (cardCanRespondAs(me, card, reaction.required) ? "" : `此时需要【${reaction.required}】`)
      : discarding
        ? ""
        : state && state.turn === 0 && state.currentPhase === "出牌阶段" ? canUseCard(me, card, needsTarget ? state.players.find((p) => p.alive && p.id !== 0) : null) : "等待";
    const discardSelected = discarding?.selectedIds.includes(card.id);
    const usable = discarding || (dyingChoice ? canUseForPendingDying(card) : reaction ? cardCanRespondAs(me, card, reaction.required) : (!blocked || needsTarget));
    const hint = discarding
      ? (discardSelected ? "待弃置" : "点击弃置")
      : dyingChoice
        ? (canUseForPendingDying(card) ? (selectedCardId === card.id ? "再点使用" : "救援") : "不可用")
      : reaction
        ? (cardCanRespondAs(me, card, reaction.required) ? (selectedCardId === card.id ? "再点打出" : "可响应") : "锁定")
      : cardHintForPlayer(me, card);
    return `<button class="card ${cardTypeClass[card.type] || ""} ${selectedCardId === card.id ? "selected" : ""} ${discardSelected ? "discard-selected" : ""} ${usable ? "playable" : "blocked"}" data-card="${card.id}" title="${escapeHtml(blocked || (discarding ? "点击选择弃置" : "可使用"))}">
    <small>${card.type}</small>
    <strong>${card.name}</strong>
    <span class="suit">${card.suit}</span>
    <span class="card-hint">${escapeHtml(hint)}</span>
  </button>`;
  }).join("");
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", () => {
      const card = me.hand.find((c) => c.id === Number(el.dataset.card));
      if (state.discarding?.playerId === 0) {
        toggleDiscardSelection(card.id);
        return;
      }
      if (state.pendingDying?.responderId === 0) {
        selectPendingDyingCard(card);
        return;
      }
      if (pendingSkill) {
        pendingSkill = null;
        selectedCardId = null;
        pendingCardTargets = [];
        render();
        return;
      }
      if (state.pendingReaction) {
        selectReactionCard(card);
        return;
      }
      if (state.turn !== 0 || state.winner || state.currentPhase !== "出牌阶段") return;
      const needsTarget = effectiveNeedsTarget(me, card);
      const blocked = canUseCard(me, card, needsTarget ? undefined : null);
      if (blocked && !needsTarget) {
        log(blocked);
        render();
        return;
      }
      if (card.name === "闪" && effectiveUseName(me, card) === "闪") {
        log("【闪】通常用于响应，当前不能主动使用。");
        toast("【闪】用于响应杀，当前不能主动使用。");
        render();
        return;
      }
      if (needsTarget) {
        if (selectedCardId === card.id && effectiveUseName(me, card) === "铁索连环" && !pendingCardTargets.length) {
          useCard(me, card, []);
          return;
        }
        if (selectedCardId === card.id) {
          selectedCardId = null;
          pendingCardTargets = [];
        } else {
          selectedCardId = card.id;
          pendingCardTargets = [];
        }
        render();
      } else {
        pendingCardTargets = [];
        useCard(me, card, null);
      }
    });
  });
}

function cardHint(card) {
  if (["杀", "火杀", "雷杀"].includes(card.name)) return "指定目标";
  if (card.name === "闪") return "响应";
  if (card.name === "无懈可击") return "响应锦囊";
  if (card.name === "铁索连环") return "选目标/重铸";
  if (card.name === "桃") return "回复";
  if (card.needsTarget) return "选目标";
  if (["武器", "防具", "坐骑"].includes(card.type)) return "装备";
  return "立即使用";
}

function cardHintForPlayer(player, card) {
  const useName = effectiveUseName(player, card);
  if (useName !== card.name) return `当${useName}`;
  return cardHint(card);
}

function cardDetail(card) {
  if (card.text) return card.text;
  if (card.name === "杀") return "出牌阶段对一名其他角色使用，通常每回合限一次，目标可打出【闪】响应。";
  if (card.name === "闪") return "不能主动使用；当你成为【杀】的目标时，可打出它抵消。";
  if (card.name === "桃") return "出牌阶段只能对自己使用并回复1点体力；濒死结算时可对濒死角色使用。";
  if (card.name === "酒") return "出牌阶段使用，本回合下一张【杀】造成的伤害+1。";
  if (card.name === "无懈可击") return "锦囊牌对一名角色生效前打出，抵消该锦囊对其的效果。";
  if (card.name === "铁索连环") return "选择至多两名角色横置或重置；也可以重铸，弃置后摸一张牌。";
  if (card.name === "决斗") return "指定一名角色，双方轮流打出【杀】，先不出者受到1点伤害。";
  if (card.name === "顺手牵羊") return "获得一名其他角色的一张手牌。";
  if (card.name === "过河拆桥") return "弃置一名其他角色的一张手牌。";
  if (card.name === "南蛮入侵") return "所有其他角色需打出【杀】，否则受到1点伤害。";
  if (card.name === "万箭齐发") return "所有其他角色需打出【闪】，否则受到1点伤害。";
  if (card.name === "桃园结义") return "所有受伤角色回复1点体力。";
  if (card.name === "五谷丰登") return "所有存活角色各摸一张牌。";
  if (card.name === "诸葛连弩") return "装备后本回合使用【杀】没有次数限制。";
  if (card.name === "青釭剑") return "装备武器；你使用【杀】时，无视目标防具。";
  if (card.name === "仁王盾") return "装备防具；黑色【杀】对你无效。";
  if (card.name === "八卦阵") return "装备防具；当你需要【闪】时进行判定，红色视为打出【闪】。";
  if (["武器", "防具", "坐骑"].includes(card.type)) return "装备牌：使用后进入装备区，替换同栏旧装备。";
  return cardHint(card);
}

function escapePlain(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function renderLog() {
  $("log").innerHTML = state.log.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
}

function renderHeroLibrary() {
  const query = $("heroSearch").value.trim();
  const items = allHeroes().filter((hero) => {
    const inPack = heroPackFilter === "全部" || hero.pack === heroPackFilter;
    const text = `${hero.name}${hero.camp}${hero.pack}${hero.skills.join("")}`;
    return inPack && text.includes(query);
  });
  $("heroGrid").innerHTML = items.map((hero) => {
    const selected = selectedPlayerHeroId === hero.id;
    const skillDetails = hero.skills.map((s) => `<p class="skill-detail">${escapeHtml(s)}</p>`).join("");
    return `<article class="hero-card ${selected ? "selected-library-hero" : ""}" style="${heroArtStyle(hero)}">
    <div class="hero-art" style="${heroArtStyle(hero)}">${escapeHtml(hero.name)}</div>
    <div class="hero-body">
      <div class="hero-meta">
        <span class="camp-pill">${escapeHtml(hero.camp)}</span>
        <span class="pack-pill">${escapeHtml(hero.pack)}</span>
        <span class="role-pill">${hero.hp}体力</span>
        ${selected ? `<span class="role-pill selected-pill">下局</span>` : ""}
      </div>
      <div class="skills">${hero.skills.map((s) => `<span>${escapeHtml(skillName(s))}</span>`).join("")}</div>
      ${effectLabels(hero).length ? `<div class="effect-tags">${effectLabels(hero).map((label) => `<span class="effect-tag">${escapeHtml(label)}</span>`).join("")}</div>` : ""}
      <div class="hero-actions">
        <button data-use-hero="${escapeHtml(hero.id)}" class="${selected ? "active" : ""}">${selected ? "已设为下局" : "下局使用"}</button>
        <button data-toggle-hero-detail="${escapeHtml(hero.id)}" class="detail-toggle-btn">详情</button>
      </div>
      <div class="hero-detail-panel" id="heroDetail-${escapeHtml(hero.id)}" hidden>
        <div class="hero-detail-header">${escapeHtml(hero.name)} · ${escapeHtml(hero.camp)} · ${hero.hp}体力</div>
        ${skillDetails}
      </div>
    </div>
  </article>`;
  }).join("");
  document.querySelectorAll("[data-use-hero]").forEach((btn) => {
    btn.addEventListener("click", () => setSelectedPlayerHero(btn.dataset.useHero));
  });
  document.querySelectorAll("[data-toggle-hero-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = $(`heroDetail-${btn.dataset.toggleHeroDetail}`);
      if (panel) {
        panel.hidden = !panel.hidden;
        btn.textContent = panel.hidden ? "详情" : "收起";
      }
    });
  });
}

function renderFilters() {
  const packs = ["全部", "标准", "风", "火", "林", "山", "移动版", "自创"];
  $("packFilters").innerHTML = packs.map((pack) => `<button class="${pack === heroPackFilter ? "active" : ""}" data-pack="${pack}">${pack}</button>`).join("");
  $("packFilters").querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      heroPackFilter = btn.dataset.pack;
      renderFilters();
      renderHeroLibrary();
    });
  });
}

function validateCustomHero({ name, skills }) {
  const errors = [];
  if (!/^[\u4e00-\u9fa5A-Za-z0-9·]{1,8}$/.test(name)) {
    errors.push("武将名需为 1-8 个中文、英文、数字或间隔号。");
  }
  if (allHeroes().some((hero) => hero.name === name && hero.pack !== "自创")) {
    errors.push("不能与已有官方武将重名。");
  }
  if (customHeroes.some((hero) => hero.name === name)) {
    errors.push("不能与已保存的自创武将重名。");
  }
  if (skills.length < 1 || skills.length > 4) {
    errors.push("技能数量需为 1-4 个。");
  }
  const names = new Set();
  skills.forEach((skill, index) => {
    if (skill.length < 2 || skill.length > 220) errors.push(`第 ${index + 1} 行技能长度需为 2-220 字。`);
    const name = skillName(skill) || `技能${index + 1}`;
    if (names.has(name)) errors.push(`技能“${name}”重复。`);
    names.add(name);
  });
  return errors;
}

function parseSkillTags(text) {
  return {
    locked: /锁定技/.test(text) || /觉醒技/.test(text),
    limited: /限定技/.test(text) || /觉醒技/.test(text),
    awakening: /觉醒技/.test(text)
  };
}

function normalizeCustomSkillLine(line, index) {
  const text = escapePlain(line);
  if (!text) return "";
  const hasName = /^[\u4e00-\u9fa5A-Za-z0-9·]{1,8}[:：]/.test(text);
  const body = /[。！？!?]$/.test(text) ? text : `${text}。`;
  return hasName ? body : `自创${index + 1}：${body}`;
}

function chineseAmount(text, fallback = 1) {
  const match = String(text).match(/([一二两三四五六七八九123456789])\s*张|([一二两三四五六七八九123456789])\s*点|数值\s*([123])/);
  const value = match?.[1] || match?.[2] || match?.[3];
  const map = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 };
  return Math.max(1, Math.min(3, Number(map[value] || fallback)));
}

function customSkillSegments(text) {
  return String(text)
    .replace(/[，；、]/g, "，")
    .split(/(?:并且|然后|之后|随后|再|，且|，并|，你再|，其再)/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const customParserTerms = {
  optional: ["可以", "可", "你可以", "你可", "选择"],
  forced: ["锁定技", "觉醒技", "必须", "须"],
  limited: ["限定技", "一局一次", "每局限一次"],
  unlimited: ["不限次数", "任意次", "无数次", "可以重复"],
  timing: [
    { id: "slashDamage", score: 0.98, patterns: [/使用.*【?杀】?.*造成.*伤害后/, /【?杀】?.*造成.*伤害后/, /造成.*【?杀】?.*伤害后/] },
    { id: "damageTaken", score: 0.96, patterns: [/受到.*伤害后/, /受到.*伤害时/, /受伤后/, /受到.*点.*伤害后/] },
    { id: "draw", score: 0.94, patterns: [/摸牌阶段/, /摸牌时/] },
    { id: "handLimit", score: 0.94, patterns: [/手牌上限/, /弃牌阶段.*上限/] },
    { id: "prepare", score: 0.9, patterns: [/准备阶段/, /回合开始时/, /开始阶段/, /准备时/] },
    { id: "play", score: 0.86, patterns: [/出牌阶段/, /阶段内/, /发动此技能/] }
  ],
  actions: [
    { id: "slashLimit", patterns: [/【?杀】?.*次数/, /额外.*【?杀】?/, /多.*使用.*【?杀】?/, /出杀/] },
    { id: "slashDamage", patterns: [/【?杀】?.*伤害\+/, /【?杀】?.*伤害.*增加/, /多造成.*伤害/] },
    { id: "fireDamage", patterns: [/火焰伤害/, /火属性伤害/, /受到.*火.*伤害/] },
    { id: "damage", patterns: [/造成.*伤害/, /令.*受到.*伤害/, /受到.*伤害/, /失去.*体力/] },
    { id: "discardTarget", patterns: [/弃置.*牌/, /弃其.*牌/, /令.*弃.*牌/] },
    { id: "stealTarget", patterns: [/获得.*牌/, /拿.*牌/, /取得.*牌/] },
    { id: "heal", patterns: [/回复.*体力/, /恢复.*体力/, /回血/, /回复.*点/] },
    { id: "draw", patterns: [/摸.*牌/, /摸牌/, /抽.*牌/] },
    { id: "handLimit", patterns: [/手牌上限/] }
  ],
  targets: [
    { id: "source", patterns: [/伤害来源/, /来源/] },
    { id: "damaged", patterns: [/一名受伤角色/, /受伤角色/, /已受伤角色/] },
    { id: "enemy", patterns: [/敌方/, /敌人/, /一名敌方角色/] },
    { id: "other", patterns: [/一名其他角色/, /其他角色/, /一名角色/, /目标角色/] },
    { id: "self", patterns: [/你/, /自己/, /自身/] }
  ]
};

function termMatches(text, terms) {
  return terms.some((term) => String(text).includes(term));
}

function firstMatchingTerm(text, list) {
  return list.find((item) => item.patterns.some((pattern) => pattern.test(text))) || null;
}

function inferCustomTiming(full) {
  return firstMatchingTerm(full, customParserTerms.timing)?.id || (/(你)?可|发动/.test(full) ? "play" : "none");
}

function inferCustomActionFromText(text) {
  return firstMatchingTerm(String(text), customParserTerms.actions)?.id || "";
}

function inferCustomTargetFromText(text, fallback = "self") {
  return firstMatchingTerm(String(text), customParserTerms.targets)?.id || fallback;
}

function inferCustomActionSteps(full, fallbackAction = "draw", fallbackTarget = "self") {
  const segments = customSkillSegments(full);
  const actions = [];
  for (const segment of segments) {
    const action = inferCustomActionFromText(segment);
    if (!action) continue;
    let target = inferCustomTargetFromText(segment, fallbackTarget);
    if (["draw", "heal", "slashLimit", "slashDamage", "handLimit"].includes(action) && !/令|使|目标|其他|伤害来源|来源/.test(segment)) {
      target = "self";
    }
    actions.push({
      action,
      amount: chineseAmount(segment, action === "handLimit" ? 2 : 1),
      target
    });
  }
  if (!actions.length) actions.push({ action: fallbackAction, amount: chineseAmount(full, fallbackAction === "handLimit" ? 2 : 1), target: fallbackTarget });
  return actions;
}

function parseSkillToAst(skill) {
  const name = skillName(skill);
  const body = skillBody(skill);
  const full = `${name}${body}`;
  const timingTerm = firstMatchingTerm(full, customParserTerms.timing);
  const timing = timingTerm?.id || inferCustomTiming(full);
  const primaryAction = inferCustomActionFromText(full) || "";
  const primaryTarget = inferCustomTargetFromText(full, ["damage", "fireDamage", "discardTarget", "stealTarget"].includes(primaryAction) ? "other" : "self");
  const effects = primaryAction ? inferCustomActionSteps(body || full, primaryAction, primaryTarget) : [];
  const tags = parseSkillTags(full);
  let limit = timing === "play" || timing === "slashDamage" || timing === "damageTaken" || timing === "prepare" ? "phase" : "forced";
  if (tags.locked || termMatches(full, customParserTerms.forced)) limit = "forced";
  if (tags.limited || termMatches(full, customParserTerms.limited)) limit = "game";
  if (termMatches(full, customParserTerms.unlimited)) limit = "none";
  let cost = "none";
  if (/弃置?一张手牌|弃一张手牌|弃置?1张手牌|弃1张手牌/.test(full)) cost = "discard1";
  if (/失去一?1?点体力|失去1点体力|失去一点体力/.test(full)) cost = "loseHp1";
  const warnings = [];
  if (timing === "none") warnings.push("没有识别到可运行时机，仅保存为文字。");
  if (!effects.length) warnings.push("没有识别到可运行效果，仅保存为文字。");
  if (/判定|拼点|展示|视为|当作|转化|获得技能|翻面|横置|重铸|选择一项/.test(full)) {
    warnings.push("包含复杂术语，当前自创引擎只会执行已识别的基础效果。");
  }
  if (/若|如果|每有|不小于|大于|小于|等于|至多|至少/.test(full)) {
    warnings.push("条件语句已保留为说明，当前不会完整判断。");
  }
  const confidence = Math.max(0.2, Math.min(0.99,
    (timingTerm?.score || (timing !== "none" ? 0.72 : 0.25))
    + (effects.length ? 0.12 : -0.1)
    + (primaryTarget !== "self" ? 0.04 : 0)
    - warnings.length * 0.08
  ));
  return { name, text: body, timing, optional: !tags.locked && termMatches(full, customParserTerms.optional), limit, cost, target: primaryTarget, effects, warnings, confidence };
}

function compileAstToRule(ast) {
  if (!ast || ast.timing === "none" || !ast.effects.length) {
    return { timing: "none", limit: "phase", cost: "none", target: "self", action: "draw", amount: 1, ast };
  }
  const first = ast.effects[0];
  return {
    timing: ast.timing,
    limit: ast.limit,
    cost: ast.cost,
    target: ast.target,
    action: first.action,
    amount: first.amount,
    effects: ast.effects,
    skillName: ast.name,
    ast,
    confidence: ast.confidence,
    warnings: ast.warnings
  };
}

function inferCustomRuleFromSkill(skill) {
  return compileAstToRule(parseSkillToAst(skill));
}

function inferCustomRulesFromSkills(skills) {
  return skills.map(inferCustomRuleFromSkill);
}

function sanitizeCustomRule(rule = {}, index = 0) {
  const timing = customSkillRuleOptions.timing[rule.timing] ? rule.timing : "none";
  const limit = customSkillRuleOptions.limit[rule.limit] ? rule.limit : "phase";
  const cost = customSkillRuleOptions.cost[rule.cost] ? rule.cost : "none";
  const target = customSkillRuleOptions.target[rule.target] ? rule.target : "self";
  const effects = customRuleActions(rule)
    .map((item) => ({
      action: customSkillRuleOptions.action[item.action] ? item.action : "draw",
      amount: Math.max(1, Math.min(3, Number(item.amount || 1))),
      target: customSkillRuleOptions.target[item.target] ? item.target : target
    }));
  const first = effects[0] || { action: "draw", amount: 1, target };
  return {
    timing,
    limit,
    cost,
    target,
    action: first.action,
    amount: first.amount,
    effects,
    skillIndex: Number.isInteger(rule.skillIndex) ? rule.skillIndex : index,
    skillName: escapePlain(rule.skillName || "")
  };
}

function sanitizeCustomHeroDraft(draft) {
  if (!draft || typeof draft !== "object") throw new Error("JS 需要返回一个武将对象。");
  const skills = Array.isArray(draft.skills)
    ? draft.skills.slice(0, 4).map((item, index) => normalizeCustomSkillLine(String(item || ""), index)).filter(Boolean)
    : [];
  const inferred = inferCustomRulesFromSkills(skills);
  const customRules = Array.isArray(draft.customRules || draft.rules)
    ? (draft.customRules || draft.rules).slice(0, 8).map((rule, index) => sanitizeCustomRule(rule, Number.isInteger(rule?.skillIndex) ? rule.skillIndex : Math.min(index, Math.max(skills.length - 1, 0))))
    : inferred;
  return {
    name: escapePlain(draft.name || "").slice(0, 8),
    camp: ["魏", "蜀", "吴", "群", "神"].includes(draft.camp) ? draft.camp : "自",
    hp: [3, 4, 5].includes(Number(draft.hp)) ? Number(draft.hp) : 4,
    image: escapePlain(draft.image || draft.imageUrl || ""),
    skills,
    customRules,
    effects: []
  };
}

function customHeroCodeHelpers() {
  return {
    hero: (draft) => draft,
    rule: (timing = "play", limit = "phase", cost = "none", target = "self", effects = []) => ({
      timing,
      limit,
      cost,
      target,
      action: Array.isArray(effects) && effects[0] ? effects[0].action : "draw",
      amount: Array.isArray(effects) && effects[0] ? effects[0].amount : 1,
      effects: Array.isArray(effects) ? effects : [effects]
    }),
    effect: (action = "draw", amount = 1, target = "") => ({ action, amount, target }),
    timings: Object.keys(customSkillRuleOptions.timing),
    limits: Object.keys(customSkillRuleOptions.limit),
    costs: Object.keys(customSkillRuleOptions.cost),
    targets: Object.keys(customSkillRuleOptions.target),
    actions: Object.keys(customSkillRuleOptions.action)
  };
}

function parseCustomHeroJs() {
  const source = $("customHeroJs")?.value.trim() || "";
  if (!source) return null;
  const helpers = customHeroCodeHelpers();
  const names = Object.keys(helpers);
  const values = Object.values(helpers);
  try {
    const expression = new Function(...names, `"use strict"; return (${source});`);
    return sanitizeCustomHeroDraft(expression(...values));
  } catch (expressionError) {
    try {
      const body = new Function(...names, `"use strict"; ${source}`);
      return sanitizeCustomHeroDraft(body(...values));
    } catch (bodyError) {
      throw new Error(bodyError.message || expressionError.message || "JS 解析失败。");
    }
  }
}

function getCustomFormData() {
  const jsHero = parseCustomHeroJs();
  if (jsHero) return { ...jsHero, image: jsHero.image || pendingImage || $("customImageUrl").value.trim() };
  const imageUrl = $("customImageUrl").value.trim();
  const skills = $("customSkills").value
    .split("\n")
    .map((line, index) => normalizeCustomSkillLine(line, index))
    .filter(Boolean);
  const inferredRules = inferCustomRulesFromSkills(skills);
  const explicitRules = getCustomSkillRules();
  const customRules = skills.map((_, index) => explicitRules[index]?.timing && explicitRules[index].timing !== "none" ? explicitRules[index] : inferredRules[index]);
  return {
    name: $("customName").value.trim(),
    camp: $("customCamp").value,
    hp: Number($("customHp").value),
    image: pendingImage || imageUrl,
    skills,
    customRules,
    effects: []
  };
}

function getCustomSkillRules() {
  return [...document.querySelectorAll(".skill-rule-row")].map((row) => ({
    timing: row.querySelector(".skillRuleTiming")?.value || "none",
    limit: row.querySelector(".skillRuleLimit")?.value || "phase",
    cost: row.querySelector(".skillRuleCost")?.value || "none",
    target: row.querySelector(".skillRuleTarget")?.value || "self",
    action: row.querySelector(".skillRuleAction")?.value || "draw",
    amount: Number(row.querySelector(".skillRuleAmount")?.value || 1)
  }));
}

function setCustomSkillRule(index, rule = {}) {
  const row = document.querySelector(`.skill-rule-row[data-rule-index="${index}"]`);
  if (!row) return;
  const set = (className, value, fallback) => {
    const select = row.querySelector(`.${className}`);
    if (!select) return;
    const wanted = value == null ? fallback : String(value);
    select.value = [...select.options].some((option) => option.value === wanted || option.textContent === wanted) ? wanted : fallback;
  };
  set("skillRuleTiming", rule.timing, "none");
  set("skillRuleLimit", rule.limit, "phase");
  set("skillRuleCost", rule.cost, "none");
  set("skillRuleTarget", rule.target, "self");
  set("skillRuleAction", rule.action, "draw");
  set("skillRuleAmount", rule.amount, "1");
}

function applyAiHeroDraft(draft) {
  if (!draft || typeof draft !== "object") throw new Error("AI 返回格式不是对象。");
  $("customName").value = escapePlain(draft.name || "").slice(0, 8);
  if (["魏", "蜀", "吴", "群", "神"].includes(draft.camp)) $("customCamp").value = draft.camp;
  if (["3", "4", "5"].includes(String(draft.hp))) $("customHp").value = String(draft.hp);
  const skills = Array.isArray(draft.skills) ? draft.skills.slice(0, 4).map(escapePlain).filter(Boolean) : [];
  if (skills.length) $("customSkills").value = skills.join("\n");
  const rules = Array.isArray(draft.rules) ? draft.rules : [];
  for (let i = 0; i < 4; i++) setCustomSkillRule(i, rules[i] || { timing: "none" });
  renderCustomPreview();
}

const customHeroJsExample = `return hero({
  name: "烈心",
  camp: "蜀",
  hp: 4,
  image: "",
  skills: [
    "燃胆：当你使用【杀】造成伤害后，你回复1点体力并摸一张牌。",
    "破阵：出牌阶段，你可以令一名其他角色受到1点火焰伤害。"
  ],
  customRules: [
    rule("slashDamage", "phase", "none", "self", [
      effect("heal", 1),
      effect("draw", 1)
    ]),
    rule("play", "phase", "none", "other", [
      effect("fireDamage", 1, "other")
    ])
  ]
});`;

function applyCustomHeroJsToForm() {
  const hero = parseCustomHeroJs();
  if (!hero) {
    toast("JS 编辑器为空，当前使用技能文本解析。");
    renderCustomPreview();
    return;
  }
  $("customName").value = hero.name || "";
  $("customCamp").value = ["魏", "蜀", "吴", "群", "神"].includes(hero.camp) ? hero.camp : "群";
  $("customHp").value = String(hero.hp || 4);
  $("customImageUrl").value = hero.image && !hero.image.startsWith("data:") ? hero.image : "";
  $("customSkills").value = hero.skills.join("\n");
  renderCustomPreview();
  toast("JS 武将已应用到预览。");
}

function extractJsonObject(text) {
  const raw = String(text || "").trim();
  try { return JSON.parse(raw); } catch {}
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("没有找到 JSON。");
  return JSON.parse(match[0]);
}

function responseOutputText(data) {
  if (data.output_text) return data.output_text;
  return (data.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .join("\n")
    .trim();
}

async function generateHeroWithAi() {
  const key = $("aiHeroApiKey").value.trim();
  const model = $("aiHeroModel").value.trim() || "gpt-5.6";
  const idea = $("aiHeroPrompt").value.trim();
  if (!key) {
    $("aiHeroStatus").textContent = "请输入 API Key";
    toast("请输入 OpenAI API Key。");
    return;
  }
  if (!idea) {
    $("aiHeroStatus").textContent = "请输入创作要求";
    toast("请先写创作要求。");
    return;
  }
  $("generateHeroAiBtn").disabled = true;
  $("aiHeroStatus").textContent = "生成中...";
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        instructions: "你是三国杀自创武将设计助手。只输出 JSON，不要 Markdown。技能需中文、每条格式为“技能名：效果描述。”，强度接近风林火山。rules/customRules 必须使用允许枚举，并优先用 effects 表达顺序结算。",
        input: `根据要求生成一个可在网页 demo 中运行的自创武将：${idea}\n输出 JSON 格式：{"name":"1-8字","camp":"魏/蜀/吴/群/神","hp":3或4或5,"skills":["技能名：效果描述。"],"customRules":[{"timing":"none/play/prepare/draw/damageTaken/slashDamage/handLimit","limit":"phase/none/game/forced","cost":"none/discard1/loseHp1","target":"self/other/damaged/enemy/source","effects":[{"action":"draw/heal/damage/fireDamage/discardTarget/stealTarget/slashLimit/slashDamage/handLimit","amount":1或2或3,"target":"self/other/damaged/enemy/source"}]}]}`,
        max_output_tokens: 900
      })
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`请求失败 ${response.status}: ${text.slice(0, 180)}`);
    }
    const data = await response.json();
    const draft = extractJsonObject(responseOutputText(data));
    applyAiHeroDraft(draft);
    $("aiHeroStatus").textContent = "已生成草案";
    toast("AI 武将草案已填入表单。");
  } catch (error) {
    $("aiHeroStatus").textContent = "生成失败";
    toast(error.message || "AI 生成失败。");
  } finally {
    $("generateHeroAiBtn").disabled = false;
  }
}

function renderCustomPreview() {
  let formData;
  try {
    formData = getCustomFormData();
    if ($("customHeroJsStatus")) {
      $("customHeroJsStatus").textContent = ($("customHeroJs")?.value.trim() || "") ? "代码可用" : "未启用";
      $("customHeroJsStatus").className = "";
    }
  } catch (error) {
    if ($("customHeroJsStatus")) {
      $("customHeroJsStatus").textContent = `代码错误：${error.message}`;
      $("customHeroJsStatus").className = "error";
    }
    $("customValidation").className = "validation-box error";
    $("customValidation").textContent = `JS 编辑器解析失败：${error.message}`;
    return;
  }
  const hero = { ...formData, name: formData.name || "新武将", pack: "自创" };
  $("customPreviewCard").innerHTML = `
    <div class="hero-art" style="${heroArtStyle(hero)}">${escapeHtml(hero.name)}</div>
    <div class="hero-body">
      <div class="hero-meta">
        <span class="camp-pill">${escapeHtml(hero.camp)}</span>
        <span class="pack-pill">自创</span>
        <span class="role-pill">${hero.hp || 4}体力</span>
      </div>
      <div class="skills">${(hero.skills.length ? hero.skills : ["技能名：效果描述。"]).map((s) => `<span>${escapeHtml(s)}</span>`).join("")}</div>
      ${effectLabels(hero).length ? `<div class="effect-tags">${effectLabels(hero).map((label) => `<span class="effect-tag">${escapeHtml(label)}</span>`).join("")}</div>` : ""}
    </div>`;
  const errors = validateCustomHero(hero);
  $("customValidation").className = `validation-box ${errors.length ? "error" : "ok"}`;
  const parsedCount = (hero.customRules || []).filter((rule) => rule?.timing && rule.timing !== "none").length;
  const warnings = (hero.customRules || []).flatMap((rule) => rule?.warnings || rule?.ast?.warnings || []);
  $("customValidation").textContent = errors.length
    ? errors.join(" ")
    : `可保存；已从文本解析出 ${parsedCount} 个可运行技能。${warnings.length ? ` ${warnings.length} 条提示可在解析卡片中查看。` : ""}`;
  renderSkillEffectSummary(hero);
}

function renderSkillEffectSummary(hero) {
  const rules = hero.customRules || [];
  $("skillEffectSummary").innerHTML = rules.map((rule, index) => {
    const skill = hero.skills[index] || `技能${index + 1}`;
    const skillName = skill.includes("：") ? skill.split("：")[0] : skill.includes(":") ? skill.split(":")[0] : skill;
    const tags = parseSkillTags(skill);
    const tagText = [
      tags.locked ? "锁定" : "",
      tags.limited ? "限定" : "",
      tags.awakening ? "觉醒" : ""
    ].filter(Boolean).join(" / ") || "普通";
    const active = rule.timing !== "none";
    const cost = customSkillRuleOptions.cost[rule.cost] || "无代价";
    const target = customSkillRuleOptions.target[rule.target] || "自己";
    const action = customRuleActions(rule)
      .map((item) => `${customSkillRuleOptions.action[item.action] || item.action} ${item.amount || 1}`)
      .join(" → ");
    const confidence = Math.round(Number(rule.confidence || rule.ast?.confidence || (active ? 0.72 : 0.25)) * 100);
    const warnings = rule.warnings || rule.ast?.warnings || [];
    return `<article class="effect-summary ${active ? "active" : ""}">
      <strong>${escapeHtml(skillName || `技能${index + 1}`)}</strong>
      <span>${escapeHtml(tagText)} · ${escapeHtml(customSkillRuleOptions.timing[rule.timing] || "只显示文字")} · 识别度 ${confidence}%</span>
      <p>${escapeHtml(active ? `${customSkillRuleOptions.limit[rule.limit]}；${cost}；目标：${target}；执行：${action}。` : "不改变规则，只在武将牌上展示。")}</p>
      ${warnings.length ? `<small>${warnings.map(escapeHtml).join(" ")}</small>` : ""}
    </article>`;
  }).join("");
}

function renderCustomHeroes() {
  $("customCount").textContent = `${customHeroes.length} 名`;
  $("customHeroGrid").innerHTML = customHeroes.map((hero) => {
    const selected = selectedPlayerHeroId === hero.id;
    return `<article class="hero-card ${selected ? "selected-custom-hero" : ""}" style="${heroArtStyle(hero)}">
    <div class="hero-art" style="${heroArtStyle(hero)}">${escapeHtml(hero.name)}</div>
    <div class="hero-body">
      <div class="hero-meta">
        <span class="camp-pill">${escapeHtml(hero.camp)}</span>
        <span class="pack-pill">自创</span>
        <span class="role-pill">${hero.hp}体力</span>
        ${selected ? `<span class="role-pill selected-pill">下局</span>` : ""}
      </div>
      <div class="skills">${hero.skills.map((s) => `<span>${escapeHtml(s)}</span>`).join("")}</div>
      ${effectLabels(hero).length ? `<div class="effect-tags">${effectLabels(hero).map((label) => `<span class="effect-tag">${escapeHtml(label)}</span>`).join("")}</div>` : ""}
      <div class="hero-actions">
        <button data-use-custom="${hero.id}" class="${selected ? "active" : ""}">${selected ? "已设为下局" : "下局使用"}</button>
        <button data-delete-custom="${hero.id}">删除</button>
      </div>
    </div>
  </article>`;
  }).join("") || `<div class="deck-card"><h3>还没有自创武将</h3><p>填写上方表单，通过校验后即可添加到游戏。</p></div>`;
  document.querySelectorAll("[data-use-custom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setSelectedPlayerHero(btn.dataset.useCustom);
    });
  });
  document.querySelectorAll("[data-delete-custom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      customHeroes = customHeroes.filter((hero) => hero.id !== btn.dataset.deleteCustom);
      if (selectedPlayerHeroId === btn.dataset.deleteCustom) selectedPlayerHeroId = "random";
      localStorage.setItem(SELECTED_HERO_KEY, selectedPlayerHeroId);
      saveCustomHeroes();
      renderHeroSelect();
      renderHeroLibrary();
      renderCustomHeroes();
    });
  });
}

function renderHeroSelect() {
  const officialGroups = ["标准", "风", "火", "林", "山", "移动版"].map((pack) => {
    const options = allHeroes()
      .filter((hero) => hero.pack === pack)
      .map((hero) => `<option value="${escapeHtml(hero.id)}">${escapeHtml(hero.name)}（${escapeHtml(pack)}）</option>`)
      .join("");
    return `<optgroup label="${pack}">${options}</optgroup>`;
  }).join("");
  const customOptions = customHeroes.map((hero) => {
    const normalized = normalizeHero(hero);
    return `<option value="${escapeHtml(normalized.id)}">${escapeHtml(normalized.name)}（自创）</option>`;
  }).join("");
  const options = [
    `<option value="random">随机武将</option>`,
    officialGroups,
    customOptions ? `<optgroup label="自创">${customOptions}</optgroup>` : ""
  ];
  $("playerHeroSelect").innerHTML = options.join("");
  $("playerHeroSelect").value = allHeroes().some((hero) => hero.id === selectedPlayerHeroId) ? selectedPlayerHeroId : "random";
}

function renderFengshenHeroSelect() {
  const select = $("fengshenHeroSelect");
  if (!select) return;
  const officialGroups = ["标准", "风", "火", "林", "山", "移动版"].map((pack) => {
    const options = allHeroes()
      .filter((hero) => hero.pack === pack)
      .map((hero) => `<option value="${escapeHtml(hero.id)}">${escapeHtml(hero.name)}（${escapeHtml(pack)}）</option>`)
      .join("");
    return `<optgroup label="${pack}">${options}</optgroup>`;
  }).join("");
  const customOptions = customHeroes.map((hero) => {
    const normalized = normalizeHero(hero);
    return `<option value="${escapeHtml(normalized.id)}">${escapeHtml(normalized.name)}（自创）</option>`;
  }).join("");
  select.innerHTML = [
    `<option value="random">随机武将</option>`,
    officialGroups,
    customOptions ? `<optgroup label="自创">${customOptions}</optgroup>` : ""
  ].join("");
  select.value = allHeroes().some((hero) => hero.id === selectedFengshenHeroId) ? selectedFengshenHeroId : "random";
}

function renderRoleSelect() {
  const validRoles = ["random", "主公", "忠臣", "反贼", "内奸"];
  if (!validRoles.includes(selectedPlayerRole)) selectedPlayerRole = "random";
  $("playerRoleSelect").value = selectedPlayerRole;
}

function setSelectedPlayerHero(heroId, options = {}) {
  selectedPlayerHeroId = heroId;
  if (!allHeroes().some((hero) => hero.id === selectedPlayerHeroId)) selectedPlayerHeroId = "random";
  localStorage.setItem(SELECTED_HERO_KEY, selectedPlayerHeroId);
  renderHeroSelect();
  renderFengshenHeroSelect();
  renderHeroLibrary();
  renderCustomHeroes();
  if (options.toast !== false) {
    const hero = allHeroes().find((item) => item.id === selectedPlayerHeroId);
    toast(hero ? `下局将使用【${hero.name}】。` : "下局将随机选择武将。");
  }
}

function clearCustomForm() {
  $("customHeroForm").reset();
  pendingImage = "";
  if ($("customHeroJs")) $("customHeroJs").value = "";
  if ($("customHeroJsStatus")) {
    $("customHeroJsStatus").textContent = "未启用";
    $("customHeroJsStatus").className = "";
  }
  document.querySelectorAll(".skill-rule-row").forEach((row) => {
    row.querySelector(".skillRuleTiming").value = "none";
    row.querySelector(".skillRuleLimit").value = "phase";
    row.querySelector(".skillRuleCost").value = "none";
    row.querySelector(".skillRuleTarget").value = "self";
    row.querySelector(".skillRuleAction").value = "draw";
    row.querySelector(".skillRuleAmount").value = "1";
  });
  renderCustomPreview();
}

function getSelectedCardEffect() {
  return cardEffectOptions.find((option) => option.id === $("customCardEffect").value) || cardEffectOptions[0];
}

function getCustomCardFormData() {
  const effect = getSelectedCardEffect();
  return {
    id: `custom-card-${Date.now()}`,
    custom: true,
    name: $("customCardName").value.trim(),
    type: $("customCardType").value,
    count: Number($("customCardCount").value),
    needsTarget: $("customCardTarget").value === "one" || effect.needsTarget,
    effect: effect.id,
    text: $("customCardText").value.trim(),
    color: $("customCardColor").value
  };
}

function validateCustomCard(card) {
  const errors = [];
  if (!/^[\u4e00-\u9fa5A-Za-z0-9·]{1,8}$/.test(card.name)) {
    errors.push("牌名需为 1-8 个中文、英文、数字或间隔号。");
  }
  if (allCardTemplates().some((item) => item.name === card.name)) {
    errors.push("不能与已有牌名重复。");
  }
  if (!card.text || card.text.length < 6) {
    errors.push("规则描述至少需要 6 个字。");
  }
  if (!cardEffectOptions.some((effect) => effect.id === card.effect)) {
    errors.push("请选择可运行效果。");
  }
  return errors;
}

function renderCustomCardPreview() {
  const card = getCustomCardFormData();
  const effect = getSelectedCardEffect();
  $("customCardPreview").className = `card ${cardTypeClass[card.type] || ""} preview-game-card`;
  $("customCardPreview").style.setProperty("--card-bg", `linear-gradient(155deg, #fff4d8, ${card.color})`);
  $("customCardPreview").innerHTML = `
    <small>${escapeHtml(card.type)}</small>
    <strong>${escapeHtml(card.name || "新牌")}</strong>
    <span class="suit">自</span>
    <span class="card-hint">${escapeHtml(effect.hint)}</span>`;
  const errors = validateCustomCard({ ...card, name: card.name || "新牌" }).filter((error) => !error.includes("重复"));
  $("customCardValidation").className = `validation-box ${errors.length ? "error" : "ok"}`;
  $("customCardValidation").textContent = errors.length ? errors.join(" ") : `可运行效果：${effect.label}`;
}

function renderCustomCards() {
  $("customCardCountText").textContent = `${customCards.reduce((sum, card) => sum + card.count, 0)} 张`;
  $("customCardGrid").innerHTML = customCards.map((card) => {
    const effect = cardEffectOptions.find((option) => option.id === card.effect);
    return `<article class="deck-card">
      <h3>${escapeHtml(card.name)} × ${card.count}</h3>
      <p>${escapeHtml(card.type)} · ${escapeHtml(effect?.label || card.effect)}</p>
      <p>${escapeHtml(card.text)}</p>
      <div class="custom-card-actions">
        <button data-delete-card="${escapeHtml(card.id)}">删除</button>
      </div>
    </article>`;
  }).join("") || `<div class="deck-card"><h3>还没有自定义牌</h3><p>创建后会进入下一局洗混牌堆，并按所选效果结算。</p></div>`;
  document.querySelectorAll("[data-delete-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      customCards = customCards.filter((card) => card.id !== btn.dataset.deleteCard);
      saveCustomCards();
      renderCustomCards();
      renderDeckPage();
    });
  });
}

function renderSkillEffectOptions() {
  const firstRow = document.querySelector('.skill-rule-row[data-rule-index="0"]');
  if (!firstRow) return;
  const classes = ["skillRuleTiming", "skillRuleLimit", "skillRuleCost", "skillRuleTarget", "skillRuleAction", "skillRuleAmount"];
  document.querySelectorAll(".skill-rule-row").forEach((row, rowIndex) => {
    if (rowIndex === 0) return;
    classes.forEach((className) => {
      const source = firstRow.querySelector(`.${className}`);
      const target = row.querySelector(`.${className}`);
      if (source && target && !target.options.length) target.innerHTML = source.innerHTML;
    });
  });
}

function renderCardEffectOptions() {
  $("customCardEffect").innerHTML = cardEffectOptions.map((option) => `<option value="${option.id}">${option.label}</option>`).join("");
}

function renderDeckPage() {
  const templates = allCardTemplates();
  if (!selectedLibraryCardName || !templates.some((card) => card.name === selectedLibraryCardName)) {
    selectedLibraryCardName = templates[0]?.name || "";
  }
  const total = templates.reduce((sum, card) => sum + card.count, 0);
  const byType = Object.entries(templates.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + card.count;
    return acc;
  }, {}));
  const cardTypes = ["全部", ...new Set(templates.map((card) => card.type))];
  if (!cardTypes.includes(cardTypeFilter)) cardTypeFilter = "全部";
  $("cardTypeFilters").innerHTML = cardTypes.map((type) => `<button class="${type === cardTypeFilter ? "active" : ""}" data-card-type="${escapeHtml(type)}">${escapeHtml(type)}</button>`).join("");
  const keyword = cardSearchText.trim().toLowerCase();
  const visibleCards = templates.filter((card) => {
    const matchesType = cardTypeFilter === "全部" || card.type === cardTypeFilter;
    const haystack = `${card.name} ${card.type} ${card.text}`.toLowerCase();
    return matchesType && (!keyword || haystack.includes(keyword));
  });
  let detailCard = visibleCards.find((card) => card.name === selectedLibraryCardName) || visibleCards[0] || templates.find((card) => card.name === selectedLibraryCardName) || templates[0];
  if (detailCard) selectedLibraryCardName = detailCard.name;
  $("cardDetail").innerHTML = detailCard ? `
    <button class="card ${cardTypeClass[detailCard.type] || ""} preview-game-card card-detail-face" type="button">
      <small>${escapeHtml(detailCard.type)}</small>
      <strong>${escapeHtml(detailCard.name)}</strong>
      <span class="suit">${detailCard.custom ? "自" : "典"}</span>
      <span class="card-hint">${detailCard.needsTarget ? "选目标" : "即时"}</span>
    </button>
    <div class="card-detail-copy">
      <strong>${escapeHtml(detailCard.name)} × ${detailCard.count}</strong>
      <span>${escapeHtml(detailCard.type)} · ${detailCard.needsTarget ? "需要目标" : "不需要目标"}</span>
      <p>${escapeHtml(detailCard.text)}</p>
      ${detailCard.custom ? "<small>自定义牌：会在下一局洗入牌堆并按所选运行效果结算。</small>" : "<small>标准牌库：局内按当前 demo 引擎规则结算。</small>"}
    </div>` : `<p>暂无牌可显示。</p>`;
  $("deckStats").innerHTML = [`总牌数 ${total}`, ...byType.map(([type, count]) => `${type} ${count}`)]
    .map((text) => `<div class="deck-card"><h3>${text}</h3><p>用于本地 demo 的可洗混牌堆。</p></div>`).join("");
  $("cardList").innerHTML = visibleCards.map((card) => `<button class="deck-card card-library-item ${card.name === detailCard?.name ? "active" : ""}" data-card-name="${escapeHtml(card.name)}">
    <h3>${escapeHtml(card.name)} × ${card.count}</h3>
    <p>${escapeHtml(card.type)} · ${escapeHtml(card.text)}</p>
  </button>`).join("") || `<div class="deck-card"><h3>没有找到牌</h3><p>换一个类型或关键词再试。</p></div>`;
  document.querySelectorAll("[data-card-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cardTypeFilter = btn.dataset.cardType;
      renderDeckPage();
    });
  });
  document.querySelectorAll("[data-card-name]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedLibraryCardName = btn.dataset.cardName;
      renderDeckPage();
    });
  });
}

function showPanel(panelId, options = {}) {
  const target = $(panelId);
  if (!target) return;
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
  target.classList.add("active");
  document.body.dataset.view = panelId;
  if (window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });

  if (options.push !== false && window.history && window.history.pushState) {
    const baseUrl = window.location ? `${window.location.pathname}${window.location.search}` : "";
    const nextUrl = panelId === "home" ? baseUrl : `#${panelId}`;
    window.history.pushState({ panelId }, "", nextUrl);
  }
}

document.querySelectorAll("[data-enter]").forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.enter));
});

document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => showPanel("home"));
});

window.addEventListener("popstate", (event) => {
  const hashPanelId = window.location && window.location.hash ? window.location.hash.replace("#", "") : "";
  const panelId = event.state?.panelId || hashPanelId || "home";
  showPanel($(panelId) ? panelId : "home", { push: false });
});

$("newGameBtn").addEventListener("click", newGame);
$("endTurnBtn").addEventListener("click", endHumanTurn);
$("heroSearch").addEventListener("input", renderHeroLibrary);
$("cardSearch").addEventListener("input", (event) => {
  cardSearchText = event.target.value;
  renderDeckPage();
});
$("playerHeroSelect").addEventListener("change", (event) => {
  setSelectedPlayerHero(event.target.value);
});
$("fengshenHeroSelect")?.addEventListener("change", (event) => {
  selectedFengshenHeroId = event.target.value;
});
$("startFengshenBtn")?.addEventListener("click", startFengshenRun);
$("playerRoleSelect").addEventListener("change", (event) => {
  selectedPlayerRole = event.target.value;
  localStorage.setItem(SELECTED_ROLE_KEY, selectedPlayerRole);
  toast(selectedPlayerRole === "random" ? "下局身份将随机分配。" : `下局身份设为${selectedPlayerRole}。`);
});
function clearHiddenCustomRules() {
  document.querySelectorAll(".skill-rule-row").forEach((row) => {
    row.querySelector(".skillRuleTiming").value = "none";
  });
}

$("customHeroForm").addEventListener("input", (event) => {
  if (event.target?.id === "customSkills") clearHiddenCustomRules();
  renderCustomPreview();
});
$("customHeroForm").addEventListener("change", renderCustomPreview);
$("generateHeroAiBtn").addEventListener("click", generateHeroWithAi);
$("applyHeroJsBtn").addEventListener("click", () => {
  try {
    applyCustomHeroJsToForm();
  } catch (error) {
    $("customHeroJsStatus").textContent = `代码错误：${error.message}`;
    $("customHeroJsStatus").className = "error";
    toast("JS 武将代码暂时无法应用。");
  }
});
$("insertHeroJsExampleBtn").addEventListener("click", () => {
  $("customHeroJs").value = customHeroJsExample;
  renderCustomPreview();
  toast("已插入可运行的 JS 武将示例。");
});
$("clearCustomForm").addEventListener("click", clearCustomForm);
$("customImageFile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    pendingImage = "";
    renderCustomPreview();
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    pendingImage = String(reader.result);
    renderCustomPreview();
  });
  reader.readAsDataURL(file);
});
$("customHeroForm").addEventListener("submit", (event) => {
  event.preventDefault();
  let hero;
  try {
    hero = { ...getCustomFormData(), pack: "自创" };
  } catch (error) {
    $("customValidation").className = "validation-box error";
    $("customValidation").textContent = `JS 编辑器解析失败：${error.message}`;
    toast("自创武将代码有错误，暂时不能保存。");
    return;
  }
  const errors = validateCustomHero(hero);
  if (errors.length) {
    $("customValidation").className = "validation-box error";
    $("customValidation").textContent = errors.join(" ");
    return;
  }
  const savedHero = { ...hero, id: `custom-${Date.now()}` };
  customHeroes.push(savedHero);
  selectedPlayerHeroId = savedHero.id;
  localStorage.setItem(SELECTED_HERO_KEY, selectedPlayerHeroId);
  saveCustomHeroes();
  clearCustomForm();
  renderHeroSelect();
  renderFengshenHeroSelect();
  renderFilters();
  renderHeroLibrary();
  renderCustomHeroes();
  toast(`【${savedHero.name}】已加入游戏，并设为下局武将。`);
});
$("customCardForm").addEventListener("input", renderCustomCardPreview);
$("customCardForm").addEventListener("change", renderCustomCardPreview);
$("clearCustomCardForm").addEventListener("click", () => {
  $("customCardForm").reset();
  renderCustomCardPreview();
});
$("customCardEffect").addEventListener("change", () => {
  const effect = getSelectedCardEffect();
  $("customCardTarget").value = effect.needsTarget ? "one" : "none";
  renderCustomCardPreview();
});
$("customCardForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const card = getCustomCardFormData();
  const errors = validateCustomCard(card);
  if (errors.length) {
    $("customCardValidation").className = "validation-box error";
    $("customCardValidation").textContent = errors.join(" ");
    return;
  }
  customCards.push(card);
  saveCustomCards();
  $("customCardForm").reset();
  renderCustomCardPreview();
  renderCustomCards();
  renderDeckPage();
  toast(`【${card.name}】已加入下一局牌堆。`);
});

function attachTactileFeedback() {
  if (!document.addEventListener) return;
  const pressables = "button, .card, .seat.targetable, .skill-chip, .card-library-item";

  document.addEventListener("pointerdown", (event) => {
    const target = event.target && event.target.closest ? event.target.closest(pressables) : null;
    if (!target || target.disabled) return;
    target.classList.add("pressed");

    if (document.createElement && target.appendChild) {
      const ripple = document.createElement("span");
      ripple.className = "tap-ripple";
      const rect = target.getBoundingClientRect ? target.getBoundingClientRect() : null;
      if (rect) {
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
      }
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove && ripple.remove(), 620);
    }

    try {
      if (navigator.vibrate) navigator.vibrate(12);
    } catch (error) {
      // Some browsers expose vibrate but block it outside secure contexts.
    }
  });

  document.addEventListener("pointerup", () => {
    document.querySelectorAll(".pressed").forEach((node) => node.classList.remove("pressed"));
  });
  document.addEventListener("pointercancel", () => {
    document.querySelectorAll(".pressed").forEach((node) => node.classList.remove("pressed"));
  });
}

renderFilters();
renderSkillEffectOptions();
renderCardEffectOptions();
renderRoleSelect();
renderHeroSelect();
renderFengshenHeroSelect();
renderHeroLibrary();
renderCustomPreview();
renderCustomHeroes();
renderCustomCardPreview();
renderCustomCards();
renderDeckPage();
render();
{
  const initialPanelId = window.location && window.location.hash ? window.location.hash.replace("#", "") : "";
  if (initialPanelId && $(initialPanelId)) {
    showPanel(initialPanelId, { push: false });
  } else if (window.history && window.history.replaceState) {
    const baseUrl = window.location ? `${window.location.pathname}${window.location.search}` : "";
    window.history.replaceState({ panelId: "home" }, "", baseUrl);
  }
}
attachTactileFeedback();

// Speed control
{
  const speedSel = $("speedControl");
  if (speedSel) {
    speedSel.addEventListener("change", () => {
      gameSpeedMs = Number(speedSel.value) || 800;
      toast(`游戏速度已切换`);
    });
  }
}
