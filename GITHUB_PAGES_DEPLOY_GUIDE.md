# GitHub Pages 自动部署指南

本文档提供了如何将 Partender 网站自动部署到 GitHub Pages 的详细步骤。

## 已完成的配置

项目已经配置了以下内容：

1. `package.json` 中添加了 `homepage` 字段，指向 GitHub Pages URL
2. 安装了 `gh-pages` 依赖包
3. 配置了 `predeploy` 和 `deploy` 脚本
4. 创建了 GitHub Actions 工作流文件 (`.github/workflows/deploy.yml`)

## 部署流程

### 自动部署 (推荐)

当您将代码推送到 `master` 或 `main` 分支时，GitHub Actions 将自动触发部署流程：

1. 检出代码
2. 安装依赖
3. 构建项目
4. 将构建结果部署到 `gh-pages` 分支
5. GitHub Pages 将从 `gh-pages` 分支提供网站内容

### 手动部署 (备选方案)

如果您需要手动部署，可以运行：

```bash
npm run deploy
```

这将构建项目并将构建结果推送到 `gh-pages` 分支。

## 首次部署步骤

1. 确保您的代码已经推送到 GitHub 仓库
2. 推送到 `master` 或 `main` 分支，触发自动部署：

   ```bash
   git checkout -b master  # 如果没有master分支，创建一个
   git merge develop       # 合并开发分支的更改
   git push origin master  # 推送到master分支
   ```

3. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入仓库页面
   - 点击 "Settings"
   - 在左侧菜单中点击 "Pages"
   - 在 "Source" 下，选择 "Deploy from a branch"
   - 在 "Branch" 下，选择 "gh-pages" 分支和 "/ (root)" 文件夹
   - 点击 "Save"

4. 几分钟后，您的网站将在 `https://inchtw.github.io/partender/` 上可用

## 检查部署状态

1. 在 GitHub 仓库页面，点击 "Actions" 标签
2. 查看最新的工作流运行状态
3. 如果部署成功，您将看到绿色的对勾标记

## 自定义域名 (可选)

如果您想使用自定义域名，请按照以下步骤操作：

1. 在您的 DNS 提供商处添加以下记录：
   - 类型: CNAME
   - 名称: www 或您想要的子域名
   - 值: inchtw.github.io

2. 在 GitHub 仓库的 "Settings" > "Pages" 中，在 "Custom domain" 字段中输入您的域名，然后点击 "Save"

3. 在项目根目录创建一个名为 `CNAME` 的文件（无扩展名），内容为您的域名：

   ```
   www.yourdomain.com
   ```

4. 将此文件添加到您的 `public` 或 `static` 目录中，确保它会被复制到构建目录

5. 更新 `package.json` 中的 `homepage` 字段为您的自定义域名：

   ```json
   "homepage": "https://www.yourdomain.com",
   ```

6. 重新部署您的网站

## 故障排除

如果您在部署过程中遇到问题，请检查：

1. GitHub Actions 日志中的错误信息
2. 确保 `package.json` 中的 `homepage` 字段正确
3. 确保 GitHub 仓库设置中的 Pages 配置正确
4. 检查 `dist` 目录是否正确生成

## 更新网站

要更新已部署的网站，只需将更改推送到 `master` 或 `main` 分支，GitHub Actions 将自动触发新的部署。 