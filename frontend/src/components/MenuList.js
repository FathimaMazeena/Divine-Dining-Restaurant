import { useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [products, setProducts] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            const response = await fetch('api/menus');
            const json = await response.json();
            if (response.ok) {
                setMenus(json);
            }
        }

        const fetchProducts = async () => {
            const response = await fetch('api/products');
            const json = await response.json();
            if (response.ok) {
                setProducts(json);
            }
        }

        const fetchDishes = async () => {
            const response = await fetch('api/dishes');
            const json = await response.json();
            if (response.ok) {
                setDishes(json);
            }
        }

        // Fetch all data
        fetchMenus();
        fetchProducts();
        fetchDishes();
    }, []);

    useEffect(() => {
        // Combine all items into one array
        const combinedItems = [...menus, ...products, ...dishes];
        setAllItems(combinedItems);
    }, [menus, products, dishes]);

    return (
        <div className="menu-list">
            <h3 className="p-5">TODAY'S SPECIAL</h3>
            <div className="row g-0 justify-content-around">
                {allItems && allItems.map(item => (
                    <div className="menu-preview card w-50" key={item._id} style={{ width: '15rem' }}>
                        <img src={item.image} alt={item.name} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p><strong>Price: Rs.</strong>{item.price}</p>
                            <p className="card-text">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <a href="#" className="row btn btn-outline-secondary col-2 m-5 p-2">Explore Our Menus</a>
        </div>
    );
}

export default MenuList;
