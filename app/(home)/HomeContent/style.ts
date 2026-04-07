import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .home-banner {
    max-width: 1400px;
    min-width: 1024px;
    margin: 0 auto;
    padding: 1rem 2rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .home-banner {
      min-width: 0;
      padding: 1.5rem;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .home-banner {
      min-width: 0;
      padding: 1rem 1rem 0rem;
    }
  }
`;
