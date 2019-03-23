const User = require('../models/user');

module.exports = (app, passport) => {
  app.post('/api/login', (req, res, next) => passport.authenticate('local-login', { session: false }, (err, passportUser, info) => {
    if (info) {
      res.json({ success: false, message: info });
    }

    if (err) {
      return next(err);
    }
    if (passportUser) {
      req.logIn(passportUser, (error) => {
        if (error) next();
        res.json({ success: true, user: passportUser });
      });
    }
  })(req, res, next));

  app.post('/api/registration', (req, res, next) => passport.authenticate('local-signup', { session: false }, (err, passportUser, info) => {
    if (info) {
      res.json({ success: false, message: info });
    }

    if (err) {
      return next(err);
    }
    if (passportUser) {
      res.json({ success: true });
    }
  })(req, res, next));

  app.get('/api/logout', (req) => {
    req.logout();
    req.session.destroy();
  });

  app.get('/api/isLoggedin', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ status: true, user: req.user });
    } else {
      res.json({ status: false });
    }
  });

  app.get('/api/getUserInfo/:uid', async (req, res) => {
    const { uid } = req.params;
    const user = await User.findOne({ _id: uid });
    if (user) {
      res.json({ email: user.email, date: user.date });
    } else {
      res.json(false);
    }
  });
};
