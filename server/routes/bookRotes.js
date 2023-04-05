const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const checkOwnership = require('../middlewares/ownership');
const multer = require('../middlewares/multer-config');

router.get('/books', bookController.getAllBooks);
router.get('/books/bestrating', bookController.getBestBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', auth, multer, bookController.newBook);
router.put('/books/:id', auth, checkOwnership, multer, bookController.updateBook);
router.delete('/books/:id', auth, checkOwnership, bookController.deleteBook);
router.post('/books/:id/rating', auth, bookController.postRatingBook);

module.exports = router;