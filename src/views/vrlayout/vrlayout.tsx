import { memo, useEffect, useMemo, useState, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Tabs, Typography } from 'antd';
import classNames from 'classnames';

import VrLayoutWrapper from './style';
import logo from '@/assets/images/vite.svg';
import VrMenu from '@/components/VrMenu/VrMenu';
import VrHeader from '@/components/VrHeader/VrHeader';
import { getParentMenuUrl, mapMenuToMenuItem, mapMenuToUrl, searchRouter } from '@/utils/map-router';
import { localCache } from '@/utils/cache';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { setIsCollapsedReducer, setIsDarkReducer, setPrimaryColorReducer } from '@/store/modules/main';
import { getRoleMenuListAsyncThunk } from '@/store/modules/systems';

interface IProps {
  children?: ReactNode;
}

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Vrlayout: FC<IProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auths, useAppShallowEqual);
  const { userMenu } = useAppSelector((state) => state.systems, useAppShallowEqual);
  const { isCollapsed, isDark, primaryColor } = useAppSelector((state) => state.main, useAppShallowEqual);
  const [loading, setLoading] = useState(true);
  const [tabItems, setTabItems] = useState([
    {
      label: '欢迎页',
      key: '/welcome',
      closable: false
    }
  ]);

  // 判断是否登录
  useEffect(() => {
    if (!userInfo && pathname !== '/login') {
      navigate('/login');
    }
  }, [userInfo, pathname, navigate]);

  // 获取用户菜单
  useEffect(() => {
    if (userInfo) {
      dispatch(getRoleMenuListAsyncThunk(userInfo.roleId)).then(() => {
        setLoading(false);
      });
    }
  }, [userInfo, dispatch]);

  const menuItems = useMemo(() => mapMenuToMenuItem(userMenu), [userMenu]);
  const menuUrls = useMemo(() => mapMenuToUrl(userMenu), [userMenu]);
  const parentUrl = useMemo(() => getParentMenuUrl(userMenu, pathname), [userMenu, pathname]);

  // 判断是否有权限访问
  useEffect(() => {
    if (!loading) {
      const staticPath = ['/', '/welcome', '/notfound'];
      if (!menuUrls.includes(pathname) && !staticPath.includes(pathname)) {
        navigate('/notfound');
      }
    }
  }, [pathname, menuUrls, loading, navigate]);

  useEffect(() => {
    if (tabItems.length === 1) {
      navigate('/welcome');
    }
  }, [tabItems, navigate]);

  // 处理菜单点击
  const onClickMenu = useCallback(
    (key: string) => {
      navigate(key);
      const tabItemInfo = searchRouter(key, userMenu);
      if (!tabItemInfo) return;
      if (tabItems.some((item) => item.key === key)) return;
      setTabItems([
        ...tabItems,
        {
          label: tabItemInfo.menuName,
          key,
          closable: true
        }
      ]);
    },
    [navigate, userMenu]
  );

  const onClickEditTabItem = useCallback(
    (key: string) => {
      // 关闭当前标签页
      const index = tabItems.findIndex((item) => item.key === key);
      const newTabItems = [...tabItems];
      newTabItems.splice(index, 1);
      setTabItems(newTabItems);
      // 切换到上一个标签页
      const prevTabItem = newTabItems[index - 1];
      navigate(prevTabItem.key);
    },
    [tabItems, navigate]
  );

  // 标签页点击
  const onClickTabItem = useCallback(
    (key: string) => {
      navigate(key);
    },
    [navigate]
  );

  // 处理折叠
  const onClickCollapsed = useCallback(() => {
    dispatch(setIsCollapsedReducer(!isCollapsed));
  }, [dispatch, isCollapsed]);

  // 处理暗黑模式
  const onClickDark = useCallback(() => {
    dispatch(setIsDarkReducer(!isDark));
  }, [dispatch, isDark]);

  const onChangePrimaryColor = useCallback(
    (color: string) => {
      dispatch(setPrimaryColorReducer(color));
    },
    [dispatch]
  );

  // 退出登录
  const onClickLoginOut = useCallback(() => {
    localCache.deleteCache('userInfo');
    localCache.deleteCache('accessToken');
    localCache.deleteCache('refreshToken');
    navigate('/login');
  }, [navigate]);

  // 下拉菜单
  const dropdownMenuItems = [
    {
      label: '退出登录',
      key: '1',
      onClick: onClickLoginOut
    }
  ];

  return (
    <VrLayoutWrapper>
      <Sider collapsed={isCollapsed}>
        <Typography className="sider-header">
          <img className="logo" src={logo} alt="logo" />
          <Title className={classNames({ collapsed: isCollapsed })}>Vite React Admin</Title>
        </Typography>
        <VrMenu menuItems={menuItems} handleMenuClick={onClickMenu} selectedKeys={pathname} openKey={parentUrl} />
      </Sider>
      <Layout>
        <Header>
          <VrHeader
            collapsed={isCollapsed}
            handleCollapsed={onClickCollapsed}
            dark={isDark}
            handleDark={onClickDark}
            dropdownMenuItems={dropdownMenuItems}
            userInfo={userInfo}
            primaryColor={primaryColor}
            handlePrimaryColor={onChangePrimaryColor}
          />
        </Header>
        <Content className="content">
          <Tabs
            type="editable-card"
            hideAdd
            items={tabItems}
            activeKey={pathname}
            onTabClick={onClickTabItem}
            onEdit={(key, action) => {
              if (action === 'remove') {
                onClickEditTabItem(key.toString());
              }
            }}
          ></Tabs>
          <Outlet />
        </Content>
      </Layout>
    </VrLayoutWrapper>
  );
};

export default memo(Vrlayout);
