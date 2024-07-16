import { Rule } from 'antd/es/form';
import type { ReactNode } from 'react';

export interface IOptions {
  label: string;
  value: string | number;
}

export interface IFormItem {
  key: string;
  label: string;
  defaultValue: string | number;
  type: 'input' | 'select' | 'cascader';
  placeholder?: string;
  options?: IOptions[];
  rules?: Rule[];
  fieldNamesOptions?: any[];
  fieldNames?: {
    label: string;
    value: string | number;
  };
  cascaderChangeOnSelect?: boolean;
}

interface IFormColObject {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface IFormColNumber {
  span: number;
}

export type ICol = IFormColObject | IFormColNumber;

export interface IVrFormProps {
  children?: ReactNode;
  formItems: IFormItem[];
  initialValues: any;
  col?: ICol;
  gutter?: number;
  isShowBtns?: boolean;
  handleSubmit?: (values: Record<string, any>) => void;
  handleReset?: (values: Record<string, any>) => void;
  otherBtns?: ReactNode;
}
