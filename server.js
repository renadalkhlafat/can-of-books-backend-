'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

const seedBooksData = require('./controllers/SeedBooksData.controllers')
const liveHandler = require('./controllers/Live.controllers');
const authorizationHandler = require('./controllers/Authorization.controllers')
const {
  getBookHandler,
  createBookHandler,
  deleteBookHandler,
  updateBookHandler
} = require('./controllers/Books.controllers')



mongoose.connect(process.env.MONOGDB_CONCTION_STRING, { useNewUrlParser: true ,useUnifiedTopology: true });

app.get('/',liveHandler)
app.get('/test', authorizationHandler);
app.get('/book', getBookHandler);
app.post('/book',createBookHandler)
app.delete('/book/:id',deleteBookHandler)
app.put('/book/:id',updateBookHandler)
app.listen(PORT, () => console.log(`listening on ${PORT}`));

// seedBooksData();





