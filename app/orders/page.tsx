import OrderListContent from '@/features/order/OrderListContent';

export const metadata = {
  title: '我的訂單 | boomparty',
  description: '查看您的訂單記錄',
};

export default function OrdersPage() {
  return <OrderListContent />;
}
