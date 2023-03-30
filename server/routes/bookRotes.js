const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.get('/bestrating', bookController.getBestBooks);
router.post('/books', auth, multer, bookController.newBook);
router.put('/books/:id', auth, bookController.updateBook);
router.delete('/books/:id', auth, bookController.deleteBook);
router.post('/books/:id/rating', auth, bookController.postRatingBook);

module.exports = router;