import VrRequest from '@/service';
import { IUserMenuInfo, IMenuListParams, IMenuList } from '@/types/systems/menu';

/**
 * 获取角色菜单
 */
export const getRoleMenuList = (roleId: number) => {
  return VrRequest.get<IUserMenuInfo>({
    url: `/menus/user-menu/${roleId}`
  });
};

export const getMenuList = (data: IMenuListParams) => {
  return VrRequest.get<IMenuList>({
    url: '/menus/menu-list',
    params: data
  });
};
