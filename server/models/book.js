const mongoose = require('mongoose');

const bookModel = mongoose.Schema({
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    ratings: [
        {
            userId: {
                type: mongoose.Types.ObjectId, 
                ref: 'User',
                required: true
            },
            grade: {
                type: Number,
                required: true,
                min: 0,
                max: 5
            }
        }
    ],
    averageRating: {
        type: Number,
        required: true,
    }
});

exports.Book = mongoose.model('Book', bookModel);