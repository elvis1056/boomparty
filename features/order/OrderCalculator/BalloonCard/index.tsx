import classnames from 'classnames';
import Image from 'next/image';
import styled from 'styled-components';

import Shimmer from '@/components/Shimmer';
import { BalloonShape } from '@/constants/balloonShapes';

import style from './style';

interface BalloonCardProps {
  className?: string;
  shape: BalloonShape;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function BalloonCard({
  className,
  shape,
  quantity,
  onIncrease,
  onDecrease,
}: BalloonCardProps) {
  return (
    <div className={classnames(className, { selected: quantity > 0 })}>
      <div className="image-wrapper">
        {shape.image === null ? (
          <Shimmer />
        ) : (
          <Image
            alt={shape.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            src={shape.image}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div className="info">
        <span className="name">{shape.name}</span>
        <span className="price">${shape.price} / 個</span>
      </div>
      <div className="counter">
        <button
          aria-label="減少數量"
          className="button-decrease"
          disabled={quantity === 0}
          onClick={onDecrease}
        >
          −
        </button>
        <span className="quantity">{quantity}</span>
        <button
          aria-label="增加數量"
          className="button-increase"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
      {quantity > 0 && (
        <div className="subtotal">小計 ${shape.price * quantity}</div>
      )}
    </div>
  );
}

export default styled(BalloonCard)`
  ${style}
`;
