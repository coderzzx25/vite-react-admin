import VrRequest from '@/service';
import { IAccountLoginBody, IAccountLoginResponseInfo } from '@/types/auths/auths';

/**
 * 用户登录
 * @param {IAccountLoginBody} data 登录数据
 * @returns {Promise<IAccountLoginResponseInfo>} 返回登录信息
 */
export const userLoginService = (data: IAccountLoginBody) => {
  return VrRequest.post<IAccountLoginResponseInfo>({
    url: '/auths/account-login',
    data
  });
};

/**
 * 刷新token
 * @param {string} refreshToken 刷新token
 * @returns {Promise<{accessToken:string, refreshToken:string}>} 返回新的token
 */
export const refreshTokenService = (refreshToken: string) => {
  return VrRequest.post<{ accessToken: string; refreshToken: string }>({
    url: '/auths/refresh-token',
    data: {
      refreshToken
    }
  });
};
