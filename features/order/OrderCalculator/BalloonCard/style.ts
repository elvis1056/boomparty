import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: flex;
  flex-direction: column;
  border: 2px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.neutral.white};
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &.selected {
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    background: ${theme.colors.neutral.gray100};
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    gap: 2px;

    .name {
      font-weight: 600;
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.text.primary};
    }

    .price {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
    }
  }

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm} ${theme.spacing.md};

    .button-decrease,
    .button-increase {
      width: 32px;
      height: 32px;
      border-radius: ${theme.borderRadius.full};
      border: 1.5px solid ${theme.colors.border.main};
      background: ${theme.colors.neutral.white};
      color: ${theme.colors.primary.dark};
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        background 0.15s,
        border-color 0.15s;

      &:hover:not(:disabled) {
        background: ${theme.colors.primary[50]};
        border-color: ${theme.colors.primary.main};
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

    .quantity {
      min-width: 28px;
      text-align: center;
      font-size: ${theme.typography.fontSize.lg};
      font-weight: 700;
      color: ${theme.colors.text.primary};
    }
  }

  .subtotal {
    text-align: center;
    padding: ${theme.spacing.xs} ${theme.spacing.md} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: 600;
    color: ${theme.colors.primary.dark};
    background: ${theme.colors.primary[50]};
  }
`;
