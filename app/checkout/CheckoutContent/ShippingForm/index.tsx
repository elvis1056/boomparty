'use client';

import type { DebouncedFunc } from 'lodash';
import type { MutableRefObject } from 'react';
import styled from 'styled-components';

import { theme } from '@/constants/theme';

import style from './style';

interface ShippingFormProps {
  recipientNameRef: MutableRefObject<string>;
  recipientPhoneRef: MutableRefObject<string>;
  recipientEmailRef: MutableRefObject<string>;
  cityRef: MutableRefObject<string>;
  districtRef: MutableRefObject<string>;
  postalCodeRef: MutableRefObject<string>;
  addressLineRef: MutableRefObject<string>;
  noteRef: MutableRefObject<string>;
  recipientNameError: string;
  recipientPhoneError: string;
  recipientEmailError: string;
  cityError: string;
  districtError: string;
  postalCodeError: string;
  addressLineError: string;
  debounceNameCheck: DebouncedFunc<() => void>;
  debouncePhoneCheck: DebouncedFunc<() => void>;
  debounceEmailCheck: DebouncedFunc<() => void>;
  debounceCityCheck: DebouncedFunc<() => void>;
  debounceDistrictCheck: DebouncedFunc<() => void>;
  debouncePostalCodeCheck: DebouncedFunc<() => void>;
  debounceAddressLineCheck: DebouncedFunc<() => void>;
}

// 只有這個組件有樣式
const StyledWrapper = styled.div`
  ${style}

  .error {
    color: ${theme.colors.error};
    font-size: ${theme.typography.fontSize.sm};
    margin-top: 4px;
  }
`;

// 主組件
function ShippingForm({
  recipientNameRef,
  recipientPhoneRef,
  recipientEmailRef,
  cityRef,
  districtRef,
  postalCodeRef,
  addressLineRef,
  noteRef,
  recipientNameError,
  recipientPhoneError,
  recipientEmailError,
  cityError,
  districtError,
  postalCodeError,
  addressLineError,
  debounceNameCheck,
  debouncePhoneCheck,
  debounceEmailCheck,
  debounceCityCheck,
  debounceDistrictCheck,
  debouncePostalCodeCheck,
  debounceAddressLineCheck,
}: ShippingFormProps) {
  return (
    <StyledWrapper>
      <h2 className="section-title">收件資訊</h2>

      {/* 基本資訊 */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="recipientName">
            收件人姓名 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            defaultValue={recipientNameRef.current}
            id="recipientName"
            onChange={(e) => {
              recipientNameRef.current = e.target.value;
              debounceNameCheck();
            }}
            placeholder="請輸入收件人姓名"
            required
            type="text"
          />
          {recipientNameError && (
            <div className="error">{recipientNameError}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="recipientPhone">
            聯絡電話 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            defaultValue={recipientPhoneRef.current}
            id="recipientPhone"
            onChange={(e) => {
              recipientPhoneRef.current = e.target.value;
              debouncePhoneCheck();
            }}
            placeholder="0912-345-678"
            required
            type="tel"
          />
          {recipientPhoneError && (
            <div className="error">{recipientPhoneError}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="recipientEmail">
          Email <span className="required">*</span>
        </label>
        <input
          className="form-input"
          defaultValue={recipientEmailRef.current}
          id="recipientEmail"
          onChange={(e) => {
            recipientEmailRef.current = e.target.value;
            debounceEmailCheck();
          }}
          placeholder="example@email.com"
          required
          type="email"
        />
        {recipientEmailError && (
          <div className="error">{recipientEmailError}</div>
        )}
      </div>

      {/* 地址資訊 */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="city">
            縣市 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            defaultValue={cityRef.current}
            id="city"
            onChange={(e) => {
              cityRef.current = e.target.value;
              debounceCityCheck();
            }}
            placeholder="台北市"
            required
            type="text"
          />
          {cityError && <div className="error">{cityError}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="district">
            鄉鎮市區 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            defaultValue={districtRef.current}
            id="district"
            onChange={(e) => {
              districtRef.current = e.target.value;
              debounceDistrictCheck();
            }}
            placeholder="信義區"
            required
            type="text"
          />
          {districtError && <div className="error">{districtError}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="postalCode">
            郵遞區號 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            defaultValue={postalCodeRef.current}
            id="postalCode"
            onChange={(e) => {
              postalCodeRef.current = e.target.value;
              debouncePostalCodeCheck();
            }}
            placeholder="110"
            required
            type="text"
          />
          {postalCodeError && <div className="error">{postalCodeError}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="addressLine">
          詳細地址 <span className="required">*</span>
        </label>
        <input
          className="form-input"
          defaultValue={addressLineRef.current}
          id="addressLine"
          onChange={(e) => {
            addressLineRef.current = e.target.value;
            debounceAddressLineCheck();
          }}
          placeholder="請輸入路名、巷弄、門牌號碼"
          required
          type="text"
        />
        {addressLineError && <div className="error">{addressLineError}</div>}
      </div>

      {/* 訂單備註 */}
      <div className="form-group">
        <label className="form-label" htmlFor="note">
          訂單備註（選填）
        </label>
        <textarea
          className="form-textarea"
          defaultValue={noteRef.current}
          id="note"
          onChange={(e) => {
            noteRef.current = e.target.value;
          }}
          placeholder="如有特殊需求請在此註明（例如：希望配送時間、包裝需求等）"
          rows={3}
        />
      </div>
    </StyledWrapper>
  );
}

export default ShippingForm;
