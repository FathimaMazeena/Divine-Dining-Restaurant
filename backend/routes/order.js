const express = require('express');
const router = express.Router();
const Order=require('../models/order.model');
const User=require('../models/user.model');
const { sendEmailConfirmation } = require('../emailService')


//view all orders by admin
router.get('/orders', (req,res)=>{
    Order.find({})
    .populate('userId', 'name') // Populate the userId with the user's name
    .populate('products.productId', 'productName') // Populate the productId with the product name
    .then(function(orders){
        res.send(orders);
    });

});

//view my orders
router.get('/my-orders', async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find all orders for the user, including populated product details
        const orders = await Order.find({ userId: userId }).populate('products.productId');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'You have no orders' });
        }

        return res.status(200).json({ orders });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//place an order by the customer
// router.post('/orders', async (req, res) => {
//     try {
//         const userId= req.session.userId;

//         const orderData = {
//             userId: userId,        // Add userId from the session
//             products: req.body.cartItems,  // Assuming products come from cartItems
//             address: req.body.address,
//             contact: req.body.contact,
//             delivery: req.body.delivery || true, // Optional: default to true if not provided
//             // Add any other fields you want to include in the order
//         };

//         // Create the order in the database
//         const order = await Order.create(orderData);
//         res.status(201).json(order);

//         // const order = await Order.create(req.body);
//         // res.status(201).json(order);
//     } catch (error) {
//         res.status(500).json({ message: 'Error placing order', error: error.message });
//     }
// });

router.post('/orders', async (req, res) => {
    try {
        const userId = req.session.userId;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }


        const orderData = {
            userId: userId,                     // Adding the userId from session
            products: req.body.cartItems,       // Assuming cartItems is an array of products
            address: req.body.address,
            contact: req.body.contact,
            delivery: req.body.delivery || true, // Optional: default to true if not provided
        };

        // Create the order in the database
        const order = await Order.create(orderData);

        // Fetch user details to send email
        const emailContent = `
            Dear ${user.name},
            Thank you for your order! Here are the details:
            Address: ${order.address}
            Contact: ${order.contact}

            Your order is being processed and will be delivered soon.
        `;

        await sendEmailConfirmation(user.email, 'Order Confirmation', emailContent);

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
});



//update(cancel) order by customer
router.put('/orders/:id', (req, res)=>{
    Order.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Order.findOne({_id:req.params.id}).then(function(order){
            res.send(order);
        });
        
    });
});

//update order status by admin
router.put('/orders/:id', async (req, res) => {
    try {
        const { status } = req.body; // Extract the status from the request body
        const orderId = req.params.id;

        // Find and update the order by its ID
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status: status }, // Only update the status field
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Send the updated order back in the response
        res.json(updatedOrder);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// router.put('/orders/:id', (req, res)=>{
//     Order.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//         Order.findOne({_id:req.params.id}).then(function(order){
//             res.send(order);
//         });
        
//     });
// });

module.exports=router;