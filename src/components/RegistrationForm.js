import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Регистрация:', values);
    try {
      console.log('Отправляемые данные:', values)
      const response = await axios.post('http://localhost:5000/api/register', values);
      message.success('Регистрация успешна!');
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      message.error('Ошибка при регистрации. Попробуйте еще раз.');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: 'auto' }}
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
      >
        <Input placeholder="Введите ваше имя" />
      </Form.Item>
      
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Пожалуйста, введите корректный email!' }]}
      >
        <Input placeholder="Введите вашу электронную почту" />
      </Form.Item>
      
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
