import { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

import { Col, Form, Row, Table, Input, Select, Space, Button, Drawer, Cascader } from 'antd';
import { SearchOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';

import tableColumn from './table.config';
import {
  createPermissionService,
  getPermissionListService,
  updatePermissionService
} from '@/service/modules/systems/permission';
import { IPermissionInfo, IPermissionListParams, ICreatePermissionBody } from '@/types/systems/permission';
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

const noMenuPid = {
  permissionName: '顶级菜单',
  id: 0
};

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

  const dispatch = useAppDispatch();
  const { allPermission } = useAppSelector((state) => state.systems, useAppShallowEqual);

  // 请求菜单数据
  useEffect(() => {
    dispatch(getAllPermissionListAsyncThunk());
  }, [dispatch]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editInfo, setEditInfo] = useState<IPermissionInfo | null>(null);
  const [form] = Form.useForm();

  const onCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
    setEditInfo(null);
    form.resetFields();
  }, [form]);

  // 提交数据
  const onClickCreate = useCallback(
    async (values: ICreateForm) => {
      const newPermissionPid = values.permissionPid[values.permissionPid.length - 1];
      const newValues: ICreatePermissionBody = {
        ...values,
        permissionPid: newPermissionPid
      };
      if (editInfo) {
        await updatePermissionService({ ...newValues, id: editInfo.id });
      } else {
        await createPermissionService(newValues);
      }
      onCloseDrawer();
      fetchPermissionList();
    },
    [editInfo, fetchPermissionList, onCloseDrawer]
  );

  const onClickEdit = useCallback((info: IPermissionInfo) => {
    setEditInfo(info);
    setDrawerVisible(true);
  }, []);

  useEffect(() => {
    if (editInfo && form) {
      form.setFieldsValue(editInfo);
    }
  }, [editInfo, form]);

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
              <Button type="primary" onClick={() => setDrawerVisible(true)}>
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
      <Drawer title="创建" open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
        <Form
          initialValues={{
            permissionName: '',
            permissionPid: [0],
            permissionType: 1,
            permissionUrl: '',
            permissionIcon: '',
            status: 1
          }}
          onFinish={onClickCreate}
          form={form}
        >
          <Form.Item<ICreateForm>
            label="权限名"
            name="permissionName"
            rules={[
              {
                required: true,
                message: '请输入权限名'
              }
            ]}
          >
            <Input placeholder="请输入权限名" />
          </Form.Item>
          <Form.Item<ICreateForm>
            label="父级"
            name="permissionPid"
            rules={[
              {
                required: true,
                message: '请选择父级'
              }
            ]}
          >
            <Cascader
              options={[noMenuPid, ...allPermission]}
              changeOnSelect={true}
              fieldNames={{
                label: 'permissionName',
                value: 'id'
              }}
              placeholder="请选择父级"
            />
          </Form.Item>
          <Form.Item<ICreateForm>
            label="权限类型"
            name="permissionType"
            rules={[
              {
                required: true,
                message: '请选择权限类型'
              }
            ]}
          >
            <Select placeholder="请选择权限类型" allowClear>
              <Select.Option value={1}>菜单</Select.Option>
              <Select.Option value={2}>按钮</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<ICreateForm>
            label="路由地址/按钮值"
            name="permissionUrl"
            rules={[
              {
                required: true,
                message: '请输入路由地址/按钮值'
              }
            ]}
          >
            <Input placeholder="请输入路由地址/按钮值" />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.permissionType !== currentValues.permissionType}
          >
            {({ getFieldValue }) => {
              return getFieldValue('permissionType') === 1 ? (
                <Form.Item<ICreateForm>
                  label="路由Icon"
                  name="permissionIcon"
                  rules={[
                    {
                      required: true,
                      message: '请输入图标'
                    }
                  ]}
                >
                  <Input placeholder="请输入图标" />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item<ICreateForm>
            label="权限状态"
            name="status"
            rules={[
              {
                required: true,
                message: '请选择权限状态'
              }
            ]}
          >
            <Select placeholder="请选择权限状态" allowClear>
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={0}>禁用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={onCloseDrawer}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default memo(permissions);
