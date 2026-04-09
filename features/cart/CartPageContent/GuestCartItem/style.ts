import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  background: ${theme.colors.neutral.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .item-image {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background: ${theme.colors.neutral.gray50};
    overflow: hidden;
  }

  .image-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    opacity: 0.5;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .item-name {
      font-size: 1rem;
      font-weight: 600;
      color: ${theme.colors.neutral.gray900};
      margin: 0;
    }

    .item-unit-price {
      font-size: 0.875rem;
      color: ${theme.colors.neutral.gray500};
    }

    .item-quantity-text {
      font-size: 0.875rem;
      color: ${theme.colors.neutral.gray600};
    }
  }

  .item-subtotal {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${theme.colors.primary.main};
    min-width: 100px;
    text-align: right;
  }

  .remove-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${theme.colors.neutral.gray400};
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.error};
      color: ${theme.colors.neutral.white};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 80px 1fr auto;
    padding: 1rem;

    .item-image {
      width: 80px;
      height: 80px;
    }

    .item-subtotal {
      grid-column: 2 / 3;
      text-align: left;
      font-size: 1rem;
    }

    .remove-btn {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 60px 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
    position: relative;

    .item-image {
      width: 60px;
      height: 60px;
    }

    .item-subtotal {
      grid-column: 1 / 3;
      font-size: 1rem;
    }

    .remove-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 28px;
      height: 28px;
      font-size: 1.25rem;
    }
  }
`;
