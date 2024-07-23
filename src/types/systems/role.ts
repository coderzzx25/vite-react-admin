/**
 * 角色列表请求参数
 */
export interface IRoleListParams {
  page: number;
  size: number;
  roleName?: string;
  status?: number;
}

/**
 * 角色信息
 */
export interface IRoleInfo {
  id: number;
  roleName: string;
  rolePermission: number[];
  permissionInfo: {
    id: number;
    permissionName: string;
  }[];
  status: number;
  createTime: string;
  updateTime: string;
}

/**
 * 角色列表响应信息
 */
export interface IRoleListResponseInfo {
  data: IRoleInfo[];
  total: number;
}

/**
 * 添加角色参数
 */
export interface ICreateRoleBody {
  roleName: string;
  rolePermissions: number[];
  status: number;
}

/**
 * 编辑角色参数
 */
export interface IUpdateRoleBody extends ICreateRoleBody {
  id: number;
}
