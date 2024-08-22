import { Tag } from 'antd';
import type { TableProps } from 'antd';
import { mapIcon } from '@/utils/map-router';
import { IPermissionInfo } from '@/types/systems/permission';

const permissionTableColumns: TableProps<IPermissionInfo>['columns'] = [
  {
    title: 'No.',
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
    title: '权限类型',
    dataIndex: 'permissionType',
    key: 'permissionType',
    align: 'center',
    render: (value) => {
      switch (value) {
        case 1:
          return <Tag color="success">菜单</Tag>;
        case 2:
          return <Tag color="warning">按钮</Tag>;
        default:
          return <Tag color="error">未知</Tag>;
      }
    }
  },
  {
    title: '路由地址/按钮值',
    dataIndex: 'permissionUrl',
    key: 'permissionUrl',
    align: 'center'
  },
  {
    title: '路由图标',
    dataIndex: 'permissionIcon',
    key: 'permissionIcon',
    align: 'center',
    render: (value: string) => mapIcon(value)
  },
  {
    title: '权限状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (value: number) => (value ? <Tag color="success">启用</Tag> : <Tag color="error">禁用</Tag>)
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
];

export default permissionTableColumns;
