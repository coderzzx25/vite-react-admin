import { type MenuProps } from 'antd';

export interface IMenu {
  id: number;
  menuName: string;
  menuUrl: string;
  menuIcon: string;
  menuPid: number;
  status: number;
  createTime: string;
  updateTime: string;
  children?: IMenu[];
}

// menu格式
export type MenuItem = Required<MenuProps>['items'][number];

// 菜单列表参数
export interface IMenuListParams {
  menuName?: string;
  status?: number | '';
  page: number;
  size: number;
}

// 菜单列表
export interface IMenuList {
  total: number;
  data: IMenu[];
}

// 菜单添加参数
export interface IMenuAddParams {
  menuName: string;
  menuUrl: string;
  menuIcon: string;
  menuPid: number;
  status: number;
}

// 菜单编辑参数
export interface IMenuEditParams extends IMenuAddParams {
  id: number;
}
