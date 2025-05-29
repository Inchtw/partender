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
  
  // 初始化 Instagram 詢問按鈕
  initializeIgInquiryButton();
  
  // 初始化關於我們圖片輪播
  initializeAboutSlider();
  
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
  
  // 初始化 FAQ
  initializeFAQ();
  
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
        if (typeof trackEvent === 'function') {
          trackEvent('navigation', 'mobile_menu_toggle');
        }
      });
    }
  });
  
  // 點擊導航鏈接後關閉菜單
  const navLinkElements = navLinks.querySelectorAll('a');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      if (typeof trackEvent === 'function') {
        trackEvent('navigation', 'click_nav_link', link.textContent || '');
      }
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
        if (typeof trackEvent === 'function') {
          trackEvent('gallery', 'view_item', titleElement.textContent || '');
        }
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
      if (typeof trackEvent === 'function') {
        trackEvent('service', 'click', title || '');
      }
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
        if (typeof trackEvent === 'function') {
          trackEvent('contact_form_submit', 'success');
        }
        
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
  if (localStorage.getItem('ageVerified')) {
    // 如果已經驗證過，隱藏彈窗
    ageVerificationModal.style.display = 'none';
  } else {
    // 如果尚未驗證，確保彈窗顯示
    ageVerificationModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 防止頁面滾動
  }
  
  ageConfirmBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageVerificationModal.style.display = 'none';
    document.body.style.overflow = ''; // 恢復頁面滾動
    if (typeof trackEvent === 'function') {
      trackEvent('age_verification', 'confirm');
    }
  });
  
  ageDenyBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
    if (typeof trackEvent === 'function') {
      trackEvent('age_verification', 'deny');
    }
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

/**
 * 初始化 Instagram 詢問按鈕功能
 */
function initializeIgInquiryButton() {
  const igInquiryBtn = document.getElementById('igInquiryBtn');
  const igConfirmModal = document.getElementById('igConfirmModal');
  const igConfirmBtn = document.getElementById('igConfirmBtn');
  const igCancelBtn = document.getElementById('igCancelBtn');
  
  if (!igInquiryBtn || !igConfirmModal || !igConfirmBtn || !igCancelBtn) return;
  
  // 添加抖動和發光效果
  const addShakeEffect = () => {
    igInquiryBtn.classList.add('shake');
    setTimeout(() => {
      igInquiryBtn.classList.remove('shake');
    }, 1000);
  };
  
  // 每30秒抖動一次
  setInterval(addShakeEffect, 30000);
  
  // 初始抖動（延遲5秒後開始）
  setTimeout(addShakeEffect, 5000);
  
  // 儲存目標 URL
  let targetUrl = '';
  
  // 添加點擊事件，顯示自定義確認提示
  igInquiryBtn.addEventListener('click', function(e) {
    e.preventDefault();
    targetUrl = this.getAttribute('href') || '';
    
    if (targetUrl) {
      // 顯示自定義確認對話框
      igConfirmModal.style.display = 'flex';
      // 使用 setTimeout 確保 display:flex 應用後再添加 show 類
      setTimeout(() => {
        igConfirmModal.classList.add('show');
      }, 10);
      document.body.style.overflow = 'hidden'; // 防止頁面滾動
      
      // 追蹤事件
      if (typeof trackEvent === 'function') {
        trackEvent('contact', 'click_instagram_button');
      }
    }
  });
  
  // 封裝關閉對話框的邏輯
  const closeModal = () => {
    igConfirmModal.classList.remove('show');
    // 等待過渡動畫完成後再隱藏對話框
    setTimeout(() => {
      igConfirmModal.style.display = 'none';
      document.body.style.overflow = ''; // 恢復頁面滾動
    }, 300);
  };
  
  // 確認按鈕點擊事件
  igConfirmBtn.addEventListener('click', () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank');
      if (typeof trackEvent === 'function') {
        trackEvent('contact', 'confirm_instagram_redirect');
      }
    }
    closeModal();
  });
  
  // 取消按鈕點擊事件
  igCancelBtn.addEventListener('click', () => {
    closeModal();
    if (typeof trackEvent === 'function') {
      trackEvent('contact', 'cancel_instagram_redirect');
    }
  });
  
  // 點擊背景關閉
  igConfirmModal.addEventListener('click', (e) => {
    if (e.target === igConfirmModal) {
      closeModal();
      if (typeof trackEvent === 'function') {
        trackEvent('contact', 'cancel_instagram_redirect');
      }
    }
  });
}

/**
 * 初始化關於我們區塊的圖片輪播
 */
function initializeAboutSlider() {
  const slides = document.querySelectorAll('.about-slide');
  const dots = document.querySelectorAll('.about-slider-dot');
  if (!slides.length || !dots.length) return;
  
  let currentSlide = 0;
  let slideInterval: number;
  
  // 顯示特定幻燈片
  const showSlide = (index: number) => {
    // 移除所有幻燈片的顯示狀態
    slides.forEach(slide => {
      (slide as HTMLElement).style.opacity = '0';
    });
    
    // 移除所有指示點的激活狀態
    dots.forEach(dot => {
      dot.classList.remove('active');
      (dot as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.5)';
    });
    
    // 顯示目前幻燈片並激活對應指示點
    (slides[index] as HTMLElement).style.opacity = '1';
    dots[index].classList.add('active');
    (dots[index] as HTMLElement).style.backgroundColor = '#fff';
    
    currentSlide = index;
  };
  
  // 顯示下一張幻燈片
  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  };
  
  // 啟動自動輪播
  const startSlideTimer = () => {
    slideInterval = window.setInterval(nextSlide, 5000);
  };
  
  // 停止自動輪播
  const stopSlideTimer = () => {
    clearInterval(slideInterval);
  };
  
  // 點擊指示點切換幻燈片
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopSlideTimer(); // 停止自動輪播
      showSlide(index); // 顯示所點擊的幻燈片
      startSlideTimer(); // 重新啟動自動輪播
    });
  });
  
  // 初始狀態：顯示第一張幻燈片並啟動自動輪播
  showSlide(0);
  startSlideTimer();
}

/**
 * 初始化 FAQ
 */
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqContactLink = document.getElementById('faqContactLink');
  const igInquiryBtn = document.getElementById('igInquiryBtn');
  const openFaqBtn = document.getElementById('openFaqBtn');
  const faqModal = document.getElementById('faqModal');
  const closeFaqBtn = document.getElementById('closeFaqBtn');
  const faqContactBtn = document.querySelector('#faqModal .btn-primary.btn-lg');
  
  // 設置打開 FAQ 彈窗事件
  if (openFaqBtn && faqModal) {
    openFaqBtn.addEventListener('click', () => {
      faqModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // 防止頁面滾動
      
      // 使用 setTimeout 確保 display:flex 應用後再添加過渡效果
      setTimeout(() => {
        faqModal.classList.add('show');
      }, 10);
      
      // 追蹤事件
      if (typeof trackEvent === 'function') {
        trackEvent('faq', 'open_faq_modal');
      }
    });
  }
  
  // 設置關閉 FAQ 彈窗事件
  if (closeFaqBtn && faqModal) {
    // 封裝關閉彈窗的邏輯
    const closeFaqModal = () => {
      faqModal.classList.remove('show');
      // 等待過渡動畫完成後再隱藏彈窗
      setTimeout(() => {
        faqModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢復頁面滾動
      }, 300);
    };
    
    // 關閉按鈕點擊事件
    closeFaqBtn.addEventListener('click', () => {
      closeFaqModal();
      if (typeof trackEvent === 'function') {
        trackEvent('faq', 'close_faq_modal');
      }
    });
    
    // 點擊彈窗背景關閉
    faqModal.addEventListener('click', (e) => {
      if (e.target === faqModal) {
        closeFaqModal();
        if (typeof trackEvent === 'function') {
          trackEvent('faq', 'close_faq_background_click');
        }
      }
    });
    
    // ESC 鍵關閉彈窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && faqModal.style.display === 'flex') {
        closeFaqModal();
        if (typeof trackEvent === 'function') {
          trackEvent('faq', 'close_faq_escape_key');
        }
      }
    });
    
    // 設置「有其他問題？聯絡我們」按鈕點擊事件
    if (faqContactBtn) {
      faqContactBtn.addEventListener('click', () => {
        closeFaqModal();
        if (typeof trackEvent === 'function') {
          trackEvent('faq', 'contact_us_from_faq');
        }
      });
    }
  }
  
  // 設置 FAQ 項目點擊事件
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      // 檢查是否已經處於活動狀態
      const isActive = item.classList.contains('active');
      
      // 關閉所有其他 FAQ 項目
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // 切換當前 FAQ 項目的狀態
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
        
        // 滾動到視圖中（如果需要）
        setTimeout(() => {
          const rect = item.getBoundingClientRect();
          const isVisible = (
            rect.top >= 0 &&
            rect.bottom <= window.innerHeight
          );
          
          if (!isVisible && faqModal && faqModal.style.display === 'flex') {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 300);
      }
      
      // 追蹤事件
      if (typeof trackEvent === 'function') {
        trackEvent('faq', 'toggle_faq_item', question.textContent || '');
      }
    });
  });
  
  // 設置「私訊洽談」連結
  if (faqContactLink && igInquiryBtn) {
    faqContactLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 如果 FAQ 彈窗打開中，先關閉
      if (faqModal && faqModal.style.display === 'flex') {
        faqModal.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      // 滾動到頁面底部
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      
      // 突出顯示 Instagram 按鈕
      setTimeout(() => {
        igInquiryBtn.classList.add('pulse-highlight');
        
        // 3秒後移除高亮效果
        setTimeout(() => {
          igInquiryBtn.classList.remove('pulse-highlight');
        }, 3000);
      }, 800);
      
      // 追蹤事件
      if (typeof trackEvent === 'function') {
        trackEvent('faq', 'click_private_message');
      }
    });
  }
} 