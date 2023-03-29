const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://quentin:${process.env.DB_PASSWORD}@cluster0.0st15mf.mongodb.net/GrimoireDataApi?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Successful Connection to MongoDB')).catch(() => console.log('Connection failed to MongoDB'));