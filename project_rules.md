# 项目开发规则 - 在线Markdown编辑器
## 1. 技术栈规范
- 前端：Vue 3.4 + Vite 5 + TypeScript
- Markdown解析：marked.js + highlight.js
- UI组件：Element Plus（按需引入）
- 样式：Tailwind CSS 3（优先使用）
- 代码规范：ESLint + Prettier
- 包管理器：npm

## 2. 代码质量要求
- 所有组件使用 `<script setup lang="ts">` 语法
- 类型定义完整，禁止使用 `any` 类型
- 关键代码添加必要注释
- 组件化开发，每个组件职责单一
- 错误处理完善，边界情况考虑周全

## 3. 项目结构要求
markdown-editor/
├── .github/
│ └── workflows/ # GitHub Actions 配置（可选）
├── public/ # 静态资源
├── src/
│ ├── components/ # 公共组件
│ │ ├── Editor.vue # 核心编辑器组件
│ │ ├── Toolbar.vue # 工具栏组件
│ │ └── Preview.vue # 预览组件
│ ├── utils/ # 工具函数
│ │ ├── mdParser.ts # Markdown 解析工具
│ │ └── export.ts # 导出功能工具
│ ├── styles/ # 全局样式
│ ├── App.vue
│ └── main.ts
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── Dockerfile # 可选，用于容器化部署
├── LICENSE # MIT 协议
└── README.md # 项目说明文档

## 4. 功能优先级
- P0：实时双栏编辑预览、基础Markdown语法支持、代码高亮
- P1：主题切换（明暗模式）、本地自动保存、导出PDF/Markdown
- P2：工具栏快捷按钮、字数统计、全屏编辑
- P3：图片上传、数学公式支持、表格编辑

## 5. 交付要求
- 代码可直接运行，`npm install && npm run dev` 无报错
- 支持Vercel一键部署
- README.md完整，包含项目介绍、功能特性、部署步骤
- 所有核心功能正常工作