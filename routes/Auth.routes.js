const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');
const controller = require('../controllers/Auth.controller');


router.get('/register', [isAdmin], controller.registerGet);

router.post('/register', [isAdmin], controller.registerPost);

router.get('/login', controller.loginGet);

router.post('/login', controller.loginPost);

router.get('/login-done', [isAuth],[isAdmin], controller.loginDone);

router.get('/login-user-done', [isAuth], controller.loginUserDone);

router.get('/login-admin-done', [isAdmin], controller.loginAdminDone);

router.post('/logout', controller.logoutPost);

module.exports = router;