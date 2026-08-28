# 三国杀 Webgame Demo

这是一个中文静态网页游戏 demo，包含 8 人身份局、人机对战、武将录、牌堆查看、自创武将/卡牌、封神之路等模块。

## 如何打开

直接用浏览器打开：

```text
/Users/fangwei/Documents/sgs/index.html
```

也可以直接进入游戏文件：

```text
/Users/fangwei/Documents/sgs/sanguosha-webgame/index.html
```

## 文件结构

```text
sanguosha-webgame/
  index.html              游戏页面结构
  styles.css              游戏界面样式
  app.js                  游戏规则、武将技能、AI、交互逻辑
  scripts/
    skill-smoke-test.js   无 UI 技能冒烟测试
```

## 已包含内容

- 经典身份局：玩家 vs 电脑，8 人身份局。
- 武将系统：标准、风、火、林、山，以及部分移动版/一将成名武将。
- 游戏牌系统：基础牌、锦囊牌、装备牌、属性杀、铁索连环、藤甲等。
- 响应系统：【闪】、【桃】、【酒】、【无懈可击】等时机响应。
- 自创系统：可以自定义武将、技能、卡牌，并加入对局。目前自定义系统未完善，后续将进行优化。
- 封神之路：选择武将连续挑战五关。

## 测试命令

语法检查：

```bash
/Users/fangwei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check /Users/fangwei/Documents/sgs/sanguosha-webgame/app.js
```

技能冒烟测试：

```bash
/Users/fangwei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /Users/fangwei/Documents/sgs/sanguosha-webgame/scripts/skill-smoke-test.js
```

## 说明

这是一个学习和演示用途的静态 demo。部分复杂武将和卡牌效果仍按当前引擎能力做了简化，但关键技能会尽量进入真实结算流程，而不是只显示文字反馈。
