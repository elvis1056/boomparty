import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: block;
  border-radius: 8px;

  .banner-swiper {
    width: 100%;
    height: 100%;
    min-height: 328px;
  }

  .banner-slide {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 328px;
  }

  .banner-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

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
      to right,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 2;
  }

  .banner-content {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 100%;
    min-height: 328px;
    display: flex;
    align-items: center;
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  }

  .banner-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: ${theme.spacing.xl};
    width: 100%;
    align-items: center;
  }

  .banner-left {
    display: flex;
    align-items: center;
  }

  .banner-main-title {
    font-size: 60px;
    font-weight: 300;
    color: ${theme.colors.neutral.white};
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .banner-right {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: flex-end;
  }

  .banner-subtitle {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.neutral.white};
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-align: right;
    word-break: nowrap;
  }

  .banner-actions {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: flex-end;
  }

  .banner-link {
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.neutral.white};
    font-size: ${theme.typography.fontSize.base};
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    background-color: rgba(0, 206, 209, 0.2);
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: 6px;
    width: fit-content;

    &:hover {
      background-color: ${theme.colors.primary.main};
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }

  .icon-external {
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  .banner-swiper .swiper-pagination {
    bottom: 20px;
    z-index: 10;
  }

  .banner-swiper .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: ${theme.colors.neutral.white};
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .banner-swiper .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: ${theme.colors.primary.main};
    transform: scale(1.2);
  }
`;
