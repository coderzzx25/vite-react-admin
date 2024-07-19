import { IRoleInfo } from './role';

export interface IUserListParams {
  page: number;
  size: number;
  userName?: string;
  userNick?: string;
  userRole?: number;
  status?: number;
}

export interface IUserInfo {
  id: number;
  userName: string;
  userNick: string;
  userHead: string;
  userRole: IRoleInfo;
  status: number;
  createTime: string;
  updateTime: string;
}

export interface IUserList {
  total: number;
  data: IUserInfo[];
}

export interface IUserAddParams {
  userName: string;
  userNick: string;
  userHead: string;
  userRole: number;
  status: number;
}

export interface IUserUpdateParams extends IUserAddParams {
  id: number;
}
