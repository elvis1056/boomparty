import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};

  @media (max-width: 1023px) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }

  @media (max-width: 767px) {
    padding: ${theme.spacing.xl} ${theme.spacing.sm};
  }

  .success-container {
    background: white;
    border-radius: ${theme.borderRadius.xl};
    padding: 48px 40px;
    box-shadow: ${theme.shadows.md};
    text-align: center;

    @media (max-width: 1023px) {
      padding: 40px 32px;
    }

    @media (max-width: 767px) {
      padding: 28px 20px;
      border-radius: ${theme.borderRadius.lg};
    }

    .success-icon {
      display: flex;
      justify-content: center;
      margin-bottom: ${theme.spacing['2xl']};
      animation: successPop 0.5s ease-out;

      @media (max-width: 767px) {
        margin-bottom: ${theme.spacing.xl};
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
    }

    h2 {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.md};

      @media (max-width: 1023px) {
        font-size: ${theme.typography.fontSize['2xl']};
      }

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.xl};
      }
    }

    .success-message {
      font-size: ${theme.typography.fontSize.lg};
      color: ${theme.colors.neutral.gray500};
      line-height: 1.6;
      margin-bottom: ${theme.spacing['2xl']};

      @media (max-width: 1023px) {
        font-size: ${theme.typography.fontSize.base};
      }

      @media (max-width: 767px) {
        margin-bottom: ${theme.spacing.xl};
      }
    }

    .booking-reference {
      background: linear-gradient(135deg, #f0fdfd 0%, #ffffff 100%);
      border: 2px solid ${theme.colors.primary.main};
      border-radius: ${theme.borderRadius.lg};
      padding: ${theme.spacing.lg} ${theme.spacing.xl};
      margin-bottom: ${theme.spacing['2xl']};
      box-shadow: 0 2px 8px rgba(0, 206, 209, 0.15);

      @media (max-width: 767px) {
        padding: ${theme.spacing.md} ${theme.spacing.lg};
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
      padding: ${theme.spacing.lg};
      background: ${theme.colors.background.paper};
      border-radius: ${theme.borderRadius.lg};
      margin-bottom: ${theme.spacing['2xl']};

      @media (max-width: 767px) {
        gap: ${theme.spacing.sm};
        padding: ${theme.spacing.md};
        margin-bottom: ${theme.spacing.xl};
      }

      .info-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${theme.spacing.sm};
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.neutral.gray600};

        @media (max-width: 767px) {
          justify-content: flex-start;
          font-size: ${theme.typography.fontSize.xs};
        }

        svg {
          flex-shrink: 0;
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

      .btn-home,
      .btn-booking {
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
