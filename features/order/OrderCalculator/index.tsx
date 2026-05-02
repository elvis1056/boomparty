'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { BALLOON_SHAPES } from '@/constants/balloonShapes';
import { DELIVERY_OPTIONS, DeliveryType } from '@/constants/deliveryOptions';

import BalloonCard from './BalloonCard';
import DeliverySelector from './DeliverySelector';
import StickyOrderBar from './StickyOrderBar';
import style from './style';

export type Quantities = Record<string, number>;

function buildOrderText(
  quantities: Quantities,
  deliveryType: DeliveryType,
  subtotal: number,
  total: number
): string {
  const selectedItems = BALLOON_SHAPES.filter(
    (shape) => quantities[shape.id] > 0
  );

  if (selectedItems.length === 0) return '';

  const itemLines = selectedItems
    .map(
      (shape) =>
        `${shape.name} x${quantities[shape.id]} = $${shape.price * quantities[shape.id]}`
    )
    .join('\n');

  const delivery = DELIVERY_OPTIONS.find(
    (option) => option.type === deliveryType
  )!;
  const deliveryLine =
    delivery.fee === null
      ? `${delivery.label}（${delivery.description}）：費用另計`
      : `${delivery.label}（${delivery.description}）：$${delivery.fee}`;

  const totalLine =
    delivery.fee === null
      ? `小計：$${subtotal}（運費另計）`
      : `總計：$${total}`;

  return [
    '🎈 造型氣球快速訂購',
    '',
    '【商品】',
    itemLines,
    '',
    `【取貨方式】${deliveryLine}`,
    `【${totalLine}】`,
    '',
    '以上訂單由 boomparty.tw 產生',
  ].join('\n');
}

function OrderCalculator({ className }: { className?: string }) {
  const [quantities, setQuantities] = useState<Quantities>(() =>
    Object.fromEntries(BALLOON_SHAPES.map((shape) => [shape.id, 0]))
  );
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('PICKUP');
  const [copied, setCopied] = useState(false);

  const subtotal = BALLOON_SHAPES.reduce(
    (sum, shape) => sum + shape.price * quantities[shape.id],
    0
  );
  const delivery = DELIVERY_OPTIONS.find(
    (option) => option.type === deliveryType
  )!;
  const total = subtotal + (delivery.fee !== null ? delivery.fee : 0);
  const hasItems = subtotal > 0;

  function updateQuantity(shapeId: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [shapeId]: Math.max(0, prev[shapeId] + delta),
    }));
  }

  async function copyOrder() {
    const text = buildOrderText(quantities, deliveryType, subtotal, total);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function openInstagram() {
    window.open(
      'https://ig.me/m/boom.com_studio',
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <div className={className}>
      <div className="shapes-grid">
        {BALLOON_SHAPES.map((shape) => (
          <BalloonCard
            key={shape.id}
            onDecrease={() => updateQuantity(shape.id, -1)}
            onIncrease={() => updateQuantity(shape.id, 1)}
            quantity={quantities[shape.id]}
            shape={shape}
          />
        ))}
      </div>

      <DeliverySelector
        onSelect={setDeliveryType}
        options={DELIVERY_OPTIONS}
        selected={deliveryType}
      />

      <StickyOrderBar
        copied={copied}
        delivery={delivery}
        hasItems={hasItems}
        onCopy={copyOrder}
        onOpenInstagram={openInstagram}
        subtotal={subtotal}
        total={total}
      />
    </div>
  );
}

export default styled(OrderCalculator)`
  ${style}
`;
