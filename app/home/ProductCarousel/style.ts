import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  .showcase {
    display: grid;
    grid-template-columns: 45% 55%;
    height: 420px;
    border-radius: ${theme.borderRadius.lg};
    overflow: hidden;
  }

  .showcase-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${theme.spacing['2xl']} ${theme.spacing['2xl']};
    gap: ${theme.spacing.md};
  }

  .showcase-tags {
    display: flex;
    gap: ${theme.spacing.sm};
    flex-wrap: wrap;
  }

  .tag {
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.primary.dark};
    background: ${theme.colors.primary[50]};
    padding: 4px 10px;
    border-radius: 999px;
  }

  .showcase-name {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin: 0;
    line-height: 1.3;
  }

  .showcase-subtitle {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.secondary};
    margin: 0;
    line-height: 1.6;
  }

  .showcase-nav {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-top: auto;
    padding-top: ${theme.spacing.lg};
  }

  .nav-btn {
    background: none;
    border: 1px solid ${theme.colors.border.main};
    color: ${theme.colors.primary.main};
    font-size: ${theme.typography.fontSize.lg};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
    }
  }

  .nav-count {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  }

  .showcase-image {
    position: relative;
    width: 100%;
    height: 100%;

    img {
      border-radius: ${theme.borderRadius.lg};
    }
  }

  /* 手機：圖上文下 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .showcase {
      grid-template-columns: 50% 50%;
      height: auto;
      gap: ${theme.spacing.sm};
    }

    .showcase-image {
      order: -1;
      height: 140px;
    }

    .showcase-text {
      padding: ${theme.spacing.xs};
      gap: 4px;
    }

    .showcase-name {
      font-size: ${theme.typography.fontSize['xl']};
    }

    .showcase-subtitle {
      font-size: ${theme.typography.fontSize.xs};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .container {
      padding: 0 1rem;
    }

    .showcase-name {
      font-size: ${theme.typography.fontSize['sm']};
    }

    .showcase-nav {
      justify-content: center;
      padding-top: 0;
    }
  }
`;

export default style;
