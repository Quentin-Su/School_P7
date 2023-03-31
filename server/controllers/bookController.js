const { Book } = require('../models/book');

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

exports.newBook = async (req, res) => {
    try {
        const bookData = JSON.parse(req.body.book);

        const book = new Book({
            ...bookData,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });

        Book.create(book);
        res.status(201).json({ message: 'Book Created' });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.deleteOne(req.book);
        return res.status(204);
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({ message: e.message });
    }
};

exports.postRatingBook = async (req, res) => {
    try {
        if (!req.body || !req.params) return res.status(400).json({ message: 'Missing Data' });

        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });


        book.ratings.map(elem => { 
            if (elem.userId === req.auth.userId) return res.status(401).json({ message: 'already noted' });
        });

        const totalGrade = book.ratings.map(item => item.grade).reduce((prev, curr) => prev + curr, 0);

        const updatedBook = await Book.findOneAndUpdate({ _id: req.params.id }, { 
            $push: { 
                ratings: { 
                    userId: req.auth.userId, 
                    grade: req.body.rating 
                } 
            },
            $set: {
                averageRating: ((totalGrade + req.body.rating) / (book.ratings.length + 1))
            }
        }, { new: true });
        
        return res.status(200).json(updatedBook);
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({ message: e.message });
    }
};