import { memo, useCallback, useEffect, useState, useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { Table, Space, Button, Drawer } from 'antd';
import { FormInstance } from 'antd/lib';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import { getRoleListService, createRoleService, updateRoleService } from '@/service/modules/systems/role';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { getAllPermissionListAsyncThunk } from '@/store/modules/systems';
import type { IRoleListParams, IRoleInfo } from '@/types/systems/role';
import VrTable from '@/components/VrTable/VrTable';
import VrForm from '@/components/VrForm/VrForm';
import roleFormConfig from './form.config';
import roleTableConfig from './table.config';
import roleDrawerConfig from './drawer.config';

interface IProps {
  children?: ReactNode;
}

const { Column } = Table;

const roles: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { allPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);

  // 查询条件
  const [searchInfo, setSearchInfo] = useState<IRoleListParams>({
    page: 1,
    size: 10
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 表格数据
  const [tableList, setTableList] = useState<IRoleInfo[]>([]);
  // 表格总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的数据
  const [updateInfo, setUpdateInfo] = useState<IRoleInfo | null>(null);
  // 抽屉表单实例
  const drawerFormRef = useRef<FormInstance>(null);
  // 抽屉配置
  const [drawerConfig, setDrawerConfig] = useState(roleDrawerConfig);

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

  // 获取表格数据
  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    const result = await getRoleListService(searchInfo);
    setTableList(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // 获取所有权限数据
  useEffect(() => {
    dispatch(getAllPermissionListAsyncThunk());
  }, [dispatch]);

  // 更新配置信息
  useEffect(() => {
    setDrawerConfig((prevConfig) => {
      const newFormItems = prevConfig.formItems.map((item) => {
        if (item.key === 'rolePermissions') {
          return {
            ...item,
            treeData: allPermission
          };
        }
        return item;
      });
      return {
        ...prevConfig,
        formItems: newFormItems
      };
    });
  }, [allPermission]);

  // 点击添加
  const onClickCreate = useCallback(() => {
    setUpdateInfo(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑
  const onClickUpdate = useCallback((updateInfo: IRoleInfo) => {
    setUpdateInfo(updateInfo);
    setDrawerVisible(true);
  }, []);

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setUpdateInfo(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  // 编辑权限数据回显
  useEffect(() => {
    if (updateInfo && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue(updateInfo);
    }
  }, [updateInfo]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      if (updateInfo) {
        await updateRoleService({ ...values, id: updateInfo.id });
      } else {
        await createRoleService(values);
      }
      onCloseDrawer();
      fetchTableData();
    },
    [updateInfo, fetchTableData, onCloseDrawer]
  );

  return (
    <div>
      <VrForm
        {...roleFormConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button icon={<PlusOutlined />} onClick={onClickCreate}>
            添加角色
          </Button>
        }
      />
      <VrTable
        {...roleTableConfig}
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
            render={(_: string, record: IRoleInfo) => (
              <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickUpdate(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer title={updateInfo ? '编辑角色' : '添加角色'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
        <VrForm
          ref={drawerFormRef}
          {...drawerConfig}
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

export default memo(roles);
