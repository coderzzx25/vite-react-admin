import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Table, TableProps } from 'antd';

interface IProps {
  children?: ReactNode;
  data: TableProps<any>['dataSource'];
  total: number;
  tableColumns: TableProps<any>['columns'];
  rowKey?: string;
  loading?: boolean;
  handlePageChange?: (page: number, pageSize: number) => void;
  current?: number;
  pageSize?: number;
  bordered?: boolean;
  actionColumn?: ReactNode;
}

const { Column } = Table;

const VrTable: FC<IProps> = ({
  data,
  total,
  tableColumns,
  rowKey = 'id',
  loading,
  handlePageChange,
  current,
  pageSize,
  bordered,
  actionColumn
}) => {
  return (
    <Table
      dataSource={data}
      loading={loading}
      bordered={bordered}
      rowKey={rowKey}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        current,
        pageSize,
        total,
        onChange: (page: number, pageSize: number) => handlePageChange?.(page, pageSize),
        showTotal: () => `共 ${total} 条`
      }}
    >
      {tableColumns && tableColumns.map((column) => <Column {...column} children={undefined} key={column.key} />)}
      {actionColumn}
    </Table>
  );
};

export default memo(VrTable);
