import { lazy, LazyExoticComponent, NamedExoticComponent } from 'react';
import RouterLoading from '../utils/RouterLoading';

const Menus: LazyExoticComponent<NamedExoticComponent<any>> = lazy(() => import('@/views/menus/menus'));

export default {
  path: '/menus',
  element: RouterLoading(Menus)
};
