import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext'; // Import CartContext
import {  useNavigate, Navigate } from 'react-router-dom'; 
import CartItems from '../components/CartItem';

const MyCart = () => {
    const { cartItems, cartTotal, setCartItems, clearCart  } = useContext(CartContext); // Get cart items from CartContext

    // const { isLoggedIn } = useContext(AuthContext);
    // //const [cartItems, setCartItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);


    // useEffect(() => {
    //     const fetchCart = async () => {
    //         try {
    //             const response = await fetch('/api/cart', {
    //                 method: 'GET',
    //                 credentials: 'include', // Important to include cookies with the request
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch cart');
    //             }

    //             const data = await response.json();
    //             setCartItems(data.cart.cartItems || []);
    //         } catch (error) {
    //             console.log(error);
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (isLoggedIn) {
    //         fetchCart();
    //     } else {
    //         setError('You need to log in to view your cart');
    //         setLoading(false);
    //     }
    // }, [isLoggedIn]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    const navigate = useNavigate();

    return (
        <div>
            <h2>My Cart</h2>
            <CartItems/>

            <div className="container mt-4">
                <div className="row">
                <div className="col cart-total">
                    <h2>Cart Total</h2>
                    <p>Total items: {cartItems.length}</p>
                    <p>Sub Total: Rs. {cartTotal}</p>
                    <p>Discount: Rs. {}</p>
                    <p>Total:{}</p>
                    <hr/>
                    <button className="btn btn-secondary" onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
                </div>

                <div className="col col-4 cart-promocode">
                    <p>Enter promo code</p>
                    <input type="text" placeholder="Promo Code"/>
                    <button className="btn btn-secondary">Submit</button>
                </div>
                </div>
                <button className="btn btn-secondary mt-2" onClick={clearCart}>Clear Cart</button>
            </div>
            
           
        </div>
       
        // <div>
        //     <h2>My Cart</h2>
        //     {cartItems.length === 0 ? (
        //         <p>Your cart is empty</p>
        //     ) : (
        //         <div>
        //             {cartItems.map((item) => (
        //                 <div key={item.productId._id} className="cart-item">
        //                     <img src={item.productId.image} alt={item.productId.name} style={{ width: '100px' }} />
        //                     <div>
        //                         <h5>{item.productId.name}</h5>
        //                         <p>Price: Rs. {item.productId.price}</p>
        //                         <p>Quantity: {item.quantity}</p>
        //                     </div>
        //                 </div>
        //             ))}


        //             <h2>Cart Summary</h2>
        //             <p>Total items: {cartItems.length}</p>
        //             <p>Total price: Rs. {cartTotal}</p>
        //         </div>
        //     )}

        //     {/* {cartItems.length === 0 ? (
        //         <p>Your cart is empty</p>
        //     ) : (
        //         <div>
        //             {cartItems.map((item) => (
        //                 <div key={item._id} className="cart-item">
        //                     <img src={item.image} alt={item.name} style={{ width: '100px' }} />
        //                     <div>
        //                         <h5>{item.name}</h5>
        //                         <p>Price: Rs. {item.price}</p>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     )} */}
        // </div>
    );
};

export default MyCart;
