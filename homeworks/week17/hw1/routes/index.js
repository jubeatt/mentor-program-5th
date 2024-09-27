const express = require('express')
const router = express.Router();


const apiController = require('../controllers/apiController')
const pageController = require('../controllers/pageController')
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')


const toPreviousPage = (req, res) => {
  return res.redirect('back');
}
const checkPermission = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/');
  }
  next();
}


router.get('/', pageController.index);
router.get('/draw', pageController.draw);
router.get('/question', pageController.question);
router.get('/api/draw', apiController.draw);

router.get('/login', userController.login);
router.post('/login', userController.handleLogin, toPreviousPage);
router.get('/logout', userController.logout);

router.get('/admin', checkPermission, adminController.console);
router.get('/admin/draw', checkPermission, adminController.draw)
router.get('/admin/draw/add-prize', checkPermission, adminController.addPrize);
router.post('/admin/draw/add-prize', checkPermission, adminController.handleAddPrize, toPreviousPage);
router.get('/admin/draw/update-prize', checkPermission, adminController.updatePrize);
router.post('/admin/draw/update-prize', checkPermission, adminController.handleUpdatePrize, toPreviousPage);
router.get('/admin/draw/delete-prize', checkPermission, adminController.deletePrize);
router.get('/admin/draw/announcement', checkPermission, adminController.announcement);
router.post('/admin/draw/announcement', checkPermission, adminController.handleAnnouncement, toPreviousPage);


module.exports = router