import type { ShopCategory } from '@/types';
/**
 * Mock 分類資料（來自真實 API）
 * 對齊 dev-seed.sql，10 個頂層分類，依 SEO 搜尋量排序
 * 最後更新：2026-03-28
 */
export const mockCategories: ShopCategory[] = [
  // ─────────────────────────────────────────────
  // 1. 佈置類（id=78）
  // ─────────────────────────────────────────────
  {
    id: 78,
    name: '佈置類',
    description: '依場合與主題的全套氣球佈置服務，含設計、配送與現場施工',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 9,
        name: '生日佈置',
        description: '各年齡生日派對氣球佈置服務',
        active: true,
        productCount: 0,
      },
      {
        id: 42,
        name: '求婚佈置',
        description: '浪漫驚喜求婚場景氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 41,
        name: '婚禮佈置',
        description: '典雅浪漫婚禮場景整體氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 35,
        name: '彌月 / 抓周佈置',
        description: '彌月、百日、抓周嬰幼兒專屬氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 81,
        name: '後車廂驚喜佈置',
        description: '生日、求婚、告白後車廂驚喜氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 82,
        name: '性別揭曉派對',
        description: '寶寶性別揭曉派對氣球佈置，粉藍主題驚喜設計',
        active: true,
        productCount: 0,
      },
      {
        id: 8,
        name: '畢業佈置',
        description: '畢業典禮、謝師宴專屬氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 10,
        name: '開幕佈置',
        description: '店面開幕、新店落成氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 83,
        name: '尾牙 / 春酒佈置',
        description: '企業年終尾牙、春酒聚餐氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 28,
        name: '聖誕節佈置',
        description: '聖誕節慶氣球佈置，營造溫馨節日氛圍',
        active: true,
        productCount: 0,
      },
      {
        id: 29,
        name: '萬聖節佈置',
        description: '萬聖節派對主題氣球佈置，趣味十足',
        active: true,
        productCount: 0,
      },
      {
        id: 31,
        name: '情人節佈置',
        description: '情人節浪漫氣球佈置，傳遞愛意',
        active: true,
        productCount: 0,
      },
      {
        id: 30,
        name: '新年佈置',
        description: '農曆新年與跨年慶典氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 32,
        name: '母親節佈置',
        description: '母親節感恩氣球佈置，表達對媽媽的愛',
        active: true,
        productCount: 0,
      },
      {
        id: 33,
        name: '父親節佈置',
        description: '父親節氣球佈置，感謝爸爸的付出',
        active: true,
        productCount: 0,
      },
      {
        id: 11,
        name: '展演佈置',
        description: '展覽、演出、發表會場地氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 12,
        name: '背板佈置',
        description: '活動背板、拍照牆氣球造型設計',
        active: true,
        productCount: 0,
      },
      {
        id: 13,
        name: '森林系佈置',
        description: '自然森林風格氣球佈置，綠意盎然',
        active: true,
        productCount: 0,
      },
      {
        id: 14,
        name: '海洋系佈置',
        description: '海洋風格氣球佈置，清新活潑',
        active: true,
        productCount: 0,
      },
      {
        id: 15,
        name: '童話系佈置',
        description: '童話故事風格氣球佈置，充滿奇幻色彩',
        active: true,
        productCount: 0,
      },
      {
        id: 16,
        name: '甜美系佈置',
        description: '粉嫩甜美風格氣球佈置，少女心滿滿',
        active: true,
        productCount: 0,
      },
      {
        id: 17,
        name: '夢幻系佈置',
        description: '夢幻唯美風格氣球佈置，打造如詩如畫的場景',
        active: true,
        productCount: 0,
      },
      {
        id: 36,
        name: '1 歲佈置',
        description: '寶寶滿周歲慶典氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 37,
        name: '2~6 歲佈置',
        description: '幼兒生日派對卡通主題氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 38,
        name: '7~12 歲佈置',
        description: '兒童生日派對活潑主題氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 39,
        name: '13~18 歲佈置',
        description: '青少年生日派對時尚主題氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 40,
        name: '19+ 歲佈置',
        description: '成人生日派對精緻主題氣球佈置',
        active: true,
        productCount: 0,
      },
      {
        id: 43,
        name: '客製化文字球',
        description: '可訂製姓名、日期與祝福語的專屬文字氣球',
        active: true,
        productCount: 0,
      },
      {
        id: 45,
        name: '爆破氣球佈置',
        description: '活動開幕、頒獎典禮爆破氣球裝置',
        active: true,
        productCount: 0,
      },
      {
        id: 18,
        name: '其他佈置',
        description: '其他風格主題氣球佈置',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 2. 佈置單品類（id=79）
  // ─────────────────────────────────────────────
  {
    id: 79,
    name: '佈置單品類',
    description: '單項購買，適合自行搭配或局部點綴，不含到場施工',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 60,
        name: '氣球拱門',
        description: '活動入口、舞台前方大型氣球拱門造型',
        active: true,
        productCount: 0,
      },
      {
        id: 46,
        name: '氣球柱（單支）',
        description: '活動入口、舞台兩側氣球柱造型',
        active: true,
        productCount: 0,
      },
      {
        id: 47,
        name: '氣球牆 / 氣球背板',
        description: '大型氣球牆佈置，適合拍照打卡',
        active: true,
        productCount: 0,
      },
      {
        id: 80,
        name: '外送費',
        description: '依地區計費，台北市區為例，外縣市另議',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 3. 空飄充氣 / 套組類（id=55）
  // ─────────────────────────────────────────────
  {
    id: 55,
    name: '空飄充氣 / 套組類',
    description: '含氦氣充氣服務及主題空飄套組',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 56,
        name: '乳膠氣球充氣（代客充氣）',
        description: '9–12 吋，可空飄約 6–12 小時',
        active: true,
        productCount: 0,
      },
      {
        id: 57,
        name: '鋁箔氣球充氣',
        description: '18 吋起，可空飄 1–3 天',
        active: true,
        productCount: 0,
      },
      {
        id: 58,
        name: '空飄氣球套組（一般組合）',
        description: '乳膠 20 顆或鋁箔 8 顆，含氦氣',
        active: true,
        productCount: 0,
      },
      {
        id: 59,
        name: '求婚 / 生日主題套組',
        description: '字母＋數字＋造型球組合，適合特定場合',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 4. 鋁箔 / 造型氣球素材（id=62）
  // ─────────────────────────────────────────────
  {
    id: 62,
    name: '鋁箔 / 造型氣球素材',
    description: '數字、字母、造型鋁箔氣球及透明泡泡球，持久耐用',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 49,
        name: '一般造型鋁箔氣球',
        description: '星形、愛心、圓形等各式造型，18–36 吋，持久耐用',
        active: true,
        productCount: 0,
      },
      {
        id: 63,
        name: '數字 / 字母鋁箔氣球',
        description: '16–40 吋，生日週年慶必備',
        active: true,
        productCount: 0,
      },
      {
        id: 64,
        name: '水晶 / 泡泡氣球（Bobo Ball）',
        description: '透明球，20–24 吋，可內含裝飾',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 5. 乳膠氣球素材（id=7）
  // ─────────────────────────────────────────────
  {
    id: 7,
    name: '乳膠氣球素材',
    description: '各式乳膠氣球，適合 DIY 佈置與造型塑形',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 51,
        name: '圓形 / 心型乳膠氣球',
        description: '10–100 顆包裝，標準 11–12 吋，顏色多樣',
        active: true,
        productCount: 0,
      },
      {
        id: 50,
        name: '長條造型氣球（260Q）',
        description: '折氣球造型用，100 條裝',
        active: true,
        productCount: 0,
      },
      {
        id: 61,
        name: '巨型乳膠氣球（36 吋以上）',
        description: '拍照道具、佈置重點氣球，大尺寸視覺震撼',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 6. 造型氣球（id=2）
  // ─────────────────────────────────────────────
  {
    id: 2,
    name: '造型氣球',
    description: '各式造型氣球商品，手工製作充滿趣味與創意',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 19,
        name: '動物造型',
        description: '各種可愛動物造型氣球',
        active: true,
        productCount: 0,
      },
      {
        id: 54,
        name: '花朵系列',
        description: '花朵造型氣球，適合送禮與佈置點綴',
        active: true,
        productCount: 0,
      },
      {
        id: 20,
        name: '公主系列',
        description: '夢幻公主風格造型氣球',
        active: true,
        productCount: 0,
      },
      {
        id: 21,
        name: '手拿棒系列',
        description: '適合拍照的手持造型氣球棒',
        active: true,
        productCount: 0,
      },
      {
        id: 22,
        name: '武器系列',
        description: '劍、盾、弓箭等武器造型氣球',
        active: true,
        productCount: 0,
      },
      {
        id: 23,
        name: '配件系列',
        description: '帽子、眼鏡、包包等配件造型氣球',
        active: true,
        productCount: 0,
      },
      {
        id: 24,
        name: '卡通造型',
        description: '熱門卡通角色造型氣球',
        active: true,
        productCount: 0,
      },
      {
        id: 25,
        name: '四泡結手環系列',
        description: '四泡結工法製作的氣球手環',
        active: true,
        productCount: 0,
      },
      {
        id: 26,
        name: '編織系列',
        description: '氣球編織工藝造型商品',
        active: true,
        productCount: 0,
      },
      {
        id: 27,
        name: '其他系列',
        description: '其他創意造型氣球',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-03T00:00:00.000000',
    updatedAt: '2026-03-03T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 7. 工具 / 配件類（id=65）
  // ─────────────────────────────────────────────
  {
    id: 65,
    name: '工具 / 配件類',
    description: '充氣工具、固定配件與氦氣罐出租',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 52,
        name: '手動打氣筒',
        description: '雙向充氣，折氣球造型常用',
        active: true,
        productCount: 0,
      },
      {
        id: 66,
        name: '電動充氣機',
        description: '適合大量充氣，插電式',
        active: true,
        productCount: 0,
      },
      {
        id: 53,
        name: '氣球棒 / 底座 / 緞帶',
        description: '固定配件耗材，佈置必備',
        active: true,
        productCount: 0,
      },
      {
        id: 67,
        name: '氦氣罐出租（小型罐）',
        description: '含氦氣，可充約 20–50 顆 11 吋乳膠氣球',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 8. 折氣球表演（id=68）
  // ─────────────────────────────────────────────
  {
    id: 68,
    name: '折氣球表演',
    description: '專業氣球師到場折氣球表演與互動秀',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 69,
        name: '一般現場折氣球（小型）',
        description: '生日派對、家庭日，新手達人',
        active: true,
        productCount: 0,
      },
      {
        id: 70,
        name: '全職氣球達人（企業 / 婚禮）',
        description: '基本出場費，之後每小時加價',
        active: true,
        productCount: 0,
      },
      {
        id: 71,
        name: '氣球表演秀（含互動 / 舞台）',
        description: '整場活動，含動態表演',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 9. 氣球教學（id=72）
  // ─────────────────────────────────────────────
  {
    id: 72,
    name: '氣球教學',
    description: '折氣球與氣球佈置課程，適合親子與工作坊',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 73,
        name: '折氣球入門課程',
        description: '基礎造型，適合親子、個人',
        active: true,
        productCount: 0,
      },
      {
        id: 74,
        name: '氣球佈置教學（工作坊）',
        description: '拱門、氣球柱 DIY 課程',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },

  // ─────────────────────────────────────────────
  // 10. 客製 / 廣告印刷（id=75）
  // ─────────────────────────────────────────────
  {
    id: 75,
    name: '客製 / 廣告印刷',
    description: '企業品牌乳膠氣球印刷及大型廣告氣球造型',
    parentId: null,
    parentName: null,
    children: [
      {
        id: 76,
        name: '乳膠氣球 Logo 印刷',
        description: '最低訂量 100–500 顆起，批量優惠',
        active: true,
        productCount: 0,
      },
      {
        id: 77,
        name: '大型廣告氣球 / 吉祥造型',
        description: '開幕、展覽、活動大型充氣物，詢價',
        active: true,
        productCount: 0,
      },
    ],
    active: true,
    createdAt: '2026-03-28T00:00:00.000000',
    updatedAt: '2026-03-28T00:00:00.000000',
    isTopLevel: true,
    productCount: 0,
  },
];
