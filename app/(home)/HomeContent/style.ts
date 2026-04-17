import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .section-wrapper {
    max-width: 1400px;
    min-width: 1024px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .section-wrapper {
      min-width: 0;
      padding: 1.5rem;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .section-wrapper {
      min-width: 0;
      padding: 1rem;
    }
  }
`;
