import { assetPath } from '@/lib/utils/asset-path';
import type { Performer } from '@/types';
/**
 * Mock 表演者資料
 */
export const mockPerformers: Performer[] = [
  {
    id: 1,
    name: '豆腐',
    nickname: '豆腐',
    category: '氣球藝術家',
    specialties: ['氣球造型', '氣球秀', '氣球會場佈置規劃'],
    experience: '約 10 年經驗',
    description:
      '2011年開始接觸氣球藝術，靠著不同技巧、色彩搭配能創造千百種造型。擁有上百場活動表演經驗，絕對是創造精彩節目的首選氣球師。',
    image: assetPath('/images/performers/balloon-artist.jpg'),
    highlights: [
      '保時捷家庭日氣球達人',
      '台灣大哥大VIP客戶氣球達人北區巡迴',
      '騎士堡特聘氣球講師',
      '萬華MY+ DNA親子館 冰雪奇緣氣球展',
    ],
  },
  {
    id: 2,
    name: '胖打',
    nickname: '胖打',
    category: '氣球藝術家',
    specialties: ['展場佈置', '魔術表演', '現場手折氣球', '氣球秀'],
    experience: '約 10 年經驗',
    description:
      '多才多藝的魔術師與氣球達人，擅長魔術表演、氣球造型與展場佈置。',
    image: assetPath('/images/performers/balloon-artist.jpg'),
    highlights: ['旅展演出', '各類家庭日活動'],
  },
  {
    id: 3,
    name: '大鈞',
    nickname: '大鈞',
    category: '氣球達人',
    specialties: ['造型氣球', '氣球表演', '活動帶領'],
    experience: '約 8 年經驗',
    description:
      '專業造型氣球表演者，曾參與多項大型企業活動與家庭日表演，擅長以氣球創作帶給觀眾歡樂與驚喜。',
    image: assetPath('/images/performers/balloon-artist.jpg'),
    highlights: [
      '台灣大哥大生日周年慶系列活動',
      'TOYOTA 家庭日',
      '士林官邸菊展',
      '國泰Fun幸福家庭日',
    ],
  },
  {
    id: 4,
    name: '蟲蟲',
    nickname: '蟲蟲',
    category: '氣球達人',
    specialties: ['造型氣球', '互動魔術', '小丑表演'],
    experience: '約 8 年經驗',
    description:
      '2007年高二時創立魔術社，開始接觸造型氣球。退伍後開始於晚上及假日接氣球造型活動，擅長婚宴迎賓、家庭日活動、企業尾牙等各類型活動。',
    image: assetPath('/images/performers/balloon-artist.jpg'),
    highlights: [
      '台灣大哥大生日周年慶系列活動',
      '中國信託金融園區耶誕童話冒險',
      '臺北世界大學運動會活動',
      '理膚寶水、碧兒泉、資生堂系列活動',
    ],
  },
];
