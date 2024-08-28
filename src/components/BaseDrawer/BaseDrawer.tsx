import { memo, FC } from 'react';
import { Drawer } from 'antd';
import { IDrawerProps } from './type';

const BaseDrawer: FC<IDrawerProps> = ({ children, title, width = 35, visible, handleDrawerClose }) => {
  return (
    <Drawer title={title} open={visible} onClose={handleDrawerClose} width={`${width}%`} destroyOnClose>
      {children}
    </Drawer>
  );
};

export default memo(BaseDrawer);
