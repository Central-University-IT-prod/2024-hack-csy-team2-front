import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {DatePicker} from "antd";
import {Products} from "./pages/Products";
import {Registration} from "./pages/Registration"
import {Authorization} from "./pages/Authorization"

import AddProduct from './components/AddProduct';

const Home = () => {
    <h1>Главная страница</h1>;
    return <p>Helloy</p>;
};

const About = () => {
    <h1>Страница "О нас"</h1>;
    return <DatePicker />;
};



const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/registration">Регистрация</Link>
                    </li>
                    <li>
                        <Link to="/authorization">Войти</Link>
                    </li>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                    </li>

                    <li>
                        <Link to="/add">Добавление продуктов</Link>
                    </li>

                    <li>
                        <Link to="/products">Список продуктов</Link>
                    </li>

                </ul>
            </nav>
            <Routes>
                <Route path="/authorization" element={<Authorization />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/add" element={<AddProduct />} />

                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
};

export default App;