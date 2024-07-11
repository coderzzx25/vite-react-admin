import { Suspense, LazyExoticComponent } from 'react';
import type { ReactNode } from 'react';

import { Spin } from 'antd';

const RouterLoading = (Component: LazyExoticComponent<any>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};

export default RouterLoading;
