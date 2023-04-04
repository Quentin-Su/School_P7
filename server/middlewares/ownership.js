const { Book } = require('../models/book');

module.exports = async (req, res, next) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: 'Id required' });

        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.userId.toString() !== req.auth.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.book = book;
        next();
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};