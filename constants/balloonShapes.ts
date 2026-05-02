export type BalloonCategory = 'SHAPED';
// 未來新增：'STICK' (棒狀氣球產品線)

export interface BalloonShape {
  id: string;
  name: string;
  price: number;
  image: string | null; // null 代表圖片尚未拍攝，顯示 Shimmer
  category: BalloonCategory;
}

export const BALLOON_SHAPES: BalloonShape[] = [
  {
    id: 'sword',
    name: '寶劍',
    price: 15,
    image:
      'https://api.boomparty.tw/media/9ef98239-ae01-4848-bc71-887e74f9eeb4.png',
    category: 'SHAPED',
  },
  {
    id: 'gun',
    name: '水槍',
    price: 40,
    image:
      'https://api.boomparty.tw/media/e1a70a22-ba38-46e6-ab19-297236159155.jpg',
    category: 'SHAPED',
  },
  {
    id: 'flower',
    name: '六瓣花',
    price: 60,
    image:
      'https://api.boomparty.tw/media/57e4cb18-fa0a-47dc-b2b0-912ecd276372.png',
    category: 'SHAPED',
  },
  {
    id: 'dog',
    name: '狗狗',
    price: 30,
    image:
      'https://api.boomparty.tw/media/6301658e-523d-4ceb-ba22-b8153a74787b.png',
    category: 'SHAPED',
  },
  {
    id: 'bear',
    name: '小熊',
    price: 50,
    image:
      'https://api.boomparty.tw/media/ed133c71-33c2-4600-b4fa-34a9068e4e31.jpg',
    category: 'SHAPED',
  },
  {
    id: 'metal-dog',
    name: '金屬氣球狗',
    price: 50,
    image:
      'https://api.boomparty.tw/media/2042a7f8-59c1-4aae-9935-b760a42dc4a8.jpg',
    category: 'SHAPED',
  },
];
