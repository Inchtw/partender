/**
 * 圖庫過濾器功能
 */

/**
 * 設置圖庫過濾器
 */
export function setupGalleryFilter(): void {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!filterButtons.length || !galleryItems.length) return;
  
  // 為每個過濾按鈕添加點擊事件
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 獲取過濾類別
      const filterValue = button.getAttribute('data-filter');
      
      // 移除所有按鈕的活動狀態
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // 添加當前按鈕的活動狀態
      button.classList.add('active');
      
      // 過濾圖庫項目
      galleryItems.forEach(item => {
        if (filterValue === 'all') {
          item.classList.remove('hidden');
        } else {
          const itemCategory = item.getAttribute('data-category');
          if (itemCategory === filterValue) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        }
      });
    });
  });
} 