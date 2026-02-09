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

  .back-link {
    display: inline-block;
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.sm};
    transition: color 0.2s;

    &:hover {
      color: ${theme.colors.primary.main};
    }
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

  /* 訂單標題區 */
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${theme.spacing.xl};
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }

  .order-number {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin: 0;
  }

  .order-date {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }

  .order-status {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.full};
    color: white;
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  /* 假資料提示 */
  .mock-data-notice {
    display: flex;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
    background-color: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.xl};
  }

  .notice-icon {
    font-size: ${theme.typography.fontSize['2xl']};
    flex-shrink: 0;
  }

  .notice-content {
    flex: 1;

    strong {
      display: block;
      color: ${theme.colors.text.primary};
      font-size: ${theme.typography.fontSize.base};
      font-weight: ${theme.typography.fontWeight.semibold};
      margin-bottom: ${theme.spacing.xs};
    }

    p {
      margin: 0;
      color: ${theme.colors.text.secondary};
      font-size: ${theme.typography.fontSize.sm};
      line-height: 1.5;

      a {
        color: ${theme.colors.primary.main};
        text-decoration: underline;

        &:hover {
          color: ${theme.colors.primary.dark};
        }
      }
    }
  }

  /* 訂單內容 */
  .order-content {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }

  .section {
    background: white;
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.sm};
  }

  .section-title {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin: 0 0 ${theme.spacing.md} 0;
    padding-bottom: ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border.light};
  }

  /* 商品列表 */
  .items-list {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  }

  .item-card {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.sm} 0;
    border-bottom: 1px solid ${theme.colors.border.light};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .item-image {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: ${theme.borderRadius.md};
    overflow: hidden;
    flex-shrink: 0;
    background-color: ${theme.colors.background.paper};
  }

  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.text.disabled};
    font-size: ${theme.typography.fontSize.xs};
  }

  .item-info {
    flex: 1;
    min-width: 0;
  }

  .item-name {
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.xs};
  }

  .item-price {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }

  .item-subtotal {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    white-space: nowrap;
  }

  /* 資訊格線 */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};

    &.full-width {
      grid-column: 1 / -1;
    }
  }

  .info-label {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }

  .info-value {
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  /* 金額摘要 */
  .summary-section {
    background-color: ${theme.colors.background.paper};
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.sm} 0;

    &.total {
      padding-top: ${theme.spacing.md};
    }
  }

  .summary-label {
    color: ${theme.colors.text.secondary};
  }

  .summary-value {
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.text.primary};
  }

  .summary-row.total .summary-label {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
  }

  .summary-row.total .summary-value {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.main};
  }

  .summary-divider {
    height: 1px;
    background-color: ${theme.colors.border.light};
    margin: ${theme.spacing.sm} 0;
  }

  /* 操作按鈕 */
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.md};
  }

  .cancel-btn {
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    background-color: white;
    color: ${theme.colors.error};
    border: 1px solid ${theme.colors.error};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.error};
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* RWD */
  @media (max-width: 640px) {
    padding: ${theme.spacing.lg} 0;

    .order-header {
      flex-direction: column;
      gap: ${theme.spacing.md};
    }

    .order-number {
      font-size: ${theme.typography.fontSize.xl};
    }

    .section {
      padding: ${theme.spacing.md};
    }

    .item-card {
      flex-wrap: wrap;
    }

    .item-image {
      width: 60px;
      height: 60px;
    }

    .item-subtotal {
      width: 100%;
      text-align: right;
      margin-top: ${theme.spacing.xs};
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .actions {
      justify-content: center;
    }

    .cancel-btn {
      width: 100%;
    }
  }
`;

export default style;
