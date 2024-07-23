import { memo, useCallback, useState, useEffect, useRef, useMemo } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Space, Drawer, Table } from 'antd';
import { FormInstance } from 'antd/lib';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import MenusWrapper from './style';

import {
  getPermissionListService,
  createPermissionService,
  updatePermissionService
} from '@/service/modules/systems/permission';
import { useAppSelector, useAppShallowEqual } from '@/store';

import VrForm from '@/components/VrForm/VrForm';
import VrTable from '@/components/VrTable/VrTable';
import permissionTableConfig from './table.config';
import permissionDrawerConfig from './drawer.config';
import permissionFormConfig from './form.config';

import { IPermissionInfo, IPermissionListParams } from '@/types/systems/permission';
import { noMenuPid } from '@/global/data/data.config';

interface IProps {
  children?: ReactNode;
}

const { Column } = Table;

const permissions: FC<IProps> = () => {
  const { userPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);
  // 查询条件
  const [searchInfo, setSearchInfo] = useState<IPermissionListParams>({
    page: 1,
    size: 10
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 表格数据
  const [tableList, setTableList] = useState<IPermissionInfo[]>([]);
  // 表格总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的数据
  const [updateInfo, setUpdateInfo] = useState<IPermissionInfo | null>(null);
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

  // 请求表格数据
  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    const res = await getPermissionListService(searchInfo);
    setTableList(res.data);
    setTotal(res.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // 点击添加
  const onClickCreate = useCallback(() => {
    setUpdateInfo(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑
  const onClickUpdate = useCallback((updateInfo: IPermissionInfo) => {
    setUpdateInfo(updateInfo);
    setDrawerVisible(true);
  }, []);

  // 编辑数据回显
  useEffect(() => {
    if (updateInfo && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue({
        ...updateInfo,
        permissionPid: [updateInfo.permissionPid]
      });
    }
  }, [updateInfo]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      const newMenuPid = values.menuPid[values.menuPid.length - 1];
      values.menuPid = newMenuPid;
      if (updateInfo) {
        await updatePermissionService({ ...values, id: updateInfo.id });
      } else {
        await createPermissionService(values);
      }
      onCloseDrawer();
      fetchTableData();
    },
    [updateInfo]
  );

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setUpdateInfo(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  // 用户权限数据
  const memoizedUserMenu = useMemo(() => [noMenuPid, ...userPermission], [userPermission]);

  // 用户权限数据变化时更新formItems
  useEffect(() => {
    permissionDrawerConfig.formItems = permissionDrawerConfig.formItems.map((item) => {
      if (item.key === 'permissionPid') {
        return { ...item, fieldNamesOptions: memoizedUserMenu };
      }
      return item;
    });
  }, [memoizedUserMenu]);

  return (
    <MenusWrapper>
      <VrForm
        {...permissionFormConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button onClick={onClickCreate} icon={<PlusOutlined />}>
            添加权限
          </Button>
        }
      />
      <VrTable
        {...permissionTableConfig}
        data={tableList}
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
            render={(_: string, record: IPermissionInfo) => (
              <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickUpdate(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer title={updateInfo ? '编辑权限' : '添加权限'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
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
    </MenusWrapper>
  );
};

export default memo(permissions);
