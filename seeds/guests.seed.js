const mongoose = require('mongoose');
const Guest = require('../models/Guest.model');
const db = require('../db.js');

const guests = [
    {
        firstname:'Fernando',
        lastname:'Urquijo',
        isAdult:true,
        identityCard:'78945612b',
        country:'Perú',
    },
    {
        firstname:'Markus',
        lastname:'Hoffscham',
        isAdult:true,
        identityCard:'45129568g',
        country:'Alemania',
    },
    {
        firstname:'Gustav',
        lastname:'Hoffscham',
        isAdult:false,
        identityCard:'78965812p',
        country:'Alemania',
    },
    {
        firstname:'Xian',
        lastname:'Lee',
        isAdult:true,
        identityCard:'98455235f',
        country:'China',
    },
    {
        firstname:'Manuel',
        lastname:'Gómez',
        isAdult:true,
        identityCard:'98450214c',
        country:'España',
    },
];

mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allGuest = await Guest.find();

        if (allGuest.length){
            
            console.log(`[Find]: Encontrados ${allGuest.length} huéspedes.`);
            await Guest.collection.drop();
            console.log('[Delete]: Colección de huéspedes eliminada.');
        }else{
            console.log('[Find]: No se encontraron huéspedes.');
        }
    })
    .catch(error => console.log('[Error]: Al eliminar la colección huéspedes -->.', error))
    .then(async () =>{
        await Guest.insertMany(guests);
        console.log('[Success]: Nuevos huéspedes añadidos con éxito.');
    })
    .catch(error => console.log('[Error]: Añadiendo huéspedes. -->', error))
    .finally(() => mongoose.disconnect());