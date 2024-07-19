import VrRequest from '@/service';
import { IUserListParams, IUserList, IUserAddParams, IUserUpdateParams } from '@/types/systems/user';

export const getUserListService = (data: IUserListParams) => {
  return VrRequest.get<IUserList>({
    url: '/users/user-list',
    params: data
  });
};

export const createUserService = (data: IUserAddParams) => {
  return VrRequest.post({
    url: '/users/create-user',
    data
  });
};

export const updateUserService = (data: IUserUpdateParams) => {
  return VrRequest.post({
    url: '/users/update-user',
    data
  });
};
