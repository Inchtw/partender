// Google Analytics 服務

// 替換為您的 Google Analytics 測量 ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// 初始化 Google Analytics
export function initGoogleAnalytics(): void {
  // 添加 Google Analytics 腳本
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // 初始化 gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // 將 gtag 函數添加到 window 對象
  window.gtag = gtag;
}

// 追蹤頁面訪問
export function trackPageView(pagePath: string, pageTitle: string): void {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}

// 追蹤事件
export function trackEvent(
  eventCategory: string,
  eventAction: string,
  eventLabel?: string,
  eventValue?: number
): void {
  if (window.gtag) {
    window.gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    });
  }
}

// 追蹤表單提交
export function trackFormSubmission(formName: string): void {
  trackEvent('form', 'submit', formName);
}

// 追蹤畫廊項目點擊
export function trackGalleryItemClick(itemName: string): void {
  trackEvent('gallery', 'click', itemName);
}

// 追蹤服務項目點擊
export function trackServiceItemClick(serviceName: string): void {
  trackEvent('service', 'click', serviceName);
}

// 追蹤外部鏈接點擊
export function trackExternalLinkClick(linkUrl: string, linkText: string): void {
  trackEvent('external_link', 'click', `${linkText} (${linkUrl})`);
}

// 追蹤滾動深度
export function setupScrollDepthTracking(): void {
  let scrollDepthMarkers = [25, 50, 75, 100];
  let scrollDepthTracked: number[] = [];

  window.addEventListener('scroll', () => {
    const scrollPercentage = Math.floor(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    scrollDepthMarkers.forEach((marker) => {
      if (scrollPercentage >= marker && !scrollDepthTracked.includes(marker)) {
        trackEvent('scroll_depth', 'scroll', `${marker}%`);
        scrollDepthTracked.push(marker);
      }
    });
  });
}

// 擴展 Window 接口以包含 gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 