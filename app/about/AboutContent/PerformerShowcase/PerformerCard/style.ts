import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 10.5rem;
  flex-shrink: 0;

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 12.5rem;
  }

  .card-content {
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.15),
      rgba(0, 206, 209, 0.15),
      rgba(255, 255, 255, 0.15)
    );
    padding: 1px;
    border-radius: 1rem;
    display: block;
    height: 100%;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.25),
        rgba(0, 206, 209, 0.25),
        rgba(255, 255, 255, 0.25)
      );
    }
  }

  .card-inner {
    padding: 0.125rem;
    display: grid;
    grid-template-rows: 1fr auto;
    position: relative;
    z-index: 0;
    border-radius: 1rem;
    transition: background-color 0.2s ease;
    background-color: ${theme.colors.neutral.white};

    @media (min-width: ${theme.breakpoints.tablet}) {
      padding: 0.25rem;
    }

    .card-content:hover & {
      background-color: ${theme.colors.neutral.gray50};
    }

    .card-content:active & {
      background-color: ${theme.colors.neutral.white};
    }
  }

  .card-image {
    aspect-ratio: 1 / 1;
    border-radius: 0.75rem;
    overflow: hidden;
    position: relative;

    img {
      object-fit: cover;
    }
  }

  .card-info {
    padding: 0.5rem;
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    text-align: left;
    gap: ${theme.spacing.xs};

    @media (min-width: ${theme.breakpoints.tablet}) {
      padding: 0.75rem;
      grid-template-rows: 1fr;
      gap: ${theme.spacing.sm};
    }
  }

  .info-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.25rem;
    align-items: start;
  }

  .name-section {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .performer-name {
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.neutral.gray900};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize.base};
    }
  }

  .performer-category {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.neutral.gray600};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.typography.fontSize.sm};
    }
  }

  .arrow-icon {
    width: 1rem;
    height: 1rem;
    color: ${theme.colors.neutral.gray600};
    flex-shrink: 0;

    @media (min-width: ${theme.breakpoints.tablet}) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  .performer-description {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.neutral.gray600};
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: ${theme.breakpoints.tablet}) {
      display: none;
    }
  }
`;
