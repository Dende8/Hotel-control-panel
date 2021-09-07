const express = require('express');
const controller = require('../controllers/Guest.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const fileMiddlewares = require('../middlewares/file.middleware');

const router = express.Router();

router.get('/', [isAuth], controller.guestsGet);

router.get('/create', [isAuth], controller.guestsCreateView);

router.post('/create', [isAuth], [fileMiddlewares.upload.single('picture')], controller.guestsCreate);

router.put('/edit', [isAuth], controller.guestsEdit);

router.get('/:id/edit', [isAuth], controller.guestsEditView);

router.get('/:id', [isAuth], controller.guestsGetById);

router.delete('/:id', [isAuth], controller.guestsDelete);



module.exports = router;