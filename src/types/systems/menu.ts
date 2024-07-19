/**
 * 菜单列表请求参数
 */
export interface IMenuListParams {
  page: number;
  size: number;
  menuName?: string;
  status?: number;
}

/**
 * 菜单信息
 */
export interface IMenuInfo {
  id: number;
  menuName: string;
  menuUrl: string;
  menuIcon: string;
  menuPid: number;
  status: number;
  createTime: string;
  updateTime: string;
  children?: IMenuInfo[];
}

/**
 * 菜单列表响应信息
 */
export interface IMenuListResponseInfo {
  total: number;
  data: IMenuInfo[];
}

/**
 * 添加菜单参数
 */
export interface ICreateMenuBody {
  menuName: string;
  menuUrl: string;
  menuIcon: string;
  menuPid: number;
  status: number;
}

/**
 * 编辑菜单参数
 */
export interface IUpdateMenuBody extends ICreateMenuBody {
  id: number;
}
