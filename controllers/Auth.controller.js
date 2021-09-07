const passport = require('passport');
const User = require('../models/User.model');

const registerGet = async (req, res, next) => {
  try {
    return res.status(200).render("./auth/register");
  } catch (error) {
    return next(error);
  }
};

const registerPost = async (req, res, next) => {
  try {
    const done = (error, user) => {
      if (error) {
        return next(error);
      }
      console.log("Usuario registrado", user);
      return res.status(200).render("./auth/register-done");
    };
    passport.authenticate("registro", done)(req);
  } catch (error) {
    return next(error);
  }
};

const loginGet = async (req, res, next) => {
  try {
    return res.status(200).render("./auth/login");
  } catch (error) {
    return next(error);
  }
};

const loginPost = async (req, res, next) => {
  try {
    const done = (error, user) => {
      if (error) {
        return next(error);
      }

      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        console.log("Usuario conectado", user);
        return res.status(200).redirect("/auth/login-done");
      });
    };
    passport.authenticate("acceso", done)(req);
  } catch (error) {
    return next(error);
  }
};

const loginDone = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === "admin") {
      return res.redirect("/auth/login-admin-done");
    } else {
      return res.redirect("/auth/login-user-done");
    }
  } catch (error) {
    return next(error);
  }
};

const loginUserDone = async (req, res, next) => {
  try {
    return res.status(200).render("./auth/login-done");
  } catch (error) {
    return next(error);
  }
};

const loginAdminDone = async (req, res, next) => {
  try {
    return res.status(200).render("./auth/login-admin-done");
  } catch (error) {
    return next(error);
  }
};

const logoutPost = (req, res, next) => {
  try {
    if (req.user) {
      req.logout();
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.redirect("/");
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  loginDone,
  loginUserDone,
  loginAdminDone,
  logoutPost,
};
