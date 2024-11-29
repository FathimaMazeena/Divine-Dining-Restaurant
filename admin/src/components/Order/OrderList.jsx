import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge } from 'react-bootstrap';

const OrderList = () => {
    const [orders, setOrders] = useState([]); // For the initial order list
    const [orderList, setOrderList] = useState([]); // For displaying and updating orders

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('http://localhost:4000/api/orders');
            const json = await response.json();

            if (response.ok) {
                console.log(json);
                setOrders(json);
                setOrderList(json); // Initialize orderList with fetched orders
            }
        };

        fetchOrders();
    }, []);

    // Function to update the order status in the database
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }), // Send the new status in the body
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();
            console.log('Order status updated:', updatedOrder);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle status change
    const handleStatusChange = (orderId, currentStatus) => {
        const updatedOrders = orderList.map((order) => {
            if (order._id === orderId) {
                let newStatus;
                if (currentStatus === 'pending') newStatus = 'confirmed';
                else if (currentStatus === 'confirmed') newStatus = 'dispatched';
                else newStatus = 'pending'; // Cycle back to pending

                // Call API to update the status in the backend
                updateOrderStatus(orderId, newStatus);

                // Return the updated order for local state
                return { ...order, status: newStatus };
            }
            return order;
        });

        setOrderList(updatedOrders); // Update the local state
    };

    // Helper function to get badge color based on status
    const getBadgeVariant = (status) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'confirmed':
                return 'primary';
            case 'dispatched':
                return 'success';
            default:
                return 'secondary';
        }
    };

    return (
        <div>
            <Table className="m-2 product-table" striped bordered hover size="bg" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Ordered by</th>
                        <th>Order Status</th>
                        <th>Delivery</th>
                        <th>Order Items</th>
                    </tr>
                </thead>

                <tbody>
                    {orderList.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId?.name || 'Unknown'}</td> {/* Show customer name */}
                            <td>
                                <Badge
                                    pill
                                    bg={getBadgeVariant(order.status)}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleStatusChange(order._id, order.status)} // Handle status change
                                >
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.delivery ? 'Yes' : 'No'}</td>
                            <td>
                                {order.products.map((product) => (
                                    <div key={product.productId._id}>
                                        {product.productId.productName} (Qty: <b>{product.quantity}</b>)
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderList;
