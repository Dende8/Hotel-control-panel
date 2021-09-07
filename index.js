const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const auth = require('./auth');
auth.setStrategies();

const rootRoutes = require('./routes/Root.routes');
const guestsRoutes = require('./routes/Guest.routes');
const roomsRoutes = require('./routes/Rooms.routes');
const authRoutes = require('./routes/Auth.routes');


// const hbs = require('./config/hbs.config.js');
const db = require('./config/db.config.js');
db.connect();

const PORT = 3000;
const app = express();

app.use(session({
    secret: "hvbsa!$&lkdsfn)(/$",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24*60*60*1000,
    },
    store: MongoStore.create({mongoUrl:db.DB_URL})
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Configurar express para que utilice el paquete de passport para auth
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.isAuth = req.isAuthenticated();
    next();
 });


app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use('/', rootRoutes);
app.use('/guests', guestsRoutes);
app.use('/rooms', roomsRoutes);
app.use('/auth', authRoutes);
app.use('*', (req, res, next) => {
    
    const error = new Error('Ruta no encontrada');

    return res.status(404).render('error', {
        message: error.message,
        status: 404,
    });
});

app.use((error, req, res, next) => {
    console.log(error);

    return res.status(error.status || 500).render('error', {
        message: error.message || "Error inesperado",
        status: error.status || 500,
    });
    
});


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});


