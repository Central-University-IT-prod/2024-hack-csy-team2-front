import React, {useEffect, useState} from 'react';
import { Form, Input, Button, message, DatePicker, Select } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';
import axios from 'axios';
import {useUser} from "./UserContext";
import {fetchData} from "./ProductsList";
import {Navigate} from "react-router-dom";

const AddProduct = () => {
  const [form] = Form.useForm();
  const [storageLocations, setStorageLocations] = useState([]);
  const [unitsMeasurements, setUnitsMeasurements] = useState([]);
  const [products, setProducts] = useState([]);
  const {user} = useUser();


  const onFinish = async (values) => {
    // Преобразование даты в нужный формат
    values["date"] = values["date"].format('YYYY-MM-DD'); // используем moment для форматирования
    console.log('Полученные значения:', values);

    try {
      // Отправка данных на сервер
      await axios.post('/api/user-products', {...values, user_id: user.id});
      message.success('Продукт добавлен!');
      form.resetFields();
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      message.error('Не удалось добавить продукт. Попробуйте еще раз.');
    }
  };


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [measurements, products, storageConditions] = await Promise.all([
          fetchData("/api/measurements"),
          fetchData("/api/products"),
          fetchData("/api/conditions"),
        ]);

        setUnitsMeasurements(Object.values(measurements));
        setProducts(Object.values(products));
        setStorageLocations(Object.values(storageConditions));
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllData();
  }, [user]);


  if (!user) {
    return <Navigate to={'/authorization'} replace/>
  }

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
          name="product_id"
          label="Название продукта"
          style={{ width: "100%" }}
          rules={[{ required: true, message: 'Введите название продукта', whitespace: true }]}
        >
          <Select
              showSearch
              placeholder="Выберите продукт"
              style={{ width: "100%" }}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={products.map((category, index) => ({ value: category.id, label: category.name }))}
          />
        </Form.Item>
        
        {/* Дата изготовления продукта */}
        <Form.Item
          name="creation_date"
          label="Дата изготовления"
          rules={[{ required: true, message: 'Введите дату изготовления продукта' }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        
        {/* Количество продукта */}
        <Form.Item name="count" label="Количество продукта">
          <Input prefix={<CoffeeOutlined />} placeholder="Введите кол-во продукта" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name={"measurement_id"} label="Выберите измерение продукт">
          <Select
              placeholder="Выберите измерение продукта" style={{ width: "100%" }}
              options={unitsMeasurements.map((category, index) =>
                  ({ value: category.id, label: category.name }))}
          />
        </Form.Item>

        {/* Место хранения продукта */}
        <Form.Item name={"storage_conditions_id"} label="Место хранения продукта">
          <Select
              placeholder="Выберите место хранения продукта" style={{ width: "100%" }}
              options={storageLocations.map((category, index) =>
                  ({ value: category.id, label: category.name }))}
          />
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
