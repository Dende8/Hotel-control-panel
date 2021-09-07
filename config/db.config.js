const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/hotel';

const connect = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        console.log('Conectado a la DB hotel');
    }catch(error){
        console.log(`Ha ocurrido un error conectando a la base de datos ${error}`);
    }
};

module.exports = {DB_URL, connect};