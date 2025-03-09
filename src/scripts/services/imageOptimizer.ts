// 圖片優化服務

// Cloudinary 配置
// 請替換為您的 Cloudinary 雲名稱
const CLOUDINARY_CLOUD_NAME = 'df4ru2dy3'; // 更改為您的 Cloudinary 雲名稱
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// 定義 logo 圖片 URL - 添加 fl_no_referrer 參數以解決跨域問題
const LOGO_FULL_WHITE_URL = 'https://res.cloudinary.com/df4ru2dy3/image/upload/fl_no_referrer/v1741523209/logo-white_hw3odm.png';
const LOGO_WORD_WHITE_URL = 'https://res.cloudinary.com/df4ru2dy3/image/upload/fl_no_referrer/v1741523209/logo-word-white_evqdgl.png';

// 圖片格式
type ImageFormat = 'auto' | 'webp' | 'jpg' | 'png';

// 圖片質量
type ImageQuality = 'auto' | number;

// 圖片優化選項
interface ImageOptimizeOptions {
  width?: number;
  height?: number;
  format?: ImageFormat;
  quality?: ImageQuality;
  crop?: 'fill' | 'scale' | 'fit';
  dpr?: number;
}

/**
 * 優化圖片 URL
 * @param originalUrl 原始圖片 URL
 * @param options 優化選項
 * @returns 優化後的圖片 URL
 */
export function optimizeImage(originalUrl: string, options: ImageOptimizeOptions = {}): string {
  // 如果是完整的 Cloudinary URL，直接返回
  if (originalUrl.includes('res.cloudinary.com/df4ru2dy3/image/upload')) {
    return originalUrl;
  }
  
  // 如果不是 Cloudinary URL，則返回原始 URL
  if (!originalUrl.includes('cloudinary') && !originalUrl.startsWith('assets/')) {
    return originalUrl;
  }
  
  // 如果是本地資源，則使用 Cloudinary 上傳的資源
  if (originalUrl.startsWith('assets/')) {
    const assetPath = originalUrl.replace('assets/', '');
    originalUrl = `${CLOUDINARY_BASE_URL}/v1/partender/${assetPath}`;
  }
  
  // 構建轉換參數
  const transformations = [];
  
  // 設置寬度和高度
  if (options.width) {
    transformations.push(`w_${options.width}`);
  }
  
  if (options.height) {
    transformations.push(`h_${options.height}`);
  }
  
  // 設置裁剪模式
  if (options.crop) {
    transformations.push(`c_${options.crop}`);
  }
  
  // 設置格式
  if (options.format) {
    transformations.push(`f_${options.format}`);
  } else {
    transformations.push('f_auto');
  }
  
  // 設置質量
  if (options.quality) {
    transformations.push(`q_${options.quality}`);
  } else {
    transformations.push('q_auto');
  }
  
  // 設置設備像素比
  if (options.dpr) {
    transformations.push(`dpr_${options.dpr}`);
  } else {
    transformations.push('dpr_auto');
  }
  
  // 添加優化參數
  transformations.push('fl_progressive');
  
  // 構建最終 URL
  const transformationString = transformations.join(',');
  
  // 如果已經是 Cloudinary URL，則替換轉換部分
  if (originalUrl.includes('cloudinary')) {
    // 提取 URL 部分
    const urlParts = originalUrl.split('/upload/');
    if (urlParts.length === 2) {
      // 檢查是否已有 v1/ 路徑
      if (urlParts[1].startsWith('v1/')) {
        return `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;
      } else {
        return `${urlParts[0]}/upload/${transformationString}/v1/partender/${urlParts[1]}`;
      }
    }
  }
  
  return originalUrl;
}

/**
 * 獲取 logo URL
 * 注意：此函數目前未在代碼中使用，但保留以供將來可能的使用
 * @param type logo 類型 ('full', 'word' 或 'icon')
 * @param options 優化選項
 * @returns logo URL
 */
export function getLogoUrl(type: 'full' | 'word' | 'icon' = 'full', options: ImageOptimizeOptions = {}): string {
  let logoUrl;
  
  switch (type) {
    case 'full':
      logoUrl = LOGO_FULL_WHITE_URL;
      break;
    case 'word':
      logoUrl = LOGO_WORD_WHITE_URL;
      break;
    case 'icon':
      // 如果有 icon 版本的 logo，可以在這裡添加
      logoUrl = LOGO_FULL_WHITE_URL; // 暫時使用完整 logo
      break;
    default:
      logoUrl = LOGO_FULL_WHITE_URL;
  }
  
  return optimizeImage(logoUrl, options);
}

/**
 * 為不同設備生成響應式圖片 srcset
 * @param originalUrl 原始圖片 URL
 * @param widths 寬度數組
 * @param options 其他優化選項
 * @returns srcset 字符串
 */
export function generateSrcset(
  originalUrl: string,
  widths: number[] = [320, 640, 960, 1280, 1920],
  options: Omit<ImageOptimizeOptions, 'width'> = {}
): string {
  return widths
    .map(width => {
      const optimizedUrl = optimizeImage(originalUrl, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * 生成響應式圖片 HTML
 * @param originalUrl 原始圖片 URL
 * @param alt 替代文本
 * @param className CSS 類名
 * @param options 優化選項
 * @returns HTML 字符串
 */
export function responsiveImage(
  originalUrl: string,
  alt: string,
  className: string = '',
  options: ImageOptimizeOptions = {}
): string {
  const srcset = generateSrcset(originalUrl);
  const defaultSrc = optimizeImage(originalUrl, { width: 800, ...options });
  
  return `
    <img 
      src="${defaultSrc}" 
      srcset="${srcset}" 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
      alt="${alt}" 
      loading="lazy" 
      class="${className}"
    >
  `;
}

/**
 * 預加載關鍵圖片
 * @param urls 圖片 URL 數組
 */
export function preloadCriticalImages(urls: string[]): void {
  urls.forEach(url => {
    const optimizedUrl = optimizeImage(url, { width: 1200, quality: 60 });
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedUrl;
    document.head.appendChild(link);
  });
} 