const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
};

const registerStrategy = new LocalStrategy(
    {
        
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {

        try {
            const existingUser = await User.findOne({ email });

            if(existingUser) {
                // No registrar al usuario.
                const error = new Error('Usuario ya está registrado');
                return done(error);
            };

            const isValidEmail = validateEmail(email);

            if(!isValidEmail) {
                const error = new Error('Email incorrecto. No cumple el formato email');
                return done(error);
            };

            const isValidPassword = validatePass(password);

            if(!isValidPassword) {
                const error = new Error('La contraseña tiene que contener de 6 a 20 carácteres, una minúscula, una mayúscula y un número');
                return done(error);
            }

           
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email,
                password: hash,
                name: req.body.name,
            });

            const savedUser = await newUser.save();
            
            //Para proteger la contraseña
            savedUser.password = undefined;
            return done(null, savedUser);
        } catch (error) {
            return done(error);
        }
        
    }
);

module.exports = registerStrategy;

