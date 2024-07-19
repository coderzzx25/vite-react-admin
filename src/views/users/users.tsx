import { memo, useEffect, useState, useCallback, useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { Table, Space, Button, Drawer } from 'antd';
import { FormInstance } from 'antd/lib';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import { getUserListService, createUserService, updateUserService } from '@/service/modules/systems/user';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { getAllRoleListAsyncThunk } from '@/store/modules/systems';
import { IUserListParams, IUserInfo } from '@/types/systems/user';

import VrForm from '@/components/VrForm/VrForm';
import VrTable from '@/components/VrTable/VrTable';
import userFormConfig from './form.config';
import userTableConfig from './table.config';
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
  // 表格数据
  const [tableList, setTableList] = useState<IUserInfo[]>([]);
  // 表格总数
  const [total, setTotal] = useState<number>(0);
  // 抽屉显示隐藏
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  // 编辑的数据
  const [updateInfo, setUpdateInfo] = useState<IUserInfo | null>(null);
  // 抽屉表单实例
  const drawerFormRef = useRef<FormInstance>(null);
  // 抽屉配置
  const [drawerConfig, setDrawerConfig] = useState(userDrawerConfig);

  // 提交查询条件
  const onSubmitSearchInfo = useCallback((values: Record<string, any>) => {
    setSearchInfo((prev) => ({
      ...prev,
      ...values
    }));
  }, []);

  // 重置查询条件
  const onResetSearchInfo = useCallback((values: Record<string, any>) => {
    setSearchInfo({
      page: 1,
      size: 10,
      ...values
    });
  }, []);

  // 请求数据
  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    const result = await getUserListService(searchInfo);
    setTableList(result.data);
    setTotal(result.total);
    setTableLoading(false);
  }, [searchInfo]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // 点击添加
  const onClickCreate = useCallback(() => {
    setUpdateInfo(null);
    setDrawerVisible(true);
  }, []);

  // 点击编辑
  const onClickUpdate = useCallback((menu: IUserInfo) => {
    setUpdateInfo(menu);
    setDrawerVisible(true);
  }, []);

  // 关闭抽屉
  const onCloseDrawer = useCallback(() => {
    setUpdateInfo(null);
    drawerFormRef.current?.resetFields();
    setDrawerVisible(false);
  }, []);

  useEffect(() => {
    if (updateInfo && drawerFormRef.current) {
      drawerFormRef.current.setFieldsValue({
        ...updateInfo,
        userRole: updateInfo.userRole.id
      });
    }
  }, [updateInfo]);

  // 抽屉表单提交
  const onClickDrawerFormSubmit = useCallback(
    async (values: any) => {
      if (updateInfo) {
        await updateUserService({
          ...values,
          id: updateInfo.id
        });
      } else {
        await createUserService(values);
      }
      onCloseDrawer();
      fetchTableData();
    },
    [updateInfo, fetchTableData, onCloseDrawer]
  );

  // 请求角色列表
  useEffect(() => {
    dispatch(getAllRoleListAsyncThunk());
  }, [dispatch]);

  // 更新配置信息
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
  return (
    <div>
      <VrForm
        {...formConfig}
        handleSubmit={onSubmitSearchInfo}
        handleReset={onResetSearchInfo}
        otherBtns={
          <Button icon={<PlusOutlined />} onClick={onClickCreate}>
            添加用户
          </Button>
        }
      />
      <VrTable
        {...userTableConfig}
        data={tableList}
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
                <Button type="primary" icon={<EditOutlined />} onClick={() => onClickUpdate(record)}>
                  编辑
                </Button>
              </Space>
            )}
          />
        }
      />
      <Drawer title={updateInfo ? '编辑用户' : '新增用户'} open={drawerVisible} onClose={onCloseDrawer} width={'35%'}>
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
