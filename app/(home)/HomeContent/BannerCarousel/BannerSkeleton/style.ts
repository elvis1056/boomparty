import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  min-height: 220px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 200px;
  }
`;
