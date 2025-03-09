# Cloudinary 圖片 CDN 設置指南

本文檔提供了如何使用 Cloudinary 作為圖片 CDN 的詳細步驟，以優化 Partender 網站的圖片加載。

## 為什麼使用 Cloudinary？

Cloudinary 提供了強大的圖片管理和優化功能：

- **自動優化**：自動調整圖片格式、質量和大小
- **響應式圖片**：根據設備自動提供最佳尺寸
- **快速加載**：全球 CDN 網絡確保圖片快速加載
- **免費計劃**：提供慷慨的免費計劃，適合中小型網站

## 步驟 1: 註冊 Cloudinary 帳戶

1. 訪問 [Cloudinary 官網](https://cloudinary.com/)
2. 點擊 "Sign up for free" 按鈕
3. 填寫註冊表單，或使用 Google/GitHub 帳戶登錄
4. 完成註冊後，您將獲得一個雲名稱 (Cloud Name)

## 步驟 2: 上傳 Logo 和圖片

1. 登錄 Cloudinary 控制台
2. 點擊 "Media Library" 標籤
3. 創建一個名為 "partender" 的文件夾
4. 上傳您的 logo 和其他圖片到該文件夾
   - 主要 logo 命名為 `logo.png`
   - 圖標 logo 命名為 `logo-icon.png`

## 步驟 3: 配置項目

1. 打開 `src/scripts/services/imageOptimizer.ts` 文件
2. 將 `CLOUDINARY_CLOUD_NAME` 變量的值更改為您的雲名稱：

```typescript
const CLOUDINARY_CLOUD_NAME = '您的雲名稱'; // 替換為您的 Cloudinary 雲名稱
```

## 步驟 4: 使用 Cloudinary URL

在 HTML 中，您可以使用以下格式的 URL 來引用 Cloudinary 上的圖片：

```html
<img src="https://res.cloudinary.com/您的雲名稱/image/upload/v1/partender/logo.png" alt="Partender Logo">
```

或者使用我們的圖片優化服務：

```typescript
import { getLogoUrl, optimizeImage } from './services/imageOptimizer';

// 獲取 logo URL
const logoUrl = getLogoUrl('full', { width: 150 });

// 優化其他圖片
const optimizedImageUrl = optimizeImage('assets/images/gallery/cocktail1.jpg', {
  width: 800,
  height: 600,
  crop: 'fill'
});
```

## 步驟 5: 使用 Cloudinary 轉換參數

Cloudinary 提供了豐富的圖片轉換參數，您可以在 URL 中使用這些參數：

- **尺寸調整**：`w_800,h_600`
- **裁剪**：`c_fill,g_auto`
- **格式轉換**：`f_auto`
- **質量調整**：`q_auto`
- **效果**：`e_sharpen`

例如：

```
https://res.cloudinary.com/您的雲名稱/image/upload/w_800,h_600,c_fill,f_auto,q_auto/v1/partender/cocktail1.jpg
```

## 圖片保護措施

Cloudinary 提供了多種保護圖片不被濫用的機制：

### 基本保護 (免費計劃可用)

1. **HTTP 引用限制**：
   - 登錄 Cloudinary 控制台
   - 進入 "Settings" > "Security"
   - 在 "HTTP Referrers Restriction" 部分，添加允許的域名（如 `partender.com, *.partender.com`）
   - 這將防止其他網站直接引用您的圖片

2. **添加水印**：
   - 上傳您的水印圖片（通常是半透明的 logo）
   - 使用轉換參數添加水印：
   ```
   https://res.cloudinary.com/您的雲名稱/image/upload/l_watermark,g_south_east,w_100,o_50/v1/partender/image.jpg
   ```

### 高級保護 (需要付費計劃)

1. **URL 簽名**：
   - 使用 API 密鑰生成帶簽名的 URL
   - 這確保只有您生成的 URL 才能訪問圖片

2. **時間限制 URL**：
   - 創建有時間限制的 URL，過期後無法訪問
   - 例如：`https://res.cloudinary.com/您的雲名稱/image/upload/exp_1640995200/v1/partender/image.jpg`

3. **私有 CDN 分發**：
   - 將圖片設為私有，只能通過授權的請求訪問

### 實施建議

對於 Partender 網站，我們建議：

1. 設置 HTTP 引用限制，只允許您的域名訪問圖片
2. 為重要圖片添加水印
3. 考慮使用較低分辨率的圖片用於公開展示
4. 如果預算允許，升級到付費計劃以獲得更強的保護功能

## 注意事項

1. **免費計劃限制**：Cloudinary 免費計劃有每月 25GB 帶寬和 25GB 存儲的限制
2. **圖片優化**：使用 `f_auto` 和 `q_auto` 參數可以大幅減少圖片大小
3. **本地開發**：在本地開發時，您可以繼續使用本地圖片，我們的圖片優化服務會自動處理
4. **保護機制**：沒有 100% 安全的保護方法，但結合多種措施可以大幅降低圖片被濫用的風險

## 進階功能

- **圖片轉換**：Cloudinary 支持各種圖片轉換，如裁剪、調整大小、濾鏡等
- **視頻處理**：Cloudinary 也支持視頻上傳和處理
- **面部識別**：可以使用面部識別進行智能裁剪

更多信息，請參考 [Cloudinary 文檔](https://cloudinary.com/documentation)。 