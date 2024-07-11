import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const dashboard: FC<IProps> = () => {
  return <div>dashboard</div>;
};

export default memo(dashboard);
