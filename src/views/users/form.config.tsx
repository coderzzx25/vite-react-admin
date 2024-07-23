import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const userFormConfig: IVrFormProps = {
  initialValues: {
    userAccount: '',
    userName: '',
    userRole: undefined,
    status: undefined
  },
  formItems: [
    {
      key: 'userAccount',
      label: '账户',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      key: 'userName',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名'
    },
    {
      key: 'userRole',
      label: '角色',
      type: 'select',
      options: [],
      placeholder: '请选择角色'
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

export default userFormConfig;
