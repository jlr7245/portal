import './Container.scss';

import React from 'react';

type ViewContainerProps = {
  children: React.ReactElement | React.ReactElement[];
  isFull?: boolean;
};

const Container: React.FC<ViewContainerProps> = ({ children, isFull }) => (
  <div className={`view-container ${isFull && 'fullscreen'}`}>{children}</div>
);

export default Container;
