import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const roles: FC<IProps> = () => {
  return <div>roles</div>;
};

export default memo(roles);
