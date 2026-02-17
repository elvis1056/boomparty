'use client';

import styled from 'styled-components';

import style from './style';

export interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

function StepIndicator({ currentStep, steps, className }: StepIndicatorProps) {
  return (
    <div className={className}>
      <div className="step-container">
        {steps.map((step, index) => (
          <div className="step-item" key={step.number}>
            <div className="step-content">
              <div
                className={`step-circle ${
                  currentStep === step.number
                    ? 'active'
                    : currentStep > step.number
                      ? 'completed'
                      : 'inactive'
                }`}
              >
                {currentStep > step.number ? (
                  <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                    <path
                      d="M16.6663 5L7.49967 14.1667L3.33301 10"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line ${
                  currentStep > step.number ? 'completed' : 'inactive'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default styled(StepIndicator)`
  ${style}
`;
