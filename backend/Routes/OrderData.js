const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// router.post('/orderData', async (req, res) => {
//     console.log('Received request body:', req.body);

//     // Accessing the 'items' array directly from 'order_data' object
//     let data = Array.isArray(req.body.order_data?.items) ? req.body.order_data.items : [];

//     // Checking if Order_date is present before adding it to each data item
//     if (req.body.order_date) {
//         data = data.map(item => ({ ...item, Order_date: req.body.order_date }));
//     }

//     console.log('Formed data:', data);

//     // Check if email exists in the database
//     let eId = await Order.findOne({ 'email': req.body.email });

//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: data
//             });
//             res.json({ success: true });
//         } catch (error) {
//             console.log(error.message);
//             res.status(500).send("Server Error");
//         }
//     } else {
//         try {
//             await Order.findOneAndUpdate(
//                 { email: req.body.email },
//                 { $push: { order_data: data } }
//             );
//             res.json({ success: true });
//         } catch (error) {
//             console.log(error.message);
//             res.status(500).send("Server Error");
//         }
//     }
// });

router.post('/orderData', async (req, res) => {
    console.log('Received request body:', req.body);

    // Accessing the 'items' array directly from 'order_data' object
    let data = Array.isArray(req.body.order_data?.items) ? req.body.order_data.items : [];

    // Checking if Order_date is present before adding it to each data item
    if (req.body.order_date) {
        data = data.map(item => ({ ...item, Order_date: req.body.order_date }));
    }

    console.log('Formed data:', data);

    // Check if email exists in the database
    let existingOrder = await Order.findOne({ 'email': req.body.email });

    if (existingOrder === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: data
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    } else {
        try {
            // Update existing order's order_data with the new data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { $each: data } } } // Use $each to add multiple elements to array
            );
            res.json({ success: true });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }
});



router.post('/myOrderData', async (req, res) => {
    console.log("Received email:", req.body.email); // This will log the email
  
    try {
      let myData = await Order.findOne({ 'email': req.body.email });
      console.log('Fetched order data:', myData); 
      res.json({orderData: myData}); 
    } catch (error) {
      res.send("Server error: " + error.message);
    }
  });

module.exports = router;



