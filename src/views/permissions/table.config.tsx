import { Tag } from 'antd';
import { ITableConfig } from '@/components/VrTable/type';

const permissionTableConfig: ITableConfig = {
  bordered: true,
  rowKey: 'id',
  tableColumns: [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: '权限名',
      dataIndex: 'permissionName',
      key: 'permissionName',
      align: 'center'
    },
    {
      title: '权限值',
      dataIndex: 'permissionValue',
      key: 'permissionValue',
      align: 'center'
    },
    {
      title: '菜单ID',
      dataIndex: 'menuId',
      key: 'menuId',
      align: 'center'
    },
    {
      title: '权限状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) => (status ? <Tag color="success">启用</Tag> : <Tag color="error">禁用</Tag>)
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
    }
  ]
};

export default permissionTableConfig;
