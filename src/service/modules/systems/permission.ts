import VrRequest from '@/service';
import {
  IPermissionListParams,
  IPermissionInfo,
  IPermissionListResponseInfo,
  ICreatePermissionBody,
  IUpdatePermissionBody
} from '@/types/systems/permission';

/**
 * 获取权限列表
 * @param {IPermissionListParams} data 查询参数
 * @returns {Promise<IMenuListResponseInfo>} 权限列表
 */
export const getPermissionListService = (data: IPermissionListParams) => {
  return VrRequest.get<IPermissionListResponseInfo>({
    url: '/permissions/permission-list',
    params: data
  });
};

/**
 * 添加权限
 * @param {ICreatePermissionBody} data 添加权限参数
 * @returns {Promise<void>}
 */
export const createPermissionService = (data: ICreatePermissionBody) => {
  return VrRequest.post({
    url: '/permissions/create-permission',
    data
  });
};

/**
 * 编辑权限
 * @param {IUpdatePermissionBody} data 编辑权限参数
 * @returns {Promise<void>}
 */
export const updatePermissionService = (data: IUpdatePermissionBody) => {
  return VrRequest.post({
    url: '/permissions/update-permission',
    data
  });
};

/**
 * 获取所有权限列表
 * @returns {Promise<IPermissionInfo[]>} 权限列表
 */
export const getAllPermissionListService = () => {
  return VrRequest.get<IPermissionInfo[]>({
    url: '/permissions/all-permission-list'
  });
};

/**
 * @description 获取角色权限列表
 * @param {Number} roleId 角色ID
 * @returns {Promise<IPermissionInfo>} 角色权限列表
 */
export const getRolePermissionListService = (roleId: number) => {
  return VrRequest.get<IPermissionInfo[]>({
    url: `/permissions/user-permissions/${roleId}`
  });
};
