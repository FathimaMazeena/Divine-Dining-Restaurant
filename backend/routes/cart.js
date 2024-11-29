const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
//const { addToCart } = require('../controllers/cart.controller');



//view my-cart by customer
router.get('/cart', async (req, res) => {
    try {
        // Get the userId from the session
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId: userId }).populate('cartItems.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ cart });
         //return res.status(200).json(cart.cartItems);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//add products to the cart by the customer
router.post('/cart', async (req, res) => {
    const { productId, quantity } = req.body;

    try {

        const userId = req.session.userId;
        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            // If the user has no cart, create a new one
            cart = new Cart({ userId: userId, cartItems: [] });
        }

        // Check if the product already exists in the cart
        const existingItem = cart.cartItems.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // Update the quantity of the existing item
            existingItem.quantity += quantity;
        } else {
            // Add the new product to the cart
            cart.cartItems.push({ productId: productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item added to cart', cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.put('/cart', async (req, res) => {

    // Cart.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    //     Cart.findOne({_id:req.params.id}).then(function(cart){
    //         res.send(cart);
    //     });
        
    // });
    const { productId, quantity } = req.body; // Expect productId and new quantity in the request body

    if (!productId || typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    try {
        const userId = req.session.userId; // Assuming you're using sessions to track the logged-in user
        
        // Find the cart by user ID
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        const cartItem = cart.cartItems.find(item => item.productId.toString() === productId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity
        if (quantity > 0) {
            cartItem.quantity = quantity;
        } else {
            // If the quantity is 0 or less, remove the item from the cart
            cart.cartItems = cart.cartItems.filter(item => item.productId.toString() !== productId);
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Failed to update the cart' });
    }
});


//delete cart items by the customer
router.delete('/cart', async(req, res)=>{
    // Cart.findByIdAndDelete({_id:req.params.id}).then(function(cart){
    //     res.send(cart);
    // });

    try {
        const userId = req.session.userId; // Assuming you're using some kind of session or JWT
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.cartItems = []; // Clear cart items
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing the cart:', error);
        res.status(500).json({ message: 'Failed to clear the cart' });
    }
});


module.exports=router;