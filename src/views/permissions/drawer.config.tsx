import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const permissionDrawerConfig: IVrFormProps = {
  col: {
    span: 24
  },
  isShowBtns: false,
  initialValues: {
    permissionName: '',
    permissionValue: '',
    menuId: '',
    status: 1
  },
  formItems: [
    {
      key: 'permissionName',
      label: '权限名称',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入权限名称',
      rules: [
        {
          required: true,
          message: '请输入权限名称'
        }
      ]
    },
    {
      key: 'permissionValue',
      label: '权限值',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入权限值',
      rules: [
        {
          required: true,
          message: '请输入权限值'
        }
      ]
    },
    {
      key: 'menuId',
      label: '所属菜单',
      defaultValue: '',
      type: 'cascader',
      fieldNamesOptions: [],
      fieldNames: { label: 'menuName', value: 'id' },
      placeholder: '请选择所属菜单',
      cascaderChangeOnSelect: false,
      rules: [
        {
          required: true,
          message: '请选择所属菜单'
        }
      ]
    },
    {
      key: 'status',
      label: '状态',
      defaultValue: 1,
      type: 'select',
      options: DATA_STATUS,
      placeholder: '请选择状态',
      rules: [
        {
          required: true,
          message: '请选择状态'
        }
      ]
    }
  ]
};

export default permissionDrawerConfig;
