import { RouteObject, Navigate, useRoutes } from 'react-router-dom';
import Login from '@/views/login/login';
import Welcome from '@/views/welcome/welcome';
import Vrlayout from '@/views/vrlayout/vrlayout';
import Notfound from '@/views/notfound/notfound';

import { loadLocalRouter } from './utils/handle-router';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/welcome" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Vrlayout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      ...loadLocalRouter()
    ]
  },
  {
    path: '*',
    element: <Navigate to="/notfound" />
  },
  {
    path: '/notfound',
    element: <Notfound />
  }
];

export default () => useRoutes(routes);
