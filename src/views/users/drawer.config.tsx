import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const userDrawerConfig: IVrFormProps = {
  col: {
    span: 24
  },
  isShowBtns: false,
  initialValues: {
    userAccount: '',
    userName: '',
    userAvatar: '',
    userRole: 2,
    status: 1
  },
  formItems: [
    {
      key: 'userAccount',
      label: '账户',
      type: 'input',
      placeholder: '请输入账户',
      rules: [
        {
          required: true,
          message: '请输入账户'
        }
      ]
    },
    {
      key: 'userName',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名',
      rules: [
        {
          required: true,
          message: '请输入姓名'
        }
      ]
    },
    {
      key: 'userAvatar',
      label: '头像',
      type: 'input',
      placeholder: '请上传头像',
      rules: [
        {
          required: true,
          message: '请上传头像'
        }
      ]
    },
    {
      key: 'userRole',
      label: '角色',
      type: 'select',
      placeholder: '请选择角色',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择角色'
        }
      ]
    },
    {
      key: 'status',
      label: '用户状态',
      type: 'select',
      placeholder: '请选择用户状态',
      options: DATA_STATUS,
      rules: [
        {
          required: true,
          message: '请选择用户状态'
        }
      ]
    }
  ]
};

export default userDrawerConfig;
