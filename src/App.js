import React from 'react';
import { UserProvider, useUser } from './components/UserContext';
import { Button, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { DatePicker } from "antd";
import { Products } from "./pages/Products";
import { Registration } from "./pages/Registration";
import { Authorization } from "./pages/Authorization";
import Home from "./components/Home"
import Navbar from "./components/Navbar";
import AddProduct from './components/AddProduct';
import { AddProductForUser } from './components/DemoAddProduct';


const App = () => {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/authorization" element={<Authorization />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;