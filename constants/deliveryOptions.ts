export type DeliveryType = 'PICKUP' | 'DELIVERY' | 'LALAMOVE';

export interface DeliveryOption {
  type: DeliveryType;
  label: string;
  description: string;
  fee: number | null; // null 代表另計
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    type: 'PICKUP',
    label: '自取',
    description: '捷運西門站',
    fee: 0,
  },
  {
    type: 'DELIVERY',
    label: '親送',
    description: '台北市統一配送',
    fee: 500,
  },
  {
    type: 'LALAMOVE',
    label: 'Lalamove',
    description: '費用另計，以平台報價為準',
    fee: null,
  },
];
