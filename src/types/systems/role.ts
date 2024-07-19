export interface IRoleListParams {
  page: number;
  size: number;
  roleName?: string;
  status?: number;
}

export interface IRoleInfo {
  id: number;
  roleName: string;
  roleMenus: number[];
  rolePermissions: string;
  status: number;
  createTime: string;
  updateTime: string;
}

export interface IRoleList {
  data: IRoleInfo[];
  total: number;
}

export interface ICreateRoleParams {
  roleName: string;
  roleMenus: number[];
  status: number;
}

export interface IUpdateRoleParams extends ICreateRoleParams {
  id: number;
}
