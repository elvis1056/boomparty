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

  /* ── 固定底部購買列 ── */
  .fixed-bottom-bar {
    display: none;
  }

  /* ── Mobile ── */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.25rem 1rem 5.5rem;

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

    .product-info .product-actions {
      display: none;
    }

    .fixed-bottom-bar {
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      height: 56px;
      padding: 0 0.5rem;
      gap: 0;
      background: ${theme.colors.neutral.white};
      border-top: 1px solid ${theme.colors.neutral.gray200};
      box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

      /* 左側 icon 群 */
      .bar-icons {
        display: flex;
        align-items: stretch;
        flex-shrink: 0;

        .bar-icon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          width: 52px;
          height: 56px;
          background: none;
          border: none;
          cursor: pointer;
          color: ${theme.colors.neutral.gray600};
          padding: 0;
          position: relative;
          border-right: 1px solid ${theme.colors.neutral.gray200};

          &:active {
            background: ${theme.colors.neutral.gray100};
          }

          svg {
            flex-shrink: 0;
          }

          span {
            font-size: 10px;
            line-height: 1;
            white-space: nowrap;
          }

          /* 購物車 icon + badge */
          .cart-icon-wrap {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .cart-badge {
              position: absolute;
              top: -6px;
              right: -8px;
              min-width: 16px;
              height: 16px;
              padding: 0 3px;
              background: ${theme.colors.error};
              color: ${theme.colors.neutral.white};
              border-radius: 8px;
              font-size: 10px;
              font-weight: ${theme.typography.fontWeight.bold};
              line-height: 16px;
              text-align: center;
            }
          }
        }
      }

      /* 右側行動按鈕 */
      .bar-actions {
        display: flex;
        flex: 1;
        align-items: stretch;
        gap: 0;
        height: 100%;
        padding: 0.5rem 0.375rem 0.5rem 0.5rem;

        .fixed-add-to-cart,
        .fixed-buy-now {
          flex: 1;
          height: 100%;
          border-radius: ${theme.borderRadius.md};
          font-size: ${theme.typography.fontSize.sm};
          font-weight: ${theme.typography.fontWeight.semibold};
          cursor: pointer;
          border: none;
          white-space: nowrap;
          transition: all 0.15s ease;

          &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }
        }

        .fixed-add-to-cart {
          background: ${theme.colors.neutral.white};
          color: ${theme.colors.primary.main};
          border: 1.5px solid ${theme.colors.primary.main};
          margin-right: 0.375rem;

          &:active:not(:disabled) {
            background: ${theme.colors.primary.light};
            color: ${theme.colors.neutral.white};
          }

          &.added {
            background: ${theme.colors.success};
            color: ${theme.colors.neutral.white};
            border-color: ${theme.colors.success};
          }
        }

        .fixed-buy-now {
          background: ${theme.colors.primary.main};
          color: ${theme.colors.neutral.white};

          &:active:not(:disabled) {
            background: ${theme.colors.primary.dark};
          }
        }
      }
    }
  }
`;
