import { DATA_STATUS, PERMISSION_TYPE } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const permissionDrawerConfig: IVrFormProps = {
  col: {
    span: 24
  },
  isShowBtns: false,
  initialValues: {
    permissionName: '',
    permissionPid: [0],
    permissionUrl: '',
    permissionIcon: '',
    status: 1
  },
  formItems: [
    {
      key: 'permissionName',
      label: '权限名',
      type: 'input',
      placeholder: '请输入权限名',
      rules: [{ required: true, message: '请输入权限名' }]
    },
    {
      key: 'permissionPid',
      label: '父权限',
      type: 'cascader',
      placeholder: '请选择父权限',
      cascaderChangeOnSelect: true,
      fieldNamesOptions: [],
      fieldNames: {
        label: 'permissionName',
        value: 'id'
      },
      rules: [{ required: true, message: '请选择父权限' }]
    },
    {
      key: 'permissionType',
      label: '权限类型',
      type: 'select',
      placeholder: '请选择权限类型',
      options: PERMISSION_TYPE,
      rules: [{ required: true, message: '请选择权限类型' }]
    },
    {
      key: 'permissionValue',
      label: '权限值',
      type: 'input',
      placeholder: '请输入权限值',
      rules: [{ required: true, message: '请输入权限值' }]
    },
    {
      key: 'permissionUrl',
      label: '权限路径',
      type: 'input',
      placeholder: '请输入权限路径',
      rules: [{ required: true, message: '请输入权限图标' }]
    },
    {
      key: 'permissionIcon',
      label: '权限图标',
      type: 'input',
      placeholder: '请输入权限图标',
      rules: [{ required: true, message: '请输入权限路径' }]
    },
    {
      key: 'status',
      label: '权限状态',
      type: 'select',
      placeholder: '请选择权限状态',
      options: DATA_STATUS,
      rules: [{ required: true, message: '请选择权限状态' }]
    }
  ]
};

export default permissionDrawerConfig;
