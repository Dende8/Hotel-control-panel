const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema(
    {
        number: { type: Number, required: true },
        type: { type: String, required: true, enum: ['Individual', 'Doble', 'Suite']},
        isOccupied: { type: Boolean, default: false },
        guests: [ { type: mongoose.Types.ObjectId, ref: 'Guests' } ]
    },
    { timestamps: true }
);

const Room = mongoose.model('Rooms', roomSchema);

module.exports = Room;