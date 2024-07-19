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
