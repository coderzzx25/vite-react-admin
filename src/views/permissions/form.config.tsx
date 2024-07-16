import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const permissionFormConfig: IVrFormProps = {
  initialValues: {
    permissionName: '',
    menuPid: undefined,
    status: undefined
  },
  formItems: [
    {
      key: 'permissionName',
      label: '权限名称',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入权限名称'
    },
    {
      key: 'menuId',
      label: '所属菜单',
      defaultValue: '',
      type: 'cascader',
      fieldNamesOptions: [],
      fieldNames: { label: 'menuName', value: 'id' },
      placeholder: '请选择所属菜单'
    },
    {
      key: 'status',
      label: '状态',
      defaultValue: '',
      type: 'select',
      options: DATA_STATUS,
      placeholder: '请选择状态'
    }
  ]
};

export default permissionFormConfig;
