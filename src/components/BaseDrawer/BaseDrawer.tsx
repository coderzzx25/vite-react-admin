import { memo, useState, forwardRef, useImperativeHandle } from 'react';
import type { ForwardRefRenderFunction } from 'react';
import { Drawer } from 'antd';
import { IDrawerProps, IBaseDrawerRef } from './type';

const BaseDrawer: ForwardRefRenderFunction<IBaseDrawerRef, IDrawerProps> = ({ children, title, width = 35 }, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }));

  return (
    <Drawer open={visible} onClose={handleClose} title={title} width={`${width}%`}>
      {children}
    </Drawer>
  );
};

export default memo(forwardRef(BaseDrawer));
