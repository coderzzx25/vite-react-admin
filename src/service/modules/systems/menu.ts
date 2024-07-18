import VrRequest from '@/service';
import { IMenuListParams, IMenuList, IMenuAddParams, IMenuEditParams, IMenu } from '@/types/systems/menu';

/**
 * @description 获取角色菜单列表
 * @param {Number} roleId 角色ID
 * @returns {Promise<IUserMenuInfo>} 角色菜单列表
 */
export const getRoleMenuListService = (roleId: number) => {
  return VrRequest.get<IMenu[]>({
    url: `/menus/user-menu/${roleId}`
  });
};

/**
 * @description 获取菜单列表
 * @param {IMenuListParams} data 查询参数
 * @returns {Promise<IMenuList>} 菜单列表
 */
export const getMenuListService = (data: IMenuListParams) => {
  return VrRequest.get<IMenuList>({
    url: '/menus/menu-list',
    params: data
  });
};

/**
 * @description 添加菜单
 * @param {IMenuAddParams} data 菜单数据
 * @returns {Promise<void>}
 */
export const createMenuService = (data: IMenuAddParams) => {
  return VrRequest.post({
    url: '/menus/create-menu',
    data
  });
};

/**
 * @description 编辑菜单
 *
 */
export const editMenuService = (data: IMenuEditParams) => {
  return VrRequest.post({
    url: '/menus/update-menu',
    data
  });
};

export const getAllMenuListService = () => {
  return VrRequest.get<IMenu[]>({
    url: '/menus/all-menu-list'
  });
};
