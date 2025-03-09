// 主要 JavaScript 文件
import { initTestimonials } from './components/testimonials.js';

// DOM 元素
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const backToTopBtn = document.getElementById('backToTop');
const ageModal = document.getElementById('ageVerificationModal');
const ageConfirmBtn = document.getElementById('ageConfirmBtn');
const ageDenyBtn = document.getElementById('ageDenyBtn');

// 初始化函數
function init() {
  setupNavbar();
  setupMobileMenu();
  setupScrollEvents();
  setupAgeVerification();
  setupBackToTop();
  setupGalleryFilter();
  updateCopyrightYear();
  
  // 初始化評價區域
  initTestimonials('testimonials');
}

// 設置導航欄
function setupNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 設置移動端菜單
function setupMobileMenu() {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // 點擊導航鏈接後關閉菜單
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

// 設置滾動事件
function setupScrollEvents() {
  // 滾動到視圖中的元素動畫
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// 設置年齡驗證
function setupAgeVerification() {
  if (!ageModal || !ageConfirmBtn || !ageDenyBtn) return;
  
  // 檢查 localStorage
  if (!localStorage.getItem('ageVerified')) {
    ageModal.classList.add('active');
  }
  
  ageConfirmBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageModal.classList.remove('active');
  });
  
  ageDenyBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
}

// 設置返回頂部按鈕
function setupBackToTop() {
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 設置畫廊過濾
function setupGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!filterBtns.length || !galleryItems.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 移除所有按鈕的活動狀態
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // 添加當前按鈕的活動狀態
      btn.classList.add('active');
      
      // 獲取過濾類別
      const filterValue = btn.getAttribute('data-filter');
      
      // 過濾畫廊項目
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// 更新版權年份
function updateCopyrightYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// 頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', init); 