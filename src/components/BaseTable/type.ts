import { ReactNode } from 'react';
import { TableProps } from 'antd';

export interface IBaseTableProps {
  children?: ReactNode;
  columns: TableProps<any>['columns'];
  data: TableProps<any>['dataSource'];
  total: number;
  current?: number;
  pageSize?: number;
  bordered?: boolean;
  loading?: boolean;
  rowKey?: string;
  handlePageChange?: (page: number, size: number) => void;
  othersColumn?: TableProps<any>['columns'];
}

declare const BaseTable: React.ComponentType<IBaseTableProps>;

export default BaseTable;
