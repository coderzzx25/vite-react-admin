import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const menuDrawerConfig: IVrFormProps = {
  col: {
    span: 24
  },
  isShowBtns: false,
  initialValues: {
    menuName: '',
    menuPid: [0],
    menuUrl: '',
    menuIcon: '',
    status: 1
  },
  formItems: [
    {
      key: 'menuName',
      label: '菜单名',
      type: 'input',
      placeholder: '请输入菜单名',
      rules: [{ required: true, message: '请输入菜单名' }]
    },
    {
      key: 'menuPid',
      label: '父菜单',
      type: 'cascader',
      placeholder: '请选择父菜单',
      cascaderChangeOnSelect: true,
      fieldNamesOptions: [],
      fieldNames: {
        label: 'menuName',
        value: 'id'
      },
      rules: [{ required: true, message: '请选择父菜单' }]
    },
    {
      key: 'menuUrl',
      label: '菜单路径',
      type: 'input',
      placeholder: '请输入菜单路径',
      rules: [{ required: true, message: '请输入菜单图标' }]
    },
    {
      key: 'menuIcon',
      label: '菜单图标',
      type: 'input',
      placeholder: '请输入菜单图标',
      rules: [{ required: true, message: '请输入菜单路径' }]
    },
    {
      key: 'status',
      label: '菜单状态',
      type: 'select',
      placeholder: '请选择菜单状态',
      options: DATA_STATUS,
      rules: [{ required: true, message: '请选择菜单状态' }]
    }
  ]
};

export default menuDrawerConfig;
