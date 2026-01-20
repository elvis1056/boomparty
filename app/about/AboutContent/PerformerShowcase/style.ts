import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${theme.colors.neutral.gray50} 0%,
    ${theme.colors.neutral.white} 50%,
    ${theme.colors.neutral.gray50} 100%
  );

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  }

  .showcase-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .showcase-header {
    text-align: center;
    margin-bottom: ${theme.spacing.xl};

    @media (min-width: ${theme.breakpoints.tablet}) {
      margin-bottom: ${theme.spacing['2xl']};
    }
  }

  .showcase-title {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.gray900};
    margin-bottom: ${theme.spacing.sm};

    @media (min-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize['3xl']};
      margin-bottom: ${theme.spacing.md};
    }
  }

  .title-highlight {
    color: ${theme.colors.primary.main};
  }

  .showcase-description {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray600};
    max-width: 600px;
    margin: 0 auto;

    @media (min-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize.base};
    }
  }

  .performers-scroll-wrapper {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .performers-list {
    display: flex;
    padding: ${theme.spacing.sm} 0;

    > *:not(:first-child) {
      margin-left: ${theme.spacing.md};
    }

    @media (min-width: ${theme.breakpoints.tablet}) {
      padding: ${theme.spacing.md} 0;

      > *:not(:first-child) {
        margin-left: ${theme.spacing.lg};
      }
    }
  }
`;
