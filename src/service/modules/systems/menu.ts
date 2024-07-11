import VrRequest from '@/service';
import { IUserMenuInfo } from '@/types/systems/menu';

/**
 * 获取角色菜单
 */
export const getRoleMenuList = (roleId: number) => {
  return VrRequest.get<IUserMenuInfo>({
    url: `/menus/user-menu/${roleId}`
  });
};
