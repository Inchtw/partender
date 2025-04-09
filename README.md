# Partender - 派對調酒專家

這是一個專業的派對調酒服務網站，使用 TypeScript、現代 CSS 和響應式設計構建。

## Node.js 版本要求

本專案需要使用 Node.js v20.14.0 版本，請使用 NVM 進行安裝和切換：

```bash
# 安裝指定版本
nvm install 20.14.0

# 切換到專案目錄後自動使用正確版本
cd partender
nvm use
```

## 功能特點

- 響應式設計，適配手機、平板和桌面設備
- 圖片 hover 效果和燈箱展示
- Logo 滾動縮放效果
- 使用 TypeScript 進行類型安全的開發
- 模塊化的 CSS 和 JavaScript 文件結構
- 準備好的 API 服務架構，方便未來擴展
- 整合 Cloudinary CDN 進行圖片優化和加速

## 技術棧

- TypeScript
- 現代 CSS (變量、Flexbox、Grid)
- Webpack
- 響應式設計
- Cloudinary 圖片 CDN

## 開始使用

### 安裝依賴

```bash
npm install
```

### 配置 Cloudinary

請參考 [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) 文件，了解如何設置 Cloudinary 並上傳您的 logo 和圖片。

### 開發模式

```bash
npm start
```

這將啟動開發服務器，通常在 http://localhost:9000

### 構建生產版本

```bash
npm run build
```

構建後的文件將位於 `dist` 目錄中。

## 項目結構

```
/
├── dist/                  # 構建輸出目錄
├── src/
│   ├── assets/            # 靜態資源
│   │   └── images/        # 圖片資源
│   │       └── logo/      # Logo 圖片
│   ├── scripts/           # TypeScript 文件
│   │   ├── components/    # 組件腳本
│   │   └── services/      # 服務腳本（如 API、圖片優化）
│   └── styles/            # CSS 文件
├── index.html             # 主 HTML 文件
├── package.json           # 項目配置
├── tsconfig.json          # TypeScript 配置
├── webpack.config.js      # Webpack 配置
├── CLOUDINARY_SETUP.md    # Cloudinary 設置指南
└── README.md              # 項目說明
```

## 響應式設計

網站針對不同設備進行了優化：

- 手機 (<768px)
- 平板 (768px - 992px)
- 桌面 (>992px)

## API 整合

`src/scripts/services/api.ts` 文件包含了與後端 API 通信的所有功能。目前使用模擬數據，但可以輕鬆切換到實際的 API 端點。

## 圖片優化

`src/scripts/services/imageOptimizer.ts` 文件提供了圖片優化功能，使用 Cloudinary 進行圖片處理和加速：

- 自動調整圖片大小和質量
- 根據設備提供最佳圖片格式
- 使用全球 CDN 加速圖片加載
- 支持響應式圖片和延遲加載

## 自定義

- 顏色和主題可以在 `src/styles/main.css` 中的 CSS 變量中修改
- 網站內容可以在 HTML 文件中更新
- 圖片可以替換為您自己的圖片（上傳到 Cloudinary 或放在 `src/assets/images/` 目錄中）

## 瀏覽器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 許可證

ISC 