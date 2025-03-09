/**
 * API 服務模擬數據
 * 在實際項目中，這些數據會從後端 API 獲取
 */

// 畫廊項目數據
export const mockGalleryItems = [
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

// 服務項目數據
export const mockServices = [
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

/**
 * 模擬獲取畫廊數據的 API 請求
 * @returns {Promise<Array>} 畫廊項目數據
 */
export async function fetchGalleryItems() {
  // 模擬網絡請求延遲
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockGalleryItems);
    }, 500);
  });
}

/**
 * 模擬獲取服務項目數據的 API 請求
 * @returns {Promise<Array>} 服務項目數據
 */
export async function fetchServices() {
  // 模擬網絡請求延遲
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockServices);
    }, 500);
  });
}

/**
 * 模擬提交聯絡表單的 API 請求
 * @param {Object} formData 表單數據
 * @returns {Promise<Object>} 提交結果
 */
export async function submitContactForm(formData) {
  // 模擬網絡請求延遲
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模擬 90% 的成功率
      if (Math.random() < 0.9) {
        resolve({
          success: true,
          message: '表單提交成功！我們將盡快與您聯繫。'
        });
      } else {
        reject({
          success: false,
          message: '表單提交失敗，請稍後再試。'
        });
      }
    }, 800);
  });
}

export default {
  fetchGalleryItems,
  fetchServices,
  submitContactForm,
  mockGalleryItems,
  mockServices
}; 