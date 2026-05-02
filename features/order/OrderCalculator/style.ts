import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  padding-bottom: 100px; /* StickyOrderBar 高度預留 */
  max-width: 1200px;
  margin: 0 auto;

  .shapes-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing['2xl']};

    @media (max-width: ${theme.breakpoints.tablet}) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
