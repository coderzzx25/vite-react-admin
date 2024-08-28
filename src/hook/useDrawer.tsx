import { useState, useCallback } from 'react';

const useDrawer = () => {
  const [visible, setVisible] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setVisible(false);
  }, []);

  return [visible, handleDrawerOpen, handleDrawerClose] as const;
};

export default useDrawer;
