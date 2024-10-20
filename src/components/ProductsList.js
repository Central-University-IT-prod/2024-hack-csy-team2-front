import {Avatar, List} from "antd";
import './ProductsList.css';
import {Space } from 'antd';
import React, { useEffect, useState } from 'react';

export const ProductsList = () => {
    const [data, setData] = useState([{avatar: "https://twam.ru/wp-content/uploads/2024/03/ovoshchi-po-otdelnosti-3.webp", title: 'Помидор', count: 1, expirationDate: '12-02-2024'}]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://your-backend-api.example.com/products'); // Укажите ваш URL
    //             if (!response.ok) {
    //                 throw new Error('Сеть ответила с ошибкой: ' + response.status);
    //             }
    //             const result = await response.json();
    //             setData(result);
    //             setLoading(false);
    //         } catch (err) {
    //             setError(err);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchData();
    // }, []); // Эффект выполнится только при монтировании

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <div className="products-list-container">
            <h2 className="products-title">Список продуктов, у которых скоро истечёт срок</h2>
            <List className="prosroch_products"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <>
                        <List.Item className="product-item" extra={<>

                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={<a href="https://ant.design">{item.title}</a>}
                            />

                            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                                <Space direction="horizontal">
                                    <p>Количество продуктов:</p>
                                    <p>{item.count}</p>
                                    <p>---------------</p>
                                    <p>Дата когда срок закончится:</p>
                                    <p>{item.expirationDate}</p>
                                </Space>
                            </Space>
                        </>}>
                        </List.Item>
                    </>
                )}
            />


            <h2>Весь список продуктов</h2>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <>
                        <List.Item className="product-item" extra={<>

                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={<a href="https://ant.design">{item.title}</a>}
                            />

                            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                                <Space direction="horizontal">
                                    <p>Количество продуктов:</p>
                                    <p>{item.count}</p>
                                    <p>---------------</p>
                                    <p>Дата когда срок закончится:</p>
                                    <p>{item.expirationDate}</p>
                                </Space>
                            </Space>
                        </>}>
                        </List.Item>
                </>)}
            />
        </div>
    );
}