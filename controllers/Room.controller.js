const Room = require('../models/Room.model');

const Guest = require('./Guest.controller');

const roomsGet = async (req, res, next) => {
    try {
        const rooms = await Room.find().populate('guests');

        return res.render('./rooms/rooms', { rooms, title: "Habitaciones - Hotel" });
    } catch (error) {
        return next(error);
    }
};

const roomsGetById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const room = await Room.findById(id).populate('guests');

        return res.status(200).render('./rooms/room', { room });
    } catch (error) {
        return next(error);
    }
};

const roomsCreateView = (req, res, next) => {
    return res.status(200).render('./rooms/create-room');
}

const roomsCreate = async (req, res, next) => {
    try {
        const { number, type, isOccupied, guests } = req.body;

        const newRoom = new Room({
            number,
            type,
            isOccupied: isOccupied === "on" ? true : false,
            guests
        });

        const createdRoom = await newRoom.save();

        return res.redirect(`/rooms/${createdRoom._id}`);

    } catch (error) {
        return next(error);
    }
};

const roomsEditView = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);

        return res.render('./rooms/edit-room', { room });
    } catch (error) {
        return next(error);
    }
};

const roomsEdit = async (req, res, next) => {
    try {
        const { id, number, type } = req.body;

        const update = {};

        if (number) update.number = number;
        if (type) update.type = type;

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        return res.redirect(`/rooms/${updatedRoom._id}`);

    } catch (error) {
        return next(error);
    }
};

const roomsDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await Room.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json('La habitación que querías eliminar no existe.');
        } else {
            return res.redirect('/rooms');
        }
    } catch (error) {
        return next(error);
    }
};

const addGuestToRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        //Traer información de guests
        const guestList = await Guest.guestList();

        return res.render('./rooms/add-guest', { guestList, id });
    } catch (error) {
        return next(error);
    }
};

const addGuestToRoomPut = async (req, res, next) => {
    try {
        const guestId = req.body.guest;

        const roomId = req.params.id;
            
        if (!roomId || !guestId) {
            const error = new Error('Faltan argumentos');
            error.status = 400;
            throw error;
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                $set: { isOccupied: true },
                $addToSet: { guests: guestId },

            },
            { new: true }
        );

        return res.status(200).json(updatedRoom);

    } catch (error) {
        return next(error);
    }
};



module.exports = {
    roomsGet,
    roomsGetById,
    roomsCreateView,
    roomsCreate,
    roomsEditView,
    roomsEdit,
    addGuestToRoom,
    roomsDelete,
    addGuestToRoomPut
}