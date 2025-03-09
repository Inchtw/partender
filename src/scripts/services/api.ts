import { ApiResponse, ContactFormData, GalleryItem, ServiceItem, TestimonialItem } from '../types';

// API 基礎 URL
const API_BASE_URL = '/api';

// 通用 fetch 函數
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API 請求失敗: ${response.status}`);
    }

    const data = await response.json();
    return data as ApiResponse<T>;
  } catch (error) {
    console.error('API 請求錯誤:', error);
    return {
      success: false,
      data: null as unknown as T,
      message: error instanceof Error ? error.message : '未知錯誤',
    };
  }
}

// 獲取服務項目
export async function getServices(): Promise<ServiceItem[]> {
  const response = await fetchApi<ServiceItem[]>('/services');
  return response.success ? response.data : [];
}

// 獲取畫廊項目
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const response = await fetchApi<GalleryItem[]>('/gallery');
  return response.success ? response.data : [];
}

// 獲取評價
export async function getTestimonials(): Promise<TestimonialItem[]> {
  const response = await fetchApi<TestimonialItem[]>('/testimonials');
  return response.success ? response.data : [];
}

// 提交聯絡表單
export async function submitContactForm(formData: ContactFormData): Promise<boolean> {
  const response = await fetchApi<{ success: boolean }>('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  
  return response.success;
}

// 獲取網站配置
export async function getSiteConfig() {
  const response = await fetchApi<any>('/config');
  return response.success ? response.data : null;
}

// 模擬數據 (開發階段使用)
export const mockServices: ServiceItem[] = [
  {
    id: '1',
    title: '私人派對調酒',
    description: '為您的生日、週年慶或家庭聚會提供客製化調酒服務，打造獨特的派對體驗。',
    icon: 'cocktail',
  },
  {
    id: '2',
    title: '企業活動調酒',
    description: '為企業年會、產品發表會或客戶答謝會提供專業調酒服務，提升活動品質與格調。',
    icon: 'briefcase',
  },
  {
    id: '3',
    title: '預調服務',
    description: '提供方便的預調選項，premix + 基酒 + 冰塊即獲得好喝的調酒，讓您隨時隨地享受專業調酒。',
    icon: 'flask',
  },
];

export const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: '威士忌煙燻',
    description: '傳統經典，煙燻風味',
    imageUrl: '/assets/images/gallery/whiskey.jpg',
    category: '經典調酒',
  },
  {
    id: '2',
    title: '夏日莓果',
    description: '清爽果香，完美夏日',
    imageUrl: '/assets/images/gallery/summer.jpg',
    category: '創意調酒',
  },
  {
    id: '3',
    title: '熱帶風情',
    description: '朗姆為基底，異國情調',
    imageUrl: '/assets/images/gallery/tropical.jpg',
    category: '主題派對',
  },
  {
    id: '4',
    title: '企業派對',
    description: '量身定制，品牌專屬',
    imageUrl: '/assets/images/gallery/corporate.jpg',
    category: '企業活動',
  },
  {
    id: '5',
    title: '分子雲霧',
    description: '科技與藝術的結合',
    imageUrl: '/assets/images/gallery/molecular.jpg',
    category: '分子調酒',
  },
  {
    id: '6',
    title: '無酒精特調',
    description: '同樣精彩，無需酒精',
    imageUrl: '/assets/images/gallery/non-alcoholic.jpg',
    category: '無酒精調飲',
  },
]; 