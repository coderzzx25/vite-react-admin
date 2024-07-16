import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Table, Space } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import VrForm from '@/components/VrForm/VrForm';
import permissionFormConfig from './form.config';
import { IPermissionParams, IPermission } from '@/types/systems/permissions';
import { noMenuPid } from '@/global/data/data.config';
import { useAppSelector, useAppShallowEqual } from '@/store';
import VrTable from '@/components/VrTable/VrTable';
import permissionTableConfig from './table.config';
import { getPermissionListService } from '@/service/modules/systems/permissions';

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

  // 提交查询条件
  const onSubmitSearchInfo = useCallback((values: Record<string, any>) => {
    const newMenuId = values.menuId[values.menuId.length - 1];
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

  // 用户菜单
  const memoizedUserMenu = useMemo(() => [noMenuPid, ...userMenu], [userMenu]);

  // 动态更新所属菜单
  useEffect(() => {
    permissionFormConfig.formItems = permissionFormConfig.formItems.map((item) => {
      if (item.key === 'menuId') {
        return { ...item, fieldNamesOptions: memoizedUserMenu };
      }
      return item;
    });
  }, [memoizedUserMenu]);

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
  return (
    <div>
      <VrForm
        {...permissionFormConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button onClick={() => {}} icon={<PlusOutlined />}>
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
                <Button type="primary" icon={<EditOutlined />} onClick={() => {}}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
    </div>
  );
};

export default memo(permissions);
