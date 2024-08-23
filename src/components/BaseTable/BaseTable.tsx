import { memo } from 'react';
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
  return (
    <Table
      rowKey={rowKey}
      dataSource={data}
      loading={loading}
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
