import { trackEvent } from '../services/analytics';

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

// 模擬評價數據
export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: '王小明',
    position: '活動總監',
    company: '創意活動策劃公司',
    avatar: 'assets/images/testimonials/avatar1.jpg',
    text: 'Partender 的調酒師不僅專業，而且非常有創意。他們為我們的公司年會設計的特色雞尾酒讓所有賓客印象深刻。服務態度也非常好，強烈推薦！',
    rating: 5
  },
  {
    id: '2',
    name: '林美玲',
    position: '婚禮策劃師',
    company: '幸福婚禮',
    avatar: 'assets/images/testimonials/avatar2.jpg',
    text: '我們合作過多次婚禮活動，每次 Partender 都能根據新人的喜好定制完美的酒單。他們的調酒師不僅技術一流，還能與賓客互動，為婚禮增添了很多樂趣。',
    rating: 5
  },
  {
    id: '3',
    name: '陳志強',
    position: '市場經理',
    company: '科技新創公司',
    avatar: 'assets/images/testimonials/avatar3.jpg',
    text: '我們的產品發布會選擇了 Partender 的調酒服務，他們的分子調酒展示環節成為了活動的亮點，許多媒體都對此進行了報導。非常專業的團隊！',
    rating: 4
  },
  {
    id: '4',
    name: '張雅琪',
    position: '私人派對主人',
    company: '',
    avatar: 'assets/images/testimonials/avatar4.jpg',
    text: '為我的生日派對請了 Partender 的調酒師，他們不僅帶來了專業的設備，還根據我的喜好定制了特色雞尾酒。朋友們都玩得很開心，下次還會再請他們！',
    rating: 5
  },
  {
    id: '5',
    name: '李俊宏',
    position: '餐廳經理',
    company: '海灣餐廳',
    avatar: 'assets/images/testimonials/avatar5.jpg',
    text: '我們餐廳的特別活動週邀請了 Partender 的調酒師，他們為我們設計的特色雞尾酒菜單大受歡迎，不少客人專門為此而來。合作非常愉快！',
    rating: 4
  }
];

/**
 * 渲染顧客評價到指定容器
 * @param containerId 容器ID
 * @param testimonials 評價數據
 */
export function renderTestimonials(containerId: string, testimonials: Testimonial[] = mockTestimonials): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 創建評價滑塊容器
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'testimonials-slider';
  
  // 添加評價卡片
  testimonials.forEach(testimonial => {
    const card = createTestimonialCard(testimonial);
    sliderContainer.appendChild(card);
  });
  
  // 添加導航按鈕
  const prevButton = document.createElement('button');
  prevButton.className = 'testimonial-nav prev';
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.setAttribute('aria-label', '上一個評價');
  
  const nextButton = document.createElement('button');
  nextButton.className = 'testimonial-nav next';
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.setAttribute('aria-label', '下一個評價');
  
  // 清空容器並添加元素
  container.innerHTML = '';
  container.appendChild(prevButton);
  container.appendChild(sliderContainer);
  container.appendChild(nextButton);
  
  // 設置滑動功能
  setupSlider(sliderContainer, prevButton, nextButton);
}

/**
 * 創建單個評價卡片
 * @param testimonial 評價數據
 * @returns HTMLElement
 */
function createTestimonialCard(testimonial: Testimonial): HTMLElement {
  const card = document.createElement('div');
  card.className = 'testimonial-item';
  card.setAttribute('data-id', testimonial.id);
  
  // 創建星級評分
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= testimonial.rating) {
      starsHtml += '<i class="fas fa-star"></i>';
    } else {
      starsHtml += '<i class="far fa-star"></i>';
    }
  }
  
  // 設置卡片內容
  card.innerHTML = `
    <div class="testimonial-content">
      <div class="testimonial-header">
        <div class="testimonial-avatar">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" loading="lazy">
        </div>
        <div class="testimonial-info">
          <h4 class="testimonial-name">${testimonial.name}</h4>
          <p class="testimonial-position">${testimonial.position}${testimonial.company ? ` - ${testimonial.company}` : ''}</p>
          <div class="testimonial-rating">${starsHtml}</div>
        </div>
      </div>
      <div class="testimonial-text">
        <p>${testimonial.text}</p>
      </div>
    </div>
  `;
  
  // 添加點擊事件
  card.addEventListener('click', () => {
    trackEvent('testimonial', 'click', testimonial.name);
  });
  
  return card;
}

/**
 * 設置評價滑塊功能
 * @param sliderContainer 滑塊容器
 * @param prevButton 上一個按鈕
 * @param nextButton 下一個按鈕
 */
function setupSlider(sliderContainer: HTMLElement, prevButton: HTMLButtonElement, nextButton: HTMLButtonElement): void {
  let currentPosition = 0;
  const cardWidth = 300; // 卡片寬度 + 間距
  const visibleCards = Math.floor(sliderContainer.offsetWidth / cardWidth);
  const totalCards = sliderContainer.children.length;
  const maxPosition = Math.max(0, totalCards - visibleCards);
  
  // 更新滑塊位置
  const updateSliderPosition = () => {
    sliderContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    
    // 更新按鈕狀態
    prevButton.disabled = currentPosition <= 0;
    nextButton.disabled = currentPosition >= maxPosition;
    
    // 添加視覺反饋
    prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
    nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
  };
  
  // 初始化位置
  updateSliderPosition();
  
  // 添加按鈕事件
  prevButton.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition--;
      updateSliderPosition();
      trackEvent('testimonial', 'navigation', 'prev');
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentPosition < maxPosition) {
      currentPosition++;
      updateSliderPosition();
      trackEvent('testimonial', 'navigation', 'next');
    }
  });
  
  // 添加觸摸滑動支持
  let startX: number;
  let isDragging = false;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    // 防止過度滑動
    if ((diff > 0 && currentPosition < maxPosition) || 
        (diff < 0 && currentPosition > 0)) {
      // 添加一些阻力，使滑動感覺更自然
      sliderContainer.style.transform = `translateX(-${currentPosition * cardWidth + diff * 0.5}px)`;
    }
  });
  
  sliderContainer.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const currentX = e.changedTouches[0].clientX;
    const diff = startX - currentX;
    
    // 如果滑動距離足夠大，則切換卡片
    if (Math.abs(diff) > cardWidth / 3) {
      if (diff > 0 && currentPosition < maxPosition) {
        currentPosition++;
        trackEvent('testimonial', 'swipe', 'next');
      } else if (diff < 0 && currentPosition > 0) {
        currentPosition--;
        trackEvent('testimonial', 'swipe', 'prev');
      }
    }
    
    // 重置位置
    updateSliderPosition();
  });
  
  // 添加窗口調整大小事件
  window.addEventListener('resize', () => {
    // 重新計算可見卡片數量
    const newVisibleCards = Math.floor(sliderContainer.offsetWidth / cardWidth);
    const newMaxPosition = Math.max(0, totalCards - newVisibleCards);
    
    // 調整當前位置
    if (currentPosition > newMaxPosition) {
      currentPosition = newMaxPosition;
    }
    
    updateSliderPosition();
  });
  
  // 設置卡片懸停展開效果
  setupCardHoverEffect(sliderContainer);
}

/**
 * 設置卡片懸停展開效果
 * @param container 容器元素
 */
function setupCardHoverEffect(container: HTMLElement): void {
  const cards = container.querySelectorAll('.testimonial-item');
  
  cards.forEach(card => {
    const content = card.querySelector('.testimonial-content') as HTMLElement;
    const text = card.querySelector('.testimonial-text') as HTMLElement;
    
    if (content && text) {
      // 等待DOM完全渲染後獲取高度
      setTimeout(() => {
        // 設置初始高度
        const originalHeight = content.scrollHeight;
        const collapsedHeight = originalHeight - text.scrollHeight + 20; // 添加一些額外空間
        
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
        card.addEventListener('mouseenter', expandContent);
        card.addEventListener('mouseleave', collapseContent);
        card.addEventListener('click', () => {
          if (parseInt(content.style.height) >= originalHeight) {
            collapseContent();
          } else {
            expandContent();
          }
        });
      }, 100);
    }
  });
}

/**
 * 初始化評價區域
 * @param containerId 容器ID
 */
export function initTestimonials(containerId: string = 'testimonials'): void {
  renderTestimonials(containerId);
}

export default {
  initTestimonials,
  renderTestimonials,
  mockTestimonials
}; 