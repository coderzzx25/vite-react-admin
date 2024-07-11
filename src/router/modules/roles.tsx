import { lazy, LazyExoticComponent, NamedExoticComponent } from 'react';
import RouterLoading from '../utils/RouterLoading';

const Roles: LazyExoticComponent<NamedExoticComponent<any>> = lazy(() => import('@/views/roles/roles'));

export default {
  path: '/roles',
  element: RouterLoading(Roles)
};
