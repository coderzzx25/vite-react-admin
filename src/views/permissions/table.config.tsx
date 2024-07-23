import { Tag } from 'antd';
import { mapIcon } from '@/utils/map-router';
import { ITableConfig } from '@/components/VrTable/type';
import { PERMISSION_TYPE } from '@/global/config/type.config';

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
      title: '权限路径',
      dataIndex: 'permissionUrl',
      key: 'permissionUrl',
      align: 'center'
    },
    {
      title: '权限图标',
      dataIndex: 'permissionIcon',
      key: 'permissionIcon',
      align: 'center',
      render: (icon: string) => mapIcon(icon)
    },
    {
      title: '权限类型',
      dataIndex: 'permissionType',
      key: 'permissionType',
      align: 'center',
      render: (type: number) => PERMISSION_TYPE.find((item) => item.value === type)?.label
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
