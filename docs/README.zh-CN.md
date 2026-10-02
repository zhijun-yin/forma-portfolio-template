# Forma 使用指南

这是一个主页**模板**，不是某个人的真实主页。默认内容全部为占位或虚构示例，联系方式为空，点击「聊一聊」只会打开说明弹窗，不收集或发送信息。

## 开始使用

在 GitHub 点击 **Use this template → Create a new repository**。也可以下载源码 ZIP，解压后双击 `index.html` 预览。没有框架依赖，也不用安装 npm 包。

需要本地 HTTP 服务时，可在项目目录运行：

```sh
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 替换内容

编辑 `assets/config.js`。文字既可以写成普通字符串，也可以写成中英文对象：

```js
name: { en: 'Your name', zh: '你的名字' },
```

某个语言的文本为空缺时会使用另一语言。界面语言按钮和主题按钮会记住访问者在当前浏览器的选择；浏览器不允许本地存储时，页面仍可使用。

| 字段 | 用途 |
| --- | --- |
| `siteTitle` / `siteDescription` | 浏览器标题与页面描述 |
| `profile` | 名字、角色、状态、标题、简介、技能、联系入口 |
| `projects` | 作品卡片、分类、详情与外部链接 |
| `experience` | 经历时间线 |
| `notes` | 手记标题、正文、阅读时间与可选外部文章链接 |
| `defaultLanguage` | 初始语言，`en` 或 `zh` |
| `defaultTheme` | 初始主题，`light`、`dark` 或 `system` |
| `showTemplateHints` | 完成内容替换后设为 `false`，隐藏虚构示例提示 |

设为 `notes: []` 会隐藏手记板块及对应导航。设为 `experience: []` 会隐藏经历标题与条目。邮箱、简历或社交链接未配置时，不会出现真实联系信息。

项目分类支持 `design`、`development`、`experiment`。卡片插画支持 `atlas`、`ground`、`hours`、`generic`；可在 `assets/app.js` 的固定插画模板中添加新图形。

填写项目和社交链接时使用完整的 HTTP(S) 链接。简历还支持相对路径，例如 `./assets/resume.pdf`。放入 `assets/` 的文件会随网页公开。请只放入你希望发布的文件。

调整颜色、字号和间距：编辑 `assets/styles.css`。调整界面文案：编辑 `assets/app.js` 的 `ui` 对象。配置文本按普通文字显示，不解析 HTML。

## 发布

1. 创建模板副本。
2. 在你的仓库 **Settings → Pages** 设置 Source 为 **GitHub Actions**。
3. 向 `main` 提交修改，或者手动运行 **Check and deploy Forma**。
4. 工作流完成后，在 Pages 设置中打开网站地址。

部署工作流只打包 `index.html` 和公开的 `assets/` 资源，不将 README、截图、脚本或 Git 历史作为网页资源发布。

## 本地检查

安装 Node.js 22 或更高版本后可运行：

```sh
npm run check
npm run build
```

检查包含语法、配置结构、页面锚点、本地资源、链接协议及常见凭据模式。`_site/` 是可部署目录，已排除在 Git 提交之外。自动检查不能替代对主动公开内容的人工审查。

## 默认内容与许可证

默认模板未包含真实姓名、邮箱、联系方式、单位、项目成果或简历；没有统计代码、外部字体、第三方嵌入或用户数据上报。只有本地的语言和主题偏好会写入浏览器存储。

本项目采用 [MIT 许可证](../LICENSE)，可用于个人或商业项目。再分发源码时保留许可证声明。你可以修改或移除页面底部的 Forma 字样；许可证声明仍应保留在源码中。
