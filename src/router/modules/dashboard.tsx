import { lazy, LazyExoticComponent, NamedExoticComponent } from 'react';
import RouterLoading from '../utils/RouterLoading';

const Dashboard: LazyExoticComponent<NamedExoticComponent<any>> = lazy(() => import('@/views/dashboard/dashboard'));

export default {
  path: '/dashboard',
  element: RouterLoading(Dashboard)
};
