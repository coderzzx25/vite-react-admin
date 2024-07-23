import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const permissionFormConfig: IVrFormProps = {
  initialValues: {
    permissionName: '',
    status: undefined
  },
  formItems: [
    {
      key: 'permissionName',
      label: '权限名',
      type: 'input',
      placeholder: '请输入权限名'
    },
    {
      key: 'status',
      label: '权限状态',
      type: 'select',
      placeholder: '请选择权限状态',
      options: DATA_STATUS
    }
  ]
};

export default permissionFormConfig;
