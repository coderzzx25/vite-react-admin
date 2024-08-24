import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { IBaseFormProps } from '@/components/BaseForm/type';

const drawerConfig: IBaseFormProps = {
  col: { span: 24 },
  searchButtonName: '提交',
  searchButtonIcon: <CheckOutlined />,
  resetButtonName: '取消',
  resetButtonIcon: <CloseOutlined />,
  initialValues: {
    permissionName: '',
    permissionPid: [0],
    permissionType: 1,
    permissionIcon: '',
    permissionUrl: '',
    status: 1
  },
  formFields: [
    {
      label: '权限名',
      name: 'permissionName',
      type: 'input',
      placeholder: '请输入权限名',
      rules: [{ required: true, message: '请输入权限名' }]
    },
    {
      label: '父级',
      name: 'permissionPid',
      type: 'cascader',
      placeholder: '请选择父级',
      options: [{ value: 0, label: '顶级权限' }],
      rules: [{ required: true, message: '请选择父级' }]
    },
    {
      label: '权限类型',
      name: 'permissionType',
      type: 'select',
      placeholder: '请选择权限类型',
      options: [
        { value: 1, label: '菜单' },
        { value: 2, label: '按钮' }
      ],
      rules: [{ required: true, message: '请选择权限类型' }]
    },
    {
      label: '路由Icon',
      name: 'permissionIcon',
      type: 'input',
      placeholder: '请输入图标',
      rules: [{ required: true, message: '请输入图标' }],
      isDynamic: true,
      rely: 'permissionType',
      relyKey: 1
    },
    {
      label: '路由地址/按钮值',
      name: 'permissionUrl',
      type: 'input',
      placeholder: '请输入路由地址/按钮值',
      rules: [{ required: true, message: '请输入路由地址/按钮值' }]
    },
    {
      label: '权限状态',
      name: 'status',
      type: 'select',
      placeholder: '请选择权限状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      rules: [{ required: true, message: '请选择权限状态' }]
    }
  ]
};

export default drawerConfig;
