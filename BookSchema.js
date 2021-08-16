const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    email: { type: String },
    book: [{
        name: { type: String },
        description: { type: String },
        status: { type: String },
    }],
});

const bookModel = mongoose.model('book', booksSchema);

module.exports = bookModel;