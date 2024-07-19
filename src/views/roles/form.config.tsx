import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const roleFormConfig: IVrFormProps = {
  initialValues: {
    roleName: '',
    status: undefined
  },
  formItems: [
    {
      key: 'roleName',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: DATA_STATUS,
      placeholder: '请选择状态'
    }
  ]
};

export default roleFormConfig;
