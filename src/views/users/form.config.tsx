import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const userFormConfig: IVrFormProps = {
  initialValues: {
    userName: '',
    userNick: '',
    userRole: undefined,
    status: undefined
  },
  formItems: [
    {
      key: 'userName',
      label: '用户名',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      key: 'userNick',
      label: '昵称',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入昵称'
    },
    {
      key: 'userRole',
      label: '角色',
      defaultValue: '',
      type: 'select',
      options: [],
      placeholder: '请选择角色'
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

export default userFormConfig;
