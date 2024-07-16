import { memo, useCallback, useEffect, useState, useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { Table, Space, Button, Drawer } from 'antd';
import { FormInstance } from 'antd/lib';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import roleFormConfig from './form.config';
import VrForm from '@/components/VrForm/VrForm';
import type { IRoleListParams, IRoleInfo } from '@/types/systems/role';
import { getRoleListService } from '@/service/modules/systems/role';
import VrTable from '@/components/VrTable/VrTable';
import roleTableConfig from './table.config';
import roleDrawerConfig from './drawer.config';

interface IProps {
  children?: ReactNode;
}

const { Column } = Table;

const roles: FC<IProps> = () => {
  // 查询条件
  const [searchInfo, setSearchInfo] = useState<IRoleListParams>({
    page: 1,
    size: 10
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 角色列表数据
  const [roleList, setRoleList] = useState<IRoleInfo[]>([]);
  // 角色列表总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的角色数据
  const [editRole, setEditRole] = useState<IRoleInfo | null>(null);
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

  // 获取角色列表数据
  const fetchRoleList = useCallback(async () => {
    setTableLoading(true);
    const result = await getRoleListService(searchInfo);
    setRoleList(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchRoleList();
  }, [fetchRoleList]);

  // 点击添加角色
  const onClickCreateRole = useCallback(() => {
    setEditRole(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑角色
  const onClickEditRole = useCallback((menu: IRoleInfo) => {
    setEditRole(menu);
    setDrawerVisible(true);
  }, []);

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setEditRole(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  // 编辑菜单数据回显
  useEffect(() => {
    if (editRole && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue(editRole);
    }
  }, [editRole]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      if (editRole) {
        console.log(values);
        // await editMenuService({ ...values, id: editMenu.id });
      } else {
        console.log(values);
        // await createMenuService(values);
      }
      onCloseDrawer();
      fetchRoleList();
    },
    [editRole]
  );

  return (
    <div>
      <VrForm
        {...roleFormConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button icon={<PlusOutlined />} onClick={onClickCreateRole}>
            添加权限
          </Button>
        }
      />
      <VrTable
        {...roleTableConfig}
        data={roleList}
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
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEditRole(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer title={editRole ? '编辑角色' : '添加角色'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
        <VrForm
          ref={drawerFormRef}
          {...roleDrawerConfig}
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
