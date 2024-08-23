import { memo, useState, useEffect, useCallback, useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { Col, Form, Row, Table, Input, Select, Space, Button } from 'antd';
import { SearchOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';

import tableColumn from './table.config';
import {
  createPermissionService,
  getPermissionListService,
  updatePermissionService
} from '@/service/modules/systems/permission';
import { IPermissionInfo, IPermissionListParams, ICreatePermissionBody } from '@/types/systems/permission';

import BaseForm from '@/components/BaseForm/BaseForm';
import drawerConfig from './drawer.config';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer';
import { IBaseDrawerRef } from '@/components/BaseDrawer/BaseDrawer.d';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { getAllPermissionListAsyncThunk } from '@/store/modules/systems';

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
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 表格数据
  const [tableData, setTableData] = useState<IPermissionInfo[]>([]);
  // 表格总数
  const [total, setTotal] = useState<number>(0);
  // 查询参数
  const [searchInfo, setSearchInfo] = useState<IPermissionListParams>({
    page: 1,
    size: 10
  });

  const onClickSearch = useCallback(
    (values: IPermissionListParams) => {
      setSearchInfo({ ...searchInfo, ...values });
    },
    [searchInfo]
  );
  // 获取权限列表
  const fetchPermissionList = useCallback(async () => {
    setTableLoading(true);
    const result = await getPermissionListService(searchInfo);
    setTableData(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  // 初始化获取权限列表
  useEffect(() => {
    fetchPermissionList();
  }, [fetchPermissionList]);

  const drawerRef = useRef<IBaseDrawerRef | null>(null);
  const [editInfo, setEditInfo] = useState<IPermissionInfo | null>(null);
  const [newDrawerConfig, setNewDrawerConfig] = useState(drawerConfig);

  const dispatch = useAppDispatch();
  const { allPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);

  useEffect(() => {
    dispatch(getAllPermissionListAsyncThunk());
  }, [dispatch]);

  // 动态插入数据
  useEffect(() => {
    setNewDrawerConfig({
      ...drawerConfig,
      formFields: drawerConfig.formFields.map((item) => {
        if (item.name === 'permissionPid') {
          return {
            ...item,
            options: [...item.options, ...allPermission]
          };
        }
        return item;
      })
    });
  }, [allPermission]);

  // 创建按钮
  const onClickCreate = async () => {
    setEditInfo(null);
    drawerRef.current?.open();
  };

  // 编辑按钮
  const onClickEdit = (info: IPermissionInfo) => {
    setEditInfo(info);
    drawerRef.current?.open();
  };

  // 确认
  const onClickConfirm = async (values: ICreateForm) => {
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
  };

  // 取消
  const onClickCancel = () => {
    drawerRef.current?.close();
  };

  return (
    <div>
      <Form autoComplete="off" onFinish={onClickSearch}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item<IPermissionListParams> label="权限名" name="permissionName">
              <Input placeholder="请输入权限名" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<IPermissionListParams> label="权限类型" name="permissionType">
              <Select placeholder="请选择权限类型" allowClear>
                <Select.Option value={1}>菜单</Select.Option>
                <Select.Option value={2}>按钮</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<IPermissionListParams> label="权限状态" name="status">
              <Select placeholder="请选择权限状态" allowClear>
                <Select.Option value={1}>启用</Select.Option>
                <Select.Option value={0}>禁用</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                查询
              </Button>
              <Button icon={<ReloadOutlined />}>重置</Button>
              <Button type="primary" onClick={onClickCreate}>
                创建
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table
        loading={tableLoading}
        dataSource={tableData}
        rowKey={'id'}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          current: searchInfo.page,
          pageSize: searchInfo.size,
          total,
          onChange: (page: number, size: number) => setSearchInfo({ ...searchInfo, page, size }),
          showTotal: () => `共 ${total} 条`
        }}
      >
        {tableColumn && tableColumn.map((column) => <Column {...column} children={undefined} key={column.key} />)}
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
