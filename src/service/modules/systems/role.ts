import VrRequest from '@/service';
import {
  IRoleListParams,
  IRoleListResponseInfo,
  ICreateRoleBody,
  IUpdateRoleBody,
  IRoleInfo
} from '@/types/systems/role';

/**
 * 获取角色列表
 * @param {IRoleListParams} data 查询参数
 * @returns
 */
export const getRoleListService = (data: IRoleListParams) => {
  return VrRequest.get<IRoleListResponseInfo>({
    url: '/roles/role-list',
    params: data
  });
};

/**
 * 添加角色
 * @param {ICreateRoleBody} data 添加角色参数
 * @returns {Promise<void>}
 */
export const createRoleService = (data: ICreateRoleBody) => {
  return VrRequest.post({
    url: '/roles/create-role',
    data
  });
};

/**
 * 编辑角色
 * @param {IUpdateRoleBody} data 编辑角色参数
 * @returns {Promise<void>}
 */
export const updateRoleService = (data: IUpdateRoleBody) => {
  return VrRequest.post({
    url: '/roles/update-role',
    data
  });
};

/**
 * 获取所有角色列表
 * @returns {Promise<IRoleInfo[]>} 角色列表
 */
export const getAllRoleListService = () => {
  return VrRequest.get<IRoleInfo[]>({
    url: '/roles/all-role-list'
  });
};
