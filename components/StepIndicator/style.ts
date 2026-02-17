import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .step-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 32px 48px;
    border-radius: 16px;
    box-shadow: ${theme.shadows.md};
  }

  .step-item {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;

    &:last-child {
      flex: 0;
    }
  }

  .step-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: ${theme.typography.fontWeight.semibold};
    transition: all 0.3s ease;

    &.active {
      background: ${theme.colors.primary.main};
      color: white;
      box-shadow: 0 4px 12px rgba(0, 206, 209, 0.4);
    }

    &.completed {
      background: ${theme.colors.success};
      color: white;
    }

    &.inactive {
      background: ${theme.colors.neutral.gray200};
      color: ${theme.colors.neutral.gray400};
    }
  }

  .step-label {
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.neutral.gray500};
    white-space: nowrap;
  }

  .step-line {
    flex: 1;
    height: 2px;
    margin: 0 16px;
    transition: all 0.3s ease;

    &.completed {
      background: ${theme.colors.success};
    }

    &.inactive {
      background: ${theme.colors.neutral.gray200};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .step-container {
      padding: 20px 16px;
      overflow-x: auto;
    }

    .step-circle {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }

    .step-label {
      font-size: ${theme.typography.fontSize.xs};
    }
  }
`;
