// 類型定義

// 導航項目類型
export interface NavItem {
  id: string;
  label: string;
  url: string;
}

// 服務項目類型
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// 畫廊項目類型
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

// 計數器項目類型
export interface CounterItem {
  id: string;
  value: number;
  label: string;
}

// 評價項目類型
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

// API 響應類型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 聯絡表單數據類型
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// 應用程序配置類型
export interface AppConfig {
  apiBaseUrl: string;
  siteName: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
} 