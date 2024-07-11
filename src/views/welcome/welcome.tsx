import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const welcome: FC<IProps> = () => {
  return <div>welcome</div>;
};

export default memo(welcome);
