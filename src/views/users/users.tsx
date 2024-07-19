import VrForm from '@/components/VrForm/VrForm';
import { memo, useEffect, useState, useCallback, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import userFormConfig from './form.config';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { getAllRoleListAsyncThunk } from '@/store/modules/systems';
import { IUserListParams, IUserInfo } from '@/types/systems/user';
import VrTable from '@/components/VrTable/VrTable';
import userTableConfig from './table.config';
import { getUserListService } from '@/service/modules/systems/user';
import { Table, Space, Button, Drawer } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib';
import userDrawerConfig from './drawer.config';

interface IProps {
  children?: ReactNode;
}

const { Column } = Table;

const users: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { allRole } = useAppSelector((state) => state.systems, useAppShallowEqual);
  const [formConfig, setFormConfig] = useState(userFormConfig);

  const [searchInfo, setSearchInfo] = useState<IUserListParams>({
    page: 1,
    size: 10
  });
  // 表格loading
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  // 列表数据
  const [userList, setUserList] = useState<IUserInfo[]>([]);
  // 列表总数
  const [total, setTotal] = useState<number>(0);

  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的角色数据
  const [editUser, setEditUser] = useState<IUserInfo | null>(null);
  // 抽屉表单实例
  const drawerFormRef = useRef<FormInstance>(null);
  // 抽屉配置
  const [drawerConfig, setDrawerConfig] = useState(userDrawerConfig);

  const onSubmitSearchInfo = useCallback((values: Record<string, any>) => {
    setSearchInfo((prev) => ({
      ...prev,
      ...values
    }));
  }, []);

  const onResetSearchInfo = useCallback((values: Record<string, any>) => {
    setSearchInfo({
      page: 1,
      size: 10,
      ...values
    });
  }, []);

  const fetchUserList = useCallback(async () => {
    setTableLoading(true);
    const result = await getUserListService(searchInfo);
    setUserList(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  useEffect(() => {
    dispatch(getAllRoleListAsyncThunk());
  }, [dispatch]);

  useEffect(() => {
    setFormConfig((prevConfig) => {
      const newFormItems = prevConfig.formItems.map((item) => {
        if (item.key === 'userRole') {
          return {
            ...item,
            options: allRole.map((role) => ({
              label: role.roleName,
              value: role.id
            }))
          };
        }
        return item;
      });
      return {
        ...prevConfig,
        formItems: newFormItems
      };
    });

    setDrawerConfig((prevConfig) => {
      const newFormItems = prevConfig.formItems.map((item) => {
        if (item.key === 'userRole') {
          return {
            ...item,
            options: allRole.map((role) => ({
              label: role.roleName,
              value: role.id
            }))
          };
        }
        return item;
      });
      return {
        ...prevConfig,
        formItems: newFormItems
      };
    });
  }, [allRole]);

  // 点击添加角色
  const onClickCreateRole = useCallback(() => {
    setEditUser(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑角色
  const onClickEditRole = useCallback((menu: IUserInfo) => {
    setEditUser(menu);
    setDrawerVisible(true);
  }, []);

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setEditUser(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  useEffect(() => {
    if (editUser && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue({
        ...editUser,
        userRole: editUser.id
      });
    }
  }, [editUser]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      if (editUser) {
        console.log(values);
      } else {
        console.log(values);
      }
      onCloseDrawer();
      fetchUserList();
    },
    [editUser, fetchUserList, onCloseDrawer]
  );
  return (
    <div>
      <VrForm
        {...formConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button icon={<PlusOutlined />} onClick={onClickCreateRole}>
            添加用户
          </Button>
        }
      />
      <VrTable
        {...userTableConfig}
        data={userList}
        total={total}
        current={searchInfo.page}
        pageSize={searchInfo.size}
        loading={tableLoading}
        handlePageChange={(page, size) => {
          setSearchInfo({
            ...searchInfo,
            page,
            size
          });
        }}
        actionColumn={
          <Column
            title="操作"
            key="action"
            align="center"
            render={(_: string, record: IUserInfo) => (
              <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickEditRole(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer title={editUser ? '编辑用户' : '新增用户'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
        <VrForm
          ref={drawerFormRef}
          {...drawerConfig}
          handleSubmit={onClickDrawerFormSubmit}
          otherBtns={
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={onCloseDrawer}>取消</Button>
            </Space>
          }
        />
      </Drawer>
    </div>
  );
};

export default memo(users);
