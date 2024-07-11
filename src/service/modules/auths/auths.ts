import VrRequest from '@/service';
import { IAccountLoginData, IAccountLoginInfo } from '@/types/auths/auths';

/**
 * 用户登录
 * @param {IAccountLoginData} data 登录数据
 * @returns {Promise<IAccountLoginInfo>} 返回登录信息
 */
export const userLoginFetch = (data: IAccountLoginData) => {
  return VrRequest.post<IAccountLoginInfo>({
    url: '/auths/account-login',
    data
  });
};
