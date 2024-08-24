import { IBaseFormProps } from '@/components/BaseForm/type';

const searchConfig: IBaseFormProps = {
  initialValues: {
    permissionName: '',
    permissionType: undefined,
    status: undefined
  },
  formFields: [
    {
      label: '权限名',
      name: 'permissionName',
      type: 'input',
      placeholder: '请输入权限名'
    },
    {
      label: '权限类型',
      name: 'permissionType',
      type: 'select',
      placeholder: '请选择权限类型',
      options: [
        { value: 1, label: '菜单' },
        { value: 2, label: '按钮' }
      ]
    },
    {
      label: '权限状态',
      name: 'status',
      type: 'select',
      placeholder: '请选择权限状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ]
    }
  ]
};

export default searchConfig;
