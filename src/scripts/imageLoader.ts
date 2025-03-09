/**
 * 圖片加載工具
 * 用於解決 Cloudinary 圖片在 localhost 環境下無法顯示的問題
 */

// 檢查是否為本地環境
const isLocalhost: boolean = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname.includes('192.168.');

console.log('環境檢測:', { isLocalhost, hostname: window.location.hostname });

/**
 * 加載圖片並處理錯誤
 * @param {HTMLImageElement} imgElement - 圖片元素
 * @param {string} cloudinaryUrl - Cloudinary URL
 * @param {string} localFallbackPath - 本地備份路徑
 */
function loadImage(imgElement: HTMLImageElement, cloudinaryUrl: string, localFallbackPath?: string): void {
  console.log('開始加載圖片:', { cloudinaryUrl, localFallbackPath });
  
  // 確保 Cloudinary URL 包含 no_referrer 參數
  let optimizedUrl = cloudinaryUrl;
  if (optimizedUrl.includes('/upload/') && !optimizedUrl.includes('fl_no_referrer')) {
    optimizedUrl = optimizedUrl.replace('/upload/', '/upload/fl_no_referrer/');
  }
  
  // 如果是本地環境，直接使用本地圖片
  if (isLocalhost && localFallbackPath) {
    console.log('本地環境，優先使用本地圖片:', localFallbackPath);
    imgElement.src = localFallbackPath;
    
    // 添加錯誤處理，如果本地圖片加載失敗，嘗試使用 Cloudinary
    imgElement.onerror = function(): void {
      console.error('本地圖片加載失敗，嘗試使用 Cloudinary:', optimizedUrl);
      
      imgElement.src = optimizedUrl;
      
      // 如果 Cloudinary 也失敗，顯示錯誤信息
      imgElement.onerror = function(): void {
        console.error('Cloudinary 圖片也加載失敗:', optimizedUrl);
        imgElement.alt = '圖片加載失敗';
        imgElement.style.border = '1px dashed red';
        imgElement.style.padding = '10px';
        imgElement.style.width = '100px';
        imgElement.style.height = '50px';
      };
    };
  } else {
    // 非本地環境或沒有本地備份，使用 Cloudinary
    console.log('使用 Cloudinary 圖片:', optimizedUrl);
    imgElement.src = optimizedUrl;
    
    // 添加錯誤處理
    imgElement.onerror = function(): void {
      console.error('Cloudinary 圖片加載失敗:', optimizedUrl);
      
      // 嘗試使用本地備份
      if (localFallbackPath) {
        console.log('嘗試使用本地備份圖片:', localFallbackPath);
        imgElement.src = localFallbackPath;
        
        // 如果本地備份也失敗
        imgElement.onerror = function(): void {
          console.error('本地備份圖片也加載失敗:', localFallbackPath);
          imgElement.alt = '圖片加載失敗';
          imgElement.style.border = '1px dashed red';
          imgElement.style.padding = '10px';
          imgElement.style.width = '100px';
          imgElement.style.height = '50px';
        };
      } else {
        imgElement.alt = '圖片加載失敗';
        imgElement.style.border = '1px dashed red';
        imgElement.style.padding = '10px';
        imgElement.style.width = '100px';
        imgElement.style.height = '50px';
      }
    };
  }
}

/**
 * 初始化所有帶有 data-cloudinary-url 屬性的圖片
 */
function initializeImages(): void {
  console.log('開始初始化圖片...');
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img[data-cloudinary-url]');
  console.log(`找到 ${images.length} 個需要初始化的圖片`);
  
  images.forEach((img: HTMLImageElement, index: number) => {
    const cloudinaryUrl: string | null = img.getAttribute('data-cloudinary-url');
    const localFallback: string | null = img.getAttribute('data-local-fallback');
    
    console.log(`圖片 ${index + 1}:`, { 
      element: img, 
      cloudinaryUrl, 
      localFallback 
    });
    
    if (cloudinaryUrl) {
      loadImage(img, cloudinaryUrl, localFallback || undefined);
    }
  });
}

// 當 DOM 加載完成後初始化圖片
document.addEventListener('DOMContentLoaded', initializeImages);

// 導出函數供其他模塊使用
export { loadImage, initializeImages }; 