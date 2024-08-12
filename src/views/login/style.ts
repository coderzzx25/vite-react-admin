import styled from 'styled-components';
import { Layout } from 'antd';

const LoginWrapper = styled(Layout)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .form-content {
    width: 300px;
  }

  .other-login {
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default LoginWrapper;
