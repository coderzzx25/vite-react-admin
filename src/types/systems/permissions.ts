// 权限列表请求参数
export interface IPermissionParams {
  page: number;
  size: number;
  permissionName?: string;
  menuPid?: number;
  status?: number | '';
}

export interface IPermission {
  id: number;
  permissionName: string;
  permissionValue: string;
  menuId: number;
  status: boolean;
  createTime: string;
  updateTime: string;
}

// 权限列表返回数据
export interface IPermissionList {
  total: number;
  data: IPermission[];
}
