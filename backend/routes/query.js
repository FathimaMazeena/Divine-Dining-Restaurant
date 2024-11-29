const express = require('express');
const router = express.Router();
const Query=require('../models/query.model');

//view queries by admin and staff
router.get('/queries', (req,res)=>{
    Query.find({}).then(function(queries){
        res.send(queries);
    });

});

//View queries by customer
router.get('/messages', async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find all orders for the user, including populated product details
        const queries = await Query.find({ userId: userId });

        if (!queries || queries.length === 0) {
            return res.status(404).json({ message: 'You havent posted any queries yet' });
        }

        return res.status(200).json({ queries });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Post query message by user
router.post('/queries', async (req, res) => {
    
    try {
        const userId = req.session.userId;;

        const query = {
            userId: userId || null,
            ...req.body,     
            
        };


        const newQuery = await Query.create(query);
        res.status(201).json(newQuery);

    } catch (error) {
        res.status(500).json({ message: 'Error sending query', error: error.message });
    }
});

//post query message by admin and staff
router.post('/queries', async (req, res) => {
    
    try {
        const query = await Query.create(req.body);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error sending query', error: error.message });
    }
});

// //update query message by user
// router.put('/queries/:id', (req, res)=>{
//     Query.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//         Query.findOne({_id:req.params.id}).then(function(query){
//             res.send(query);
//         });
        
//     });
// });

//update query message by admin and staff
router.put('/queries/:id', (req, res)=>{
    Query.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Query.findOne({_id:req.params.id}).then(function(query){
            res.send(query);
        });
        
    });
});






// router.delete('/services/:id', (req, res)=>{
//     Service.findByIdAndDelete({_id:req.params.id}).then(function(service){
//         res.send(service);
//     });
// });



module.exports=router;