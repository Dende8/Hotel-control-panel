const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    
    
    return res.redirect('/');
  };
  
  const isAdmin = (req, res, next) => {
    
  
    if(req.isAuthenticated()) {
  
      if(req.user.role === 'admin') {

        return next();
      }
      return res.redirect('/auth/login-user-done');
    }
  
    return res.redirect('/');
  };
  
  module.exports = {
    isAuth,
    isAdmin,
  }
  