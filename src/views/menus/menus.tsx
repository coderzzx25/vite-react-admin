import { memo, useCallback, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { Form, Row, Col, Input, Select, Button, Table, Tag, Space, Drawer, Cascader } from 'antd';
import type { TableColumnsType } from 'antd';

import MenusWrapper from './style';
import { getMenuList } from '@/service/modules/systems/menu';
import { IMenu, IMenuListParams } from '@/types/systems/menu';
import { mapIcon } from '@/utils/map-router';
import { useAppSelector, useAppShallowEqual } from '@/store';

interface IProps {
  children?: ReactNode;
}

const menus: FC<IProps> = () => {
  const { userMenu } = useAppSelector((state) => state.systems, useAppShallowEqual);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<IMenu[]>();
  const [total, setTotal] = useState<number>(0);
  const [searchInfo, setSearchInfo] = useState<IMenuListParams>({
    page: 1,
    size: 10
  });
  useEffect(() => {
    getMenuList(searchInfo).then((res) => {
      setTableData(res.data);
      setTotal(res.total);
    });
  }, [searchInfo]);

  const onClickSearch = useCallback(
    (values: IMenuListParams) => {
      setSearchInfo({
        ...searchInfo,
        status: values.status !== undefined ? values.status : undefined,
        menuName: values.menuName || undefined
      });
    },
    [searchInfo]
  );

  const [drawerFormInfo, setDrawerFormInfo] = useState({
    menuName: '',
    menuPid: 0,
    menuIcon: '',
    menuUrl: '',
    status: 1
  });

  const drawerFormRules = {
    menuName: [{ required: true, message: '请输入菜单名' }],
    menuPid: [{ required: true, message: '请选择父菜单' }],
    menuIcon: [{ required: true, message: '请输入菜单图标' }],
    menuUrl: [{ required: true, message: '请输入菜单路径' }],
    status: [{ required: true, message: '请选择菜单状态' }]
  };

  const onChangeDrawerFormValue = (field: string, value: any) => {
    setDrawerFormInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value
    }));
  };

  const onClickAddMenu = useCallback(() => {
    console.log('add menu', drawerFormInfo);
  }, [drawerFormInfo]);

  const onClickEditMenu = useCallback((record: IMenu) => {
    console.log(record);
  }, []);

  const tableColumns: TableColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: '菜单名',
      dataIndex: 'menuName',
      key: 'menuName',
      align: 'center'
    },
    {
      title: '菜单路径',
      dataIndex: 'menuUrl',
      key: 'menuUrl',
      align: 'center'
    },
    {
      title: '菜单图标',
      dataIndex: 'menuIcon',
      key: 'menuIcon',
      align: 'center',
      render: (icon: string) => mapIcon(icon)
    },
    {
      title: '菜单状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: boolean) => (status ? <Tag color="success">启用</Tag> : <Tag color="error">禁用</Tag>)
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: IMenu) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onClickEditMenu(record)}>
            编辑
          </Button>
        </Space>
      )
    }
  ];
  return (
    <MenusWrapper>
      <Form form={form} onFinish={onClickSearch}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="menuName">
              <Input placeholder="请输入菜单名" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="status">
              <Select placeholder="请选择菜单状态" allowClear>
                <Select.Option value="0">禁用</Select.Option>
                <Select.Option value="1">启用</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                onClick={() => {
                  setSearchInfo({ page: 1, size: 10 });
                  form.resetFields();
                }}
              >
                重置
              </Button>
              <Button onClick={onClickAddMenu}>新增菜单</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        bordered
        rowKey={'id'}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          current: searchInfo.page,
          pageSize: searchInfo.size,
          total,
          onChange: (page: number, pageSize: number) => {
            setSearchInfo({ ...searchInfo, page, size: pageSize });
          },
          showTotal: () => `共 ${total} 条`
        }}
      />
      <Drawer title="coderzzx" open={true} width={'35%'}>
        <Form autoComplete="off" onFinish={onClickAddMenu}>
          <Form.Item name="menuName" label="菜单名" rules={drawerFormRules.menuName}>
            <Input
              placeholder="请输入菜单名"
              value={drawerFormInfo.menuName}
              onChange={(e) => onChangeDrawerFormValue('menuName', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="menuPid" label="父菜单" rules={drawerFormRules.menuPid}>
            <Cascader
              options={userMenu}
              placeholder="请选择父菜单"
              changeOnSelect
              fieldNames={{ label: 'menuName', value: 'id' }}
              value={[drawerFormInfo.menuPid]}
              onChange={(value) => onChangeDrawerFormValue('menuPid', value[0])}
            />
          </Form.Item>
          <Form.Item name="menuIcon" label="菜单图标" rules={drawerFormRules.menuIcon}>
            <Input
              placeholder="请输入菜单图标"
              value={drawerFormInfo.menuIcon}
              onChange={(e) => onChangeDrawerFormValue('menuIcon', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="menuUrl" label="菜单路径" rules={drawerFormRules.menuUrl}>
            <Input
              placeholder="请输入菜单路径"
              value={drawerFormInfo.menuUrl}
              onChange={(e) => onChangeDrawerFormValue('menuUrl', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="status" label="菜单状态" rules={drawerFormRules.status}>
            <Select
              placeholder="请选择菜单状态"
              value={drawerFormInfo.status}
              onChange={(value) => onChangeDrawerFormValue('status', value)}
            >
              <Select.Option value="0">禁用</Select.Option>
              <Select.Option value="1">启用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </MenusWrapper>
  );
};

export default memo(menus);
