import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Result } from 'antd';
import NotFoundWrapper from './style';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const notfound: FC<IProps> = () => {
  const navigate = useNavigate();
  const onClickBackHome = () => {
    navigate('/');
  };
  return (
    <NotFoundWrapper>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={onClickBackHome}>
            回到首页
          </Button>
        }
      />
    </NotFoundWrapper>
  );
};

export default memo(notfound);
