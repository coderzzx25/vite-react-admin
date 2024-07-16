import type { TableProps } from 'antd';

export interface ITableConfig {
  tableColumns: TableProps<any>['columns'];
  bordered?: boolean;
  rowKey?: string;
}
