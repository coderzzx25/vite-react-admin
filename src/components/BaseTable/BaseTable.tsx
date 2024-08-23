import { memo, useState, useEffect } from 'react';
import type { FC } from 'react';

import { Table } from 'antd';

import { IBaseTableProps } from './type';

const { Column } = Table;

const BaseTable: FC<IBaseTableProps> = ({
  columns,
  data,
  total,
  loading,
  rowKey,
  current,
  pageSize,
  handlePageChange,
  othersColumn
}) => {
  const [tableScroll, setTableScroll] = useState<{ y: number }>({ y: 550 });

  useEffect(() => {
    const updateTableScroll = () => {
      const availableHeight = window.innerHeight - 400;
      setTableScroll({ y: availableHeight });
    };

    updateTableScroll();
    window.addEventListener('resize', updateTableScroll);

    return () => {
      window.removeEventListener('resize', updateTableScroll);
    };
  }, []);
  return (
    <Table
      rowKey={rowKey}
      dataSource={data}
      loading={loading}
      scroll={tableScroll}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        current,
        pageSize,
        total,
        onChange: (page: number, size: number) => handlePageChange?.(page, size),
        showTotal: () => `共 ${total} 条`
      }}
    >
      {columns && columns.map((column) => <Column {...column} children={undefined} key={column.key} />)}
      {othersColumn && othersColumn.map((column) => <Column {...column} children={undefined} key={column.key} />)}
    </Table>
  );
};

export default memo(BaseTable);
