import type { Metadata } from 'next';

import OrderCalculator from '@/features/order/OrderCalculator';

import PageContent from './PageContent';

export const metadata: Metadata = {
  title: '快速訂購方案 | BoomParty 造型氣球',
  description:
    '寶劍、水槍、六瓣花、狗狗、小熊，多款造型氣球快速訂購，適合生日派對、公司小物、學校、畢業、情人節。',
};

export default function OrderSpecialPackagePage() {
  return (
    <PageContent>
      <OrderCalculator />
    </PageContent>
  );
}
