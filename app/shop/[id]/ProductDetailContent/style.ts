import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;

  .product-section {
    display: flex;
    gap: 3rem;
    align-items: flex-start;
  }

  /* ── 左欄：圖片 ── */
  .product-image-wrapper {
    flex: 0 0 50%;

    .image-square {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f8 100%);
      border-radius: ${theme.borderRadius.xl};
      overflow: hidden;
    }

    .image-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 5rem;
      opacity: 0.5;
    }

    .badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
      padding: 0.25rem 0.875rem;
      border-radius: ${theme.borderRadius.full};
      font-size: ${theme.typography.fontSize.sm};
      font-weight: ${theme.typography.fontWeight.semibold};
      z-index: 1;

      &.out-of-stock {
        background: ${theme.colors.neutral.gray500};
      }
    }
  }

  /* ── 右欄：商品資訊 ── */
  .product-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .product-category {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.primary.main};
      font-weight: ${theme.typography.fontWeight.medium};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .product-name {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.neutral.gray900};
      line-height: 1.2;
      margin: 0;
    }

    .product-price {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;

      .price-label {
        font-size: ${theme.typography.fontSize.base};
        color: ${theme.colors.neutral.gray700};
        font-weight: ${theme.typography.fontWeight.medium};
      }

      .price-value {
        font-size: 2rem;
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.primary.main};
      }
    }

    .product-description {
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.neutral.gray600};
      line-height: 1.7;
      margin: 0;
    }

    .divider {
      height: 1px;
      background: ${theme.colors.neutral.gray200};
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 1rem;

      .quantity-label {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.neutral.gray600};
        white-space: nowrap;
        min-width: 2rem;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .quantity-decrease,
        .quantity-increase {
          width: 36px;
          height: 36px;
          border: 1px solid ${theme.colors.neutral.gray300};
          border-radius: ${theme.borderRadius.md};
          background: ${theme.colors.neutral.white};
          color: ${theme.colors.neutral.gray700};
          font-size: 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;

          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary.main};
            color: ${theme.colors.primary.main};
          }

          &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        }

        .quantity-input {
          width: 3.5rem;
          height: 36px;
          text-align: center;
          font-size: ${theme.typography.fontSize.base};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.neutral.gray900};
          border: 1px solid ${theme.colors.neutral.gray300};
          border-radius: ${theme.borderRadius.md};
          background: ${theme.colors.neutral.white};

          -moz-appearance: textfield;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          &:focus {
            outline: none;
            border-color: ${theme.colors.primary.main};
          }

          &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        }
      }
    }

    .product-actions {
      display: flex;
      gap: 0.75rem;

      .add-to-cart,
      .buy-now {
        flex: 1;
        padding: 0.875rem 1rem;
        border-radius: ${theme.borderRadius.lg};
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.semibold};
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        white-space: nowrap;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      }

      .add-to-cart {
        background: ${theme.colors.neutral.white};
        color: ${theme.colors.primary.main};
        border: 2px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background: ${theme.colors.primary.light};
          color: ${theme.colors.neutral.white};
          border-color: ${theme.colors.primary.light};
        }

        &.added {
          background: ${theme.colors.success};
          color: ${theme.colors.neutral.white};
          border-color: ${theme.colors.success};
        }
      }

      .buy-now {
        background: ${theme.colors.primary.main};
        color: ${theme.colors.neutral.white};

        &:hover:not(:disabled) {
          background: ${theme.colors.primary.dark};
        }
      }
    }
  }

  /* ── 相關商品區 ── */
  .related-section {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid ${theme.colors.neutral.gray200};

    .related-title {
      font-size: ${theme.typography.fontSize['2xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.neutral.gray900};
      margin: 0 0 1.5rem;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
  }

  /* ── Mobile ── */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.25rem 1rem 3rem;

    .product-section {
      flex-direction: column;
      gap: 1.5rem;
    }

    .product-image-wrapper {
      flex: none;
      width: 100%;
    }

    .product-info {
      .product-name {
        font-size: ${theme.typography.fontSize['2xl']};
      }

      .product-price {
        .price-value {
          font-size: 1.625rem;
        }
      }
    }

    .related-section {
      margin-top: 2.5rem;

      .related-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.875rem;
      }
    }
  }
`;
