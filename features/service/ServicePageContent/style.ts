import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  /* ── Hero ── */
  .hero {
    background: linear-gradient(
      135deg,
      ${theme.colors.primary.dark} 0%,
      ${theme.colors.primary.main} 60%,
      ${theme.colors.primary.light} 100%
    );
    padding: 3.5rem 1.5rem 3rem;
    text-align: center;
    color: ${theme.colors.neutral.white};

    .hero-content {
      max-width: 720px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.75rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0 0 1.5rem;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  /* ── 共用 container ── */
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* ── 共用 section title ── */
  .section-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 1.5rem;

    &.centered {
      text-align: center;
    }
  }

  /* ── 共用按鈕 ── */
  .btn-primary {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    border-radius: ${theme.borderRadius.md};
    font-weight: 600;
    font-size: 0.9375rem;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.dark};
    }

    &.inline {
      margin-top: 1.5rem;
    }
  }

  .btn-outline {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: transparent;
    color: ${theme.colors.primary.main};
    border: 2px solid ${theme.colors.primary.main};
    border-radius: ${theme.borderRadius.md};
    font-weight: 600;
    font-size: 0.9375rem;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
    }

    &.light {
      color: ${theme.colors.neutral.white};
      border-color: ${theme.colors.neutral.white};

      &:hover {
        background: ${theme.colors.neutral.white};
        color: ${theme.colors.primary.dark};
      }
    }
  }

  /* ── 情境描述 ── */
  .description-section {
    padding: 3rem 0;
    background: ${theme.colors.neutral.white};

    .description-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .description-body {
      font-size: 1rem;
      line-height: 1.8;
      color: ${theme.colors.neutral.gray600};
      margin: 0;

      &:not(:first-child) {
        margin-top: 1rem;
      }
    }

    .description-image {
      position: relative;
      aspect-ratio: 4 / 3;
      border-radius: ${theme.borderRadius.lg};
      overflow: hidden;
    }

    .description-image-placeholder {
      aspect-ratio: 4 / 3;
      background: ${theme.colors.neutral.gray100};
      border-radius: ${theme.borderRadius.lg};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.neutral.gray400};
      font-size: 0.875rem;
    }
  }

  /* ── 服務項目 ── */
  .services-section {
    padding: 3rem 0;
    background: ${theme.colors.background.paper};

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .service-card {
      background: ${theme.colors.neutral.white};
      border-radius: ${theme.borderRadius.lg};
      padding: 2rem 1.5rem;
      text-align: center;
      box-shadow: ${theme.shadows.sm};
      transition: box-shadow 0.2s ease;

      &:hover {
        box-shadow: ${theme.shadows.md};
      }

      .service-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .service-title {
        font-size: 1rem;
        font-weight: 600;
        color: ${theme.colors.neutral.gray900};
        margin: 0 0 0.5rem;
      }

      .service-description {
        font-size: 0.875rem;
        color: ${theme.colors.neutral.gray500};
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  /* ── 案例圖片 ── */
  .gallery-section {
    padding: 3rem 0;
    background: ${theme.colors.neutral.white};

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .gallery-item {
      position: relative;
      aspect-ratio: 4 / 3;
      border-radius: ${theme.borderRadius.md};
      overflow: hidden;
    }

    .gallery-placeholder {
      aspect-ratio: 4 / 3;
      background: ${theme.colors.neutral.gray100};
      border-radius: ${theme.borderRadius.md};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.neutral.gray400};
      font-size: 0.875rem;
    }
  }

  /* ── CTA ── */
  .cta-section {
    padding: 3rem 0;
    background: ${theme.colors.primary.dark};
    text-align: center;

    .cta-title {
      font-size: 2rem;
      font-weight: 700;
      color: ${theme.colors.neutral.white};
      margin: 0 0 0.75rem;
    }

    .cta-subtitle {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      margin: 0 0 2rem;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  /* ── Mobile ── */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .hero {
      padding: 4rem 1.5rem 3.5rem;

      .hero-title {
        font-size: 1.75rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
    }

    .description-section {
      .description-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .description-image-placeholder {
        order: -1;
      }
    }

    .services-section {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .gallery-section {
      .gallery-grid {
        grid-template-columns: 1fr;
      }
    }

    .cta-section {
      .cta-title {
        font-size: 1.5rem;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .services-section {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  }
`;
