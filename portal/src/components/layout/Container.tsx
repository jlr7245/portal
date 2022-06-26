import './Container.scss';

import React from 'react';

type ViewContainerProps = {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
};

const Container: React.FC<ViewContainerProps> = ({ children, className }) => (
  <div className={`view-container ${className}`}>{children}</div>
);

export default Container;
