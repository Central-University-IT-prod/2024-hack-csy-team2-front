import {Avatar, List} from "antd";
import './ProductsList.css';
import {Space } from 'antd';
import React, {useEffect, useState} from 'react';
import axios from "axios";
const initialState = {
    categories: {},
    measurements: {},
    products: {},
    storageConditions: {},
    userProducts: {}
}

const initialState1 = {
    categories: {1: {id: 1, name: 'krupa'}},
    measurements: {1: {id: 1, name: 'кг'}},
    products: {1: {id: 1, name: 'krupa', category_id: 1, freshness_duration: 3600}},
    storageConditions: {1: {id: 1, name: 'holodilnik'}},
    userProducts: {
        1: {
            id: 1,
            user_id: 1,
            product_id: 1,
            creation_date: "10.10.2024",
            measurement_id: 1,
            count: 1,
            storage_conditions_id: 'polka',
            timeToDie: 3600
        },
        2: {
            id: 2,
            user_id: 1,
            product_id: 1,
            creation_date: "10.10.2024",
            measurement_id: 1,
            count: 1,
            storage_conditions_id: 'polka',
            timeToDie: 172_800_001
        },
        3: {
            id: 3,
            user_id: 1,
            product_id: 1,
            creation_date: "10.10.2024",
            measurement_id: 1,
            count: 1,
            storage_conditions_id: 'polka',
            timeToDie: 360_800_001
        }
    }
}

const fetchData = async (url) => {
    const data = await axios.get(url);

    return data.data.reduce((prev, curr) => {
        prev[curr.id] = curr;

        return prev;
    }, {})
}

const TWO_DAYS_IN_MILLISECONDS = 172_800_000;
const FOUR_DAYS_IN_MILLISECONDS = TWO_DAYS_IN_MILLISECONDS * 2;

export const ProductsList = () => {
    const [productsPageData, setProductsPageData] = useState(initialState1)

    useEffect(() => {
        const fetchAllData = async () => {
            try {

           const [categories, measurements, products, storageConditions, userProducts] = await Promise.all([
               fetchData("/api/categories"),
               fetchData("/api/measurements"),
               fetchData("/api/products"),
               fetchData("/api/storageConditions"),
               fetchData("/api/userProducts")
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
                        }
                    }).sort((a, b) => b.timeToDie - a.timeToDie)
                })


            } catch (err) {

            }
        };

        fetchAllData();
    }, []); // Эффект выполнится только при монтировании

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
                    const willLiveLessThanFourDays = item.timeToDie < FOUR_DAYS_IN_MILLISECONDS;
                    const willLiveLessThanTwoDays = item.timeToDie < TWO_DAYS_IN_MILLISECONDS;

                    return <List.Item
                        className={
                        `${willLiveLessThanTwoDays ? 'lessThanTwo' : ''} 
                        ${willLiveLessThanFourDays ? 'lessThanFour' : ''}`
                    }

                        extra={
                         <>
                             <List.Item.Meta className='av'
                             avatar={<Avatar src={product.img}/>}
                             title={<a href="https://ant.design">{product.name}</a>}
                         />

                         <Space direction="vertical" size="middle">
                             <Space direction="horizontal" className='txt'>
                                 <p>Количество продукта: {item.count} {measurement}</p>
                                 <p>Дата окончания срока годности: {item.timeToDie}</p>
                                 <p>Категория продукта: {category}</p>
                             </Space>
                         </Space>
                         </>
                     }/>
                }
                }
            />
        </div>
    );
}