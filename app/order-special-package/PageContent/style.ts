import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  min-height: 100vh;

  .page-header {
    text-align: center;
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg} ${theme.spacing.xl};
    background: linear-gradient(
      180deg,
      ${theme.colors.primary[50]} 0%,
      ${theme.colors.neutral.white} 100%
    );

    .page-title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
      color: ${theme.colors.text.primary};
      margin-bottom: ${theme.spacing.sm};
    }

    .page-subtitle {
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.text.secondary};
      max-width: 480px;
      margin: 0 auto;
    }
  }
`;
