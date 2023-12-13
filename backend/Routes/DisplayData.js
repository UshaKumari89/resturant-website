const express = require('express');
const router = express.Router();

// Define your routes using the router object
router.post('/foodData', (req, res) => {
    try {
        if (Array.isArray(global.foodItems) && Array.isArray(global.foodCategory)) {
            res.json({ 
                foodItems: global.foodItems,
                foodCategory: global.foodCategory 
            });
        } else {
            throw new Error('Food items or categories not available');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
