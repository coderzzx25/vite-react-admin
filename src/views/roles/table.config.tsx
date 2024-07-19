import { Tag } from 'antd';
import { ITableConfig } from '@/components/VrTable/type';

const roleTableConfig: ITableConfig = {
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
      title: '角色名',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center'
    },
    {
      title: '角色菜单',
      dataIndex: 'roleMenus',
      key: 'roleMenus',
      align: 'center'
    },
    {
      title: '角色状态',
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

export default roleTableConfig;
