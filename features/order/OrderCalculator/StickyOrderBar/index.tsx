import styled from 'styled-components';

import { DeliveryOption } from '@/constants/deliveryOptions';

import style from './style';

interface StickyOrderBarProps {
  className?: string;
  subtotal: number;
  delivery: DeliveryOption;
  total: number;
  hasItems: boolean;
  copied: boolean;
  onCopy: () => void;
  onOpenInstagram: () => void;
}

function StickyOrderBar({
  className,
  subtotal,
  delivery,
  total,
  hasItems,
  copied,
  onCopy,
  onOpenInstagram,
}: StickyOrderBarProps) {
  const feeLabel =
    delivery.fee === null
      ? '另計'
      : delivery.fee === 0
        ? '免費'
        : `$${delivery.fee}`;
  const totalLabel =
    delivery.fee === null ? `$${subtotal} + 運費另計` : `$${total}`;

  return (
    <div className={className}>
      <div className="summary">
        <span className="summary-item">
          商品小計 <strong>${subtotal}</strong>
        </span>
        <span className="divider">·</span>
        <span className="summary-item">
          {delivery.label} <strong>{feeLabel}</strong>
        </span>
        <span className="divider">·</span>
        <span className="total">
          總計 <strong>{totalLabel}</strong>
        </span>
      </div>
      <div className="actions">
        <button className="button-copy" disabled={!hasItems} onClick={onCopy}>
          {copied ? '✓ 已複製！' : '複製訂單文案'}
        </button>
        <button className="button-instagram" onClick={onOpenInstagram}>
          前往 IG 私訊
        </button>
      </div>
    </div>
  );
}

export default styled(StickyOrderBar)`
  ${style}
`;
