import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider, Watermark, theme } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Routers from '@/router';
import { useAppSelector, useAppShallowEqual } from './store';

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  const { primaryColor, isDark } = useAppSelector((state) => state.main, useAppShallowEqual);
  const { userInfo } = useAppSelector((state) => state.auths, useAppShallowEqual);
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
            headerBg: isDark ? '#141414' : '',
            headerPadding: '0 20px',
            bodyBg: isDark ? '#141414' : '',
            siderBg: isDark ? '#141414' : ''
          },
          Menu: {
            itemBg: isDark ? '#141414' : '',
            subMenuItemBg: isDark ? '#141414' : ''
          },
          Tree: {
            nodeSelectedBg: isDark ? primaryColor : '#e6f7ff'
          }
        }
      }}
    >
      <HashRouter>
        <Watermark content={[`${userInfo?.userName}`, `${userInfo?.userNickName}`]}>
          <Routers />
        </Watermark>
      </HashRouter>
    </ConfigProvider>
  );
};

export default memo(App);
