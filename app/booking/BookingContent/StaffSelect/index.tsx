'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { STAFF_MEMBERS } from '@/constants/booking-data';
import { assetPath } from '@/lib/utils/asset-path';
import { useBookingStore } from '@/stores/bookingStore';

import style from './style';

interface StaffSelectProps {
  className?: string;
}

function StaffSelect({ className }: StaffSelectProps) {
  const router = useRouter();
  const { selectedPerformer, setSelectedPerformer } = useBookingStore();

  const isStaffSelected = (staffId: string) => {
    return selectedPerformer?.id === staffId;
  };

  const canProceed = selectedPerformer !== null;

  // 將數字陣列轉換為星期文字
  const formatAvailableDays = (days: number[]) => {
    const dayNames = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return days.map((day) => dayNames[day]).join('、');
  };

  // 渲染星星評分
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          fill="#FBBF24"
          height="16"
          key={`full-${i}`}
          viewBox="0 0 16 16"
          width="16"
        >
          <path d="M8 0l2.163 5.455L16 6.18l-4 3.899.944 6.921L8 13.455 3.056 17l.944-6.921-4-3.899 5.837-.725L8 0z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg fill="none" height="16" key="half" viewBox="0 0 16 16" width="16">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path
            d="M8 0l2.163 5.455L16 6.18l-4 3.899.944 6.921L8 13.455 3.056 17l.944-6.921-4-3.899 5.837-.725L8 0z"
            fill="url(#half-fill)"
          />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          fill="#E5E7EB"
          height="16"
          key={`empty-${i}`}
          viewBox="0 0 16 16"
          width="16"
        >
          <path d="M8 0l2.163 5.455L16 6.18l-4 3.899.944 6.921L8 13.455 3.056 17l.944-6.921-4-3.899 5.837-.725L8 0z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className={className}>
      <div className="staff-select-container">
        <div className="header">
          <h2>選擇表演者</h2>
          <p>請選擇您偏好的專業表演者</p>
        </div>

        {/* 表演者列表 */}
        <div className="staff-grid">
          {STAFF_MEMBERS.map((staff) => (
            <div
              className={`staff-card ${isStaffSelected(staff.id) ? 'selected' : ''}`}
              key={staff.id}
            >
              <div className="staff-header">
                <div className="staff-avatar">
                  <Image
                    alt={staff.name}
                    height={80}
                    src={assetPath(staff.avatar)}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    width={80}
                  />
                </div>
                <div className="staff-info">
                  <h3>{staff.name}</h3>
                  <p className="title">{staff.title}</p>
                  <div className="rating">
                    <div className="stars">{renderRating(staff.rating)}</div>
                    <span className="rating-score">{staff.rating}</span>
                  </div>
                </div>
              </div>

              <div className="staff-details">
                <div className="detail-section">
                  <h4>專長領域</h4>
                  <ul className="specialties-list">
                    {staff.specialties.map((specialty, index) => (
                      <li key={index}>{specialty}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h4>可預約時間</h4>
                  <p className="available-days">
                    {formatAvailableDays(staff.availableDays)}
                  </p>
                </div>
              </div>

              <button
                className={`btn-select-staff ${isStaffSelected(staff.id) ? 'selected' : ''}`}
                onClick={() => setSelectedPerformer(staff)}
              >
                {isStaffSelected(staff.id) ? (
                  <>
                    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                      <circle cx="10" cy="10" fill="white" r="10" />
                      <path
                        d="M14 7L8.5 12.5L6 10"
                        stroke="#00CED1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    已選擇
                  </>
                ) : (
                  '選擇此表演者'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* 導航按鈕 */}
        <div className="action-buttons">
          <button
            className="btn-prev"
            onClick={() => router.push('/booking/service')}
          >
            上一步
          </button>
          <button
            className="btn-next"
            disabled={!canProceed}
            onClick={() => router.push('/booking/form')}
          >
            下一步：填寫資料
          </button>
        </div>
      </div>
    </div>
  );
}

export default styled(StaffSelect)`
  ${style}
`;
