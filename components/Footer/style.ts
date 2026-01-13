import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background-color: ${theme.colors.primary[500]};
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  margin-top: auto;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.sm};
    text-align: center;
  }

  .footer-row {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray300};
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-company {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.neutral.white};
  }

  .footer-separator {
    color: ${theme.colors.neutral.gray600};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};

    .footer-row {
      font-size: ${theme.typography.fontSize.xs};
      gap: ${theme.spacing.sm};
    }

    .footer-contacts {
      flex-direction: column;
      gap: ${theme.spacing.xs};

      .footer-separator {
        display: none;
      }
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};

    .footer-row {
      flex-direction: column;
      gap: ${theme.spacing.xs};
    }

    .footer-separator {
      display: none;
    }
  }
`;
