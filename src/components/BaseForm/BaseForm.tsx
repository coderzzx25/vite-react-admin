import { memo, FC, useEffect } from 'react';

import { Form, Input, Cascader, Select, Row, Col, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

import { IBaseFormProps, IFormField, IOptions } from './BaseForm.d';

const BaseForm: FC<IBaseFormProps> = ({
  formFields,
  initialValues,
  col = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  },
  searchButtonName = '查询',
  searchButtonIcon = <SearchOutlined />,
  resetButtonName = '重置',
  resetButtonIcon = <ReloadOutlined />,
  editInfo,
  handleConfirm,
  handleCancel,
  otherOptions
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editInfo) {
      form.setFieldsValue(editInfo);
    } else {
      form.resetFields();
    }
  }, [editInfo, form]);
  return (
    <Form onFinish={handleConfirm} onReset={handleCancel} form={form} initialValues={initialValues} autoComplete="off">
      <Row gutter={24}>
        {formFields.map((item: IFormField) => (
          <Col {...col} key={item.name}>
            {!item.isDynamic ? (
              <Form.Item name={item.name} label={item.label} rules={item.rules}>
                {renderField(item)}
              </Form.Item>
            ) : (
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues[item.rely] !== currentValues[item.rely]}
              >
                {({ getFieldValue }) => {
                  const relyValue = getFieldValue(item.rely);
                  if (typeof item.relyKey === 'string' || typeof item.relyKey === 'number') {
                    return relyValue === item.relyKey ? (
                      <Form.Item name={item.name} label={item.label} rules={item.rules}>
                        {renderField(item)}
                      </Form.Item>
                    ) : null;
                  } else {
                    return item.relyKey.includes(relyValue) ? (
                      <Form.Item name={item.name} label={item.label} rules={item.rules}>
                        {renderField(item)}
                      </Form.Item>
                    ) : null;
                  }
                }}
              </Form.Item>
            )}
          </Col>
        ))}
        <Col {...col}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={searchButtonIcon}>
                {searchButtonName}
              </Button>
              <Button htmlType="reset" icon={resetButtonIcon}>
                {resetButtonName}
              </Button>
              {otherOptions}
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const renderField = (item: IFormField) => {
  switch (item.type) {
    case 'input':
      return <Input placeholder={item.placeholder} />;
    case 'select':
      return (
        <Select placeholder={item.placeholder} fieldNames={item.fieldNames}>
          {item.options.map((option: IOptions) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    case 'cascader':
      return (
        <Cascader
          options={item.options}
          changeOnSelect={true}
          placeholder={item.placeholder}
          fieldNames={item.fieldNames}
        />
      );
    default:
      return null;
  }
};

export default memo(BaseForm);
