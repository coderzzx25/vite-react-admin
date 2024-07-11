import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const permissions: FC<IProps> = () => {
  return <div>permissions</div>;
};

export default memo(permissions);
