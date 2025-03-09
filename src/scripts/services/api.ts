import { ApiResponse, ContactFormData, GalleryItem, ServiceItem, TestimonialItem } from '../types';

// API 基礎 URL - 保留供未來實際API整合使用
// 使用 export 導出以避免未使用警告
export const API_BASE_URL = '/api';

// 保留一個示例函數，使用 ApiResponse 類型，但標記為未使用
// 這樣可以避免 TypeScript 警告
/**
 * 示例API請求函數 - 僅用於類型示例，實際未使用
 * @example
 * // 未來使用示例:
 * const response = await exampleApiCall<UserData>('/users');
 * if (response.success) {
 *   const userData = response.data;
 * }
 */
export async function exampleApiCall<T>(endpoint: string): Promise<ApiResponse<T>> {
  // 這個函數僅作為類型示例，實際不會被調用
  // 但由於它被導出，TypeScript 不會警告它未被使用
  console.log(`將來會調用 API: ${API_BASE_URL}${endpoint}`);
  return {
    success: true,
    data: {} as T,
    message: '示例響應'
  };
}

// 服務項目 API
export async function getServices(): Promise<ServiceItem[]> {
  // 在實際項目中，這裡會調用真實的 API
  // 目前使用模擬數據
  return mockServices;
}

// 畫廊項目 API
export async function getGalleryItems(): Promise<GalleryItem[]> {
  // 在實際項目中，這裡會調用真實的 API
  // 目前使用模擬數據
  return mockGalleryItems;
}

// 顧客評價 API
export async function getTestimonials(): Promise<TestimonialItem[]> {
  // 在實際項目中，這裡會調用真實的 API
  // 目前使用模擬數據
  return mockTestimonials;
}

// 提交聯絡表單 API
export async function submitContactForm(formData: ContactFormData): Promise<boolean> {
  try {
    // 在實際項目中，這裡會調用真實的 API
    // 目前模擬成功響應
    console.log('提交表單數據:', formData);
    return true;
  } catch (error) {
    console.error('提交表單錯誤:', error);
    return false;
  }
}

// 獲取網站配置 API
export async function getSiteConfig() {
  // 在實際項目中，這裡會調用真實的 API
  // 目前使用模擬數據
  return {
    siteName: 'Partender',
    contactEmail: 'info@partender.tw',
    socialLinks: {
      facebook: 'https://facebook.com/partender',
      instagram: 'https://instagram.com/partender.tw',
      line: 'https://line.me/partender'
    }
  };
}

// 模擬數據
export const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: '經典調酒展示',
    description: '我們的專業調酒師展示經典雞尾酒製作技巧',
    imageUrl: 'assets/images/gallery/cocktail1.jpg',
    category: 'special'
  },
  {
    id: '2',
    title: '企業活動調酒',
    description: '為科技公司年度慶典提供的特色調酒服務',
    imageUrl: 'assets/images/gallery/corporate1.jpg',
    category: 'corporate'
  },
  {
    id: '3',
    title: '婚禮調酒吧台',
    description: '為婚禮設計的精美調酒吧台，提供客製化雞尾酒',
    imageUrl: 'assets/images/gallery/wedding1.jpg',
    category: 'wedding'
  },
  {
    id: '4',
    title: '私人派對調酒',
    description: '為私人生日派對提供的調酒服務',
    imageUrl: 'assets/images/gallery/party1.jpg',
    category: 'private'
  },
  {
    id: '5',
    title: '分子調酒展示',
    description: '使用液態氮和特殊技術的分子調酒展示',
    imageUrl: 'assets/images/gallery/special1.jpg',
    category: 'special'
  },
  {
    id: '6',
    title: '企業品牌調酒',
    description: '為企業品牌活動定制的特色雞尾酒',
    imageUrl: 'assets/images/gallery/corporate2.jpg',
    category: 'corporate'
  },
  {
    id: '7',
    title: '戶外婚禮調酒',
    description: '在海灘舉行的戶外婚禮調酒服務',
    imageUrl: 'assets/images/gallery/wedding2.jpg',
    category: 'wedding'
  },
  {
    id: '8',
    title: '雞尾酒工作坊',
    description: '互動式雞尾酒製作工作坊，適合團隊建設活動',
    imageUrl: 'assets/images/gallery/workshop1.jpg',
    category: 'corporate'
  },
  {
    id: '9',
    title: '創意雞尾酒',
    description: '使用新鮮水果和香草製作的創意雞尾酒',
    imageUrl: 'assets/images/gallery/cocktail2.jpg',
    category: 'special'
  }
];

export const mockServices: ServiceItem[] = [
  {
    id: '1',
    title: '企業活動調酒',
    description: '為企業年會、產品發布會、客戶答謝會等活動提供專業調酒服務，可根據企業品牌定制特色雞尾酒。',
    icon: 'building'
  },
  {
    id: '2',
    title: '婚禮調酒服務',
    description: '為婚禮提供專業調酒師和精美吧台設計，根據新人喜好定制特色雞尾酒菜單，為婚禮增添獨特風味。',
    icon: 'glass-cheers'
  },
  {
    id: '3',
    title: '私人派對調酒',
    description: '為生日派對、家庭聚會、朋友聚會等私人活動提供調酒服務，讓您的派對更加精彩難忘。',
    icon: 'user-friends'
  },
  {
    id: '4',
    title: '調酒課程與工作坊',
    description: '提供專業調酒課程和互動式工作坊，適合團隊建設、生日派對或朋友聚會，學習調酒技巧的同時享受樂趣。',
    icon: 'chalkboard-teacher'
  },
  {
    id: '5',
    title: '分子調酒表演',
    description: '使用液態氮、煙霧等特殊效果的分子調酒表演，為您的活動增添視覺震撼和話題性。',
    icon: 'flask'
  },
  {
    id: '6',
    title: '客製化雞尾酒設計',
    description: '根據您的喜好、活動主題或品牌形象，定制獨特的雞尾酒配方和呈現方式。',
    icon: 'magic'
  }
];

export const mockTestimonials = [
  {
    id: '1',
    name: '陳小姐',
    role: '生日派對',
    content: 'Partender 的調酒真的超好喝！完全顛覆了我對派對酒的印象，朋友們都讚不絕口，下次派對一定還會找他們。',
    avatarUrl: 'assets/images/testimonials/avatar1.jpg'
  },
  {
    id: '2',
    name: '林先生',
    role: '企業年會',
    content: '我們公司年會請了 Partender 團隊，他們的專業度和創意都讓人印象深刻，調製的酸甜特調非常受同事歡迎，強烈推薦！',
    avatarUrl: 'assets/images/testimonials/avatar2.jpg'
  },
  {
    id: '3',
    name: '王小姐',
    role: '婚禮',
    content: '在我們的婚禮上，Partender 提供的調酒服務讓賓客印象深刻，特別是為我們量身定制的「愛情特調」，非常感謝他們為我們的大日子增添色彩。',
    avatarUrl: 'assets/images/testimonials/avatar3.jpg'
  }
];

export default {
  getServices,
  getGalleryItems,
  getTestimonials,
  submitContactForm,
  getSiteConfig,
  mockGalleryItems,
  mockServices,
  mockTestimonials
}; 