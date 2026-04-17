import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.md};
    height: 240px;
  }

  .service-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    border-radius: ${theme.borderRadius.lg};
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};

      .card-cta {
        color: ${theme.colors.primary.light};
      }
    }
  }

  .card-image {
    position: relative;
    width: 100%;
    flex: 1;
    min-height: 0;
  }

  .card-body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${theme.spacing.md};
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      transparent 100%
    );
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .card-title {
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.neutral.white};
    margin: 0;
  }

  .card-tagline {
    font-size: ${theme.typography.fontSize.xs};
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.4;
  }

  .card-cta {
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.primary.light};
    margin-top: 2px;
    transition: color 0.2s ease;
  }

  /* 手機：2x2 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      height: 320px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .services-grid {
      height: 280px;
      gap: ${theme.spacing.sm};
    }
  }
`;
