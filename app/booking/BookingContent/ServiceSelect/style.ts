import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .service-select-container {
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
      }

      p {
        font-size: ${theme.typography.fontSize.lg};
        color: ${theme.colors.neutral.gray500};
      }
    }
  }

  .category-tabs {
    display: flex;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing['2xl']};
    overflow-x: auto;
    padding-bottom: ${theme.spacing.sm};

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.neutral.gray300};
      border-radius: 2px;
    }
  }

  .category-tab {
    padding: 12px 24px;
    border: 2px solid ${theme.colors.neutral.gray200};
    border-radius: ${theme.borderRadius.full};
    background: white;
    color: ${theme.colors.neutral.gray600};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 767px) {
      padding: 10px 18px;
      font-size: ${theme.typography.fontSize.sm};
    }

    &:hover {
      border-color: ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
      background: ${theme.colors.primary.light}10;
    }

    &.active {
      background: ${theme.colors.primary.main};
      border-color: ${theme.colors.primary.main};
      color: white;
      box-shadow: 0 2px 8px rgba(0, 206, 209, 0.3);
    }
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.xl};

    @media (max-width: 1279px) {
      // 小桌機/平板橫向
      grid-template-columns: repeat(2, 1fr);
      gap: ${theme.spacing.lg};
    }

    @media (max-width: 767px) {
      // 手機
      grid-template-columns: 1fr;
      gap: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.lg};
    }
  }

  .service-card {
    border: 2px solid ${theme.colors.neutral.gray200};
    border-radius: ${theme.borderRadius.lg};
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: white;
    position: relative;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
      border-color: ${theme.colors.primary.main};

      @media (max-width: 767px) {
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }
    }

    &.selected {
      border-color: ${theme.colors.primary.main};
      border-width: 3px;
      box-shadow: 0 8px 20px rgba(0, 206, 209, 0.25);

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
        z-index: 1;
      }
    }

    /* 觸控設備優化 */
    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }
  }

  .service-image {
    position: relative;
    width: 100%;
    padding-top: 66.67%; // 3:2 比例
    background: ${theme.colors.neutral.gray100};
    overflow: hidden;

    @media (max-width: 767px) {
      padding-top: 56.25%; // 16:9 比例，手機上較扁
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .service-card:hover & img {
      transform: scale(1.05);

      @media (max-width: 767px) {
        transform: none; // 手機上不縮放
      }
    }
  }

  .selected-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10;
    animation: bounce 0.5s ease;

    @media (max-width: 767px) {
      width: 36px;
      height: 36px;
      top: 12px;
      right: 12px;
    }

    svg {
      width: 24px;
      height: 24px;

      @media (max-width: 767px) {
        width: 20px;
        height: 20px;
      }
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
  }

  .service-info {
    padding: ${theme.spacing.lg};

    @media (max-width: 767px) {
      padding: ${theme.spacing.md};
    }

    h3 {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.sm};
      line-height: 1.4;

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.base};
      }
    }

    .description {
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.neutral.gray600};
      margin-bottom: ${theme.spacing.md};
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.sm};
        -webkit-line-clamp: 3;
      }
    }
  }

  .service-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: ${theme.spacing.md};
    border-top: 1px solid ${theme.colors.neutral.gray200};

    .duration {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.gray500};
      display: flex;
      align-items: center;
      gap: 4px;

      &::before {
        content: '⏱️';
      }
    }

    .price {
      font-size: ${theme.typography.fontSize.xl};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.primary.main};

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.lg};
      }
    }
  }

  .selected-summary {
    position: sticky;
    bottom: 0;
    background: ${theme.colors.neutral.gray50};
    border: 2px solid ${theme.colors.neutral.gray200};
    border-radius: ${theme.borderRadius.lg};
    padding: 20px 24px;
    margin-bottom: ${theme.spacing.lg};
  }

  .summary-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .summary-text {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.text.primary};
    }

    .summary-price {
      font-size: ${theme.typography.fontSize.xl};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.primary.main};
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

  .btn-next {
    padding: 16px 40px;
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background: ${theme.colors.primary.main};
    color: white;
    box-shadow: 0 2px 8px rgba(0, 206, 209, 0.2);
    min-width: 160px;

    @media (max-width: 767px) {
      flex: 1;
      min-width: unset;
      padding: 14px 24px;
      font-size: ${theme.typography.fontSize.base};
    }

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 206, 209, 0.35);

      @media (max-width: 767px) {
        transform: none;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
`;
