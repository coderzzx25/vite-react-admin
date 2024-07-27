import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Avatar, ColorPicker, Dropdown, Flex } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  ExpandOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';

import VrHeaderWrapper from './style';
import { IUserInfo } from '@/types/auths/auths';

interface IProps {
  children?: ReactNode;
  collapsed: boolean;
  dark: boolean;
  handleCollapsed: () => void;
  handleDark: () => void;
  dropdownMenuItems: MenuProps['items'];
  userInfo: IUserInfo | null;
  primaryColor: string;
  handlePrimaryColor: (color: string) => void;
}

const VrHeader: FC<IProps> = ({
  collapsed,
  handleCollapsed,
  dark,
  handleDark,
  dropdownMenuItems,
  userInfo,
  primaryColor,
  handlePrimaryColor
}) => {
  const onClickCollapsed = () => {
    handleCollapsed();
  };

  const onClickDark = () => {
    handleDark();
  };

  const onChangePrimaryColor = (color: Color) => {
    handlePrimaryColor(color.toHexString());
  };
  return (
    <VrHeaderWrapper>
      <div className="header-left">
        <div className="collapsed">
          {collapsed ? (
            <MenuUnfoldOutlined onClick={onClickCollapsed} />
          ) : (
            <MenuFoldOutlined onClick={onClickCollapsed} />
          )}
        </div>
      </div>
      <div className="header-right">
        <div className="operation">
          <span>{dark ? <SunOutlined onClick={onClickDark} /> : <MoonOutlined onClick={onClickDark} />}</span>
          <span>
            <ExpandOutlined />
          </span>
          <span>
            <MessageOutlined />
          </span>
          <span>
            <ColorPicker size="small" value={primaryColor} onChangeComplete={(color) => onChangePrimaryColor(color)} />
          </span>
        </div>
        <Dropdown menu={{ items: dropdownMenuItems }} placement="bottom" arrow>
          <Flex align="center" justify="space-between" gap={10}>
            <Avatar src={userInfo?.userAvatar} />
            <div>{userInfo?.userName}</div>
          </Flex>
        </Dropdown>
      </div>
    </VrHeaderWrapper>
  );
};

export default memo(VrHeader);
