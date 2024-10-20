import { Avatar, Button, List } from "antd";
import './ProductsList.css';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useUser } from './UserContext';

const initialState = {
    categories: {},
    measurements: {},
    products: {},
    storageConditions: {},
    userProducts: {}
};


export const fetchData = async (url) => {
    const data = await axios.get(url);
    return data.data.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
    }, {});
};

const TWO_DAYS_IN_MILLISECONDS = 172800000;
const FOUR_DAYS_IN_MILLISECONDS = TWO_DAYS_IN_MILLISECONDS * 2;

export const ProductsList = () => {
    const [productsPageData, setProductsPageData] = useState(initialState);
    const { user } = useUser();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [categories, measurements, products, storageConditions, userProducts] = await Promise.all([
                    fetchData("/api/categories"),
                    fetchData("/api/measurements"),
                    fetchData("/api/products"),
                    fetchData("/api/conditions"),
                    fetchData(`/api/products/${user.id}`)
                ]);

                setProductsPageData({
                    categories,
                    measurements,
                    products,
                    storageConditions,
                    userProducts: Object.values(userProducts).map((userProduct) => {
                        return {
                            ...userProduct,
                            timeToDie: new Date().getTime() - new Date(userProduct.creation_date).getTime(),
                        };
                    }).sort((a, b) => b.timeToDie - a.timeToDie)
                });
            } catch (err) {
                console.error(err);
            }
        };

       if (user) {
           fetchAllData();
       }
    }, [user]);

    const removeProduct = (id) => {
        setProductsPageData((prevData) => {
            const newUserProducts = { ...prevData.userProducts };
            delete newUserProducts[id];
            return {
                ...prevData,
                userProducts: newUserProducts
            };
        });
    };

    const getFormattedTimeToDie = (timeToDie) => {
        const daysToLive = Math.floor(timeToDie / (1000 * 60 * 60 * 24));
        const hoursToLive = Math.floor((timeToDie % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (daysToLive > 0) {
            return `${daysToLive} ${daysToLive === 1 ? 'день' : 'дня'}`;
        } else if (hoursToLive > 0) {
            return `${hoursToLive} ${hoursToLive === 1 ? 'час' : 'часа'}`;
        } else {
            return 'Менее часа';
        }
    };

    return (
        <div className="products-list-container">
            <h2 className="products-title">Список продуктов</h2>

            <List className="product-list"
                itemLayout="horizontal"
                dataSource={Object.values(productsPageData.userProducts)}
                renderItem={(item) => {
                    const product = productsPageData.products[item.product_id];
                    const category = productsPageData.categories[product.category_id].name;
                    const measurement = productsPageData.measurements[item.measurement_id].name;
                    const storageCondition = productsPageData.storageConditions[item.storage_conditions_id]?.name || 'Неизвестно';

                    return (
                        <List.Item
                            className={`${item.timeToDie < TWO_DAYS_IN_MILLISECONDS ? 'lessThanTwo' : ''} 
                                         ${item.timeToDie < FOUR_DAYS_IN_MILLISECONDS ? 'lessThanFour' : ''}`}
                            extra={
                                <>
                                    <List.Item.Meta className='av'
                                        avatar={<Avatar src={product.img} />}
                                        title={<a href="https://ant.design">{product.name}</a>}
                                    />
                                    <Space className='button'>
                                        <Button type="primary" danger onClick={() => removeProduct(item.id)}>
                                            Удалить
                                        </Button>
                                    </Space>
                                    <Space direction="vertical" size="middle">
                                        <Space direction="horizontal" className='txt'>
                                            <p>Количество продукта: {item.count} {measurement}</p>
                                            <p>Дата окончания срока годности: {getFormattedTimeToDie(item.timeToDie)}</p>
                                            <p>Категория продукта: {category}</p>
                                            <p>Место хранения продукта: {storageCondition}</p>
                                        </Space>
                                    </Space>
                                </>
                            }
                        />
                    );
                }}
            />
        </div>
    );
};
