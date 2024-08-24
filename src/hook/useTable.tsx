import { useEffect, useState } from 'react';

const useTable = <T, P>(fetchService: (params: P) => Promise<{ data: T[]; total: number }>, searchInfo: P) => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);

  const fetchTableData = async () => {
    setLoading(true);
    const result = await fetchService(searchInfo);
    setTableData(result.data);
    setTotal(result.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchTableData();
  }, [fetchService, searchInfo]);

  return [loading, tableData, total] as const;
};

export default useTable;
