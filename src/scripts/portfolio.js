/**
 * 作品展示功能
 * 實現分類標籤的篩選功能和作品詳情彈出層
 */

// 作品數據
const portfolioData = [
  {
    id: 1,
    title: '高貴喜氣',
    category: '作品',
    description: '高貴喜氣是我們的明星之作，結合精緻紅茶茶酒與西瓜利口酒，融入傳統中式元素的桂圓紅棗。這款雞尾酒呈現出誘人的紅色漸層，第一口便能感受到茶香與西瓜的清甜，而桂圓紅棗則帶來意外的暖心尾韻。每次品嚐都能發現新的層次，是慶典、婚宴的理想選擇，更成為我們的招牌飲品。',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676358/03_libspk.jpg',
    gallery: [],
    isFamous: true
  },
  {
    id: 2,
    title: '壞心情百掰 - Della',
    category: '作品',
    description: '壞心情百掰是一款能瞬間驅散憂鬱的療癒系飲品。以清新的綠茶茶酒為基底，搭配熱帶風情的百香果汁，每一口都充滿陽光的味道。綠茶的草本香氣與百香果的酸甜完美平衡，讓人忍不住會心一笑。這款看似簡單卻永遠不過時的經典配方，是放鬆時刻的最佳伴侶，也是我們最受歡迎的夏季特飲。至於 Della 是誰？ 他的 Farewell party 誕生的酒款，歡迎找我們訂製專屬雞尾酒，說不定就有一款以你命名的調酒囉',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676358/06_qs6wpa.jpg',
    gallery: []
  },
  {
    id: 3,
    title: '玫觀係',
    category: '作品',
    description: '玫觀係是 Partender 的前三名經典作品，巧妙結合了鐵觀音茶酒的獨特韻味，與莓果和玫瑰利口酒的浪漫氣息。淺飲一口，先是感受到鐵觀音的醇厚茶香，隨後是莓果的甜美與玫瑰的芬芳，層次豐富且回味無窮。絕對是您不容錯過的選擇！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676358/07_zfebka.jpg',
    gallery: [],
    isFamous: true
  },
  {
    id: 4,
    title: '薈快樂芭',
    category: '作品',
    description: '薈快樂芭是一款令人驚艷的創新組合，將芭樂與清爽的蘆薈完美融合，創造出前所未有的口感體驗。蘆薈跟芭樂？想不到芭！每一口都令人耳目一新。這款神秘的組合已迅速成為Partender的前三名經典作品！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676357/08_u7rzft.jpg',
    gallery: [
      {
        image: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676356/04_cz6pbx.jpg',
        caption: '薈快樂芭 - 特寫'
      }
    ],
    isFamous: true
  },
  {
    id: 5,
    title: '迎賓酒設計',
    category: '作品',
    description: '我們的迎賓酒設計服務為您的特別場合增添專屬風格。這款精美的迎賓小贈品樣酒不僅是一種飲品，更是一種體驗與回憶。我們根據您的活動主題、色彩方案和口味偏好，量身打造獨一無二的迎賓酒，為賓客留下深刻印象。無論是企業活動、婚禮還是生日派對，這些個性化的小瓶裝雞尾酒都是理想的伴手禮。歡迎私訊討論，讓我們一起為您的活動創造獨特的迎賓體驗！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676354/01_xudgqd.jpg',
    gallery: []
  },
  {
    id: 6,
    title: '啡茶',
    category: '作品',
    description: '美酒配咖啡的選作，茶的清雅與咖啡香氣相互輝映，歡迎來客製茶種與咖啡品項',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676352/02_bqzu3h.jpg',
    gallery: []
  },
  {
    id: 7,
    title: '你的眼睛',
    category: '作品',
    description: '「你的眼睛」是一款如其名般令人難以忘懷的雞尾酒，被譽為Partender前三名的經典作品。以青茶酒為基底，融入蘋果汁，創造出清新脫俗的酸甜風味。青茶的溫潤茶香與蘋果的果香相互交織，每一口都帶來驚喜。這款雞尾酒的色澤宛如琥珀，在燈光下閃爍著誘人的光芒，如同一雙迷人的眼眸，畢竟「 You are the apple of my eye 」。無論是初次品嚐還是回頭客，「你的眼睛」總能帶來難以忘懷的味覺體驗。',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676349/05_ira9j5.jpg',
    gallery: [],
    isFamous: true
  },
  {
    id: 8,
    title: '婚禮調酒',
    category: '活動紀錄',
    description: '為您的特別日子增添難忘微醺時刻！我們的婚禮調酒服務提供平易近人且令人驚豔的雞尾酒，精心設計讓所有賓客，無論是否常飲酒，都能享受到那份放鬆與喜悅。近年越來越多新人選擇以朋友派對風格舉辦婚宴，Partender正是您的最佳選擇。我們更可與新人共同創作專屬雞尾酒，融入您們的愛情故事、共同回憶或喜好，讓這獨特的風味成為婚禮的亮點，也是您倆愛情的絕佳詮釋。每一杯都是獻給幸福的祝福！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743935716/IMG_9248_amkoxp.jpg',
    gallery: []
  },
  {
    id: 9,
    title: '浪漫屋派對調酒',
    category: '活動紀錄',
    description: '近年火紅的派對場地「浪漫屋」已成為許多朋友聚會、慶生的熱門選擇，而Partender的魔法藥水更是這完美場景中不可或缺的亮點！在這八零年代的空間裡，我們精心調製的特色雞尾酒成為賓客間的熱門話題。無論是慶祝友情還是單純享受美好時光，讓Partender在浪漫屋為您奉上專屬於這特別時刻的魔法藥水！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743935711/IMG_6429_aqkeuw.jpg',
    gallery: []
  },
  {
    id: 10,
    title: '公司 VIP 茶會調酒',
    category: '活動紀錄',
    description: '讓商務洽談不再僅是枯燥的談判！Partender專為企業VIP茶會設計的定制調酒服務，為您的商務交流增添典雅而難忘的風采。我們與企業密切溝通，根據公司形象、活動主題甚至產品特色，量身打造獨一無二的調酒菜單。精美的調製過程本身就是一場視覺盛宴，成為活動話題的天然引子；而每款調酒的獨特風味，讓您的客戶在放鬆愉悅的氛圍中更容易達成合作。有了Partender的加持，生意就這樣在輕鬆的氣氛中自然成交了！提升您的品牌形象，同時讓商務關係更加融洽，就選Partender！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743935706/IMG_9276_ywwdlz.jpg',
    gallery: []
  },
  {
    id: 11,
    title: '百人生日派對調酒',
    category: '活動紀錄',
    description: '驚艷全場的百人派對調酒服務！正如我們的名稱「Partender」一樣，我們是專業派對的幕後功臣。無論您的生日派對規模多大，我們都能確保每位賓客幾乎零等待時間便能享用到精心調製的雞尾酒。我們擁有豐富的大型活動經驗，高效的服務流程，以及專業的團隊配置，讓派對氣氛不因等待調酒而中斷。從入口的迎賓酒到派對高潮的特調，每一款飲品都經過精心設計，與派對主題、壽星喜好完美融合。賓客們不僅能享受美味的雞尾酒，更能感受那份不間斷的歡樂氛圍。讓您的百人生日派對成為眾人津津樂道的傳奇，Partender是您舉辦難忘派對的最佳拍檔！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743935705/IMG_3649_ru0u7d.jpg',
    gallery: []
  },
  {
    id: 12,
    title: 'Pipe live show 調酒',
    category: '活動紀錄',
    description: '音樂與調酒的完美結合，讓 live show 的體驗提升到全新高度！相信熱愛音樂的朋友對於 Pipe 這個場地都不陌生，它承載了無數樂迷的熱情與回憶。而當 Partender 的特色調酒加入這場音樂饗宴，整個演出便有了更豐富的感官體驗！無論是朋友們舉辦的個人同樂演唱會，還是樂團的成發表演，我們的調酒服務都能為現場氣氛加分。讓賓客們一邊品嚐獨特風味，一邊沉浸在音樂的世界中。想使您的音樂活動與眾不同、讓觀眾留下深刻印象？Partender 絕對是您的最佳合作夥伴！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741540021/IMG_9880_acefpp.jpg',
    gallery: [
      {
        image: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743935689/IMG_1411_qorkoq.jpg',
        caption: 'Pipe 現場演出氛圍'
      },
      {
        image: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741540017/DSC08452_o6d1ka.jpg',
        caption: '調酒與音樂的完美配合'
      }
    ]
  },
  {
    id: 13,
    title: '不定期攤販調酒',
    category: '活動紀錄',
    description: '意外的相遇最令人興奮！Partender 不定期「突襲」出現在各種市集、藝術展、音樂節等公開場合，帶給路過的您意想不到的味覺驚喜。我們的行動調酒攤位總是吸引人群排隊品嚐。臨時攤位的限定菜單 — 我們會根據當天的天氣心情，推出只在當場才能品嚐到的特調！關注我們的社群媒體，掌握我們的出沒情報；或者，歡迎推薦適合的場合、音樂季、市集活動給我們，讓 Partender 為您的活動增添不凡魅力。下次逛街時，也許轉角就能遇見我們的調酒攤位，千萬別錯過這偶遇的緣分！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743935687/IMG_2124_yjod0i.jpg',
    gallery: []
  },
  {
    id: 14,
    title: '露天派對調酒',
    category: '活動紀錄',
    description: '在星空下、微風中，體驗最自由奔放的調酒饗宴！Partender 專業的露天派對調酒服務，將大自然的美景與精緻的雞尾酒完美結合。我們擁有豐富的戶外活動經驗，能夠在各種自然環境中打造令人驚艷的流動吧台。微醺的氣氛、清涼的雞尾酒、閃爍的燈光，在戶外的開放空間中格外迷人。我們的特色調酒融合了季節元素、在地食材，甚至是活動場域的靈感，為賓客呈現獨一無二的味覺旅程。許多賓客告訴我們：「喝過 Partender 的派對調酒後，真的會回不去！」戶外的自由氛圍加上我們的職人手藝，創造出無可取代的派對體驗。想讓您的戶外活動成為難忘回憶？Partender 是您不二的選擇！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741540009/IMG_6137_znem3u.jpg',
    gallery: [
      {
        image: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743934083/%E7%B8%AE_krgokc.jpg',
        caption: '露天派對的熱鬧氛圍'
      },
      {
        image: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743934079/DSC09425%E7%B8%AE_jke9bn.jpg',
        caption: '在戶外享受專業調酒服務'
      }
    ]
  },
  {
    id: 15,
    title: '公司社團成發調酒',
    category: '活動紀錄',
    description: '為企業內部活動注入活力與驚喜！公司吉他社的年度成發、部門的季度慶功、團隊的主題聚會，都能因 Partender 的加入而更加精彩。我們的調酒服務不只是提供飲品，更是增進團隊凝聚力的絕佳催化劑。想像一下：同事們圍在吧台前，一邊欣賞調酒師的精湛技藝，一邊分享工作趣事；或是在品嚐特調的過程中，發掘彼此未曾發現的共同興趣。我們可以為公司的各種內部活動量身定制調酒菜單，甚至融入公司文化、產品特色或團隊精神的元素，讓每一杯飲品都蘊含特別意義。許多企業反饋，Partender 的參與使得原本普通的內部活動變得難忘而特別，大大增強了團隊的向心力與活力。讓調酒成為連結同事情感的獨特媒介，就選 Partender！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743934078/DSCF2355%E7%B8%AE_tbex1z.jpg',
    gallery: []
  },
  {
    id: 16,
    title: '公司展場附屬調酒',
    category: '活動紀錄',
    description: '想讓您的展位在眾多參展商中脫穎而出、成為全場焦點？Partender 的展場調酒服務是您的制勝法寶！無論是產品發表會、行業展覽會、招商大會還是企業形象展，我們的專業調酒師與精美吧台都能為您的展位增添無限魅力。據統計，設有調酒服務的展位，訪客平均停留時間延長了300%，互動率提升了500%！我們提供的不僅是令人驚艷的雞尾酒，更是與潛在客戶建立連結的絕佳機會。每款調酒都可以根據您的品牌形象、產品特色量身定制，成為與客戶交流的天然話題。更令人驚喜的是，許多參展商發現，在享受美味調酒的放鬆氛圍中，客戶往往更容易做出合作決定。讓您的展位成為賓客一來再來、駐足最久的亮點，Partender 是您展覽成功的關鍵推手！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743939206/IMG_3263_ze7d7k.jpg',
    gallery: []
  },
  {
    id: 17,
    title: '遊艇趴調酒',
    category: '活動紀錄',
    description: 'Partender 可以說是從遊艇派對起家的專業調酒團隊，我們擁有豐富的海上派對經驗，熟悉遊艇環境的各種挑戰與限制，同時提供一流的調酒體驗。在藍天碧海的絕美背景下，我們的特調雞尾酒為您的海上派對增添無與倫比的豪華感與獨特風味。派對結束後，讓賓客們從船上搖搖晃晃到陸地上也搖搖晃晃！想要舉辦一場讓人難以忘懷的遊艇派對？Partender 是您的最佳選擇，讓我們一起揚帆起航，開啟味蕾的海上冒險！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1743676385/IMG_0936_n0zcig.jpg',
    gallery: []
  },
  {
    id: 18,
    title: '戶外玩水派對調酒',
    category: '活動紀錄',
    description: '炎炎夏日，沒有什麼比戶外玩水派對更令人期待的了！而 Partender 的特色調酒，則是讓這份清涼與快樂達到頂峰的秘密武器。在泳池邊、海灘旁或水上樂園，我們的移動吧台能為您的玩水派對增添絕佳風味。我們特別設計的夏日系列雞尾酒，清爽不膩口，完美平衡水分與酒精，讓您在玩水之餘也能適當補充能量，持續嗨到最高點！更貼心的是，我們考慮到戶外環境的特性，所有雞尾酒都使用安全的材質盛裝，不用擔心玻璃杯的安全問題。從清新的水果調酒到熱帶風情的特調，每一款都是視覺與味覺的雙重享受，為您的泳池派對、沙灘派對增添無限色彩。想讓夏日玩水活動更加難忘？就讓 Partender 為您帶來最適合戶外的微醺體驗！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741540024/DSC00674_f_bcnrpm.jpg',
    gallery: []
  },
  {
    id: 19,
    title: '主題派對調酒',
    category: '活動紀錄',
    description: '讓您的主題派對從平凡變成傳奇！Partender 不僅提供頂級調酒服務，更是您派對策劃的最佳夥伴。我們擁有豐富的主題派對經驗，從復古年代派對、馬戲團主題夜、節慶特別活動到奇幻世界沉浸式體驗，都能為您量身定制完美配合的調酒菜單與服務流程。我們的專業不僅體現在調酒口味上，更在於對整體派對氛圍的精準把握。我們會根據派對主題精心設計每一款雞尾酒的名稱、外觀、味道，甚至是服務方式，確保飲品成為主題的延伸與升華。許多客戶選擇在籌備階段就諮詢我們，獲得關於場地布置、活動流程、互動環節的專業建議，讓整個派對更加連貫、精彩。如果您想舉辦一場令人難忘的主題派對，Partender 不只帶給您好喝的飲品，更能提供全方位的安心效果與驚喜體驗！',
    mainImage: 'https://res.cloudinary.com/df4ru2dy3/image/upload/v1741540018/IMG_9191_rzogqk.jpg',
    gallery: []
  }
];

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio script loaded');
  
  // 獲取DOM元素
  const portfolioContainer = document.querySelector('.portfolio-container');
  const portfolioTabs = document.querySelector('.portfolio-tabs');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  const viewMoreBtn = document.querySelector('.portfolio-more-btn');
  const tabBtns = document.querySelectorAll('.portfolio-tab');
  
  if (!portfolioContainer || !portfolioTabs) {
    console.error('Portfolio container or tabs not found');
    return;
  }
  
  // 全局作品數組
  let portfolioItems = [];
  
  // 初始化組合作品數據
  initPortfolioItems();
  
  // 當前過濾器
  let currentFilter = 'all';
  
  /**
   * 初始化作品數據
   */
  function initPortfolioItems() {
    console.log('Initializing portfolio items');
    portfolioItems = [...portfolioData];
  }
  
  /**
   * 更新顯示的作品項目
   */
  function updateVisibleItems() {
    console.log('Updating visible items with filter:', currentFilter);
    if (!portfolioGrid) {
      console.error('Portfolio grid not found');
      return;
    }
    
    // 清空網格
    portfolioGrid.innerHTML = '';
    
    // 獲取要顯示的項目
    let itemsToShow = [];
    if (currentFilter === 'all') {
      itemsToShow = [...portfolioItems];
    } else {
      itemsToShow = portfolioItems.filter(item => item.category === currentFilter);
    }
    
    console.log('Items to show:', itemsToShow.length);
    
    // 限制首屏顯示的數量（比如最多顯示6個）
    const maxItemsOnFirstScreen = 6;
    const displayItems = itemsToShow.slice(0, maxItemsOnFirstScreen);
    
    // 創建並添加項目到網格
    displayItems.forEach(item => {
      const portfolioItem = createPortfolioItem(item);
      portfolioGrid.appendChild(portfolioItem);
    });
    
    // 更新"查看更多"按鈕的顯示狀態
    if (viewMoreBtn) {
      if (itemsToShow.length > maxItemsOnFirstScreen) {
        viewMoreBtn.style.display = 'block';
      } else {
        viewMoreBtn.style.display = 'none';
      }
    }
  }
  
  /**
   * 創建作品項目元素
   * @param {Object} item - 作品項目數據
   * @returns {Element} - 創建的DOM元素
   */
  function createPortfolioItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'portfolio-item';
    
    if (item.category === '作品') {
      itemDiv.classList.add('works-item');
    } else if (item.category === '活動紀錄') {
      itemDiv.classList.add('activity-item');
    }
    
    itemDiv.setAttribute('data-category', item.category);
    
    // 添加圖片
    const img = document.createElement('img');
    img.src = item.mainImage;
    img.alt = item.title;
    img.onload = function() {
      // 檢查圖片是否為直式（高度大於寬度）
      if (this.naturalHeight > this.naturalWidth) {
        this.style.objectPosition = 'center top';
        console.log('直式圖片已檢測到：', item.title, this.naturalWidth, 'x', this.naturalHeight);
      }
    };
    
    // 添加覆蓋層
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-overlay';
    
    const title = document.createElement('h3');
    title.className = 'portfolio-item-title';
    title.textContent = item.title;
    
    const category = document.createElement('p');
    category.className = 'portfolio-item-category';
    category.textContent = item.category;
    
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'portfolio-item-link';
    link.textContent = '查看詳情';
    
    // 添加點擊事件
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // 使用全局公開的openModal函數
      if (typeof openPortfolioModal === 'function') {
        // 獲取當前可見的所有作品項目
        let visibleItems = [];
        if (currentFilter === 'all') {
          visibleItems = [...portfolioItems];
        } else {
          visibleItems = portfolioItems.filter(i => i.category === currentFilter);
        }
        
        // 打開模態窗口並傳入所有相關項目用於導航
        openPortfolioModal(item, visibleItems);
      } else {
        console.error('openPortfolioModal function is not defined');
      }
    });
    
    // 組裝覆蓋層
    overlay.appendChild(title);
    overlay.appendChild(category);
    overlay.appendChild(link);
    
    // 組裝項目
    itemDiv.appendChild(img);
    itemDiv.appendChild(overlay);
    
    // 如果是暢銷品，添加皇冠標記
    if (item.isFamous) {
      const crown = document.createElement('div');
      crown.className = 'portfolio-item-crown';
      itemDiv.appendChild(crown);
    }
    
    return itemDiv;
  }
  
  // 設置過濾器按鈕
  if (tabBtns && tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        currentFilter = filterValue;
        
        // 移除所有按鈕的active類
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // 添加active類到當前按鈕
        this.classList.add('active');
        
        // 更新顯示的項目
        updateVisibleItems();
      });
    });
  } else {
    console.warn('Filter buttons not found');
  }
  
  // 初始化初始視圖
  updateVisibleItems();
  
  // 設置"查看更多"按鈕事件監聽器
  if (viewMoreBtn) {
    console.log('Setting up view more button');
    viewMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('View more button clicked');
      showThumbnailsModal();
    });
  } else {
    console.warn('View more button not found');
  }
  
  // 顯示縮略圖模態窗口
  function showThumbnailsModal() {
    console.log('創建縮略圖模態框');
    
    // 檢查是否已存在模態框
    let thumbnailsModal = document.getElementById('portfolioThumbnailsModal');
    
    // 如果存在舊的模態框，先移除
    if (thumbnailsModal) {
      document.body.removeChild(thumbnailsModal);
    }
    
    // 重新創建模態框
    thumbnailsModal = document.createElement('div');
    thumbnailsModal.id = 'portfolioThumbnailsModal';
    thumbnailsModal.className = 'portfolio-thumbnails-modal';
    
    // 創建模態框內容容器
    const modalContent = document.createElement('div');
    modalContent.className = 'portfolio-thumbnails-content';
    
    // 創建關閉按鈕
    const closeBtn = document.createElement('div');
    closeBtn.className = 'portfolio-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', '關閉');
    closeBtn.setAttribute('role', 'button');
    closeBtn.addEventListener('click', () => {
      thumbnailsModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // 創建標題
    const title = document.createElement('h2');
    title.className = 'portfolio-thumbnails-title';
    
    // 根據當前篩選器設置標題
    if (currentFilter === 'all') {
      title.textContent = '所有作品';
    } else if (currentFilter === '作品') {
      title.textContent = '所有作品';
    } else if (currentFilter === '活動紀錄') {
      title.textContent = '所有活動紀錄';
    }
    
    // 創建縮略圖網格
    const grid = document.createElement('div');
    grid.className = 'portfolio-thumbnails-grid';
    
    // 根據當前過濾類別獲取要顯示的項目
    let itemsToShow = [];
    if (currentFilter === 'all') {
      itemsToShow = [...portfolioItems];
    } else {
      itemsToShow = portfolioItems.filter(item => item.category === currentFilter);
    }
    
    console.log('要顯示的項目數量:', itemsToShow.length, '當前過濾器:', currentFilter);
    
    // 創建縮略圖
    itemsToShow.forEach(item => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'portfolio-thumbnail';
      thumbnail.setAttribute('data-category', item.category);
      
      const img = document.createElement('img');
      img.src = item.mainImage;
      img.alt = item.title;
      
      // 確保圖片加載完成後處理直式圖片的顯示
      img.onload = function() {
        // 檢查圖片是否為直式（高度大於寬度）
        if (this.naturalHeight > this.naturalWidth) {
          this.style.objectPosition = 'center top';
        }
      };
      
      // 縮略圖本身添加點擊事件，點擊整個縮略圖就可以查看詳情
      thumbnail.addEventListener('click', (e) => {
        // 避免點擊查看詳情按鈕時觸發兩次
        if (e.target.tagName !== 'A' && e.target.parentNode.tagName !== 'A') {
          thumbnailsModal.classList.remove('active');
          document.body.style.overflow = '';
          
          // 使用全局公開的openModal函數
          if (typeof openPortfolioModal === 'function') {
            // 打開模態窗口並傳入所有相關項目用於導航
            openPortfolioModal(item, itemsToShow);
          } else {
            console.error('openPortfolioModal 函數未定義');
          }
        }
      });
      
      const overlay = document.createElement('div');
      overlay.className = 'portfolio-thumbnail-overlay';
      
      const itemTitle = document.createElement('h3');
      itemTitle.className = 'portfolio-thumbnail-title';
      itemTitle.textContent = item.title;
      
      const category = document.createElement('p');
      category.className = 'portfolio-thumbnail-category';
      category.textContent = item.category;
      
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'portfolio-thumbnail-link';
      link.textContent = '查看詳情';
      
      // 添加點擊事件
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // 阻止事件冒泡，避免觸發thumbnail的點擊事件
        thumbnailsModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // 使用全局公開的openModal函數
        if (typeof openPortfolioModal === 'function') {
          // 打開模態窗口並傳入所有相關項目用於導航
          openPortfolioModal(item, itemsToShow);
        } else {
          console.error('openPortfolioModal 函數未定義');
        }
      });
      
      // 組裝覆蓋層
      overlay.appendChild(itemTitle);
      overlay.appendChild(category);
      overlay.appendChild(link);
      
      // 組裝縮略圖
      thumbnail.appendChild(img);
      thumbnail.appendChild(overlay);
      
      // 如果是暢銷品，添加皇冠標記
      if (item.isFamous) {
        const crown = document.createElement('div');
        crown.className = 'portfolio-thumbnail-crown';
        thumbnail.appendChild(crown);
      }
      
      // 將縮略圖添加到網格
      grid.appendChild(thumbnail);
    });
    
    // 組裝模態框
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(grid);
    thumbnailsModal.appendChild(modalContent);
    
    // 添加到body
    document.body.appendChild(thumbnailsModal);
    
    // 點擊背景關閉
    thumbnailsModal.addEventListener('click', (e) => {
      if (e.target === thumbnailsModal) {
        thumbnailsModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // 顯示模態框（延遲一點點以確保DOM已更新）
    setTimeout(() => {
      thumbnailsModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // 防止背景滾動
      console.log('模態框已激活');
    }, 50);
  }

  // 設置模態窗口 - 在setupPortfolioModal函數中已調用
  console.log('Portfolio initialization complete');
});

/**
 * 設置作品詳情彈出層
 */
function setupPortfolioModal() {
  /**
   * 打開組合作品詳情模態窗口
   * @param {Object} item - 要展示的組合作品項目
   * @param {Array} allItems - 所有項目的數組，用於導航
   */
  function openModal(item, allItems = []) {
    console.log("openModal called with item:", item);
    // 移除任何現存的模態窗口
    const existingModal = document.querySelector('.portfolio-modal-container');
    if (existingModal) {
      existingModal.remove();
    }

    // 創建模態窗口
    const modalContainer = document.createElement('div');
    modalContainer.className = 'portfolio-modal-container';
    
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    // 確保模態窗口顯示
    modal.style.display = 'flex';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'portfolio-modal-content';
    
    // 創建圖片容器
    const imageContainer = document.createElement('div');
    imageContainer.className = 'portfolio-modal-image';
    
    // 創建當前顯示的圖片
    const image = document.createElement('img');
    image.src = item.mainImage;
    image.alt = item.title;
    image.onload = function() {
      // 檢查圖片是否為直式（高度大於寬度）
      if (this.naturalHeight > this.naturalWidth) {
        this.style.objectPosition = 'center top';
        console.log('直式圖片已檢測到：', item.title, this.naturalWidth, 'x', this.naturalHeight);
      }
    };
    
    imageContainer.appendChild(image);
    
    // 創建圖片區域包裝器（包含主圖片和圖片庫）
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'portfolio-modal-image-wrapper';
    imageWrapper.appendChild(imageContainer);
    
    // 組合圖片庫
    const hasGallery = item.gallery && item.gallery.length > 0;
    
    // 圖片庫切換 - 現在放在圖片下方
    if (hasGallery) {
      // 創建圖片切換容器
      const galleryContainer = document.createElement('div');
      galleryContainer.className = 'image-gallery-nav';
      
      // 添加主圖片選項
      const mainImageOption = document.createElement('button');
      mainImageOption.className = 'image-option active';
      mainImageOption.dataset.index = -1; // 使用-1表示主圖片
      mainImageOption.setAttribute('aria-label', '主圖片');
      
      // 創建主圖片縮略圖
      const mainThumbnail = document.createElement('div');
      mainThumbnail.className = 'image-thumbnail';
      mainThumbnail.style.backgroundImage = `url(${item.mainImage})`;
      mainImageOption.appendChild(mainThumbnail);
      
      mainImageOption.addEventListener('click', () => {
        // 更新當前顯示的圖片
        image.src = item.mainImage;
        image.alt = item.title;
        
        // 更新選中狀態
        document.querySelectorAll('.image-option').forEach(opt => opt.classList.remove('active'));
        mainImageOption.classList.add('active');
      });
      
      galleryContainer.appendChild(mainImageOption);
      
      // 添加圖庫圖片選項
      item.gallery.forEach((galleryItem, index) => {
        const imageOption = document.createElement('button');
        imageOption.className = 'image-option';
        imageOption.dataset.index = index;
        imageOption.setAttribute('aria-label', galleryItem.caption || `圖片 ${index + 1}`);
        
        // 創建縮略圖
        const thumbnail = document.createElement('div');
        thumbnail.className = 'image-thumbnail';
        thumbnail.style.backgroundImage = `url(${galleryItem.image})`;
        imageOption.appendChild(thumbnail);
        
        imageOption.addEventListener('click', () => {
          // 更新當前顯示的圖片
          image.src = galleryItem.image;
          image.alt = galleryItem.caption || item.title;
          
          // 更新選中狀態
          document.querySelectorAll('.image-option').forEach(opt => opt.classList.remove('active'));
          imageOption.classList.add('active');
        });
        
        galleryContainer.appendChild(imageOption);
      });
      
      // 將圖片切換選項添加到圖片區域下方
      const galleryNavTitle = document.createElement('h4');
      galleryNavTitle.className = 'gallery-nav-title';
      galleryNavTitle.textContent = '更多照片';
      
      const gallerySection = document.createElement('div');
      gallerySection.className = 'portfolio-modal-gallery-section';
      gallerySection.appendChild(galleryNavTitle);
      gallerySection.appendChild(galleryContainer);
      
      // 添加到圖片包裝器中
      imageWrapper.appendChild(gallerySection);
    }
    
    // 創建詳情容器
    const details = document.createElement('div');
    details.className = 'portfolio-modal-details';
    
    const category = document.createElement('span');
    category.className = 'portfolio-modal-category';
    category.textContent = item.category;
    
    const title = document.createElement('h3');
    title.className = 'portfolio-modal-title';
    title.textContent = item.title;
    
    const description = document.createElement('p');
    description.className = 'portfolio-modal-description';
    description.textContent = item.description;
    
    details.appendChild(category);
    details.appendChild(title);
    details.appendChild(description);
    
    // 創建項目間的導航按鈕
    const hasMultipleItems = allItems && allItems.length > 1;
    if (hasMultipleItems) {
      const currentIndex = allItems.findIndex(i => i.id === item.id);
      const navContainer = document.createElement('div');
      navContainer.className = 'gallery-nav';
      
      const prevButton = document.createElement('button');
      prevButton.className = 'gallery-nav-btn prev-btn';
      prevButton.textContent = '上一個';
      prevButton.disabled = currentIndex <= 0;
      
      const nextButton = document.createElement('button');
      nextButton.className = 'gallery-nav-btn next-btn';
      nextButton.textContent = '下一個';
      nextButton.disabled = currentIndex >= allItems.length - 1;
      
      prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          openModal(allItems[currentIndex - 1], allItems);
        }
      });
      
      nextButton.addEventListener('click', () => {
        if (currentIndex < allItems.length - 1) {
          openModal(allItems[currentIndex + 1], allItems);
        }
      });
      
      navContainer.appendChild(prevButton);
      navContainer.appendChild(nextButton);
      details.appendChild(navContainer);
    }
    
    // 關閉按鈕
    const closeBtn = document.createElement('button');
    closeBtn.className = 'portfolio-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', '關閉');
    closeBtn.setAttribute('role', 'button');
    
    // 添加到模態窗口
    modalContent.appendChild(imageWrapper);
    modalContent.appendChild(details);
    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);
    modalContainer.appendChild(modal);
    
    // 添加到頁面
    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden'; // 阻止背景滾動
    
    // 事件監聽器
    closeBtn.addEventListener('click', () => {
      modalContainer.remove();
      document.body.style.overflow = '';
    });
    
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        modalContainer.remove();
        document.body.style.overflow = '';
      }
    });
  }
  
  // 全局暴露 openModal 函數
  window.openPortfolioModal = openModal;
}

// 立即調用設置函數
setupPortfolioModal(); 