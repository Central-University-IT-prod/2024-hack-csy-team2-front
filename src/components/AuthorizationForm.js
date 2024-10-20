import { Form, Input, Button, message, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const { Title } = Typography;

const AuthorizationForm = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('/api/login', values);
            if (response.data) {
                message.success('Авторизация успешна!');
                login(response.data);
                navigate('/');
            } else {
                message.error(response.data.message || 'Ошибка при авторизации.');
            }
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
            <Title level={2}>Авторизация</Title>
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
