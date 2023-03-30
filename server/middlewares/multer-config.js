const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },
    filename: (req, file, callback) => {
        const parsed = path.parse(file.originalname);
        callback(null, parsed.name.split(' ').join('_') + '_' + Date.now() + parsed.ext);
    }
});

module.exports = multer({ storage }).single('image');