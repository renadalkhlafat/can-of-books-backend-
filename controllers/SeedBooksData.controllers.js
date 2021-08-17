'use strict';

const bookModel = require('../models/BookSchema.models');

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

  const seedBooksData=()=>{
      seedData();
  }
  module.exports=seedBooksData;