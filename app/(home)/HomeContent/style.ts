import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .home-banner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .home-banner {
      padding: 1.5rem;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .home-banner {
      padding: 1rem 1rem 0rem;
    }
  }
`;
