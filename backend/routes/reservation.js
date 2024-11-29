const express = require('express');
const router = express.Router();
const Reservation=require('../models/reservation.model');
const User=require('../models/user.model');
const { sendEmailConfirmation } = require('../emailService')


//View reservations by admin
// router.get('/reservations', (req,res)=>{
//     Reservation.find({}).then(function(reservations){
//         res.send(reservations);
//     });

// });

router.get('/reservations', (req, res) => {
    Reservation.find({}).then(function(reservations){
        res.json(reservations); // Use res.json instead of res.send to send JSON response
    }).catch(error => {
        res.status(500).json({ error: error.message }); // Send JSON error if something goes wrong
    });
});


//view resrvations by customer
router.get('/my-reservations', async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find all orders for the user, including populated product details
        const reservations = await Reservation.find({ userId: userId });

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: 'You have no reservations yet' });
        }

        return res.status(200).json({ reservations });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Make a reservation by customer
router.post('/reservations', async (req, res) => {
    
    try {

        const userId = req.session.userId;

        //const user = await User.findById(userId);
        //const reservation = await Reservation.create(req.body);

        const reservationData = {
            userId: userId || null,             
            email: req.body.email,   
            name: req.body.name,  
            reservationDate: req.body.reservationDate,  
            numberOfPeople: req.body.numberOfPeople,  
            time: req.body.time,  
            specialRequests: req.body.specialRequests,  
           
        };

        const reservation = await Reservation.create(reservationData);
        
        const emailContent = `
        Dear ${reservation.name},
        Thank you for your reservation! Here are the details:
        Date: ${reservation.reservationDate}
        Time: ${reservation.time}
        No. of people: ${reservation.numberOfPeople}


        We hope you enjoy and have great time at Divine Dining!
    `;

    await sendEmailConfirmation(reservation.email, 'Reservation Confirmation', emailContent);

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error making reservation', error: error.message });
    }
});

//update a reservation by the customer
router.put('/reservations/:id', (req, res)=>{
    Reservation.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Reservation.findOne({_id:req.params.id}).then(function(reservation){
            res.send(reservation);
        });
        
    });
});

//TODO cancel a reservation by the customer


module.exports=router;