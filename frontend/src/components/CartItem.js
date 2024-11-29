import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext'; // Import CartContext
import { Navigate } from 'react-router-dom'; 
import {Table, Button} from 'react-bootstrap';

const CartItems = () => {
    const { cartItems, cartTotal, setCartItems,removeFromCart  } = useContext(CartContext); // Get cart items from CartContext

    const { isLoggedIn } = useContext(AuthContext);
    //const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/cart', {
                    method: 'GET',
                    credentials: 'include', // Important to include cookies with the request
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }

                const data = await response.json();
                setCartItems(data.cart.cartItems || []);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchCart();
        } else {
            setError('You need to log in to view your cart');
            setLoading(false);
        }
    }, [isLoggedIn]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return ( 
        <div>
            <Table className="m-2 cart-items" striped bordered hover size="bg" style={{ width: '100%'}}>

                <thead>
                <tr>
                <th>Products</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
                </tr>
                </thead>

                <tbody className="cart-items">
           
                    
                    {cartItems.map((item) => (
                        <tr key={item.productId._id}>
                            
                                    <td><img src={item.productId.image} alt={item.productId.productName} className="cart-item"  style={{ width: '75px', height: 'auto' }}/></td>
                                    <td><p>{item.productId.productName}</p></td>
                                    <td><p>Price: Rs. {item.productId.price}</p></td>
                                    <td><button>{item.quantity}</button></td>
                                    {/* <p>Quantity: {item.quantity}</p> */}
                                    <td><p>{item.quantity*item.productId.price}</p></td>
                                    <td><Button onClick={()=>{removeFromCart(item.productId._id)}}>Remove</Button></td>
                        </tr>
                            
                           
                    
                    ))}  

              </tbody>


            </Table>
                
                
                
            

            
        </div>
        

     );
}
 
export default CartItems;