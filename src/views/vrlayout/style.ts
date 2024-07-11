import { Layout } from 'antd';
import styled from 'styled-components';

const VrLayoutWrapper = styled(Layout)`
  height: 100vh;

  .sider-header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 18px;
    }

    .logo {
      height: 30px;
      width: 30px;
    }

    .collapsed {
      display: none;
    }
  }

  .content {
    padding: 20px;
  }
`;

export default VrLayoutWrapper;
