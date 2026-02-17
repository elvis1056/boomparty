import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};

  @media (max-width: 767px) {
    padding: ${theme.spacing.xl} ${theme.spacing.sm};
  }

  .confirm-booking-container {
    background: white;
    border-radius: ${theme.borderRadius.xl};
    padding: 40px;
    box-shadow: ${theme.shadows.md};

    @media (max-width: 1023px) {
      padding: 32px;
    }

    @media (max-width: 767px) {
      padding: 20px;
      border-radius: ${theme.borderRadius.lg};
    }
  }

  .header {
    margin-bottom: ${theme.spacing['2xl']};
    text-align: center;

    @media (max-width: 767px) {
      margin-bottom: ${theme.spacing.xl};
      text-align: left;
    }

    h2 {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.sm};

      @media (max-width: 1023px) {
        font-size: ${theme.typography.fontSize['2xl']};
      }

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.xl};
      }
    }

    p {
      font-size: ${theme.typography.fontSize.lg};
      color: ${theme.colors.neutral.gray500};

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.base};
      }
    }
  }

  .booking-details {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing['2xl']};

    @media (max-width: 767px) {
      gap: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.xl};
    }

    .detail-section {
      background: ${theme.colors.background.paper};
      border-radius: ${theme.borderRadius.lg};
      padding: ${theme.spacing.xl};
      border: 2px solid ${theme.colors.neutral.gray200};
      transition: all 0.2s ease;

      @media (max-width: 767px) {
        padding: ${theme.spacing.lg};
      }

      &:hover {
        border-color: ${theme.colors.primary.main};
        box-shadow: 0 4px 12px rgba(0, 206, 209, 0.1);
      }

      h3 {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text.primary};
        margin-bottom: ${theme.spacing.lg};

        @media (max-width: 767px) {
          font-size: ${theme.typography.fontSize.lg};
        }

        svg {
          flex-shrink: 0;
        }
      }

      .service-list {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.md};

        .service-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${theme.spacing.md};
          background: white;
          border-radius: ${theme.borderRadius.md};
          border: 2px solid ${theme.colors.neutral.gray200};

          @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
            gap: ${theme.spacing.sm};
          }

          .service-name {
            font-size: ${theme.typography.fontSize.base};
            font-weight: ${theme.typography.fontWeight.semibold};
            color: ${theme.colors.text.primary};
          }

          .service-info {
            display: flex;
            align-items: center;
            gap: ${theme.spacing.lg};

            @media (max-width: 767px) {
              width: 100%;
              justify-content: space-between;
            }

            .service-duration {
              font-size: ${theme.typography.fontSize.sm};
              color: ${theme.colors.neutral.gray500};

              &::before {
                content: '⏱️ ';
              }
            }

            .service-price {
              font-size: ${theme.typography.fontSize.base};
              font-weight: ${theme.typography.fontWeight.semibold};
              color: ${theme.colors.primary.main};
            }
          }
        }
      }

      .staff-info {
        .staff-name {
          font-size: ${theme.typography.fontSize.lg};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text.primary};
          margin-bottom: ${theme.spacing.xs};
        }

        .staff-title {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.neutral.gray500};
        }
      }

      .datetime-info {
        .datetime-value {
          font-size: ${theme.typography.fontSize.lg};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text.primary};
          line-height: 1.6;
        }
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: ${theme.spacing.lg};

        @media (max-width: 767px) {
          grid-template-columns: 1fr;
          gap: ${theme.spacing.md};
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.xs};

          &.notes {
            grid-column: 1 / -1;
          }

          .contact-label {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.neutral.gray500};
            font-weight: ${theme.typography.fontWeight.medium};
          }

          .contact-value {
            font-size: ${theme.typography.fontSize.base};
            color: ${theme.colors.text.primary};
            font-weight: ${theme.typography.fontWeight.semibold};
          }
        }
      }

      .payment-info {
        .payment-method {
          font-size: ${theme.typography.fontSize.lg};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text.primary};
          margin-bottom: ${theme.spacing.sm};
        }

        .payment-note {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.neutral.gray600};
          padding: ${theme.spacing.md};
          background: white;
          border-radius: ${theme.borderRadius.md};
          border: 2px solid ${theme.colors.neutral.gray200};
          line-height: 1.6;
        }
      }
    }
  }

  .total-price {
    background: linear-gradient(
      135deg,
      ${theme.colors.primary.main} 0%,
      ${theme.colors.primary.dark} 100%
    );
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.xl};
    box-shadow: 0 4px 12px rgba(0, 206, 209, 0.25);

    @media (max-width: 767px) {
      padding: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.lg};
    }

    .total-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 767px) {
        flex-direction: column;
        gap: ${theme.spacing.sm};
        align-items: flex-start;
      }
    }

    .total-label {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: white;
    }

    .total-amount {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: white;

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize['2xl']};
      }
    }
  }

  .notice-box {
    display: flex;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg};
    background: #fffbeb;
    border: 2px solid #fcd34d;
    border-radius: ${theme.borderRadius.lg};
    margin-bottom: ${theme.spacing['2xl']};

    @media (max-width: 767px) {
      padding: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.xl};
      gap: ${theme.spacing.sm};
    }

    svg {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .notice-content {
      flex: 1;

      .notice-title {
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: #92400e;
        margin-bottom: ${theme.spacing.sm};

        @media (max-width: 767px) {
          font-size: ${theme.typography.fontSize.sm};
        }
      }

      .notice-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.xs};

        li {
          font-size: ${theme.typography.fontSize.sm};
          color: #78350f;
          padding-left: ${theme.spacing.lg};
          position: relative;
          line-height: 1.6;

          @media (max-width: 767px) {
            font-size: ${theme.typography.fontSize.xs};
          }

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${theme.colors.warning};
            font-weight: ${theme.typography.fontWeight.bold};
          }
        }
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: ${theme.spacing.md};
    justify-content: center;
    margin-top: ${theme.spacing.xl};

    @media (max-width: 767px) {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      padding: ${theme.spacing.md};
      margin: 0 -20px -20px;
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
      border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
      z-index: 10;
    }
  }

  .btn-prev,
  .btn-confirm {
    padding: 16px 40px;
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    min-width: 160px;
    border: none;

    @media (max-width: 767px) {
      flex: 1;
      min-width: unset;
      padding: 14px 24px;
      font-size: ${theme.typography.fontSize.base};
      min-height: 48px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  .btn-prev {
    background: white;
    color: ${theme.colors.text.primary};
    border: 2px solid ${theme.colors.neutral.gray300};

    &:hover:not(:disabled) {
      background: ${theme.colors.background.paper};
      border-color: ${theme.colors.neutral.gray400};
    }
  }

  .btn-confirm {
    background: linear-gradient(
      135deg,
      ${theme.colors.primary.main} 0%,
      ${theme.colors.primary.dark} 100%
    );
    color: white;
    box-shadow: 0 2px 8px rgba(0, 206, 209, 0.2);

    &:hover:not(:disabled) {
      box-shadow: 0 6px 16px rgba(0, 206, 209, 0.35);
      transform: translateY(-2px);

      @media (max-width: 767px) {
        transform: none;
      }
    }

    &:disabled {
      background: ${theme.colors.neutral.gray300};
      cursor: not-allowed;
      transform: none;

      &:hover {
        box-shadow: none;
      }
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }

  /* Success State */
  .success-card {
    text-align: center;
    padding: ${theme.spacing['2xl']} ${theme.spacing.md};

    @media (max-width: 767px) {
      padding: ${theme.spacing.xl} ${theme.spacing.sm};
    }

    .success-icon {
      display: flex;
      justify-content: center;
      margin-bottom: ${theme.spacing['2xl']};
      animation: successPop 0.5s ease-out;

      @media (max-width: 767px) {
        margin-bottom: ${theme.spacing.xl};
      }
    }

    @keyframes successPop {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    h2 {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.md};

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize['2xl']};
      }
    }

    .success-message {
      font-size: ${theme.typography.fontSize.lg};
      color: ${theme.colors.neutral.gray500};
      margin-bottom: ${theme.spacing['2xl']};
      line-height: 1.6;

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.base};
        margin-bottom: ${theme.spacing.xl};
      }
    }

    .booking-reference {
      background: linear-gradient(135deg, #f0fdfd 0%, #ffffff 100%);
      border: 2px solid ${theme.colors.primary.main};
      border-radius: ${theme.borderRadius.lg};
      padding: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing['2xl']};
      box-shadow: 0 2px 8px rgba(0, 206, 209, 0.15);

      @media (max-width: 767px) {
        padding: ${theme.spacing.md};
        margin-bottom: ${theme.spacing.xl};
      }

      .reference-label {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.neutral.gray500};
        margin-bottom: ${theme.spacing.xs};
      }

      .reference-number {
        font-size: ${theme.typography.fontSize['2xl']};
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.primary.main};
        font-family: monospace;
        letter-spacing: 0.05em;

        @media (max-width: 767px) {
          font-size: ${theme.typography.fontSize.xl};
        }
      }
    }

    .success-info {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.md};
      margin-bottom: ${theme.spacing['2xl']};
      padding: ${theme.spacing.lg};
      background: ${theme.colors.background.paper};
      border-radius: ${theme.borderRadius.lg};

      @media (max-width: 767px) {
        gap: ${theme.spacing.sm};
        padding: ${theme.spacing.md};
        margin-bottom: ${theme.spacing.xl};
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.neutral.gray600};
        justify-content: center;

        svg {
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          font-size: ${theme.typography.fontSize.xs};
          justify-content: flex-start;
          text-align: left;
        }
      }
    }

    .success-actions {
      display: flex;
      gap: ${theme.spacing.md};
      justify-content: center;

      @media (max-width: 767px) {
        flex-direction: column;
      }

      button {
        padding: 14px 32px;
        border-radius: ${theme.borderRadius.md};
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.semibold};
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        min-height: 48px;

        @media (max-width: 767px) {
          width: 100%;
          padding: 14px 24px;
        }

        &:active {
          transform: scale(0.98);
        }
      }

      .btn-home {
        background: white;
        color: ${theme.colors.text.primary};
        border: 2px solid ${theme.colors.neutral.gray300};

        &:hover {
          border-color: ${theme.colors.primary.main};
          color: ${theme.colors.primary.main};
          background: ${theme.colors.primary.light}08;
        }
      }

      .btn-booking {
        background: linear-gradient(
          135deg,
          ${theme.colors.primary.main} 0%,
          ${theme.colors.primary.dark} 100%
        );
        color: white;
        box-shadow: 0 2px 8px rgba(0, 206, 209, 0.2);

        &:hover {
          box-shadow: 0 6px 16px rgba(0, 206, 209, 0.35);
          transform: translateY(-2px);

          @media (max-width: 767px) {
            transform: none;
          }
        }
      }
    }
  }
`;
