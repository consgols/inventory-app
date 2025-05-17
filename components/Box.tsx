import { cn } from '@/lib/utils';
import React, { FunctionComponent } from 'react';

type BoxPropsType = {
  children: React.ReactNode;
  className?: string;
};

const Box: FunctionComponent<BoxPropsType> = props => {
  const { children, className } = props;
  return <div className={cn(['p-5 rounded-lg bg-muted/50', className])}>{children}</div>;
};

export default Box;
