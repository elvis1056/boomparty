import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background: ${theme.colors.neutral.white};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .card-image-link {
    display: block;
  }

  .card-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f8 100%);
    overflow: hidden;

    .card-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.neutral.white};

      .image-placeholder {
        font-size: 4rem;
        opacity: 0.6;
      }
    }

    .badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 1;

      &.out-of-stock {
        background: ${theme.colors.neutral.gray500};
      }
    }
  }

  .card-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .card-name {
      font-size: 1rem;
      font-weight: 600;
      color: ${theme.colors.neutral.gray900};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-description {
      height: 40px;
      font-size: 14px;
      color: ${theme.colors.neutral.gray500};
      margin: 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-price {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
      margin-top: 0.25rem;

      .price-label {
        font-size: 0.75rem;
        color: ${theme.colors.neutral.gray700};
        font-weight: 500;
      }

      .price-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: ${theme.colors.primary.main};
      }
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      border-top: 1px solid ${theme.colors.neutral.gray200};

      .quantity-label {
        font-size: 0.8125rem;
        color: ${theme.colors.neutral.gray600};
        white-space: nowrap;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .quantity-decrease,
        .quantity-increase {
          width: 28px;
          height: 28px;
          border: 1px solid ${theme.colors.neutral.gray300};
          border-radius: 4px;
          background: ${theme.colors.neutral.white};
          color: ${theme.colors.neutral.gray700};
          font-size: 1rem;
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
          width: 3rem;
          height: 28px;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: ${theme.colors.neutral.gray900};
          border: 1px solid ${theme.colors.neutral.gray300};
          border-radius: 4px;
          background: ${theme.colors.neutral.white};

          /* 隱藏 number input 的上下箭頭 */
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

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;

      .add-to-cart,
      .buy-now {
        flex: 1;
        padding: 0.625rem 0.5rem;
        border-radius: 6px;
        font-size: 0.8125rem;
        font-weight: 600;
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
        border: 1.5px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background: ${theme.colors.primary.light};
          color: ${theme.colors.neutral.white};
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

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    .card-info {
      padding: 0.75rem;
      gap: 0.25rem;

      .card-price {
        .price-value {
          font-size: 1.125rem;
        }
      }

      .quantity-selector {
        margin-top: 0.375rem;
        padding: 0.375rem 0;

        .quantity-controls {
          .quantity-decrease,
          .quantity-increase {
            width: 24px;
            height: 24px;
            font-size: 0.875rem;
          }

          .quantity-input {
            width: 2.5rem;
            height: 24px;
            font-size: 0.8125rem;
          }
        }
      }

      .card-actions {
        margin-top: 0.5rem;

        .add-to-cart,
        .buy-now {
          padding: 4px;
          font-size: 0.75rem;
        }
      }
    }

    .card-image-wrapper {
      .card-image {
        .image-placeholder {
          font-size: 3rem;
        }
      }
    }
  }
`;
