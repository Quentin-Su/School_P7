const { Book } = require('../models/book');
const fs = require('fs');
const path = require('path');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: 'Id required' });

        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        return res.status(200).json(book);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

exports.getBestBooks = async (req, res) => {
    try {
        const booksArray = await Book.find();
        return res.status(200).json(booksArray.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3));
    }
    catch (e) {
        return res.status(500).json({ message: 'test' + e.message });
    }
};

exports.newBook = async (req, res) => {
    try {
        const bookData = JSON.parse(req.body.book);

        const book = new Book({
            ...bookData,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });

        const bookValidator = book.validateSync();
        if (bookValidator) {
            deleteFile(req.file.filename);
            return res.status(500).json({ message: bookValidator.message });
        };

        await Book.create(book);
        res.status(201).json({ message: 'Book Created' });
    }
    catch (e) {
        deleteFile(req.file.filename);
        return res.status(500).json({ message: e.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const bookData = req.body.book ? JSON.parse(req.body.book) : req.body;

        if (req.file) {
            bookData.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            deleteFile(req.book.imageUrl.split('/').pop());
        }
        delete bookData.ratings, bookData.userId;

        await Book.findByIdAndUpdate(req.params.id, bookData, { runValidators: true });

        res.status(201).json({ message: 'Book Updated' });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.deleteOne(req.book);
        deleteFile(req.book.imageUrl.split('/').pop());

        return res.status(204);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

exports.postRatingBook = async (req, res) => {
    try {
        if (!req.body || !req.params) return res.status(400).json({ message: 'Missing Data' });
        if (req.body.rating < 0 || req.body.rating > 5) return res.status(400).json({ message: 'Invalid rating' });

        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        book.ratings.map(elem => {
            if (elem.userId === req.auth.userId) return res.status(401).json({ message: 'already noted' });
        });

        const totalGrade = book.ratings.map(item => item.grade).reduce((prev, curr) => prev + curr, 0);
        const result = ((totalGrade + req.body.rating) / (book.ratings.length + 1));

        const updatedBook = await Book.findOneAndUpdate({ _id: req.params.id }, {
            $push: {
                ratings: {
                    userId: req.auth.userId,
                    grade: req.body.rating
                }
            },
            $set: {
                averageRating: result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)
            }
        }, 
        { new: true }, { runValidators: true });

        return res.status(200).json(updatedBook);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const deleteFile = (filename) => {
    try {
        if (!filename) return;
        const imagePath = path.join(__dirname, '..', 'images', filename);

        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        return;
    }
    catch (e) {
        return console.log(e.message);
    }
}