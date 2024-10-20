import React from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { CoffeeOutlined, AppstoreOutlined} from '@ant-design/icons';

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values["date"] = values["date"]["$y"].toString() + "-" + (values["date"]["$M"] + 1).toString() + "-" + values["date"]["$D"].toString()
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
        {/* Имя продукта */}
        <Form.Item
          name="productName"
          label="Имя продукта"
          rules={[
            {
              required: true,
              message: 'Введите имя продукта',
              whitespace: true,
            },
          ]}
        >
          <Input prefix={<CoffeeOutlined />} placeholder="Имя продукта" />
        </Form.Item>

        {/* Категория */}
        <Form.Item
          name="category"
          label="Категория"
          rules={[
            {
              required: true,
              message: 'Введите категорию',
            },
          ]}
        >
          <Input prefix={<AppstoreOutlined />} placeholder="Категория" />
        </Form.Item>
        
        {/* Дата покупки (Дата изготовления продукта) */}
        <Form.Item
          name="date"
          label="Дата"
          rules={[
            {
              required: true,
              message: 'Введите дату',
            },
          ]}>
          <DatePicker />
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
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
};

export default AddProduct;
