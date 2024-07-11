import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const menus: FC<IProps> = () => {
  return <div>menus</div>;
};

export default memo(menus);
