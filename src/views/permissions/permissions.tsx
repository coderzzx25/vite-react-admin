import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import type { FC, ReactNode } from 'react';

import { Table, Space, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import tableColumn from './table.config';
import {
  createPermissionService,
  getPermissionListService,
  updatePermissionService
} from '@/service/modules/systems/permission';
import { IPermissionInfo, IPermissionListParams, ICreatePermissionBody } from '@/types/systems/permission';

import BaseForm from '@/components/BaseForm/BaseForm';
import drawerConfig from './drawer.config';
import searchConfig from './search.config';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { getAllPermissionListAsyncThunk } from '@/store/modules/systems';

import useDrawer from '@/components/BaseDrawer/useDrawer';

interface IProps {
  children?: ReactNode;
}

interface ICreateForm {
  permissionName: string;
  permissionPid: number[];
  permissionUrl: string;
  permissionIcon: string;
  permissionType: number;
  status: number;
}

const { Column } = Table;

const permissions: FC<IProps> = () => {
  // 状态
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IPermissionInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchInfo, setSearchInfo] = useState<IPermissionListParams>({ page: 1, size: 10 });
  const [editInfo, setEditInfo] = useState<IPermissionInfo | null>(null);
  const [newDrawerConfig, setNewDrawerConfig] = useState(drawerConfig);
  const [drawerRef, setDrawerOpen, setDrawerClose] = useDrawer();

  // 全局状态
  const dispatch = useAppDispatch();
  const { allPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);

  // 事件
  const onClickSearch = useCallback((values: IPermissionListParams) => {
    setSearchInfo((prevSearchInfo) => ({ ...prevSearchInfo, ...values }));
  }, []);

  const onClickReset = useCallback(() => {
    setSearchInfo({ page: 1, size: 10 });
  }, []);

  const fetchPermissionList = useCallback(async () => {
    setTableLoading(true);
    const result = await getPermissionListService(searchInfo);
    setTableData(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  const onClickCreate = useCallback(() => {
    setEditInfo(null);
    setDrawerOpen();
  }, []);

  const onClickEdit = useCallback((info: IPermissionInfo) => {
    setEditInfo(info);
    setDrawerOpen();
  }, []);

  const onClickConfirm = useCallback(
    async (values: ICreateForm) => {
      const newValues: ICreatePermissionBody = {
        ...values,
        permissionPid: values.permissionPid[values.permissionPid.length - 1]
      };
      if (editInfo) {
        await updatePermissionService({ ...newValues, id: editInfo.id });
      } else {
        await createPermissionService(newValues);
      }
      onClickCancel();
      fetchPermissionList();
    },
    [editInfo, fetchPermissionList]
  );

  const onClickCancel = useCallback(() => {
    setDrawerClose();
  }, []);

  // 初始化
  useEffect(() => {
    fetchPermissionList();
  }, [fetchPermissionList]);

  useEffect(() => {
    dispatch(getAllPermissionListAsyncThunk());
  }, [dispatch]);

  useEffect(() => {
    setNewDrawerConfig((prevConfig) => ({
      ...prevConfig,
      formFields: prevConfig.formFields.map((item) =>
        item.name === 'permissionPid' ? { ...item, options: [...item.options, ...allPermission] } : item
      )
    }));
  }, [allPermission]);

  // 计算
  const columns = useMemo(() => tableColumn, []);

  const paginationConfig = useMemo(
    () => ({
      showSizeChanger: true,
      showQuickJumper: true,
      current: searchInfo.page,
      pageSize: searchInfo.size,
      total,
      onChange: (page: number, size: number) => setSearchInfo({ ...searchInfo, page, size }),
      showTotal: () => `共 ${total} 条`
    }),
    [searchInfo, total]
  );

  return (
    <div>
      <BaseForm
        {...searchConfig}
        handleConfirm={onClickSearch}
        handleCancel={onClickReset}
        otherOptions={
          <Button onClick={onClickCreate} icon={<PlusOutlined />}>
            创建
          </Button>
        }
      />
      <Table loading={tableLoading} dataSource={tableData} rowKey={'id'} pagination={paginationConfig}>
        {columns && columns.map((column) => <Column {...column} children={undefined} key={column.key} />)}
        <Column
          title="操作"
          key="action"
          align="center"
          render={(_: string, record: IPermissionInfo) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEdit(record)}>
                编辑
              </Button>
            </Space>
          )}
        />
      </Table>
      <BaseDrawer ref={drawerRef} title={editInfo ? '编辑' : '创建'}>
        <BaseForm
          {...newDrawerConfig}
          editInfo={editInfo}
          handleConfirm={onClickConfirm}
          handleCancel={onClickCancel}
        />
      </BaseDrawer>
    </div>
  );
};

export default memo(permissions);
