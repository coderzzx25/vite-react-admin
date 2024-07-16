import VrRequest from '@/service';
import { IRoleListParams, IRoleList } from '@/types/systems/role';

export const getRoleListService = (data: IRoleListParams) => {
  return VrRequest.get<IRoleList>({
    url: '/roles/role-list',
    params: data
  });
};
