import VrRequest from '@/service';
import {
  IMenuListParams,
  IMenuListResponseInfo,
  ICreateMenuBody,
  IUpdateMenuBody,
  IMenuInfo
} from '@/types/systems/menu';

/**
 * 获取菜单列表
 * @param {IMenuListParams} data 查询参数
 * @returns {Promise<IMenuListResponseInfo>} 菜单列表
 */
export const getMenuListService = (data: IMenuListParams) => {
  return VrRequest.get<IMenuListResponseInfo>({
    url: '/menus/menu-list',
    params: data
  });
};

/**
 * 添加菜单
 * @param {ICreateMenuBody} data 添加菜单参数
 * @returns {Promise<void>}
 */
export const createMenuService = (data: ICreateMenuBody) => {
  return VrRequest.post({
    url: '/menus/create-menu',
    data
  });
};

/**
 * 编辑菜单
 * @param {IUpdateMenuBody} data 编辑菜单参数
 * @returns {Promise<void>}
 */
export const updateMenuService = (data: IUpdateMenuBody) => {
  return VrRequest.post({
    url: '/menus/update-menu',
    data
  });
};

/**
 * 获取所有菜单列表
 * @returns {Promise<IMenuInfo[]>} 菜单列表
 */
export const getAllMenuListService = () => {
  return VrRequest.get<IMenuInfo[]>({
    url: '/menus/all-menu-list'
  });
};

/**
 * @description 获取角色菜单列表
 * @param {Number} roleId 角色ID
 * @returns {Promise<IUserMenuInfo>} 角色菜单列表
 */
export const getRoleMenuListService = (roleId: number) => {
  return VrRequest.get<IMenuInfo[]>({
    url: `/menus/user-menu/${roleId}`
  });
};
