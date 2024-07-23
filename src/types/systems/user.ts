import { IRoleInfo } from './role';

/**
 * 用户列表请求参数
 */
export interface IUserListParams {
  page: number;
  size: number;
  userAccount?: string;
  userName?: string;
  userRole?: number;
  status?: number;
}

/**
 * 用户信息
 */
export interface IUserInfo {
  id: number;
  userAccount: string;
  userName: string;
  userAvatar: string;
  userRole: IRoleInfo;
  status: number;
  createTime: string;
  updateTime: string;
}

/**
 * 用户列表响应信息
 */
export interface IUserListResponseInfo {
  total: number;
  data: IUserInfo[];
}

/**
 * 添加用户参数
 */
export interface ICreateUserBody {
  userAccount: string;
  userName: string;
  userAvatar: string;
  userRole: number;
  status: number;
}

/**
 * 编辑用户参数
 */
export interface IUpdateUserBody extends ICreateUserBody {
  id: number;
}
