/**
 * 账户登录请求参数
 */
export interface IAccountLoginBody {
  userName: string;
  userPassword: string;
}

/**
 * 用户信息
 */
export interface IUserInfo {
  userName: string;
  userNickName: string;
  userHead: string;
  roleId: number;
}

/**
 * 账户登录响应信息
 */
export interface IAccountLoginResponseInfo {
  userInfo: IUserInfo;
  accessToken: string;
  refreshToken: string;
}
