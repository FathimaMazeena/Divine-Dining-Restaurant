import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';

const PlaceOrder = () => {

    const { cartItems, cartTotal, setCartItems, clearCart  } = useContext(CartContext);
    const { user} = useContext(UserContext);

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        if (user) {
            setAddress(user?.address || '');
            setContact(user?.contact || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Construct the order object
        const order = {
            cartItems,   // Array of cart items from context
            address,
            contact
        };
    
        // Validation checks
        if (!address || !contact) {
            alert('Please fill in all fields correctly.');
            return;
        }
    
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',  // Send cookies for session
            });
    
            // Parse the response
            const json = await response.json();
    
            if (!response.ok) {
                // Display error message from server response
                alert(`Error: ${json.message}`);
            } else {
                // Success: Clear form fields and alert user
                setAddress('');
                setContact('');
                alert('Your order has been placed!');
                clearCart();  // Optionally clear the cart after order success
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order.');
        }
    };
    


    return ( 
        <div>
            <div className="container row d-flex justify-content-center align-items-center vh-100 place-order">

                <div className="place-order-left col col-6 " style={{ borderLeft: '2px solid black', height: '100px' }}>
                    <h3>Delivary Information</h3>
                    <input 
                    type="text" 
                    placeholder="Name"  
                    value={user?.name || ''} 
                    readOnly
                    />

                    <input 
                    type="text" 
                    placeholder="Email"
                    value={user?.email || ''} 
                    readOnly
                    />

                    <input 
                    type="text" 
                    placeholder="Shipping Address"
                    value={address} 
                    onChange={(e)=>setAddress(e.target.value)}
                    />

                    <input 
                    type="text" 
                    placeholder="Contact"
                    value={contact}
                    onChange={(e)=>setContact(e.target.value)}
                    />

                </div>

                <div className="place-order-right col col-6">
                    <h3>Order Total</h3>
                    <p>Order Name:{cartItems.map(item => `${item.productId.productName} (Qty: ${item.quantity})`).join(', ')}</p>
                    <p>Total items: {cartItems.length}</p>
                    <p>Sub Total: Rs. {cartTotal}</p>
                    <p>Discount: Rs. {}</p>
                    <p>Total:{}</p>
                    <hr/>
                    <button className="btn btn-secondary"onClick={handleSubmit}>CONFIRM ORDER</button>
                </div>
            </div>
        </div>
     );
}
 
export default PlaceOrder;