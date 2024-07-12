import { memo, useCallback, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

import { Form, Row, Col, Input, Select, Button, Space, Tag, Table, Drawer, Cascader } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

import MenusWrapper from './style';
import { IMenu, IMenuListParams, IMenuAddParams } from '@/types/systems/menu';
import { getMenuListService, createMenuService, editMenuService } from '@/service/modules/systems/menu';
import { DATA_STATUS } from '@/global/config/type.config';
import { mapIcon } from '@/utils/map-router';
import { useAppSelector, useAppShallowEqual } from '@/store';

interface IProps {
  children?: ReactNode;
}

const noMenuPid = {
  id: 0,
  menuName: '顶级菜单'
};

const menus: FC<IProps> = () => {
  const { userMenu } = useAppSelector((state) => state.systems, useAppShallowEqual);
  // 查询表单
  const [searchForm] = Form.useForm();
  // 抽屉表单
  const [drawerForm] = Form.useForm();
  // 查询条件
  const [searchInfo, setSearchInfo] = useState<IMenuListParams>({
    page: 1,
    size: 10,
    menuName: '',
    status: ''
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // 菜单列表数据
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  // 菜单列表总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的菜单数据
  const [editMenu, setEditMenu] = useState<IMenu | null>(null);

  // 提交查询条件
  const onSubmitSearchInfo = useCallback((values: IMenuListParams) => {
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      ...values
    }));
  }, []);

  // 重置查询条件
  const onResetSearchInfo = useCallback(() => {
    searchForm.resetFields();
    setSearchInfo({
      page: 1,
      size: 10,
      menuName: '',
      status: ''
    });
  }, [searchForm]);

  // 获取菜单列表数据
  useEffect(() => {
    setTableLoading(true);
    getMenuListService(searchInfo).then((res) => {
      setMenuList(res.data);
      setTotal(res.total);
      setTableLoading(false);
    });
  }, [searchInfo]);

  // 点击添加菜单
  const onClickCreateMenu = useCallback(() => {
    setEditMenu(null);
    drawerForm.resetFields();
    setDrawerVisible(true);
  }, [drawerForm]);

  // 点击编辑菜单
  const onClickEditMenu = useCallback(
    (menu: IMenu) => {
      setEditMenu(menu);
      drawerForm.setFieldsValue({
        ...menu,
        menuPid: [menu.menuPid],
        status: menu.status ? 1 : 0
      });
      setDrawerVisible(true);
    },
    [drawerForm]
  );

  // 抽屉表单提交
  const onClickDrawerFormSubmit = async (values: any) => {
    const newMenuPid = values.menuPid[values.menuPid.length - 1];
    values.menuPid = newMenuPid;
    if (editMenu) {
      editMenuService({
        ...values,
        id: editMenu.id
      }).then(() => {
        onCloseDrawer();
      });
    } else {
      createMenuService(values).then(() => {
        onCloseDrawer();
      });
    }
  };

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setEditMenu(null);
    drawerForm.resetFields();
    setDrawerVisible(false);
  }, [drawerForm]);

  // 表格列配置
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
          <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEditMenu(record)}>
            编辑
          </Button>
        </Space>
      )
    }
  ];

  // 抽屉表单校验规则
  const drawerFormRules = {
    menuName: [{ required: true, message: '请输入菜单名' }],
    menuPid: [{ required: true, message: '请选择父菜单' }],
    menuIcon: [{ required: true, message: '请输入菜单图标' }],
    menuUrl: [{ required: true, message: '请输入菜单路径' }],
    status: [{ required: true, message: '请选择菜单状态' }]
  };

  return (
    <MenusWrapper>
      <Form
        form={searchForm}
        autoComplete="off"
        onFinish={onSubmitSearchInfo}
        initialValues={{
          menuName: undefined,
          status: undefined
        }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="menuName">
              <Input placeholder="请输入菜单名" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="status">
              <Select placeholder="请选择菜单状态" allowClear>
                {DATA_STATUS.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                查询
              </Button>
              <Button onClick={onResetSearchInfo} icon={<ReloadOutlined />}>
                重置
              </Button>
              <Button onClick={onClickCreateMenu} icon={<PlusOutlined />}>
                添加菜单
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={menuList}
        columns={tableColumns}
        loading={tableLoading}
        bordered
        rowKey={'id'}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          current: searchInfo.page,
          pageSize: searchInfo.size,
          total,
          onChange: (page: number, pageSize: number) => {
            setSearchInfo({
              ...searchInfo,
              page,
              size: pageSize
            });
          },
          showTotal: () => `共 ${total} 条`
        }}
      />
      <Drawer title={editMenu ? '编辑菜单' : '添加菜单'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
        <Form
          autoComplete="off"
          form={drawerForm}
          onFinish={onClickDrawerFormSubmit}
          initialValues={{
            menuName: '',
            menuPid: [0],
            menuUrl: '',
            menuIcon: '',
            status: 1
          }}
        >
          <Form.Item<IMenuAddParams> name="menuName" label="菜单名" rules={drawerFormRules.menuName}>
            <Input placeholder="请输入菜单名" />
          </Form.Item>
          <Form.Item<IMenuAddParams> name="menuPid" label="父菜单" rules={drawerFormRules.menuPid}>
            <Cascader
              options={[noMenuPid, ...userMenu]}
              fieldNames={{ label: 'menuName', value: 'id' }}
              changeOnSelect
              allowClear={false}
              placeholder="请选择父菜单"
            ></Cascader>
          </Form.Item>
          <Form.Item<IMenuAddParams> name="menuUrl" label="菜单路径" rules={drawerFormRules.menuUrl}>
            <Input placeholder="请输入菜单路径" />
          </Form.Item>
          <Form.Item<IMenuAddParams> name="menuIcon" label="菜单图标" rules={drawerFormRules.menuIcon}>
            <Input placeholder="请输入菜单图标" />
          </Form.Item>
          <Form.Item<IMenuAddParams> name="status" label="菜单状态" rules={drawerFormRules.status}>
            <Select placeholder="请选择菜单状态">
              {DATA_STATUS.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
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
    </MenusWrapper>
  );
};

export default memo(menus);
