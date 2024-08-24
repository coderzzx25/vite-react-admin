/**
 * 权限列表请求参数
 */
export interface IPermissionListParams {
  page: number;
  size: number;
  permissionName?: string;
  permissionType?: number;
  status?: number;
}

/**
 * 权限信息
 */
export interface IPermissionInfo {
  id: number;
  permissionName: string;
  permissionUrl: string;
  permissionIcon: string;
  permissionPid: number[];
  permissionType: number;
  status: number;
  createTime: string;
  updateTime: string;
  children?: IPermissionInfo[];
}

/**
 * 权限列表响应信息
 */
export interface IPermissionListResponseInfo {
  total: number;
  data: IPermissionInfo[];
}

/**
 * 添加权限参数
 */
export interface ICreatePermissionBody {
  permissionName: string;
  permissionUrl: string;
  permissionIcon: string;
  permissionPid: number;
  permissionType: number;
  status: number;
}

/**
 * 编辑权限参数
 */
export interface IUpdatePermissionBody extends ICreatePermissionBody {
  id: number;
}

export interface ICreateForm {
  permissionName: string;
  permissionPid: number[];
  permissionUrl: string;
  permissionIcon: string;
  permissionType: number;
  status: number;
}
