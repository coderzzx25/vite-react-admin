import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Routers from '@/router';
import { useAppSelector, useAppShallowEqual } from './store';

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  const { primaryColor, isDark } = useAppSelector((state) => state.main, useAppShallowEqual);
  const darkColor = '#141414';
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor
        },
        components: {
          Layout: {
            headerBg: isDark ? darkColor : '',
            headerPadding: '0 20px',
            bodyBg: isDark ? darkColor : '',
            siderBg: isDark ? darkColor : ''
          },
          Menu: {
            itemBg: isDark ? darkColor : '',
            subMenuItemBg: isDark ? darkColor : ''
          },
          Tree: {
            nodeSelectedBg: isDark ? primaryColor : '#e6f7ff'
          }
        }
      }}
    >
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default memo(App);
