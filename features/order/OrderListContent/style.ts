import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  min-height: calc(100vh - 200px);
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.default};

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }

  .page-title {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.xl};
  }

  /* 空狀態 & 載入中 */
  .loading {
    text-align: center;
    padding: ${theme.spacing['3xl']} 0;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.lg};
  }

  .empty-state {
    text-align: center;
    padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
    background: white;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.sm};
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: ${theme.spacing.lg};
  }

  .empty-title {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  .empty-description {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.xl};
  }

  .action-btn {
    display: inline-block;
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    background-color: ${theme.colors.primary.main};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.colors.primary.dark};
    }
  }

  /* 訂單列表 */
  .order-list {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  }

  .order-card {
    display: block;
    background: white;
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.sm};
    text-decoration: none;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
  }

  .order-number {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
  }

  .order-status {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.full};
    color: white;
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  .order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.light};
  }

  .order-date {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }

  .order-items-count {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-recipient {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }

  .order-total {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.main};
  }

  /* RWD */
  @media (max-width: 640px) {
    padding: ${theme.spacing.lg} 0;

    .page-title {
      font-size: ${theme.typography.fontSize.xl};
      margin-bottom: ${theme.spacing.lg};
    }

    .order-card {
      padding: ${theme.spacing.md};
    }

    .order-header {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.sm};
    }

    .order-info {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.xs};
    }

    .order-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.sm};
    }

    .order-total {
      align-self: flex-end;
    }
  }
`;

export default style;
