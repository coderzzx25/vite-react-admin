/**
 * 账户登录请求参数
 */
export interface IAccountLoginBody {
  userAccount: string;
  userPassword: string;
}

/**
 * 用户信息
 */
export interface IUserInfo {
  userAccount: string;
  userName: string;
  userAvatar: string;
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
