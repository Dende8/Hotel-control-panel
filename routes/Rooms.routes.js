const express = require('express');
const router = express.Router();
const controller = require('../controllers/Room.controller');
const { isAuth } = require('../middlewares/auth.middleware');


router.get('/', [isAuth], controller.roomsGet);

router.get('/create', [isAuth], controller.roomsCreateView);

router.post('/create', [isAuth], controller.roomsCreate);

router.put('/edit', [isAuth], controller.roomsEdit);

router.get('/:id/add-guest', [isAuth], controller.addGuestToRoom);

router.put('/:id/add-guest', [isAuth], controller.addGuestToRoomPut);

router.get('/:id/edit', [isAuth], controller.roomsEditView);

router.get('/:id', [isAuth], controller.roomsGetById);

router.delete('/:id', [isAuth], controller.roomsDelete);

module.exports = router;