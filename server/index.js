const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./database/db');

const userRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRotes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server started on port ${port}`));