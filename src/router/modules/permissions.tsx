import { lazy, LazyExoticComponent, NamedExoticComponent } from 'react';
import RouterLoading from '../utils/RouterLoading';

const Permissions: LazyExoticComponent<NamedExoticComponent<any>> = lazy(
  () => import('@/views/permissions/permissions')
);

export default {
  path: '/permissions',
  element: RouterLoading(Permissions)
};
