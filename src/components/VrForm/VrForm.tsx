import { memo, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Button, Cascader, Col, Form, Input, Row, Select, Space, Tree } from 'antd';
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

    const renderFormItem = (item: IFormItem) => {
      if (item.type === 'input') {
        return <Input placeholder={item.placeholder} />;
      }

      if (item.type === 'select') {
        return (
          <Select placeholder={item.placeholder} allowClear>
            {item.options &&
              item.options.map((option: IOptions) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
          </Select>
        );
      }

      if (item.type === 'cascader') {
        return (
          <Cascader
            options={item.fieldNamesOptions}
            fieldNames={item.fieldNames}
            changeOnSelect={item.cascaderChangeOnSelect}
            placeholder={item.placeholder}
          />
        );
      }

      if (item.type === 'tree') {
        return (
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => (
              <Tree
                checkable
                treeData={item.treeData}
                fieldNames={item.treeFieldNames}
                checkedKeys={getFieldValue(item.key)}
                onCheck={(checkedKeys) => vrForm.setFieldsValue({ [item.key]: checkedKeys })}
              />
            )}
          </Form.Item>
        );
      }

      return null;
    };

    return (
      <Form ref={ref} form={vrForm} onFinish={handleSubmit} autoComplete="off" initialValues={initialValues}>
        <Row gutter={gutter}>
          {formItems.map((item: IFormItem) => (
            <Col {...col} key={item.key}>
              <Form.Item label={item.label} name={item.key} rules={item.rules}>
                {renderFormItem(item)}
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
