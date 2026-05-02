import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  background: ${theme.colors.neutral.white};
  border-top: 1px solid ${theme.colors.border.light};
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.sm};
  }

  .summary {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    flex-wrap: wrap;
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};

    strong {
      color: ${theme.colors.text.primary};
      font-weight: 700;
    }

    .total strong {
      font-size: ${theme.typography.fontSize.lg};
      color: ${theme.colors.primary.dark};
    }

    .divider {
      color: ${theme.colors.neutral.gray300};
    }
  }

  .actions {
    display: flex;
    gap: ${theme.spacing.sm};
    flex-shrink: 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 100%;
    }
  }

  .button-copy,
  .button-instagram {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: 600;
    cursor: pointer;
    transition:
      opacity 0.15s,
      transform 0.1s;
    white-space: nowrap;

    @media (max-width: ${theme.breakpoints.tablet}) {
      flex: 1;
    }

    &:active {
      transform: scale(0.97);
    }
  }

  .button-copy {
    background: ${theme.colors.neutral.white};
    border: 2px solid ${theme.colors.primary.main};
    color: ${theme.colors.primary.dark};

    &:hover:not(:disabled) {
      background: ${theme.colors.primary[50]};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .button-instagram {
    background: linear-gradient(
      135deg,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
    border: none;
    color: ${theme.colors.neutral.white};

    &:hover {
      opacity: 0.9;
    }
  }
`;
