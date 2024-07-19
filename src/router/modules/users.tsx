import { lazy, LazyExoticComponent, NamedExoticComponent } from 'react';
import RouterLoading from '../utils/RouterLoading';

const Users: LazyExoticComponent<NamedExoticComponent<any>> = lazy(() => import('@/views/users/users'));

export default {
  path: '/users',
  element: RouterLoading(Users)
};
