const mongoose = require('mongoose');

const { Schema } = mongoose;

const guestSchema = new Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        isAdult: {type: Boolean, required: true},
        identityCard: {type: String, required: true},
        country: {type: String, required: true},
        picture: {type: String},   
    },
    { timestamps: true }
);

const Guest = mongoose.model('Guests', guestSchema);

module.exports = Guest;