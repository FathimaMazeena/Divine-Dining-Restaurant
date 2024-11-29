import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthProvider from './AuthContext';
import { AuthContext } from '../contexts/AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    // Calculate the cart total whenever cartItems changes
    const calculateCartTotal = () => {
        const total = cartItems.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity; // Assuming price and quantity
        }, 0);
        setCartTotal(total); // Update the cartTotal state
    };

    useEffect(() => {
        calculateCartTotal(); // Calculate whenever cartItems changes
    }, [cartItems]);


    const addToCart = async (product) => {

        const itemToAdd = {
            productId: {
                _id: product._id,
                price: product.price // Ensure the price is included
            },
            quantity: 1,
        };

        setCartItems([...cartItems, itemToAdd]);
        alert("Successfully added item to the cart");

        try {
            const response = await fetch('api/cart', {
                method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1

                }),
            });

            console.log(product._id);

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert("Failed to add item to the cart.");
        }
        

    };

    

    const removeFromCart = async (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.productId._id === itemId) {
                // Reduce the quantity by 1
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    // If the quantity is 1, remove the item from the cart
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null); // Remove any null items from the cart
    
        // Find the item in the cart with the given itemId
        const itemToUpdate = cartItems.find(item => item.productId._id === itemId);
    
        // If no item was found, just return early
        if (!itemToUpdate) return;
    
        try {
            // Make the API call to update the quantity
            const response = await fetch('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include session information
                body: JSON.stringify({
                    productId: itemId,
                    quantity: itemToUpdate.quantity > 1 ? itemToUpdate.quantity - 1 : 0
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the cart');
            }
    
            // Update the cart items state locally after successful API call
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error updating the cart:', error);
            alert('Failed to update the cart.');
        }
    };
    
    
    const clearCart = async () => {
        

        try {
            const response = await fetch('api/cart', {
                method: 'DELETE',
            headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            
            });

            if (!response.ok) {
                throw new Error('Failed to clear the cart');
            }

            setCartItems([]);
            alert('Cart cleared successfully');

        } catch (error) {
            console.error('Error clearing the cart:', error);
            alert('Failed to clear the cart');
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;