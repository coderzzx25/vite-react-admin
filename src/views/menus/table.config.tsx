import { Tag } from 'antd';
import { mapIcon } from '@/utils/map-router';
import { ITableConfig } from '@/components/VrTable/type';

const menuTableConfig: ITableConfig = {
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

export default menuTableConfig;
