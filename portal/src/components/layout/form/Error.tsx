import React, { ReactElement } from 'react';
import './Error.scss';

type ErrorProps = {
  touched: boolean;
  error?: string;
};

const Error = ({ touched, error }: ErrorProps): ReactElement => (
  <div className="error">
    {touched && error ? error : <div className="error-spacer" />}
  </div>
);

export default Error;
