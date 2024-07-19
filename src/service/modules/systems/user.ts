import VrRequest from '@/service';
import { IUserListParams, IUserList } from '@/types/systems/user';

export const getUserListService = (data: IUserListParams) => {
  return VrRequest.get<IUserList>({
    url: '/users/user-list',
    params: data
  });
};
