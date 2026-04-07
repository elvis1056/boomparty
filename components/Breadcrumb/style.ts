import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 1.5rem;

  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .breadcrumb-sep {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray400};
    line-height: 1;
  }

  .breadcrumb-link {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray500};
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: ${theme.colors.primary.main};
    }
  }

  .breadcrumb-current {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray700};
    font-weight: ${theme.typography.fontWeight.medium};
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 1rem;

    .breadcrumb-current {
      max-width: 140px;
    }
  }
`;
