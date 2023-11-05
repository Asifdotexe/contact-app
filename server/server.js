// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Contact = require('./models/Contact'); // Import your Mongoose model

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoConnectionString = 'mongodb://localhost:27017/contact-data'; // MongoDB connection string
const collectionName = 'contacts'; // collection name

mongoose
  .connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });


// Define API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
