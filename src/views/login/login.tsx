import { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { Button, Form, Layout, Input, Checkbox, Flex, Typography, Divider } from 'antd';
import { LockOutlined, UserOutlined, GithubOutlined } from '@ant-design/icons';

import LoginWrapper from './style';
import loginLeft from '@/assets/images/login-left.svg';
import { localCache } from '@/utils/cache';
import { IAccountLoginBody } from '@/types/auths/auths';
import { userLoginService, githubLoginService } from '@/service/modules/auths/auths';
import { useAppDispatch } from '@/store';
import { setLoginInfoReducer } from '@/store/modules/auths';

const { Content } = Layout;
const { Link } = Typography;

interface IProps {
  children?: ReactNode;
}

interface IFormValues extends IAccountLoginBody {
  remember: boolean;
}

const loginRules = {
  userAccount: [
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const onLoginFinish = async (values: IFormValues) => {
    const { userAccount, userPassword, remember } = values;
    if (remember) {
      localCache.setCache('userAccount', userAccount);
      localCache.setCache('remember', remember);
    } else {
      localCache.deleteCache('userAccount');
      localCache.deleteCache('remember');
    }
    const loginResult = await userLoginService({ userAccount, userPassword });
    if (!loginResult) return;
    dispatch(setLoginInfoReducer(loginResult));
    navigate('/');
  };

  const onClickGithubLogin = () => {
    const clientId = 'Ov23lih4LOhLPcEeH6Mf';
    const redirectUri = 'http://localhost:5173/login';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl;
  };

  useEffect(() => {
    const getToken = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      if (code) {
        // 请求接口
        const result = await githubLoginService(code);
        if (!result) return;
        dispatch(setLoginInfoReducer(result));
        navigate('/');
      }
    };

    getToken();
  }, [navigate]);
  return (
    <LoginWrapper>
      <Content className="content">
        <img className="image-content" src={loginLeft} alt="logo" />
        <Form
          className="form-content"
          autoComplete="off"
          initialValues={{
            userAccount: localCache.getCache('userAccount') ?? '',
            remember: localCache.getCache('remember') ?? true
          }}
          onFinish={onLoginFinish}
        >
          <Form.Item<IFormValues> name="userAccount" rules={loginRules.userAccount}>
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
            <Button type="primary" htmlType="submit" block>
              登 录
            </Button>
          </Form.Item>
          <Form.Item>
            <Divider>其他登录方式</Divider>
          </Form.Item>
          <Form.Item>
            <div className="other-login">
              <GithubOutlined onClick={onClickGithubLogin} />
            </div>
          </Form.Item>
        </Form>
      </Content>
    </LoginWrapper>
  );
};

export default memo(login);
