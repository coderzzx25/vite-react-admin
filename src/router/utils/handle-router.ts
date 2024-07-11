import { RouteObject } from 'react-router-dom';

// 加载本地路由
export const loadLocalRouter = (): RouteObject[] => {
  const modules: Record<string, any> = import.meta.glob('../modules/**/*.tsx', { eager: true });
  const routes: RouteObject[] = [];
  for (const key in modules) {
    const route = modules[key].default;
    routes.push(route);
  }
  return routes;
};
