import { ReactNode } from 'react';
import { DrawerProps } from 'antd/es/drawer';

export interface IBaseDrawerRef {
  open: () => void;
  close: () => void;
}

export interface IDrawerProps extends Omit<DrawerProps, 'open'> {
  title: string;
  children?: ReactNode;
  width?: number;
}

declare const BaseDrawer: React.ForwardRefExoticComponent<IDrawerProps & React.RefAttributes<IBaseDrawerRef>>;

export default BaseDrawer;
