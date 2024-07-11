import { Menu } from 'antd';
import styled from 'styled-components';

const VrMenuWrapper = styled(Menu)`
  border-inline-end: none !important;
  :where(.css-dev-only-do-not-override-18h8j61).ant-menu-light.ant-menu-root.ant-menu-inline,
  :where(.css-dev-only-do-not-override-18h8j61).ant-menu-light > .ant-menu.ant-menu-root.ant-menu-inline,
  :where(.css-dev-only-do-not-override-18h8j61).ant-menu-light.ant-menu-root.ant-menu-vertical,
  :where(.css-dev-only-do-not-override-18h8j61).ant-menu-light > .ant-menu.ant-menu-root.ant-menu-vertical {
    border-inline-end: none !important;
  }
`;

export default VrMenuWrapper;
