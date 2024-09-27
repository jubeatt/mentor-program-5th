const { Prize, Announcement } = require('../models');
const adminController = {
  console: (req, res) => {
    res.render('admin');
  },
  draw: async (req, res) => {
    const prizes = await Prize.findAll();
    res.render('adminDraw', { prizes });
  },
  announcement: async (req, res) => {
    const announcement = await Announcement.findByPk(1);
    res.render('adminAnnouncement', { announcement });
  },
  addPrize: (req, res) => {
    res.render('adminAddPrize');
  },
  updatePrize: async (req, res) => {
    const id = req.query.id;
    if (!id) return res.redirect('/');
    const prize = await Prize.findByPk(id);
    res.render('adminUpdatePrize', { prize });
  },
  deletePrize: async (req, res) => {
    const id = req.query.id;
    if (!id) return res.redirect('/');
    await Prize.destroy({ where: {id} });
    res.redirect('/admin/draw');
  },
  handleAddPrize: async (req, res, next) => {
    const { name, description, image, weight } = req.body;
    if (!name || !description || !image || !weight) {
      req.flash('errorMessage', '請填滿所有欄位哦！');
      return next();
    }
    try {
      await Prize.create({
        name,
        description,
        imageUrl: image,
        weight
      })
      res.redirect('/admin/draw');
    } catch (err) {
      req.flash('errorMessage', JSON.stringify(err));
      return next();
    }
  },
  handleUpdatePrize: async (req, res , next) => {
    const { id, name, description, image, weight } = req.body;
    if (!id) return  res.redirect('/');
    if (!name || !description || !image || !weight) {
      req.flash('errorMessage', '請填滿所有欄位哦！');
      return next();
    }
    try {
      await Prize.update({
        name,
        description,
        imageUrl: image,
        weight
      },{ where: { id } });
      res.redirect('/admin/draw');
    } catch (err) {
      req.flash('errorMessage', JSON.stringify(err));
      return next();
    }
  },
  handleAnnouncement: async (req, res , next) => {
    const { title, beginning, expired, description, prize } = req.body;
    if (!title || !beginning || !expired || !description || !prize) {
      req.flash('errorMessage', '請填滿所有欄位哦！');
      return next();
    }
    try {
      await Announcement.update({
        title,
        beginning,
        expired,
        description,
        prize
      }, {where: { id:1 }})
      res.redirect('/admin/draw');
    } catch (err) {
      req.flash('errorMessage', JSON.stringify(err));
      return next();
    }
    
  }
}
module.exports = adminController