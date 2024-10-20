import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';
import { useUser } from './UserContext';

const Navbar = () => {
    const { user, logout } = useUser();
    console.log(user);
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <Space direction="horizontal" size="middle">
                {user ? (
                    <>
                        <img 
                            src="http://surl.li/rpxgkw" 
                            alt="Аватар" 
                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} 
                        />
                        <span>Привет, {user.email}!</span>
                        <Button onClick={logout} style={{ marginLeft: '10px' }}>Выйти</Button>
                    </>
                ) : (
                    <>
                        <Link to="/registration">
                            <Button type="primary">Регистрация</Button>
                        </Link>
                        <Link to="/authorization">
                            <Button type="default">Войти</Button>
                        </Link>
                    </>
                )}
            </Space>
            <Space direction="horizontal" size="middle">
                <Link to="/">
                    <Button type="link">Главная</Button>
                </Link>
                <Link to="/add">
                    <Button type="default">Добавление продуктов</Button>
                </Link>
                <Link to="/products">
                    <Button type="default">Список продуктов</Button>
                </Link>
            </Space>
        </nav>
    );
};

export default Navbar;
