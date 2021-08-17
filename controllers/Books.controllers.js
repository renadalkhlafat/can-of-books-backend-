'use strict';

const bookModel = require('../models/BookSchema.models');

const getBookHandler = (req, res) => {
  bookModel.find({ email: req.query.email }, (err, books) => err ? res.send(err) : res.json(books));
};

const createBookHandler = (req, res) => {
  bookModel.findOne({ email: req.body.email }, (error, bookdata) => {
    if (error) {
      res.send(error);
    } else {
      bookdata.book.push({ name: req.body.name, description: req.body.description, status: req.body.status });
      console.log(bookdata);
      bookdata.save();
      res.json(bookdata);
    }
  });
};

const deleteBookHandler = (req, res) => {

  bookModel.findOne({ email: req.query.email }, (error, bookdata) => {
      if (error) {
        res.send(error)
      } else {
        bookdata.book.splice(req.params.id, 1);
        bookdata.save();
        res.send(bookdata)
      }

  });

};

module.exports = {
  getBookHandler,
  createBookHandler,
  deleteBookHandler,
};