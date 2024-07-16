import VrRequest from '@/service';
import {
  IPermissionParams,
  IPermissionList,
  IPermissionCreateParams,
  IPermissionEditParams
} from '@/types/systems/permissions';

// 获取权限列表
export const getPermissionListService = (data: IPermissionParams) => {
  return VrRequest.get<IPermissionList>({
    url: '/permissions/permission-list',
    params: data
  });
};

// 创建权限
export const createPermissionService = (data: IPermissionCreateParams) => {
  return VrRequest.post({
    url: '/permissions/create-permission',
    data
  });
};

// 编辑权限
export const updatePermissionService = (data: IPermissionEditParams) => {
  return VrRequest.post({
    url: '/permissions/update-permission',
    data
  });
};
