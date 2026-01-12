import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;

  .mobile-banner-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${theme.spacing.md};

    .banner-title {
      font-size: ${theme.typography.fontSize['xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.neutral.gray900};
      margin: 0;
      line-height: 1.2;
    }

    .banner-subtitle {
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.neutral.gray700};
      margin: 0;
      line-height: 1.4;
      text-align: right;
      word-break: nowrap;
    }
  }

  .mobile-banner-image {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    .banner-swiper {
      width: 100%;
      height: 100%;
      min-height: 200px;

      .swiper-pagination {
        bottom: 12px;
        z-index: 10;
      }

      .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background-color: ${theme.colors.neutral.white};
        opacity: 0.5;
        transition: all 0.3s ease;
      }

      .swiper-pagination-bullet-active {
        opacity: 1;
        background-color: ${theme.colors.primary.main};
        transform: scale(1.2);
      }
    }

    .banner-slide {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 200px;

      .banner-image {
        z-index: 1;
      }

      .banner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.3) 0%,
          rgba(0, 0, 0, 0.1) 50%,
          rgba(0, 0, 0, 0.3) 100%
        );
        z-index: 2;
      }
    }
  }

  .mobile-banner-actions {
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.sm};
    padding: 0 ${theme.spacing.md};

    .banner-link {
      display: inline-flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      color: ${theme.colors.primary.main};
      font-size: ${theme.typography.fontSize.base};
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
      padding: ${theme.spacing.sm} 0;
      width: fit-content;

      &:hover {
        color: ${theme.colors.primary.dark};
        transform: translateX(4px);
      }

      &:active {
        transform: translateX(2px);
      }

      .icon-external {
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.bold};
      }
    }
  }
`;
