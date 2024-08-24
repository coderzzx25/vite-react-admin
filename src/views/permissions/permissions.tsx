import { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

import { Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import {
  createPermissionService,
  getPermissionListService,
  updatePermissionService
} from '@/service/modules/systems/permission';
import { IPermissionInfo, IPermissionListParams, ICreatePermissionBody, ICreateForm } from '@/types/systems/permission';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { getAllPermissionListAsyncThunk } from '@/store/modules/systems';

import BaseForm from '@/components/BaseForm/BaseForm';
import BaseTable from '@/components/BaseTable/BaseTable';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer';
import searchConfig from './search.config';
import tableConfig from './table.config';
import drawerConfig from './drawer.config';

import useSearch from '@/hook/useSearch';
import useDrawer from '@/hook/useDrawer';
import useTable from '@/hook/useTable';

import { handleSelectData } from '@/utils/map-router';

interface IProps {
  children?: ReactNode;
}

const permissions: FC<IProps> = () => {
  // 状态
  const [editInfo, setEditInfo] = useState<IPermissionInfo | null>(null);
  const [newDrawerConfig, setNewDrawerConfig] = useState(drawerConfig);

  // 自定义 hooks
  const [searchInfo, onClickSearch, onClickReset] = useSearch<IPermissionListParams>({ page: 1, size: 10 });
  const [drawerRef, setDrawerOpen, setDrawerClose] = useDrawer();
  const [loading, data, total] = useTable<IPermissionInfo, IPermissionListParams>(getPermissionListService, searchInfo);

  // 全局状态
  const dispatch = useAppDispatch();
  const { allPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);

  // 事件
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
      onClickSearch(searchInfo);
    },
    [editInfo]
  );

  const onClickCancel = useCallback(() => {
    setDrawerClose();
  }, []);

  // 初始化
  useEffect(() => {
    dispatch(getAllPermissionListAsyncThunk(1));
  }, []);

  useEffect(() => {
    setNewDrawerConfig((prevConfig) => ({
      ...prevConfig,
      formFields: prevConfig.formFields.map((item) =>
        item.name === 'permissionPid' && item.type !== 'input'
          ? { ...item, options: [...item.options, ...handleSelectData(allPermission, 'id', 'permissionName')] }
          : item
      )
    }));
  }, [allPermission]);

  const baseTableOthersColumn = [
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: IPermissionInfo) => (
        <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEdit(record)}>
          编辑
        </Button>
      )
    }
  ];

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
      <BaseTable
        columns={tableConfig}
        rowKey="id"
        data={data}
        total={total}
        loading={loading}
        othersColumn={baseTableOthersColumn}
        handlePageChange={(page: number, size: number) => onClickSearch({ ...searchInfo, page, size })}
      />
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
