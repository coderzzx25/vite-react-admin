import VrRequest from '@/service';
import { IPermissionParams, IPermissionList } from '@/types/systems/permissions';

export const getPermissionListService = (data: IPermissionParams) => {
  return VrRequest.get<IPermissionList>({
    url: '/permissions/permission-list',
    params: data
  });
};
