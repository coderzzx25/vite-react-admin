import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const menuFormConfig: IVrFormProps = {
  formItems: [
    {
      key: 'menuName',
      label: '菜单名',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入菜单名'
    },
    {
      key: 'status',
      label: '菜单状态',
      defaultValue: '',
      type: 'select',
      placeholder: '请选择菜单状态',
      options: DATA_STATUS
    }
  ]
};

export default menuFormConfig;
