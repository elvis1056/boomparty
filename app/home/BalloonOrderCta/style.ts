import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg};
  background: #e8fafa;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 206, 209, 0.18) 0%,
      transparent 45%
    );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      -45deg,
      rgba(64, 224, 208, 0.14) 0%,
      transparent 40%
    );
    pointer-events: none;
  }

  .inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};

    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: ${theme.spacing.md};
    }
  }

  /* 標題列：左文字 + 右連結 */
  .header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${theme.spacing.md};
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .eyebrow {
    font-size: ${theme.typography.fontSize.xs};
    font-weight: 600;
    color: ${theme.colors.primary.dark};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0;
  }

  .title {
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    font-weight: 800;
    color: ${theme.colors.text.primary};
    margin: 0;
  }

  .subtitle {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin: 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      display: none;
    }
  }

  .cta-link {
    flex-shrink: 0;
    display: inline-block;
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    font-weight: 700;
    font-size: ${theme.typography.fontSize.sm};
    border-radius: ${theme.borderRadius.full};
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(0, 206, 209, 0.35);
    transition:
      background 0.2s,
      transform 0.1s,
      box-shadow 0.2s;

    &:hover {
      background: ${theme.colors.primary.dark};
      box-shadow: 0 6px 20px rgba(0, 206, 209, 0.5);
    }

    &:active {
      transform: scale(0.97);
    }
  }

  /* 商品橫排 */
  .shapes-row {
    display: flex;
    gap: ${theme.spacing.md};
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: ${theme.spacing.xs};

    /* 隱藏 scrollbar */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    /* 桌機：不需要滾動，等寬分配 */
    @media (min-width: ${theme.breakpoints.tablet}) {
      overflow-x: visible;
      flex-wrap: nowrap;

      .shape-item {
        flex: 1;
      }
    }
  }

  .shape-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.xs};
    text-decoration: none;
    flex-shrink: 0;
    scroll-snap-align: start;
    transition: transform 0.15s ease;

    /* 手機：3.5 張剛好填滿，自然露出第 4 張的一半 */
    @media (max-width: ${theme.breakpoints.tablet}) {
      width: calc((100% - ${theme.spacing.md} * 3) / 3.5);
    }

    &:hover {
      transform: translateY(-2px);
    }

    .shape-image-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      border-radius: ${theme.borderRadius.md};
      overflow: hidden;
      background: rgba(255, 255, 255, 0.65);
      border: 1.5px solid rgba(0, 206, 209, 0.2);
      backdrop-filter: blur(6px);
    }

    .shape-name {
      font-size: ${theme.typography.fontSize.sm};
      font-weight: 600;
      color: ${theme.colors.text.primary};
    }

    .shape-price {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
    }
  }
`;
