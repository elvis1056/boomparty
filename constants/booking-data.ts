import type { Service, Staff } from '@/types/booking';

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    name: '活動佈置',
    description: '專業場地設計與佈置，打造完美活動氛圍',
    duration: 180,
    price: 20000,
    image: '/images/booking/balloon-arrangement.jpg',
    category: 'venue',
    requiresPerformer: false,
    bookingType: 'completion', // 填寫完成時間點
  },
  {
    id: 'service-2',
    name: '現場折氣球',
    description: '專業氣球藝術師現場製作造型氣球，為活動增添歡樂氣氛',
    duration: 120,
    price: 8000,
    image: '/images/booking/balloon-girl.jpg',
    category: 'balloon',
    requiresPerformer: true,
    bookingType: 'timeSlot', // 填寫表演時段
  },
  {
    id: 'service-3',
    name: '背板設計',
    description: '客製化活動背板設計製作，打造專屬品牌形象',
    duration: 240,
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'backdrop',
    requiresPerformer: false,
    bookingType: 'completion', // 填寫完成時間點
  },
  // {
  //   id: 'service-3',
  //   name: '活動企劃',
  //   description: '完整的活動策劃服務，從概念到執行',
  //   duration: 120,
  //   price: 15000,
  //   image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
  //   category: 'planning'
  // },
  // {
  //   id: 'service-4',
  //   name: '活動攝影',
  //   description: '專業攝影師全程記錄精彩瞬間',
  //   duration: 240,
  //   price: 12000,
  //   image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
  //   category: 'photography'
  // },
  // {
  //   id: 'service-5',
  //   name: '主持服務',
  //   description: '經驗豐富的主持人，讓活動更精彩',
  //   duration: 180,
  //   price: 10000,
  //   image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
  //   category: 'hosting'
  // },
  // {
  //   id: 'service-6',
  //   name: '影片製作',
  //   description: '活動後製影片，留下美好回憶',
  //   duration: 60,
  //   price: 8000,
  //   image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
  //   category: 'other'
  // },
  // {
  //   id: 'service-7',
  //   name: '設備租借',
  //   description: '音響、燈光、投影等專業設備',
  //   duration: 0,
  //   price: 5000,
  //   image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
  //   category: 'other'
  // }
];

export const STAFF_MEMBERS: Staff[] = [
  {
    id: 'staff-1',
    name: '王小明',
    title: '資深活動企劃師',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.9,
    specialties: ['企業活動', '產品發表會', '記者會'],
    availableDays: [1, 2, 3, 4, 5], // Monday-Friday
  },
  {
    id: 'staff-2',
    name: '李美華',
    title: '場地設計總監',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.8,
    specialties: ['婚禮佈置', '主題派對', '展覽設計'],
    availableDays: [0, 3, 4, 5, 6], // Wed-Sun
  },
  {
    id: 'staff-3',
    name: '張大偉',
    title: '首席攝影師',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5.0,
    specialties: ['活動攝影', '人像攝影', '商業攝影'],
    availableDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
  },
  {
    id: 'staff-4',
    name: '陳雅婷',
    title: '專業主持人',
    avatar: 'https://i.pravatar.cc/150?img=26',
    rating: 4.7,
    specialties: ['企業活動', '婚禮主持', '尾牙春酒'],
    availableDays: [0, 5, 6], // Fri-Sun
  },
];

export const SERVICE_CATEGORIES = [
  { id: 'all', name: '全部服務' },
  { id: 'venue', name: '活動佈置' },
  { id: 'balloon', name: '氣球藝術' },
  { id: 'backdrop', name: '背板設計' },
  // { id: 'planning', name: '活動企劃' },
  // { id: 'photography', name: '攝影服務' },
  // { id: 'hosting', name: '主持服務' },
  // { id: 'other', name: '其他服務' }
];

// 生成可用時段（9:00-18:00，每小時一個時段）
export const generateTimeSlots = (_date: Date): string[] => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

// 檢查時段是否可用（簡單模擬，實際應該從後端取得）
export const isTimeSlotAvailable = (
  date: Date,
  time: string,
  staffId: string
): boolean => {
  // 模擬邏輯：隨機返回一些時段為不可用
  const seed = date.getTime() + time.charCodeAt(0) + staffId.charCodeAt(0);
  return seed % 3 !== 0;
};
