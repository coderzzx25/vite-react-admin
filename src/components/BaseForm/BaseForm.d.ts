import type { ReactNode } from 'react';
import { Rule } from 'antd/es/form';

export interface IOptions {
  value: string | number;
  label: string;
  children?: IOptions[];
}

interface IFormFieldBase {
  label: string;
  name: string;
  type: 'input' | 'select' | 'cascader';
  isDynamic: boolean;
  placeholder?: string;
  rules?: Rule[];
}

interface IFormFieldSelectOrCascader extends IFormFieldBase {
  type: 'select' | 'cascader';
  options: IOptions[];
  fieldNames?: { label: string; value: string };
}

interface IFormFieldInput extends IFormFieldBase {
  type: 'input';
  options?: never;
}

interface IFormFildIsDynamic extends IFormFieldBase {
  isDynamic: true;
  rely: string;
  relyKey: string | string[] | number | number[];
}

export type IFormField = IFormFieldSelect | IFormFieldInputOrCascader | IFormFildIsDynamic;

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

export interface IBaseFormProps {
  formFields: IFormField[];
  initialValues: any;
  searchButtonName?: string;
  col?: IFormColObject | IFormColNumber;
  children?: ReactNode;
  editInfo?: any;
  handleConfirm?: (values: any) => void;
  handleCancel?: () => void;
}

declare const BaseForm: React.ComponentType<IBaseFormProps>;

export default BaseForm;
