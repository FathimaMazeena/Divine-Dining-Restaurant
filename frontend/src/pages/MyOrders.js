import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom'; 
import { Table, Button } from 'react-bootstrap';


const MyOrders = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/my-orders', {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                //setOrders(data);
                setOrders(data.orders);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders(); 
    }, []); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return ( 
        <div>
            <h2>My Orders</h2>
            <Table className="m-2 orders" striped bordered hover size="bg" style={{ width: '100%'}}>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                    </tr>
                </thead>

                <tbody className="orders">
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                <p>
                                    {order.products.map(product => (
                                        `${product.productId.productName} (Qty: ${product.quantity})`
                                    )).join(', ')}
                                </p>
                            </td>
                            <td><p>{new Date(order.createdAt).toLocaleDateString()}</p></td>
                            <td><p>{order.status}</p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MyOrders;
