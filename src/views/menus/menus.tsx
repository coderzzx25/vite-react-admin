import { memo, useCallback, useState, useEffect, useRef, useMemo } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Space, Drawer, Table } from 'antd';
import { FormInstance } from 'antd/lib';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import MenusWrapper from './style';

import { getMenuListService, createMenuService, editMenuService } from '@/service/modules/systems/menu';
import { useAppSelector, useAppShallowEqual } from '@/store';

import VrForm from '@/components/VrForm/VrForm';
import VrTable from '@/components/VrTable/VrTable';
import menuTableConfig from './table.config';
import menuDrawerConfig from './drawer.config';
import menuFormConfig from './form.config';

import { IMenu, IMenuListParams } from '@/types/systems/menu';
import { noMenuPid } from '@/global/data/data.config';

interface IProps {
  children?: ReactNode;
}

const { Column } = Table;

const menus: FC<IProps> = () => {
  const { userMenu } = useAppSelector((state) => state.systems, useAppShallowEqual);
  // 查询条件
  const [searchInfo, setSearchInfo] = useState<IMenuListParams>({
    page: 1,
    size: 10
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 菜单列表数据
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  // 菜单列表总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的菜单数据
  const [editMenu, setEditMenu] = useState<IMenu | null>(null);
  // 抽屉表单实例
  const drawerFormRef = useRef<FormInstance>(null);

  // 提交查询条件
  const onSubmitSearchInfo = useCallback((values: Record<string, any>) => {
    setSearchInfo((prev) => ({
      ...prev,
      ...values
    }));
  }, []);

  // 重置查询条件
  const onResetSearchInfo = useCallback((values: Record<string, any>) => {
    setSearchInfo({
      page: 1,
      size: 10,
      ...values
    });
  }, []);

  // 获取菜单列表数据
  const fetchMenuList = useCallback(async () => {
    setTableLoading(true);
    const res = await getMenuListService(searchInfo);
    setMenuList(res.data);
    setTotal(res.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  // 点击添加菜单
  const onClickCreateMenu = useCallback(() => {
    setEditMenu(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑菜单
  const onClickEditMenu = useCallback((menu: IMenu) => {
    setEditMenu(menu);
    setDrawerVisible(true);
  }, []);

  // 编辑菜单数据回显
  useEffect(() => {
    if (editMenu && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue({
        ...editMenu,
        menuPid: [editMenu.menuPid]
      });
    }
  }, [editMenu]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      const newMenuPid = values.menuPid[values.menuPid.length - 1];
      values.menuPid = newMenuPid;
      if (editMenu) {
        await editMenuService({ ...values, id: editMenu.id });
      } else {
        await createMenuService(values);
      }
      onCloseDrawer();
      fetchMenuList();
    },
    [editMenu]
  );

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setEditMenu(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  // 用户菜单数据
  const memoizedUserMenu = useMemo(() => [noMenuPid, ...userMenu], [userMenu]);

  // 用户菜单数据变化时更新formItems
  useEffect(() => {
    menuDrawerConfig.formItems = menuDrawerConfig.formItems.map((item) => {
      if (item.key === 'menuPid') {
        return { ...item, fieldNamesOptions: memoizedUserMenu };
      }
      return item;
    });
  }, [memoizedUserMenu]);

  return (
    <MenusWrapper>
      <VrForm
        {...menuFormConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button onClick={onClickCreateMenu} icon={<PlusOutlined />}>
            添加菜单
          </Button>
        }
      />
      <VrTable
        {...menuTableConfig}
        data={menuList}
        total={total}
        current={searchInfo.page}
        pageSize={searchInfo.size}
        loading={tableLoading}
        handlePageChange={(page, size) =>
          setSearchInfo({
            ...searchInfo,
            page,
            size
          })
        }
        actionColumn={
          <Column
            title="操作"
            key="action"
            align="center"
            render={(_: string, record: IMenu) => (
              <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEditMenu(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer title={editMenu ? '编辑菜单' : '添加菜单'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
        <VrForm
          ref={drawerFormRef}
          {...menuDrawerConfig}
          handleSubmit={onClickDrawerFormSubmit}
          otherBtns={
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={onCloseDrawer}>取消</Button>
            </Space>
          }
        />
      </Drawer>
    </MenusWrapper>
  );
};

export default memo(menus);
