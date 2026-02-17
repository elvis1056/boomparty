import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;

  .booking-form-wrapper {
    max-width: 1400px;
    min-width: 1024px;
    margin: 0 auto;

    @media (max-width: 1023px) {
      min-width: unset;
      max-width: 100%;
    }
  }

  .header {
    margin-bottom: ${theme.spacing.xl};
    text-align: center;

    @media (max-width: 767px) {
      text-align: left;
      margin-bottom: ${theme.spacing.lg};
    }

    h2 {
      font-size: 2rem;
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.sm};

      @media (max-width: 1023px) {
        font-size: 1.75rem;
      }

      @media (max-width: 767px) {
        font-size: 1.5rem;
      }
    }

    p {
      font-size: ${theme.typography.fontSize.lg};
      color: ${theme.colors.text.secondary};

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.base};
      }
    }
  }

  .booking-form-container {
    display: flex;
    gap: ${theme.spacing.xl};

    @media (max-width: 1023px) {
      flex-direction: column;
    }
  }

  .form-content {
    flex: 1;
    min-width: 0;

    @media (max-width: 1023px) {
      padding-bottom: 180px; // 留空間給固定底部
    }
  }

  .section {
    background: white;
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.sm};

    @media (max-width: 1023px) {
      padding: ${theme.spacing.lg};
    }
  }

  .section-title {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.lg};
  }

  /* 表演者資訊 */
  .performer-info {
    background: ${theme.colors.background.paper};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.lg};

    .label {
      color: ${theme.colors.text.secondary};
      font-size: ${theme.typography.fontSize.sm};
    }

    .name {
      color: ${theme.colors.text.primary};
      font-weight: ${theme.typography.fontWeight.semibold};
      margin-left: ${theme.spacing.sm};
    }

    .title {
      color: ${theme.colors.text.secondary};
      margin-left: ${theme.spacing.xs};
    }
  }

  /* 時間選擇區 */
  .datetime-selector {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: ${theme.spacing.xl};

    @media (max-width: 1023px) {
      grid-template-columns: 1fr;
    }
  }

  .calendar-section {
    .react-calendar {
      width: 100%;
      border: 1px solid ${theme.colors.border.light};
      border-radius: ${theme.borderRadius.md};
      font-family: ${theme.typography.fontFamily.base};
      line-height: 1.5;
      padding: ${theme.spacing.md};

      button {
        font-size: ${theme.typography.fontSize.sm};
        border-radius: ${theme.borderRadius.sm};

        &:hover:not(:disabled) {
          background: ${theme.colors.background.paper};
        }

        &.react-calendar__tile--active {
          background: ${theme.colors.primary.main};
          color: white;

          &:hover {
            background: ${theme.colors.primary.dark};
          }
        }
      }
    }
  }

  .timeslot-section {
    .selected-date-display {
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.lg};
      padding: ${theme.spacing.md};
      background: ${theme.colors.background.paper};
      border-radius: ${theme.borderRadius.md};
      text-align: center;
    }

    .timeslot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: ${theme.spacing.md};

      @media (max-width: 767px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .timeslot-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing.xs};
      padding: ${theme.spacing.md};
      background: white;
      border: 2px solid ${theme.colors.border.light};
      border-radius: ${theme.borderRadius.md};
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.text.primary};
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: ${theme.colors.primary.main};
        background: ${theme.colors.primary.light}10;
      }

      &.selected {
        background: ${theme.colors.primary.main};
        border-color: ${theme.colors.primary.main};
        color: white;
      }

      .duration-hint {
        font-size: ${theme.typography.fontSize.xs};
        opacity: 0.9;
      }
    }
  }

  /* 表單樣式 */
  .form-group {
    margin-bottom: ${theme.spacing.xl};

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 767px) {
      margin-bottom: ${theme.spacing.lg};
    }
  }

  .form-label {
    display: block;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};

    @media (max-width: 767px) {
      font-size: ${theme.typography.fontSize.sm};
    }

    .required {
      color: ${theme.colors.error};
      margin-left: 2px;
    }
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 14px ${theme.spacing.md};
    border: 2px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.base};
    font-family: ${theme.typography.fontFamily.base};
    transition: all 0.2s ease;
    background: white;

    @media (max-width: 767px) {
      padding: 12px ${theme.spacing.md};
      font-size: 16px; // 防止 iOS 縮放
    }

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 4px ${theme.colors.primary.main}15;
    }

    &.error {
      border-color: ${theme.colors.error};
      background: #fee2e210;

      &:focus {
        box-shadow: 0 0 0 4px ${theme.colors.error}15;
      }
    }

    &::placeholder {
      color: ${theme.colors.neutral.gray400};
    }
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }

  .form-error {
    color: ${theme.colors.error};
    font-size: ${theme.typography.fontSize.sm};
    margin-top: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: '⚠️';
      font-size: 14px;
    }
  }

  /* 付款方式 */
  .payment-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }

  .payment-card {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg};
    background: white;
    border: 2px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: ${theme.colors.primary.main};
      background: ${theme.colors.primary.light}10;
    }

    &.selected {
      border-color: ${theme.colors.primary.main};
      background: ${theme.colors.primary.light}10;

      .payment-icon svg {
        color: ${theme.colors.primary.main};
      }
    }

    .payment-icon {
      flex-shrink: 0;

      svg {
        color: ${theme.colors.neutral.gray400};
        transition: color 0.2s;
      }
    }

    .payment-info {
      flex: 1;

      h4 {
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text.primary};
        margin-bottom: ${theme.spacing.xs};
      }

      p {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.text.secondary};
      }
    }
  }

  /* 桌面版摘要側邊欄 */
  .summary-sidebar.desktop-only {
    width: 380px;
    flex-shrink: 0;

    @media (max-width: 1023px) {
      display: none; // 手機版隱藏
    }

    .summary-sticky {
      position: sticky;
      top: 80px;
      background: white;
      border-radius: ${theme.borderRadius.lg};
      padding: ${theme.spacing.xl};
      box-shadow: ${theme.shadows.md};

      @media (max-width: 1023px) {
        position: static;
      }

      h3 {
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.text.primary};
        margin-bottom: ${theme.spacing.lg};
        padding-bottom: ${theme.spacing.md};
        border-bottom: 1px solid ${theme.colors.border.light};
      }
    }
  }

  .summary-section {
    margin-bottom: ${theme.spacing.lg};
  }

  .summary-item {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.md} 0;
    border-bottom: 1px solid ${theme.colors.border.light};

    &:last-child {
      border-bottom: none;
    }

    .summary-label {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
    }

    .summary-value {
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.text.primary};
    }
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.lg};
    background: ${theme.colors.background.paper};
    border-radius: ${theme.borderRadius.md};
    margin-top: ${theme.spacing.lg};

    .total-label {
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.text.secondary};
    }

    .total-amount {
      font-size: ${theme.typography.fontSize.xxl};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.primary.main};
    }
  }

  /* 導航按鈕 */
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.lg};

    button {
      width: 100%;
      padding: ${theme.spacing.md};
      border: none;
      border-radius: ${theme.borderRadius.md};
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.semibold};
      cursor: pointer;
      transition: all 0.2s;

      &.btn-prev {
        background: white;
        color: ${theme.colors.text.primary};
        border: 2px solid ${theme.colors.neutral.gray300};

        &:hover {
          background: ${theme.colors.background.paper};
        }
      }

      &.btn-next {
        background: ${theme.colors.primary.main};
        color: white;

        &:hover {
          background: ${theme.colors.primary.dark};
        }

        &:disabled {
          background: ${theme.colors.neutral.gray300};
          cursor: not-allowed;
        }
      }
    }
  }

  .error-message {
    text-align: center;
    padding: ${theme.spacing.xl};
    background: #fee2e2;
    color: ${theme.colors.error};
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.lg};
  }

  /* 手機版固定底部摘要欄 */
  .mobile-summary-footer {
    display: none;

    @media (max-width: 1023px) {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
      border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
      z-index: 100;
      padding-bottom: env(safe-area-inset-bottom, 20px);
    }
  }

  .summary-compact {
    &.expanded {
      .summary-simple {
        display: none;
      }
    }

    &:not(.expanded) {
      .summary-detail {
        display: none;
      }
    }
  }

  /* 簡化摘要 */
  .summary-simple {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    cursor: pointer;

    .summary-info {
      margin-bottom: ${theme.spacing.sm};
    }

    .service-name {
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text.primary};

      .time-brief {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.text.secondary};
        font-weight: normal;
      }
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: ${theme.spacing.xs};

      .total-price {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.primary.main};
      }

      .expand-icon {
        font-size: 20px;
      }
    }
  }

  /* 詳細摘要 */
  .summary-detail {
    max-height: 60vh;
    overflow-y: auto;

    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      border-bottom: 1px solid ${theme.colors.border.light};

      h4 {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.text.primary};
        margin: 0;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        color: ${theme.colors.text.secondary};
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: ${theme.colors.text.primary};
        }
      }
    }

    .summary-content {
      padding: ${theme.spacing.lg};

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.xs};
        padding: ${theme.spacing.sm} 0;
        border-bottom: 1px solid ${theme.colors.border.light};

        &:last-of-type {
          border-bottom: none;
        }

        .label {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.text.secondary};
        }

        .value {
          font-size: ${theme.typography.fontSize.base};
          color: ${theme.colors.text.primary};
        }
      }

      .detail-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.spacing.md};
        background: ${theme.colors.background.paper};
        border-radius: ${theme.borderRadius.md};
        margin-top: ${theme.spacing.md};

        .label {
          font-size: ${theme.typography.fontSize.base};
          font-weight: ${theme.typography.fontWeight.medium};
          color: ${theme.colors.text.secondary};
        }

        .value {
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.bold};
          color: ${theme.colors.primary.main};
        }
      }
    }
  }

  /* 手機版按鈕 */
  .mobile-action-buttons {
    display: flex;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm} ${theme.spacing.lg} 0;

    button {
      flex: 1;
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      border: none;
      border-radius: ${theme.borderRadius.md};
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.semibold};
      cursor: pointer;
      transition: all 0.2s;
      min-height: 48px;

      &.btn-prev {
        background: white;
        color: ${theme.colors.text.primary};
        border: 2px solid ${theme.colors.neutral.gray300};

        &:hover {
          background: ${theme.colors.background.paper};
        }
      }

      &.btn-next {
        background: ${theme.colors.primary.main};
        color: white;

        &:hover {
          background: ${theme.colors.primary.dark};
        }

        &:disabled {
          background: ${theme.colors.neutral.gray300};
          cursor: not-allowed;
        }
      }
    }
  }

  /* 付款方式手機版優化 */
  .payment-grid {
    @media (max-width: 767px) {
      grid-template-columns: 1fr; // 單列排列
      gap: ${theme.spacing.sm};
    }
  }

  .payment-card {
    @media (max-width: 767px) {
      padding: ${theme.spacing.lg} ${theme.spacing.md};

      .payment-icon svg {
        width: 40px;
        height: 40px;
      }
    }
  }
`;
