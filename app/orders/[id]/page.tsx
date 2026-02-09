import OrderDetailContent from '@/features/order/OrderDetailContent';

export const metadata = {
  title: '訂單詳情 | boomparty',
  description: '查看訂單詳細資訊',
};

// 靜態導出模式：生成幾個示例訂單頁面供展示
export function generateStaticParams() {
  // 在靜態模式下生成示例訂單 ID
  // 在動態模式下這個函數會被忽略
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function OrderDetailPage() {
  return <OrderDetailContent />;
}
