import { memo, useEffect, useMemo, useState, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Tabs, Typography, Watermark } from 'antd';
import classNames from 'classnames';

import VrLayoutWrapper from './style';
import logo from '@/assets/images/vite.svg';
import VrMenu from '@/components/VrMenu/VrMenu';
import VrHeader from '@/components/VrHeader/VrHeader';
import { getParentMenuUrl, mapPermissionToMenuItem, mapPermissionToUrl, searchRouter } from '@/utils/map-router';
import { localCache } from '@/utils/cache';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { setIsCollapsedReducer, setIsDarkReducer, setPrimaryColorReducer } from '@/store/modules/main';
import { getRolePermissionListAsyncThunk } from '@/store/modules/systems';

interface IProps {
  children?: ReactNode;
}

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Vrlayout: FC<IProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { userInfo, accessToken } = useAppSelector((state) => state.auths, useAppShallowEqual);
  const { userPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);
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
    if (!userInfo && !accessToken && pathname !== '/login') {
      navigate('/login');
    } else if (tabItems.length === 1 && pathname !== '/welcome') {
      navigate('/welcome');
    }
  }, [userInfo, accessToken, pathname, tabItems, navigate]);

  // 获取用户权限
  useEffect(() => {
    if (userInfo) {
      dispatch(getRolePermissionListAsyncThunk(userInfo.roleId)).then(() => {
        setLoading(false);
      });
    }
  }, [userInfo, dispatch]);

  const permissionItems = useMemo(() => mapPermissionToMenuItem(userPermission), [userPermission]);
  const permissionUrls = useMemo(() => mapPermissionToUrl(userPermission), [userPermission]);
  const parentUrl = useMemo(() => getParentMenuUrl(userPermission, pathname), [userPermission, pathname]);

  // 判断是否有权限访问
  useEffect(() => {
    if (!loading) {
      const staticPath = ['/', '/welcome', '/notfound'];
      if (!permissionUrls.includes(pathname) && !staticPath.includes(pathname)) {
        navigate('/notfound');
      }
    }
  }, [pathname, permissionUrls, loading, navigate]);

  // 处理权限点击
  const onClickMenu = useCallback(
    (key: string) => {
      navigate(key);
      const tabItemInfo = searchRouter(key, userPermission);
      if (!tabItemInfo) return;
      if (tabItems.some((item) => item.key === key)) return;
      setTabItems([
        ...tabItems,
        {
          label: tabItemInfo.permissionName,
          key,
          closable: true
        }
      ]);
    },
    [navigate, userPermission, tabItems]
  );

  const onClickEditTabItem = useCallback(
    (key: string) => {
      // 关闭当前标签页
      const index = tabItems.findIndex((item) => item.key === key);
      const newTabItems = [...tabItems];
      newTabItems.splice(index, 1);
      setTabItems(newTabItems);
      // 切换到上一个标签页
      const prevTabItem = newTabItems[index - 1] || newTabItems[0];
      if (prevTabItem) {
        navigate(prevTabItem.key);
      }
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

  // 下拉权限
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
        <VrMenu menuItems={permissionItems} handleMenuClick={onClickMenu} selectedKeys={pathname} openKey={parentUrl} />
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
          <Watermark className="view" content={[`${userInfo?.userAccount}`, `${userInfo?.userName}`]}>
            <Outlet />
          </Watermark>
        </Content>
      </Layout>
    </VrLayoutWrapper>
  );
};

export default memo(Vrlayout);
