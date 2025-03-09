// 會員系統組件

import { loginUser, registerUser, logoutUser, getCurrentUser, getUserBookings } from '../services/firebase';
import { trackEvent } from '../services/analytics';

// DOM 元素
const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
const loginModal = document.getElementById('loginModal') as HTMLDivElement;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const registerForm = document.getElementById('registerForm') as HTMLFormElement;
const tabBtns = document.querySelectorAll('.tab-btn');
const loginTab = document.getElementById('loginTab') as HTMLDivElement;
const registerTab = document.getElementById('registerTab') as HTMLDivElement;
const modalClose = document.querySelector('.modal-close') as HTMLButtonElement;
const memberSection = document.getElementById('member') as HTMLElement;
const memberName = document.getElementById('memberName') as HTMLElement;
const bookingsList = document.getElementById('bookingsList') as HTMLElement;
const bookingCount = document.getElementById('bookingCount') as HTMLElement;
const pointsCount = document.getElementById('pointsCount') as HTMLElement;
const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;

// 初始化會員系統
export async function initAuth(): Promise<void> {
  setupEventListeners();
  await checkAuthState();
}

// 設置事件監聽器
function setupEventListeners(): void {
  // 登入按鈕點擊
  loginBtn?.addEventListener('click', () => {
    loginModal.style.display = 'flex';
    trackEvent('auth', 'open_login_modal');
  });
  
  // 關閉模態框
  modalClose?.addEventListener('click', () => {
    loginModal.style.display = 'none';
    trackEvent('auth', 'close_login_modal');
  });
  
  // 切換標籤
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      
      // 更新活動標籤
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 顯示相應的標籤內容
      if (tab === 'login') {
        loginTab.style.display = 'block';
        registerTab.style.display = 'none';
        trackEvent('auth', 'switch_to_login_tab');
      } else if (tab === 'register') {
        loginTab.style.display = 'none';
        registerTab.style.display = 'block';
        trackEvent('auth', 'switch_to_register_tab');
      }
    });
  });
  
  // 登入表單提交
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById('loginEmail') as HTMLInputElement;
    const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;
    
    try {
      await loginUser(emailInput.value, passwordInput.value);
      loginModal.style.display = 'none';
      await checkAuthState();
      trackEvent('auth', 'login_success');
    } catch (error) {
      console.error('登入失敗:', error);
      alert('登入失敗，請檢查您的電子郵件和密碼。');
      trackEvent('auth', 'login_error');
    }
  });
  
  // 註冊表單提交
  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单输入
    const emailInput = document.getElementById('registerEmail') as HTMLInputElement;
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('registerConfirmPassword') as HTMLInputElement;
    
    // 檢查密碼是否匹配
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert('密碼不匹配，請重新輸入。');
      return;
    }
    
    try {
      await registerUser(emailInput.value, passwordInput.value);
      loginModal.style.display = 'none';
      await checkAuthState();
      trackEvent('auth', 'register_success');
    } catch (error) {
      console.error('註冊失敗:', error);
      alert('註冊失敗，請稍後再試。');
      trackEvent('auth', 'register_error');
    }
  });
  
  // 登出按鈕點擊
  logoutBtn?.addEventListener('click', async () => {
    try {
      await logoutUser();
      memberSection.style.display = 'none';
      loginBtn.style.display = 'block';
      trackEvent('auth', 'logout');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  });
}

// 檢查認證狀態
async function checkAuthState(): Promise<void> {
  try {
    const user = await getCurrentUser();
    
    if (user) {
      // 用戶已登入
      loginBtn.style.display = 'none';
      memberSection.style.display = 'block';
      memberName.textContent = user.displayName || user.email?.split('@')[0] || '會員';
      
      // 獲取用戶預約
      await loadUserBookings(user.uid);
      
      // 設置會員點數（示例）
      pointsCount.textContent = '150';
      
      trackEvent('auth', 'user_authenticated');
    } else {
      // 用戶未登入
      loginBtn.style.display = 'block';
      memberSection.style.display = 'none';
    }
  } catch (error) {
    console.error('檢查認證狀態失敗:', error);
  }
}

// 加載用戶預約
async function loadUserBookings(userId: string): Promise<void> {
  try {
    const bookings = await getUserBookings(userId);
    
    if (bookings.length === 0) {
      bookingsList.innerHTML = '<p class="no-bookings">您目前沒有預約記錄。</p>';
      bookingCount.textContent = '0';
      return;
    }
    
    bookingCount.textContent = bookings.length.toString();
    
    // 渲染預約列表
    bookingsList.innerHTML = bookings.map(booking => `
      <div class="booking-item">
        <div class="booking-info">
          <h4 class="booking-title">${booking.serviceType} - ${booking.guestCount}人</h4>
          <p class="booking-date">${formatDate(booking.date)}</p>
        </div>
        <span class="booking-status status-${booking.status.toLowerCase()}">${getStatusText(booking.status)}</span>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('加載用戶預約失敗:', error);
    bookingsList.innerHTML = '<p class="no-bookings">無法加載預約記錄。</p>';
  }
}

// 格式化日期
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 獲取狀態文本
function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return '已確認';
    case 'pending':
      return '待確認';
    case 'cancelled':
      return '已取消';
    default:
      return status;
  }
} 