import { redirect } from 'next/navigation';

export const metadata = {
  title: '線上預約 - boomparty',
  description: '預約活動公關服務，專業團隊為您服務',
};

export default function BookingPage() {
  redirect('/booking/service');
}
