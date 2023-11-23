  const express = require('express')
  const app = express()
  const port = 5500;

  //databse connection to backend server
  const mongoDbConnection = require('./database');
  mongoDbConnection()

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });


  app.use(express.json());

  app.use('/api' , require("./Routes/CreateUser"))

  app.get('/', (req, res) => {
    res.send('Hello World! this is backend server')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })