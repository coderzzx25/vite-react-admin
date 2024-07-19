import { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { MenuProps } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import VrMenuWrapper from './style';

interface IProps {
  children?: ReactNode;
  menuItems: Required<MenuProps>['items'][number][];
  handleMenuClick?: (key: string) => void;
  selectedKeys?: string;
  openKey?: string;
}

const VrMenu: FC<IProps> = ({ menuItems, handleMenuClick, selectedKeys, openKey }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (openKey) {
      setOpenKeys([openKey]);
    }
  }, [openKey]);

  const onClickMenuItem: MenuProps['onClick'] = useCallback(
    (e: MenuInfo) => {
      handleMenuClick && handleMenuClick(e.key);
    },
    [handleMenuClick]
  );

  const onOpenChange = useCallback(
    (keys: React.Key[]) => {
      setOpenKeys(keys as string[]);
    },
    [openKeys]
  );

  return (
    <VrMenuWrapper
      onClick={onClickMenuItem}
      items={menuItems}
      mode="inline"
      selectedKeys={[selectedKeys || '']}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
};

export default memo(VrMenu);
