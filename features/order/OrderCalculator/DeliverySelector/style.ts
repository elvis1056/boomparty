import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  margin-bottom: ${theme.spacing['2xl']};

  .section-title {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: 700;
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.md};
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }

  .option {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border: 2px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s;

    input[type='radio'] {
      accent-color: ${theme.colors.primary.main};
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    &.active {
      border-color: ${theme.colors.primary.main};
      background: ${theme.colors.primary[50]};
    }

    &:hover:not(.active) {
      border-color: ${theme.colors.border.main};
      background: ${theme.colors.background.hover};
    }

    .option-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
    }

    .option-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .option-label {
      font-weight: 600;
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.text.primary};
    }

    .option-fee {
      font-weight: 700;
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.primary.dark};
    }

    .option-description {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
    }
  }
`;
