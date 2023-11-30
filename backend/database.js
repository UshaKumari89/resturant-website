const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://uavaswani:vaswani1@cluster0.o2xxadj.mongodb.net/Slice&Spice?retryWrites=true&w=majority';

const mongoDbConnection = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connection established successfully!!');

        // Fetch both food items and food categories data from MongoDB using mongoose in parallel
        const [foodItemsCursor, foodCategoryCursor] = await Promise.all([
            mongoose.connection.db.collection('foodItems').find({}).toArray(),
            mongoose.connection.db.collection('foodCategory').find({}).toArray()
        ]);

        global.foodItems = foodItemsCursor;
        global.foodCategory = foodCategoryCursor;

        // console.log(global.foodItems);
        // console.log(global.foodCategory);
    } catch (error) {
        console.error(error);
    }
};

module.exports = mongoDbConnection;
