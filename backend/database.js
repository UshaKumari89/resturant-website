const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://uavaswani:vaswani1@cluster0.o2xxadj.mongodb.net/Slice&Spice?retryWrites=true&w=majority';
//this function will create a //databse connection to backend server and x
const mongoDbConnection = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connection established successfully!!');
        //fetch the data from database using mongoose
        const fetchedData = await mongoose.connection.db.collection('foodItems').find({}).toArray();
        //console.log(fetchedData);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

module.exports = mongoDbConnection;
