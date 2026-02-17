'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { SERVICE_CATEGORY } from '@/constants/booking-constants';
import { SERVICES, SERVICE_CATEGORIES } from '@/constants/booking-data';
import { assetPath } from '@/lib/utils/asset-path';
import { useBookingStore } from '@/stores/bookingStore';

import style from './style';

interface ServiceSelectProps {
  className?: string;
}

function ServiceSelect({ className }: ServiceSelectProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    SERVICE_CATEGORY.ALL
  );
  const { selectedService, setSelectedService } = useBookingStore();

  const filteredServices =
    selectedCategory === SERVICE_CATEGORY.ALL
      ? SERVICES
      : SERVICES.filter((service) => service.category === selectedCategory);

  const isServiceSelected = (serviceId: string) => {
    return selectedService?.id === serviceId;
  };

  const canProceed = selectedService !== null;

  const goToNextStep = () => {
    if (!selectedService) return;

    // 根據服務類型決定下一步
    if (selectedService.requiresPerformer) {
      router.push('/booking/staff');
    } else {
      router.push('/booking/form');
    }
  };

  return (
    <div className={className}>
      <div className="service-select-container">
        <div className="header">
          <h2>選擇服務項目</h2>
          <p>請選擇您需要的服務</p>
        </div>

        {/* 服務分類 */}
        <div className="category-tabs">
          {SERVICE_CATEGORIES.map((category) => (
            <button
              className={`category-tab ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 服務列表 */}
        <div className="service-grid">
          {filteredServices.map((service) => (
            <div
              className={`service-card ${
                isServiceSelected(service.id) ? 'selected' : ''
              }`}
              key={service.id}
              onClick={() => setSelectedService(service)}
            >
              <div className="service-image">
                <Image
                  alt={service.name}
                  height={200}
                  src={assetPath(service.image)}
                  style={{ objectFit: 'cover' }}
                  width={300}
                />
                {selectedService?.id === service.id && (
                  <div className="selected-badge">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                      <circle cx="12" cy="12" fill="#00CED1" r="12" />
                      <path
                        d="M17 9L10.5 15.5L7 12"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <p className="description">{service.description}</p>
                <div className="service-meta">
                  <span className="duration">{service.duration} 分鐘</span>
                  <span className="price">
                    NT$ {service.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 導航按鈕 */}
        <div className="action-buttons">
          <button
            className="btn-next"
            disabled={!canProceed}
            onClick={goToNextStep}
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  );
}

export default styled(ServiceSelect)`
  ${style}
`;
