import { ServiceItem, GalleryItem } from './types';
import { mockGalleryItems, mockServices } from './services/api';
import { preloadCriticalImages } from './services/imageOptimizer';
import { initGoogleAnalytics, trackEvent } from './services/analytics';
import { initFirebase } from './services/firebase';
import { setupHeroSlider } from './components/hero-slider';
import { setupBackToTop } from './components/back-to-top';

// 引入作品展示功能
import './portfolio.js';

// DOM 元素
const navbarElement = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const contactForm = document.getElementById('contactForm') as HTMLFormElement;
const ageVerificationModal = document.getElementById('ageVerificationModal');
const ageConfirmBtn = document.getElementById('ageConfirmBtn');
const ageDenyBtn = document.getElementById('ageDenyBtn');
const servicesContainer = document.getElementById('servicesContainer');
const galleryContainer = document.getElementById('galleryContainer');
const counterElements = document.querySelectorAll('.counter-number');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const yearElement = document.getElementById('currentYear') as HTMLElement;

// 獲取登入按鈕但不初始化它
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.style.display = 'none';
  loginBtn.style.visibility = 'hidden';
}

// 獲取會員區塊並隱藏
const memberSection = document.getElementById('member');
if (memberSection) {
  memberSection.style.display = 'none';
  memberSection.style.visibility = 'hidden';
}

// 初始化函數
async function init(): Promise<void> {
  // 預加載關鍵圖片
  preloadCriticalImages([
    'https://res.cloudinary.com/df4ru2dy3/image/upload/fl_no_referrer/v1741523209/logo-white_hw3odm.png',
    'https://res.cloudinary.com/df4ru2dy3/image/upload/fl_no_referrer/v1741523209/logo-word-white_evqdgl.png',
    'assets/images/hero-bg.jpg',
    'assets/images/about.jpg'
  ]);
  
  // 設置英雄區輪播
  setupHeroSlider();
  
  // 設置回到頂部按鈕
  setupBackToTop();
  
  // 初始化第三方服務
  initGoogleAnalytics();
  try {
    await initFirebase();
    // 註釋掉會員系統初始化
    // await initAuth();
  } catch (error) {
    console.error('初始化服務失敗:', error);
    alert('初始化失敗：無法連接到服務，請稍後再試');
  }
  
  // 設置事件監聽器
  setupScrollEvents();
  setupMobileMenu();
  setupGalleryItemEvents();
  setupContactForm();
  setupAgeVerification();
  setupCounterAnimation();
  setupTestimonials();
  
  // 更新頁腳年份
  updateCopyrightYear();
  
  // 渲染動態內容
  renderGalleryItems(mockGalleryItems);
  renderServiceItems(mockServices);
}

// 頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', init);

// 設置滾動事件
function setupScrollEvents(): void {
  window.addEventListener('scroll', () => {
    // 導航欄滾動效果
    if (navbarElement) {
      if (window.scrollY > 50) {
        navbarElement.classList.add('scrolled');
      } else {
        navbarElement.classList.remove('scrolled');
      }
    }
    
    // 滾動動畫
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('active');
      }
    });
  });
}

// 設置移動端菜單
function setupMobileMenu(): void {
  if (!mobileMenuBtn || !navLinks) return;
  
  console.log('設置移動端菜單');
  
  // 確保在DOM加載完成後綁定事件
  document.addEventListener('DOMContentLoaded', () => {
    if (mobileMenuBtn) {
      console.log('找到移動端菜單按鈕');
      
      mobileMenuBtn.addEventListener('click', (e) => {
        console.log('移動端菜單按鈕被點擊');
        e.preventDefault();
        e.stopPropagation();
        
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // 追蹤事件
        trackEvent('navigation', 'mobile_menu_toggle');
      });
    }
  });
  
  // 點擊導航鏈接後關閉菜單
  const navLinkElements = navLinks.querySelectorAll('a');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
  
  // 點擊頁面其他區域關閉菜單
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(target) && 
        target !== mobileMenuBtn &&
        !mobileMenuBtn.contains(target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  });
}

// 渲染圖庫項目
function renderGalleryItems(items: GalleryItem[]): void {
  if (!galleryContainer) return;
  
  galleryContainer.innerHTML = items.map(item => `
    <div class="gallery-item" data-category="${item.category}">
      <img 
        src="${item.imageUrl}" 
        alt="${item.title}" 
        loading="lazy"
        data-original-src="${item.imageUrl}"
        onerror="handleImageError(this)"
      >
      <div class="gallery-overlay">
        <h3 class="gallery-title">${item.title}</h3>
        <p class="gallery-description">${item.description}</p>
      </div>
      <div class="gallery-icon">
        <i class="fas fa-search-plus"></i>
      </div>
    </div>
  `).join('');
  
  // 設置圖庫項目點擊事件
  setupGalleryItemEvents();
}

// 設置圖庫項目事件
function setupGalleryItemEvents(): void {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgElement = item.querySelector('img') as HTMLImageElement;
      const titleElement = item.querySelector('.gallery-title') as HTMLElement;
      
      if (imgElement && titleElement) {
        showLightbox(imgElement.src, titleElement.textContent || '');
        trackEvent('gallery', 'view_item', titleElement.textContent || '');
      }
    });
  });
}

// 顯示燈箱
function showLightbox(imgSrc: string, title: string): void {
  // 創建燈箱元素
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${imgSrc}" alt="${title}">
      <div class="lightbox-caption">${title}</div>
      <button class="lightbox-close">&times;</button>
    </div>
  `;
  
  // 添加到頁面
  document.body.appendChild(lightbox);
  
  // 防止頁面滾動
  document.body.style.overflow = 'hidden';
  
  // 關閉燈箱
  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(lightbox);
      document.body.style.overflow = '';
    });
  }
  
  // 點擊背景關閉
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      document.body.removeChild(lightbox);
      document.body.style.overflow = '';
    }
  });
}

// 渲染服務項目
function renderServiceItems(items: ServiceItem[]): void {
  if (!servicesContainer) return;
  
  servicesContainer.innerHTML = items.map(item => `
    <div class="service-card">
      <div class="service-icon">
        <i class="fas fa-${item.icon}"></i>
      </div>
      <h3 class="service-title">${item.title}</h3>
      <p class="service-description">${item.description}</p>
    </div>
  `).join('');
  
  // 添加服務項目點擊事件
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.service-title')?.textContent;
      trackEvent('service', 'click', title || '');
    });
  });
}

// 設置聯絡表單
function setupContactForm(): void {
  if (!contactForm) return;
  
  // 定義一個變量來跟踪表單是否已提交
  let submitted = false;
  
  // 監聽隱藏iframe的加載事件
  const hiddenIframe = document.getElementById('hidden_iframe');
  if (hiddenIframe) {
    hiddenIframe.addEventListener('load', () => {
      if (submitted) {
        // 表單已成功提交
        // 重置表單
        contactForm.reset();
        
        // 顯示成功訊息
        alert('感謝您的訊息！我們會盡快回覆您。');
        
        // 追蹤表單提交
        trackEvent('contact_form_submit', 'success');
        
        // 重置提交狀態
        submitted = false;
      }
    });
  }
  
  // 監聽表單提交事件
  contactForm.addEventListener('submit', (e) => {
    // 不阻止默認提交行為，因為我們希望表單直接提交到Google表單
    
    // 簡單驗證
    const nameInput = contactForm.querySelector('#name') as HTMLInputElement;
    const emailInput = contactForm.querySelector('#email') as HTMLInputElement;
    const messageInput = contactForm.querySelector('#message') as HTMLTextAreaElement;
    
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      e.preventDefault(); // 如果驗證失敗，阻止提交
      alert('請填寫所有必填欄位');
      return;
    }
    
    // 設置提交狀態為true
    submitted = true;
  });
}

// 設置年齡驗證
function setupAgeVerification(): void {
  if (!ageVerificationModal || !ageConfirmBtn || !ageDenyBtn) return;
  
  // 檢查 localStorage
  if (!localStorage.getItem('ageVerified')) {
    ageVerificationModal.style.display = 'flex';
  }
  
  ageConfirmBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageVerificationModal.style.display = 'none';
    trackEvent('age_verification', 'confirm');
  });
  
  ageDenyBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
    trackEvent('age_verification', 'deny');
  });
}

// 設置計數器動畫
function setupCounterAnimation(): void {
  if (!counterElements.length) return;
  
  // 觀察計數器元素
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target as HTMLElement;
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        let count = 0;
        const duration = 2000; // 動畫持續時間（毫秒）
        const interval = Math.ceil(duration / target);
        
        const timer = setInterval(() => {
          // 根據目標值調整增量,讓動畫更流暢
          const increment = target > 1000 ? 51 : 1;
          count += increment;
          counter.textContent = count.toString();
          
          if (count >= target) {
            clearInterval(timer);
            counter.textContent = target.toString();
          }
        }, interval);
        
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  // 觀察所有計數器
  counterElements.forEach(counter => {
    observer.observe(counter);
  });
}

// 設置顧客評價
function setupTestimonials(): void {
  if (!testimonialItems.length) return;
  
  testimonialItems.forEach(item => {
    // 初始狀態：只顯示頭像和名稱
    const content = item.querySelector('.testimonial-content') as HTMLElement;
    const text = item.querySelector('.testimonial-text') as HTMLElement;
    
    if (content && text) {
      // 設置初始高度
      const originalHeight = content.offsetHeight;
      const collapsedHeight = originalHeight - text.offsetHeight;
      
      content.style.height = `${collapsedHeight}px`;
      content.style.overflow = 'hidden';
      content.style.transition = 'height 0.3s ease';
      
      // 滑鼠懸停或點擊時展開
      const expandContent = () => {
        content.style.height = `${originalHeight}px`;
      };
      
      const collapseContent = () => {
        content.style.height = `${collapsedHeight}px`;
      };
      
      // 添加事件監聽器
      item.addEventListener('mouseenter', expandContent);
      item.addEventListener('mouseleave', collapseContent);
      item.addEventListener('click', () => {
        if (content.style.height === `${originalHeight}px`) {
          collapseContent();
        } else {
          expandContent();
        }
      });
    }
  });
}

// 更新版權年份
function updateCopyrightYear(): void {
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
}

// 導出函數供其他模塊使用
export {
  renderServiceItems,
  renderGalleryItems,
  showLightbox
}; 