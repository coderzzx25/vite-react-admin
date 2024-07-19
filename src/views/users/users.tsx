import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const users: FC<IProps> = () => {
  return <div>users</div>;
};

export default memo(users);
