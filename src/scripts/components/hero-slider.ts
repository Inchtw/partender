/**
 * 英雄區輪播功能
 */

let currentSlideIndex = 0;
let slideInterval: number | null = null;
const SLIDE_INTERVAL_TIME = 5000; // 5秒切換一次

/**
 * 設置英雄區輪播
 */
export function setupHeroSlider(): void {
  console.log('設置英雄區輪播...');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dot');
  
  console.log(`找到 ${slides.length} 張幻燈片`);
  console.log(`找到 ${dots.length} 個指示器點`);
  
  if (!slides.length) return;
  
  // 設置點擊指示器事件
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      console.log(`點擊指示器 ${index}`);
      goToSlide(index);
      resetSlideInterval();
    });
  });
  
  // 開始自動輪播
  startSlideInterval();
  
  // 當用戶離開頁面時暫停輪播，返回時恢復
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlideInterval();
    } else {
      startSlideInterval();
    }
  });
  
  // 手動觸發一次切換，確保初始狀態正確
  goToSlide(0);
}

/**
 * 切換到指定幻燈片
 */
function goToSlide(index: number): void {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dot');
  
  if (!slides.length) return;
  
  // 處理索引邊界
  if (index < 0) {
    index = slides.length - 1;
  } else if (index >= slides.length) {
    index = 0;
  }
  
  console.log(`切換到幻燈片 ${index}`);
  
  // 更新當前索引
  currentSlideIndex = index;
  
  // 更新幻燈片狀態
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  // 更新指示器狀態
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

/**
 * 開始自動輪播
 */
function startSlideInterval(): void {
  if (slideInterval) return;
  
  console.log('開始自動輪播');
  slideInterval = window.setInterval(() => {
    goToSlide(currentSlideIndex + 1);
  }, SLIDE_INTERVAL_TIME);
}

/**
 * 停止自動輪播
 */
function stopSlideInterval(): void {
  if (slideInterval) {
    console.log('停止自動輪播');
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

/**
 * 重置自動輪播計時器
 */
function resetSlideInterval(): void {
  stopSlideInterval();
  startSlideInterval();
} 