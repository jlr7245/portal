import React from 'react';
import { render } from 'react-dom';

//@ts-ignore
const Application: React.SFC<{}> = () => (
  <h1>Patient Portal</h1>
);

render(<Application />, document.getElementById('root'));
