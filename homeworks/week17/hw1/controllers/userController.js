const { User } = require('../models'); 
const bcrypt = require('bcrypt');
const userController = {
  login: (req, res) => {
    res.render('login');
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '請填滿所有欄位哦！');
      return next();
    }
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        req.flash('errorMessage', '帳號或密碼不對！');
        return next();
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        req.flash('errorMessage', '帳號或密碼不對！');
        return next();
      }
      req.session.username = user.username;
      res.redirect('/');
    } catch (err) {
      req.flash('errorMessage', err);
      return next();
    }
  },
}
module.exports = userController