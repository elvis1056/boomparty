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

  .status-container {
    background: white;
    border-radius: ${theme.borderRadius.xl};
    padding: 48px 40px;
    box-shadow: ${theme.shadows.md};

    @media (max-width: 1023px) {
      padding: 40px 32px;
    }

    @media (max-width: 767px) {
      padding: 28px 20px;
      border-radius: ${theme.borderRadius.lg};
    }

    .header {
      text-align: center;
      margin-bottom: ${theme.spacing['2xl']};

      @media (max-width: 767px) {
        text-align: left;
        margin-bottom: ${theme.spacing.xl};
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

    .search-form {
      display: flex;
      gap: ${theme.spacing.md};
      max-width: 560px;
      margin: 0 auto ${theme.spacing['2xl']};

      @media (max-width: 1023px) {
        max-width: 100%;
        margin-bottom: ${theme.spacing.xl};
      }

      @media (max-width: 767px) {
        flex-direction: column;
        gap: ${theme.spacing.sm};
        margin-bottom: ${theme.spacing.xl};
      }

      input {
        flex: 1;
        padding: 14px ${theme.spacing.lg};
        border: 2px solid ${theme.colors.neutral.gray300};
        border-radius: ${theme.borderRadius.md};
        font-size: ${theme.typography.fontSize.base};
        color: ${theme.colors.text.primary};
        font-family: monospace;
        letter-spacing: 0.03em;
        transition: border-color 0.2s ease;
        outline: none;

        &::placeholder {
          color: ${theme.colors.neutral.gray400};
          font-family: inherit;
          letter-spacing: normal;
        }

        &:focus {
          border-color: ${theme.colors.primary.main};
          box-shadow: 0 0 0 3px rgba(0, 206, 209, 0.1);
        }
      }

      .btn-search {
        padding: 14px 28px;
        background: linear-gradient(
          135deg,
          ${theme.colors.primary.main} 0%,
          ${theme.colors.primary.dark} 100%
        );
        color: white;
        border: none;
        border-radius: ${theme.borderRadius.md};
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.semibold};
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        min-height: 48px;
        box-shadow: 0 2px 8px rgba(0, 206, 209, 0.2);

        @media (max-width: 767px) {
          width: 100%;
        }

        &:hover:not(:disabled) {
          box-shadow: 0 6px 16px rgba(0, 206, 209, 0.35);
          transform: translateY(-2px);

          @media (max-width: 767px) {
            transform: none;
          }
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
        }

        &:active:not(:disabled) {
          transform: translateY(0);
        }
      }
    }

    .result-card {
      max-width: 560px;
      margin: 0 auto;
      border: 2px solid ${theme.colors.primary.main};
      border-radius: ${theme.borderRadius.lg};
      padding: ${theme.spacing.xl};
      background: linear-gradient(135deg, #f0fdfd 0%, #ffffff 100%);
      box-shadow: 0 2px 8px rgba(0, 206, 209, 0.15);

      @media (max-width: 1023px) {
        max-width: 100%;
      }

      @media (max-width: 767px) {
        padding: ${theme.spacing.lg};
      }

      .result-reference {
        margin-bottom: ${theme.spacing.lg};
        padding-bottom: ${theme.spacing.lg};
        border-bottom: 1px solid ${theme.colors.neutral.gray200};

        .label {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.neutral.gray500};
          margin-bottom: ${theme.spacing.xs};
        }

        .value {
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.bold};
          color: ${theme.colors.primary.main};
          font-family: monospace;
          letter-spacing: 0.05em;

          @media (max-width: 767px) {
            font-size: ${theme.typography.fontSize.lg};
          }
        }
      }

      .result-status {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.md};
        margin-bottom: ${theme.spacing.lg};

        .label {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.neutral.gray500};
          flex-shrink: 0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: ${theme.spacing.xs};
          padding: 4px 12px;
          border-radius: ${theme.borderRadius.full};
          font-size: ${theme.typography.fontSize.sm};
          font-weight: ${theme.typography.fontWeight.semibold};

          &.pending {
            background: #fef3c7;
            color: #92400e;
          }

          &.confirmed {
            background: #d1fae5;
            color: #065f46;
          }

          &.cancelled {
            background: #fee2e2;
            color: #991b1b;
          }
        }
      }

      .result-date {
        .label {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.neutral.gray500};
          margin-bottom: ${theme.spacing.xs};
        }

        .value {
          font-size: ${theme.typography.fontSize.base};
          color: ${theme.colors.text.primary};
          font-weight: ${theme.typography.fontWeight.medium};
        }
      }
    }

    .not-found {
      max-width: 560px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing.md};
      padding: ${theme.spacing.xl};
      background: ${theme.colors.background.paper};
      border: 2px solid ${theme.colors.neutral.gray200};
      border-radius: ${theme.borderRadius.lg};
      text-align: center;

      @media (max-width: 1023px) {
        max-width: 100%;
      }

      p {
        font-size: ${theme.typography.fontSize.base};
        color: ${theme.colors.neutral.gray500};
        line-height: 1.6;

        @media (max-width: 767px) {
          font-size: ${theme.typography.fontSize.sm};
        }
      }
    }
  }
`;
