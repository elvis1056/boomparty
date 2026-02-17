import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .staff-select-container {
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

    .header {
      margin-bottom: ${theme.spacing['2xl']};

      @media (max-width: 767px) {
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
  }

  .staff-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.xl};

    @media (max-width: 1023px) {
      gap: ${theme.spacing.lg};
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.lg};
    }
  }

  .staff-card {
    border: 2px solid ${theme.colors.neutral.gray200};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.xl};
    background: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    @media (max-width: 767px) {
      padding: ${theme.spacing.lg};
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
      border-color: ${theme.colors.primary.main};

      @media (max-width: 767px) {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }
    }

    &.selected {
      border-color: ${theme.colors.primary.main};
      border-width: 3px;
      box-shadow: 0 8px 20px rgba(0, 206, 209, 0.25);
      background: linear-gradient(
        to bottom,
        ${theme.colors.primary.light}08,
        white
      );

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(
          90deg,
          ${theme.colors.primary.main},
          ${theme.colors.primary.light}
        );
        border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
      }
    }

    /* 觸控設備優化 */
    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }
  }

  .staff-header {
    display: flex;
    gap: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.lg};
    padding-bottom: ${theme.spacing.lg};
    border-bottom: 2px solid ${theme.colors.neutral.gray100};

    @media (max-width: 767px) {
      gap: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.md};
      padding-bottom: ${theme.spacing.md};
    }
  }

  .staff-avatar {
    flex-shrink: 0;
    position: relative;

    img {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .staff-card:hover & img {
      transform: scale(1.05);

      @media (max-width: 767px) {
        transform: none;
      }
    }
  }

  .staff-info {
    flex: 1;

    h3 {
      font-size: ${theme.typography.fontSize.xl};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
      margin-bottom: 4px;
    }

    .title {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.gray500};
      margin-bottom: ${theme.spacing.sm};
    }

    .rating {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      background: ${theme.colors.background.paper};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      border-radius: ${theme.borderRadius.full};
      width: fit-content;

      .stars {
        display: flex;
        gap: 2px;

        svg {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }
      }

      .rating-score {
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.text.primary};
        margin-left: 2px;
      }
    }
  }

  .staff-details {
    margin-bottom: 20px;

    .detail-section {
      margin-bottom: ${theme.spacing.md};

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text.primary};
        margin-bottom: ${theme.spacing.sm};
      }

      .specialties-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          position: relative;
          padding-left: ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.neutral.gray500};
          line-height: 1.8;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${theme.colors.primary.main};
            font-weight: ${theme.typography.fontWeight.bold};
          }
        }
      }

      .available-days {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.neutral.gray500};
        line-height: 1.6;
      }
    }
  }

  .btn-select-staff {
    width: 100%;
    padding: 14px 24px;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid ${theme.colors.primary.main};
    background: white;
    color: ${theme.colors.primary.main};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};

    @media (max-width: 767px) {
      padding: 12px 20px;
      font-size: ${theme.typography.fontSize.sm};
    }

    &:hover {
      background: ${theme.colors.primary.main};
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 206, 209, 0.3);

      @media (max-width: 767px) {
        transform: none;
      }
    }

    &:active {
      transform: scale(0.98);
    }

    &.selected {
      background: ${theme.colors.primary.main};
      color: white;
      box-shadow: 0 2px 8px rgba(0, 206, 209, 0.2);
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
  .btn-next {
    padding: 16px 40px;
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    min-width: 160px;

    @media (max-width: 767px) {
      flex: 1;
      min-width: unset;
      padding: 14px 24px;
      font-size: ${theme.typography.fontSize.base};
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

  .btn-next {
    background: ${theme.colors.primary.main};
    color: white;
    box-shadow: 0 2px 8px rgba(0, 206, 209, 0.2);

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 206, 209, 0.35);

      @media (max-width: 767px) {
        transform: none;
      }
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
`;
