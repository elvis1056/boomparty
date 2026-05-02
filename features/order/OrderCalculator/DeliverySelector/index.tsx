import classnames from 'classnames';
import styled from 'styled-components';

import { DeliveryOption, DeliveryType } from '@/constants/deliveryOptions';

import style from './style';

interface DeliverySelectorProps {
  className?: string;
  options: DeliveryOption[];
  selected: DeliveryType;
  onSelect: (type: DeliveryType) => void;
}

function DeliverySelector({
  className,
  options,
  selected,
  onSelect,
}: DeliverySelectorProps) {
  return (
    <div className={className}>
      <h3 className="section-title">取貨方式</h3>
      <div className="options">
        {options.map((option) => (
          <label
            className={classnames('option', {
              active: selected === option.type,
            })}
            key={option.type}
          >
            <input
              checked={selected === option.type}
              name="delivery"
              onChange={() => onSelect(option.type)}
              type="radio"
              value={option.type}
            />
            <div className="option-content">
              <div className="option-header">
                <span className="option-label">{option.label}</span>
                <span className="option-fee">
                  {option.fee === null
                    ? '另計'
                    : option.fee === 0
                      ? '免費'
                      : `$${option.fee}`}
                </span>
              </div>
              <span className="option-description">{option.description}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default styled(DeliverySelector)`
  ${style}
`;
