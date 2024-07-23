import { Avatar, Tag } from 'antd';
import { ITableConfig } from '@/components/VrTable/type';
import { IRoleInfo } from '@/types/systems/role';

const userTableConfig: ITableConfig = {
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
      title: '账户',
      dataIndex: 'userAccount',
      key: 'userAccount',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center'
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      key: 'userAvatar',
      align: 'center',
      render: (head: string) => <Avatar src={head} />
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      key: 'userRole',
      align: 'center',
      render: (role: IRoleInfo) => role.roleName
    },
    {
      title: '状态',
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

export default userTableConfig;
