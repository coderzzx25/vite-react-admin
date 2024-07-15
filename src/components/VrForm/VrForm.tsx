import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';

import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

import { IOptions, IVrFormProps, IFormItem } from './type';

const VrForm: FC<IVrFormProps> = ({
  formItems,
  col = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  },
  gutter = 24,
  isShowBtns = true,
  handleSubmit,
  handleReset,
  otherBtns
}) => {
  // 创建表单实例
  const [vrForm] = Form.useForm();
  // 默认值
  const [defaultValues, setDdefaultValues] = useState({});

  // 获取表单默认值，数据类型
  useEffect(() => {
    const initialValues = formItems.reduce((prev: Record<string, any>, next) => {
      prev[next.key] = next.defaultValue || undefined;
      return prev;
    }, {});
    vrForm.setFieldsValue(initialValues);
    setDdefaultValues(initialValues);
  }, []);

  // 重置表单
  const onClickReset = () => {
    vrForm.resetFields();
    handleReset && handleReset(defaultValues);
  };
  return (
    <Form form={vrForm} onFinish={handleSubmit} autoComplete="off" initialValues={defaultValues}>
      <Row gutter={gutter}>
        {formItems.map((item: IFormItem) => (
          <Col {...col} key={item.key}>
            <Form.Item label={item.label} name={item.key}>
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
            </Form.Item>
          </Col>
        ))}
        {isShowBtns && (
          <Col {...col}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                查询
              </Button>
              <Button onClick={onClickReset} icon={<ReloadOutlined />}>
                重置
              </Button>
              {otherBtns}
            </Space>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default memo(VrForm);
