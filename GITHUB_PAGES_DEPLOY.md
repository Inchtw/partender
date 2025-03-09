# 在 GitHub Pages 上部署網站

本文檔提供了將 Partender 網站部署到 GitHub Pages 的步驟，同時保護敏感配置文件。

## 準備工作

在部署之前，請確保您已經：

1. 創建了一個 GitHub 帳戶
2. 安裝了 Git
3. 安裝了 Node.js 和 npm

## 步驟 1: 創建 GitHub 倉庫

1. 登錄您的 GitHub 帳戶
2. 點擊右上角的 "+" 圖標，選擇 "New repository"
3. 倉庫名稱設置為 `partender`（或您喜歡的名稱）
4. 選擇 "Private"（私有）以保護您的源代碼
5. 點擊 "Create repository"

## 步驟 2: 初始化本地 Git 倉庫

在您的項目目錄中打開終端，執行以下命令：

```bash
git init
git add .
git commit -m "初始提交"
git branch -M main
git remote add origin https://github.com/您的用戶名/partender.git
git push -u origin main
```

## 步驟 3: 處理敏感配置文件

為了保護敏感信息（如 API 密鑰、Firebase 配置等），請按照以下步驟操作：

1. 確保所有敏感配置文件都已添加到 `.gitignore` 文件中
2. 創建配置文件模板，移除敏感信息：

```bash
# 例如，對於 firebase-config.js
cp src/config/firebase-config.js src/config/firebase-config.template.js
```

3. 編輯模板文件，用佔位符替換敏感信息：

```javascript
// firebase-config.template.js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

4. 將模板文件添加到 Git：

```bash
git add src/config/firebase-config.template.js
git commit -m "添加配置文件模板"
git push origin main
```

5. 在 README.md 中添加設置說明，指導其他開發者如何使用模板文件

## 步驟 4: 安裝 gh-pages 包

```bash
npm install --save-dev gh-pages
```

## 步驟 5: 修改 package.json

在 `package.json` 文件中添加以下內容：

```json
{
  "homepage": "https://您的用戶名.github.io/partender/",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 步驟 6: 構建和部署

```bash
npm run deploy
```

這將構建您的項目並將其部署到 GitHub Pages。

## 步驟 7: 配置 GitHub Pages

1. 在 GitHub 上導航到您的倉庫
2. 點擊 "Settings"
3. 在左側菜單中點擊 "Pages"
4. 在 "Source" 下，選擇 "gh-pages" 分支
5. 點擊 "Save"

幾分鐘後，您的網站將在 `https://您的用戶名.github.io/partender/` 上可用。

## 步驟 8: 設置自定義域名（可選）

如果您有自己的域名，可以按照以下步驟設置：

1. 在您的 DNS 提供商處添加以下記錄：
   - 類型: CNAME
   - 名稱: www 或您想要的子域名
   - 值: 您的用戶名.github.io

2. 在您的倉庫中創建一個名為 `CNAME` 的文件（無擴展名），內容為您的域名：

```
www.yourdomain.com
```

3. 將此文件添加到您的 `public` 或 `static` 目錄中，確保它會被複製到構建目錄

4. 重新部署您的網站：

```bash
npm run deploy
```

5. 在 GitHub 倉庫的 "Settings" > "Pages" 中，在 "Custom domain" 字段中輸入您的域名，然後點擊 "Save"

## 注意事項

1. **保護敏感信息**：永遠不要將 API 密鑰、密碼或其他敏感信息提交到 Git 倉庫中
2. **使用環境變量**：對於生產環境，考慮使用環境變量來存儲敏感信息
3. **定期更新**：定期更新您的依賴項以修復安全漏洞

## 故障排除

如果您在部署過程中遇到問題，請檢查：

1. 您的倉庫設置是否正確
2. `package.json` 中的 `homepage` 字段是否正確
3. 構建過程是否成功完成
4. GitHub Pages 設置是否正確

如需更多幫助，請參考 [GitHub Pages 文檔](https://docs.github.com/en/pages)。

## 整合 Google Analytics

1. 創建 Google Analytics 帳戶並獲取測量 ID
2. 在 `src/scripts/services/analytics.ts` 中更新 `GA_MEASUREMENT_ID` 變量

## 整合 Firebase

1. 創建 Firebase 項目並獲取配置
2. 在 `src/scripts/services/firebase.ts` 中更新 `firebaseConfig` 對象

## 整合 Cloudinary

1. 創建 Cloudinary 帳戶並獲取雲名稱
2. 在 `src/scripts/services/imageOptimizer.ts` 中更新 `CLOUDINARY_CLOUD_NAME` 變量
3. 上傳您的圖片到 Cloudinary 
4. 更新 logo 圖片連結：
   - 完整白色 logo: `https://res.cloudinary.com/df4ru2dy3/image/upload/v1741523854/logo-all-white_yncsgj.png`
   - 文字白色 logo: `https://res.cloudinary.com/df4ru2dy3/image/upload/v1741523209/logo-word-white_evqdgl.png`
5. 在 `imageOptimizer.ts` 中設置 logo 常量：
   ```typescript
   const LOGO_FULL_WHITE_URL = 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741523854/logo-all-white_yncsgj.png';
   const LOGO_WORD_WHITE_URL = 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741523209/logo-word-white_evqdgl.png';
   ```
6. 使用 `getLogoUrl` 函數獲取優化後的 logo URL：
   ```typescript
   // 獲取完整 logo
   const fullLogo = getLogoUrl('full', { width: 150 });
   
   // 獲取文字 logo
   const wordLogo = getLogoUrl('word', { width: 120 });
   ``` 