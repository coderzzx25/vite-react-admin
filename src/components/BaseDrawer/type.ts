import { ReactNode } from 'react';

export interface IDrawerProps {
  visible: boolean;
  title: string;
  handleDrawerClose?: () => void;
  children?: ReactNode;
  width?: number;
}

declare const BaseDrawer: React.ComponentType<IDrawerProps>;

export default BaseDrawer;
