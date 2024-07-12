import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, Form, Layout, Input, Checkbox, Flex, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import LoginWrapper from './style';
import loginLeft from '@/assets/images/login-left.svg';
import { localCache } from '@/utils/cache';
import { IAccountLoginData } from '@/types/auths/auths';
import { userLoginService } from '@/service/modules/auths/auths';
import { useAppDispatch } from '@/store';
import { setLoginInfoReducer } from '@/store/modules/auths';

const { Content } = Layout;
const { Link } = Typography;

interface IProps {
  children?: ReactNode;
}

interface IFormValues extends IAccountLoginData {
  remember: boolean;
}

const loginRules = {
  userName: [
    {
      required: true,
      message: '请输入账户'
    }
  ],
  userPassword: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
};

const login: FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLoginFinish = async (values: IFormValues) => {
    const { userName, userPassword, remember } = values;
    if (remember) {
      localCache.setCache('userName', userName);
      localCache.setCache('remember', remember);
    } else {
      localCache.deleteCache('userName');
      localCache.deleteCache('remember');
    }
    const loginResult = await userLoginService({ userName, userPassword });
    if (!loginResult) return;
    dispatch(setLoginInfoReducer(loginResult));
    navigate('/');
  };
  return (
    <LoginWrapper>
      <Content className="content">
        <img className="image-content" src={loginLeft} alt="logo" />
        <Form
          className="form-content"
          autoComplete="off"
          initialValues={{
            userName: localCache.getCache('userName') ?? '',
            remember: localCache.getCache('remember') ?? true
          }}
          onFinish={onLoginFinish}
        >
          <Form.Item<IFormValues> name="userName" rules={loginRules.userName}>
            <Input prefix={<UserOutlined />} placeholder="账户" />
          </Form.Item>
          <Form.Item<IFormValues> name="userPassword" rules={loginRules.userPassword}>
            <Input prefix={<LockOutlined />} placeholder="密码" type="password" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between">
              <Form.Item<IFormValues> name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Link target="_blank" type="secondary">
                忘记密码?
              </Link>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </LoginWrapper>
  );
};

export default memo(login);
