import { DATA_STATUS, PERMISSION_TYPE } from '@/global/config/type.config';
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
      key: 'permissionType',
      label: '权限类型',
      type: 'select',
      placeholder: '请选择权限类型',
      options: PERMISSION_TYPE
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
