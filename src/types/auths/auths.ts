// 账户登录提交数据
export interface IAccountLoginBody {
  userName: string;
  userPassword: string;
}

// 登录返回用户信息
export interface IUserInfo {
  userName: string;
  userNickName: string;
  userHead: string;
  roleId: number;
}

// 登录返回数据
export interface IAccountLoginResponseInfo {
  userInfo: IUserInfo;
  accessToken: string;
  refreshToken: string;
}
