import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthorizationForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
  
    const onFinish = async (values) => {
        try {
            message.success('Авторизация успешна!');
            navigate('/');
        } catch (error) {
            message.error('Ошибка при авторизации.');
        }
    };

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: 'auto' }}
        >
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
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthorizationForm;
