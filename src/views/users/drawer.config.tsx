import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const userDrawerConfig: IVrFormProps = {
  col: {
    span: 24
  },
  isShowBtns: false,
  initialValues: {
    userName: '',
    userNick: '',
    userHead: '',
    userRole: 2,
    status: 1
  },
  formItems: [
    {
      key: 'userName',
      label: '用户名',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入用户名',
      rules: [
        {
          required: true,
          message: '请输入用户名'
        }
      ]
    },
    {
      key: 'userNick',
      label: '昵称',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入昵称',
      rules: [
        {
          required: true,
          message: '请输入昵称'
        }
      ]
    },
    {
      key: 'userHead',
      label: '头像',
      defaultValue: '',
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
      defaultValue: '',
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
      defaultValue: '',
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
