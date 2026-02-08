'use client';

import type { DebouncedFunc } from 'lodash';
import styled from 'styled-components';

import style from './style';

interface ShippingData {
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  note: string;
}

interface ShippingFormProps {
  className?: string;
  shippingData: ShippingData;
  onFieldChange: DebouncedFunc<
    (field: keyof ShippingData, value: string | number | boolean | null) => void
  >;
}

function ShippingForm({
  className,
  shippingData,
  onFieldChange,
}: ShippingFormProps) {
  return (
    <div className={className}>
      <h2 className="section-title">收件資訊</h2>

      {/* 基本資訊 */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="recipientName">
            收件人姓名 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="recipientName"
            onChange={(e) => onFieldChange('recipientName', e.target.value)}
            placeholder="請輸入收件人姓名"
            required
            type="text"
            value={shippingData.recipientName}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="recipientPhone">
            聯絡電話 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="recipientPhone"
            onChange={(e) => onFieldChange('recipientPhone', e.target.value)}
            placeholder="0912-345-678"
            required
            type="tel"
            value={shippingData.recipientPhone}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="recipientEmail">
          Email <span className="required">*</span>
        </label>
        <input
          className="form-input"
          id="recipientEmail"
          onChange={(e) => onFieldChange('recipientEmail', e.target.value)}
          placeholder="example@email.com"
          required
          type="email"
          value={shippingData.recipientEmail}
        />
      </div>

      {/* 地址資訊 */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="city">
            縣市 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="city"
            onChange={(e) => onFieldChange('city', e.target.value)}
            placeholder="台北市"
            required
            type="text"
            value={shippingData.city}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="district">
            鄉鎮市區 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="district"
            onChange={(e) => onFieldChange('district', e.target.value)}
            placeholder="信義區"
            required
            type="text"
            value={shippingData.district}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="postalCode">
            郵遞區號 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="postalCode"
            onChange={(e) => onFieldChange('postalCode', e.target.value)}
            placeholder="110"
            required
            type="text"
            value={shippingData.postalCode}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="addressLine">
          詳細地址 <span className="required">*</span>
        </label>
        <input
          className="form-input"
          id="addressLine"
          onChange={(e) => onFieldChange('addressLine', e.target.value)}
          placeholder="請輸入路名、巷弄、門牌號碼"
          required
          type="text"
          value={shippingData.addressLine}
        />
      </div>

      {/* 訂單備註 */}
      <div className="form-group">
        <label className="form-label" htmlFor="note">
          訂單備註（選填）
        </label>
        <textarea
          className="form-textarea"
          id="note"
          onChange={(e) => onFieldChange('note', e.target.value)}
          placeholder="如有特殊需求請在此註明（例如：希望配送時間、包裝需求等）"
          rows={3}
          value={shippingData.note}
        />
      </div>
    </div>
  );
}

export default styled(ShippingForm)`
  ${style}
`;
