import React from 'react';
import { Form, Input, Button, message, DatePicker, Select } from 'antd';
import { CoffeeOutlined} from '@ant-design/icons';

const { Option } = Select;

export const AddProductForUser = () => {
  const products = ["банан", "молоко", "хлеб"];
  const storageLocations = ["морозильник", "холодильник", "шкаф"];
  const unitsMeasurements = ["килограммы", "литры", "метры"];

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Полученные значения:', values);
    message.success('Продукт добавлен!');
    form.resetFields();
    // Здесь вы можете отправить данные на сервер
  };

  return (
    <div style={styles.container}>
      <h2>Добавление еды</h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >

        <Form.Item
          name="product"
          label="Продукт">
          <Select placeholder="Выберите продукт" style={{ width: 200 }}>
            {products.map((product, index) => (
                <Option key={index} value={product}>
                {product}
                </Option>
            ))}
            </Select>
        </Form.Item>
        
        {/* Дата производства продукта */}
        <Form.Item
          name="date"
          label="Дата производства продукта"
          rules={[
            {
              required: true,
              message: 'Введите дату',
            },
          ]}>
          <DatePicker />
        </Form.Item>
        
        {/* Select Единицы измерения брать из context.measurments */}
        <Form.Item
            name="count"
            label="Единица измерения продукта"
            >
            <Select placeholder="Выберите единицу измерения" style={{ width: 300 }}>
            {unitsMeasurements.map((unit, index) => (
                <Option key={index} value={unit}>
                {unit}
                </Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item
            name="count"
            label="Количество продукта"
            >
            <Input prefix={<CoffeeOutlined />} placeholder="Введите кол-во продукта" style={{ width: 250}} />
        </Form.Item>

        <Form.Item
            label="Место хранения продукта">
            <Select placeholder="Выберите место хранения продукта" style={{ width: 300 }}>
            {storageLocations.map((storage, index) => (
                <Option key={index} value={storage}>
                {storage}
                </Option>
            ))}
            </Select>
        </Form.Item>

        {/* Кнопка отправки */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Добавить продукт
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Стили для контейнера формы
const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
};