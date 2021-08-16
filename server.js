'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
const bookModel = require('./BookSchema')
const domain =process.env.AUTH0_DOMAIN;
const client = jwksClient({
  jwksUri: `https://${domain}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/test', (request, response) => {
console.log(request.headers);
  const token = request.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      response.send('invalid token');
    }
    response.send(user)
  })
});

mongoose.connect(process.env.MONOGDB_CONCTION_STRING, { useNewUrlParser: true });

const seedData = () => {
  const newBook = new bookModel({
    email: "renadsalem8888@gmail.com",
    book: [{
      name: "A Smarter Way to Learn JavaScript",
      description: "This is a useful JavaScript book written by Mark Mayers for beginners as well as experienced developers. It helps them to enhance their skills and don't mind covering some ground they already know.",
      status: "New"
    },
    {
      name: "The Road to React",
      description: "In The Road to Reac you will learn about all the fundamentals of React.js with Hooks while building a full-blown React application step by step.",
      status: "used"
    },
    {
      name: "Principle-Based Refactoring ",
      description: "In this book you will Learn Software Design Principles by Applying Refactoring Rules",
      status: "used"
    }],
  });
  console.log(newBook);
  newBook.save();
};
seedData();


const bookHandler = (req, res) => {
  bookModel.find({ email: req.query.email }, (err, books) => err ? res.send(err) : res.json(books));
};
app.get('/book', bookHandler);

app.get('/',(req,res)=>{
  res.send('Am a live...')
})
app.listen(PORT, () => console.log(`listening on ${PORT}`));
