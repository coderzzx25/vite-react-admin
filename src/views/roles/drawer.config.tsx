import { DATA_STATUS } from '@/global/config/type.config';
import { IVrFormProps } from '@/components/VrForm/type';

const roleDrawerConfig: IVrFormProps = {
  col: {
    span: 24
  },
  isShowBtns: false,
  initialValues: {
    roleName: '',
    roleMenus: [1],
    status: 1
  },
  formItems: [
    {
      key: 'roleName',
      label: '角色名',
      defaultValue: '',
      type: 'input',
      placeholder: '请输入角色名',
      rules: [
        {
          required: true,
          message: '请输入角色名'
        }
      ]
    },
    {
      key: 'roleMenus',
      label: '菜单权限',
      defaultValue: '',
      type: 'tree',
      placeholder: '请选择菜单权限',
      treeData: [],
      treeFieldNames: {
        title: 'menuName',
        key: 'id',
        children: 'children'
      },
      rules: [
        {
          required: true,
          message: '请选择菜单权限'
        }
      ]
    },
    {
      key: 'status',
      label: '角色状态',
      defaultValue: '',
      type: 'select',
      placeholder: '请选择角色状态',
      options: DATA_STATUS,
      rules: [
        {
          required: true,
          message: '请选择角色状态'
        }
      ]
    }
  ]
};

export default roleDrawerConfig;
