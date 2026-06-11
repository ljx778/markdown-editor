# Markdown Editor

一个功能完善、界面美观、性能优秀的在线 Markdown 编辑器。

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/ljx778/markdown-editor)

## 功能特性

- 📝 **实时预览** - 左侧编辑区 + 右侧实时预览区的双栏布局
- ✨ **Markdown 支持** - 支持所有标准 Markdown 语法（标题、粗体、斜体、列表、链接、图片、表格、代码块等）
- 🎨 **代码高亮** - 代码块语法高亮，支持常见编程语言
- 🌙 **主题切换** - 明暗主题切换，支持编辑器和预览区同步切换
- 💾 **自动保存** - 本地自动保存功能，刷新页面不会丢失内容
- 📤 **导出功能** - 支持导出为 Markdown 文件和 PDF 文件
- 🛠️ **工具栏** - 提供加粗、斜体、标题、列表、链接、图片等快捷按钮
- 📊 **字数统计** - 显示字符数、单词数、行数
- ⛶ **全屏模式** - 支持全屏编辑模式
- 📱 **响应式设计** - 支持移动端访问

## 在线演示

> 🚀 **即将上线** - 部署后替换此链接

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-4F46E5?style=for-the-badge)](#)

## 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看编辑器

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 一键部署到 Vercel

### 方法一：点击按钮部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ljx778/markdown-editor)

> ⚠️ **注意**：部署前请先将 `ljx778` 替换为你的 GitHub 用户名，或直接点击按钮后在 Vercel 中选择 "Import Git Repository"

### 方法二：从 GitHub 导入

1. 将项目上传到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 "Add New Project"
4. 选择 "Import Git Repository"
5. 选择你的仓库
6. 点击 "Deploy"

### 方法三：使用 Docker 部署

```bash
# 构建镜像
docker build -t markdown-editor .

# 运行容器
docker run -d -p 80:80 markdown-editor
```

访问 http://localhost 查看编辑器

## 技术栈

| 技术 | 说明 |
|------|------|
| ![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?style=flat-square&logo=vuedotjs) | 渐进式 JavaScript 框架 |
| ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite) | 下一代前端构建工具 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript) | JavaScript 超集 |
| ![marked.js](https://img.shields.io/badge/marked.js-Markdown%20Parser-C63327?style=flat-square) | Markdown 解析器 |
| ![highlight.js](https://img.shields.io/badge/highlight.js-Code%20Highlight-326CE5?style=flat-square) | 代码高亮库 |
| ![Element Plus](https://img.shields.io/badge/Element%20Plus-Icons-409EFF?style=flat-square) | UI 组件库 |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss) | 实用优先 CSS 框架 |

## 项目截图

### 浅色主题

![浅色主题](https://raw.githubusercontent.com/ljx778/markdown-editor/main/screenshots/light-theme.png)

### 深色主题

![深色主题](https://raw.githubusercontent.com/ljx778/markdown-editor/main/screenshots/dark-theme.png)

### 导出功能

![导出功能](https://raw.githubusercontent.com/ljx778/markdown-editor/main/screenshots/export-menu.png)

> 📝 **说明**：请将截图保存到 `screenshots/` 目录，并将 `ljx778` 替换为你的 GitHub 用户名。

## 项目结构

```
markdown-editor/
├── src/
│   ├── components/
│   │   ├── Editor.vue      # 编辑器组件
│   │   ├── Preview.vue     # 预览组件
│   │   └── Toolbar.vue     # 工具栏组件
│   ├── utils/
│   │   ├── mdParser.ts     # Markdown 解析工具
│   │   └── export.ts       # 导出功能工具
│   ├── styles/
│   │   └── global.css      # 全局样式
│   ├── App.vue             # 主应用组件
│   └── main.ts             # 入口文件
├── public/                  # 静态资源
├── index.html               # HTML 入口
├── package.json             # 项目配置
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.js       # Tailwind 配置
├── vercel.json              # Vercel 部署配置
├── Dockerfile               # Docker 配置
├── nginx.conf               # Nginx 配置
└── README.md                # 项目文档
```

## 使用说明

### 基本编辑

1. 在左侧编辑区输入 Markdown 内容
2. 右侧预览区会实时显示渲染结果
3. 内容会自动保存到本地存储

### 工具栏按钮

| 按钮 | 功能 |
|------|------|
| **B** | 加粗 |
| *I* | 斜体 |
| U | 下划线 |
| ~~S~~ | 删除线 |
| H1-H3 | 标题 |
| • | 无序列表 |
| 1. | 有序列表 |
| " | 引用 |
| `</>` | 行内代码 |
| ``` | 代码块 |
| 🔗 | 链接 |
| 🖼️ | 图片 |
| 📋 | 表格 |
| --- | 分隔线 |

### 快捷键

- `Ctrl/Cmd + S`: 保存（自动保存已启用）
- `F11`: 全屏模式

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| - | 无需环境变量即可运行 | - |

## 开发相关

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 88+ |
| Firefox | 85+ |
| Safari | 14+ |
| Edge | 88+ |

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

## 贡献

欢迎提交 Issue 和 Pull Request！

如果你觉得这个项目有帮助，请给我一个 ⭐️
