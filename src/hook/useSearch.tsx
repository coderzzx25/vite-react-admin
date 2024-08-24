import { useState, useCallback } from 'react';

const useSearch = <T extends Record<string, any>>(initialValues: T) => {
  const [searchInfo, setSearchInfo] = useState<T>(initialValues);

  const onClickSearch = useCallback((values: Partial<T>) => {
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      ...values
    }));
  }, []);

  const onClickReset = useCallback(() => {
    setSearchInfo(initialValues);
  }, [initialValues]);

  return [searchInfo, onClickSearch, onClickReset] as const;
};

export default useSearch;
