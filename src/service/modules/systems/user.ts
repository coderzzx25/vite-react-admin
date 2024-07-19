import VrRequest from '@/service';
import { IUserListParams, IUserListResponseInfo, ICreateUserBody, IUpdateUserBody } from '@/types/systems/user';

/**
 * 获取用户列表
 * @param {IUserListParams} data 查询参数
 * @returns {Promise<IUserListResponseInfo>} 用户列表
 */
export const getUserListService = (data: IUserListParams) => {
  return VrRequest.get<IUserListResponseInfo>({
    url: '/users/user-list',
    params: data
  });
};

/**
 * 添加用户
 * @param {ICreateUserBody} data 添加用户参数
 * @returns {Promise<void>}
 */
export const createUserService = (data: ICreateUserBody) => {
  return VrRequest.post({
    url: '/users/create-user',
    data
  });
};

/**
 * 编辑用户
 * @param {IUpdateUserBody} data 编辑用户参数
 * @returns {Promise<void>}
 */
export const updateUserService = (data: IUpdateUserBody) => {
  return VrRequest.post({
    url: '/users/update-user',
    data
  });
};
