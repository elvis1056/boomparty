'use client';

import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import StepIndicator from '@/components/StepIndicator';
import { BOOKING_STEP_LABELS } from '@/constants/booking-constants';

import style from '../style';

interface BookingLayoutContentProps {
  children: React.ReactNode;
  className?: string;
}

// URL 到 step 的映射
const URL_TO_STEP: Record<string, number> = {
  '/booking/service': 1,
  '/booking/staff': 2,
  '/booking/form': 3,
  '/booking/confirm': 4,
};

function BookingLayoutContent({
  children,
  className,
}: BookingLayoutContentProps) {
  const pathname = usePathname();
  const currentStep = URL_TO_STEP[pathname] || 1;

  return (
    <div className={className}>
      <div className="booking-container">
        <div className="booking-header">
          <h1>線上預約</h1>
          <p>專業活動公關服務，為您打造完美活動體驗</p>
        </div>

        <StepIndicator currentStep={currentStep} steps={BOOKING_STEP_LABELS} />

        <div className="booking-content">{children}</div>
      </div>
    </div>
  );
}

export default styled(BookingLayoutContent)`
  ${style}
`;
