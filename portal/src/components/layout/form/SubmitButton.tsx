import React, { MouseEventHandler } from 'react';

import './SubmitButton.scss';

type SubmitButtonProps = {
  submitAction?: MouseEventHandler;
  label: string;
  disabled: boolean;
};

/**
 * Can either pass in a function or let the button do the submitting
 */
const SubmitButton = ({ submitAction, label, disabled }: SubmitButtonProps) => {
  return (
    <div className="submit-holder">
      <button
        disabled={disabled}
        type={submitAction ? 'button' : 'submit'}
        className="submit"
        onClick={submitAction || (() => {})}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
