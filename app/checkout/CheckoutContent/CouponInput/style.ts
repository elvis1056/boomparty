import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background: ${theme.colors.neutral.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 1.5rem;

  .coupon-label {
    display: block;
    font-weight: 600;
    color: ${theme.colors.neutral.gray700};
    margin-bottom: 0.5rem;
  }

  .coupon-row {
    display: flex;
    gap: 0.5rem;
  }

  .coupon-input {
    flex: 1;
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${theme.colors.neutral.gray300};
    border-radius: 8px;
    font-size: 1rem;
    color: ${theme.colors.neutral.gray900};
    background: ${theme.colors.neutral.white};
    transition: all 0.2s ease;
    outline: none;

    &::placeholder {
      color: ${theme.colors.neutral.gray400};
    }

    &:focus {
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 3px rgba(107, 127, 92, 0.1);
    }

    &.is-valid {
      border-color: #16a34a;
    }

    &.is-invalid {
      border-color: #dc2626;
    }
  }

  .coupon-btn {
    padding: 0.75rem 1.25rem;
    background: ${theme.colors.neutral.gray100};
    border: 1px solid ${theme.colors.neutral.gray300};
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray700};
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${theme.colors.neutral.gray200};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .coupon-feedback {
    margin-top: 0.375rem;
    font-size: 0.875rem;

    &.is-valid {
      color: #16a34a;
    }

    &.is-invalid {
      color: #dc2626;
    }

    &.is-loading {
      color: ${theme.colors.neutral.gray500};
    }
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;

    .coupon-input,
    .coupon-btn {
      padding: 0.625rem 0.875rem;
    }
  }
`;
