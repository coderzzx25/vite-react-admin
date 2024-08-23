import { useRef, useCallback } from 'react';
import { IBaseDrawerRef } from '@/components/BaseDrawer/type';

const useDrawer = () => {
  const drawerRef = useRef<IBaseDrawerRef>(null);

  const openDrawer = useCallback(() => {
    drawerRef.current?.open();
  }, []);

  const closeDrawer = useCallback(() => {
    drawerRef.current?.close();
  }, []);

  return [drawerRef, openDrawer, closeDrawer] as const;
};

export default useDrawer;
