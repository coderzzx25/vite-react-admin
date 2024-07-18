import VrRequest from '@/service';
import { IRoleListParams, IRoleList, ICreateRoleParams, IUpdateRoleParams } from '@/types/systems/role';

export const getRoleListService = (data: IRoleListParams) => {
  return VrRequest.get<IRoleList>({
    url: '/roles/role-list',
    params: data
  });
};

export const createRoleService = (data: ICreateRoleParams) => {
  return VrRequest.post({
    url: '/roles/create-role',
    data
  });
};

export const updateRoleService = (data: IUpdateRoleParams) => {
  return VrRequest.post({
    url: '/roles/update-role',
    data
  });
};
