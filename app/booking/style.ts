import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${theme.colors.neutral.gray50} 0%,
    ${theme.colors.neutral.gray100} 100%
  );
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};

  @media (max-width: 1023px) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }

  @media (max-width: 767px) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }

  .booking-container {
    max-width: 1400px;
    min-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 1023px) {
      min-width: unset;
      max-width: 100%;
    }
  }

  .booking-header {
    text-align: center;
    margin: ${theme.spacing.xl} 0;

    @media (max-width: 767px) {
      margin: ${theme.spacing.lg} 0;
    }

    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.sm};

      @media (max-width: 1023px) {
        font-size: ${theme.typography.fontSize['2xl']};
      }

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.xl};
      }
    }

    p {
      font-size: ${theme.typography.fontSize.lg};
      color: ${theme.colors.neutral.gray500};

      @media (max-width: 767px) {
        font-size: ${theme.typography.fontSize.base};
      }
    }
  }

  .booking-content {
    margin-top: ${theme.spacing['2xl']};

    @media (max-width: 767px) {
      margin-top: ${theme.spacing.xl};
    }
  }
`;
