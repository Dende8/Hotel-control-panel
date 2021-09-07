const Guest = require('../models/Guest.model');


const guestsGet = async (req, res, next) => {
    try{
        const guests = await Guest.find();
        return res.render('./guests/guests', { guests, title: "Huéspedes - Hotel"});
    }catch (error) {
        return next(error);
    }
};

const guestsGetById = async (req, res, next) => {
    const { id } = req.params;

    try{
        const guest = await Guest.findById(id);

        return res.status(200).render('./guests/guest', { guest });

    } catch (error) {
        return next(error);
    }
};

const guestsCreateView = (req, res, next) => {
    return res.status(200).render('./guests/create-guest');
};

const guestsCreate = async (req, res, next) => {
    const guestPicture = req.file ? req.file.filename : null;
    try {
        const { firstname, lastname, isAdult, identityCard, country } = req.body;

        const newGuest = new Guest({ 
            firstname,
            lastname,
            isAdult: isAdult === "on" ? true : false,
            identityCard,
            country,
            picture: guestPicture
        });

        const createdGuest = await newGuest.save();

        return res.redirect(`/guests/${createdGuest._id}`);
    }catch (error){
        return next(error);
    }
};

const guestsEditView = async (req, res, next) => {
    try{
        const guest = await Guest.findById(req.params.id);

        return res.render('./guests/edit-guest', { guest });
    }catch(error){
        return next(error);
    }
};

const guestsEdit = async (req, res, next) => {
    try {
        const { id, firstname, lastname, isAdult, identityCard, country } = req.body;

        const update = {};
        if (firstname) update.firstname = firstname;
        if (lastname) update.lastname = lastname;
        if (typeof isAdult === "boolean") update.isAdult = isAdult;
        if (identityCard) update.identityCard = identityCard;
        if (country) update.country = country;

        const updatedGuest = await Guest.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        return res.redirect(`/guests/${updatedGuest._id}`);

    }catch (error){
        return next(error);
    }
};

const guestsDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await Guest.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json('El huésped que querías eliminar no existe.');
        } else {
            return res.redirect('/guests');
        }

    }catch (error){
        return next(error);
    }
};

const guestList = async () => {
    try {
        const myList = await Guest.find();
        return myList;
    }catch(error){
        console.log('Error en guestList-->controller ', error);
    }
}

module.exports = {
    guestsGet,
    guestsGetById,
    guestsCreateView,
    guestsCreate,
    guestsEditView,
    guestsEdit,
    guestsDelete,
    guestList
}