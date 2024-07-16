import { memo, forwardRef, useImperativeHandle, useCallback } from 'react';

import { Button, Cascader, Col, Form, Input, Row, Select, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

import { IOptions, IVrFormProps, IFormItem } from './type';
import { FormInstance } from 'antd/lib';

const VrForm = forwardRef<FormInstance, IVrFormProps>(
  (
    {
      formItems,
      initialValues,
      col = {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 6
      },
      gutter = 24,
      isShowBtns = true,
      otherBtns,
      handleSubmit,
      handleReset
    },
    ref
  ) => {
    // 创建表单实例
    const [vrForm] = Form.useForm();

    useImperativeHandle(ref, () => vrForm, [vrForm]);

    const onClickReset = useCallback(() => {
      vrForm.resetFields();
      handleReset && handleReset(initialValues);
    }, [vrForm, handleReset, initialValues]);

    return (
      <Form ref={ref} form={vrForm} onFinish={handleSubmit} autoComplete="off" initialValues={initialValues}>
        <Row gutter={gutter}>
          {formItems.map((item: IFormItem) => (
            <Col {...col} key={item.key}>
              <Form.Item label={item.label} name={item.key} rules={item.rules}>
                {item.type === 'input' && <Input placeholder={item.placeholder} />}
                {item.type === 'select' && (
                  <Select placeholder={item.placeholder} allowClear>
                    {item.options &&
                      item.options.map((item: IOptions) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                  </Select>
                )}
                {item.type === 'cascader' && (
                  <Cascader
                    options={item.fieldNamesOptions}
                    fieldNames={item.fieldNames}
                    changeOnSelect
                    placeholder={item.placeholder}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
          <Col {...col}>
            <Space>
              {isShowBtns && (
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    查询
                  </Button>
                  <Button onClick={onClickReset} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              )}
              {otherBtns}
            </Space>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default memo(VrForm);
