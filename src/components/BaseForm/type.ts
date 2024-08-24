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
  isDynamic?: boolean;
  placeholder?: string;
  rules?: Rule[];
}

interface IInputField extends IFormFieldBase {
  type: 'input';
  options?: never;
}

interface ISelectOrCascaderField extends IFormFieldBase {
  type: 'select' | 'cascader';
  options: IOptions[];
}

interface IDynamicField extends IFormFieldBase {
  isDynamic: true;
  rely: string;
  relyKey: string | string[] | number | number[];
}

interface INonDynamicField extends IFormFieldBase {
  isDynamic?: false;
  rely?: never;
  relyKey?: never;
}

export type IFormField = (IInputField | ISelectOrCascaderField) & (IDynamicField | INonDynamicField);

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
  searchButtonIcon?: ReactNode;
  resetButtonName?: string;
  resetButtonIcon?: ReactNode;
  col?: IFormColObject | IFormColNumber;
  children?: ReactNode;
  editInfo?: any;
  handleConfirm?: (values: any) => void;
  handleCancel?: () => void;
  otherOptions?: ReactNode;
}

declare const BaseForm: React.ComponentType<IBaseFormProps>;

export default BaseForm;
