import { memo, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Table, Space, Drawer } from 'antd';
import { FormInstance } from 'antd/lib';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import VrForm from '@/components/VrForm/VrForm';
import permissionFormConfig from './form.config';
import { IPermissionParams, IPermission } from '@/types/systems/permissions';
import { noMenuPid } from '@/global/data/data.config';
import { useAppSelector, useAppShallowEqual } from '@/store';
import VrTable from '@/components/VrTable/VrTable';
import permissionTableConfig from './table.config';
import {
  getPermissionListService,
  createPermissionService,
  updatePermissionService
} from '@/service/modules/systems/permissions';
import permissionDrawerConfig from './drawer.config';

interface IProps {
  children?: ReactNode;
}

const { Column } = Table;

const permissions: FC<IProps> = () => {
  const { userMenu } = useAppSelector((state) => state.systems, useAppShallowEqual);
  // 查询条件
  const [searchInfo, setSearchInfo] = useState<IPermissionParams>({
    page: 1,
    size: 10
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 菜单列表数据
  const [permissionList, setPermissionList] = useState<IPermission[]>([]);
  // 菜单列表总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的权限数据
  const [editPermission, setEditPermission] = useState<IPermission | null>(null);
  // 抽屉表单实例
  const drawerFormRef = useRef<FormInstance>(null);

  // 提交查询条件
  const onSubmitSearchInfo = useCallback((values: Record<string, any>) => {
    const newMenuId = values.menuId ? values.menuId[values.menuId.length - 1] : '';
    values.menuId = newMenuId;
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

  // 动态更新所属菜单
  useEffect(() => {
    permissionFormConfig.formItems = permissionFormConfig.formItems.map((item) => {
      if (item.key === 'menuId') {
        return { ...item, fieldNamesOptions: userMenu };
      }
      return item;
    });
    permissionDrawerConfig.formItems = permissionDrawerConfig.formItems.map((item) => {
      if (item.key === 'menuId') {
        return { ...item, fieldNamesOptions: userMenu };
      }
      return item;
    });
  }, [userMenu]);

  // 获取权限列表数据
  const fetchPermissionList = useCallback(async () => {
    setTableLoading(true);
    const result = await getPermissionListService(searchInfo);
    setPermissionList(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchPermissionList();
  }, [fetchPermissionList]);

  // 点击添加菜单
  const onClickCreatePermission = useCallback(() => {
    setEditPermission(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑菜单
  const onClickEditPermission = useCallback((menu: IPermission) => {
    setEditPermission(menu);
    setDrawerVisible(true);
  }, []);

  // 编辑菜单数据回显
  useEffect(() => {
    if (editPermission && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue({
        ...editPermission,
        menuId: editPermission.menuArr,
        permissionValue: editPermission.permissionValue.split(':')[1]
      });
    }
  }, [editPermission]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      const newMenuId = values.menuId[values.menuId.length - 1];
      values.menuId = newMenuId;
      if (editPermission) {
        await updatePermissionService({ ...values, id: editPermission.id });
      } else {
        console.log(values);
        await createPermissionService(values);
      }
      onCloseDrawer();
      fetchPermissionList();
    },
    [editPermission]
  );

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setEditPermission(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  return (
    <div>
      <VrForm
        {...permissionFormConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button onClick={onClickCreatePermission} icon={<PlusOutlined />}>
            添加权限
          </Button>
        }
      />
      <VrTable
        {...permissionTableConfig}
        data={permissionList}
        total={total}
        current={searchInfo.page}
        pageSize={searchInfo.size}
        loading={tableLoading}
        handlePageChange={(page, size) => setSearchInfo({ ...searchInfo, page, size })}
        actionColumn={
          <Column
            title="操作"
            key="action"
            align="center"
            render={(_: string, record: IPermission) => (
              <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEditPermission(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer
        title={editPermission ? '编辑权限' : '添加权限'}
        open={drawerVisible}
        onClose={onCloseDrawer}
        width={'35%'}
      >
        <VrForm
          ref={drawerFormRef}
          {...permissionDrawerConfig}
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
    </div>
  );
};

export default memo(permissions);
