const express = require('express');
const app = express();
const cors = require('cors');
const port = 5500;

// Database connection to backend server
const mongoDbConnection = require('./database');
mongoDbConnection();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Other CORS headers if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Allow cookies to be sent from the client
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Allow requests from the specified origin
app.use(cors());

app.use(express.json());

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));

app.get('/', (req, res) => {
  res.send('Hello World! this is backend server');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
