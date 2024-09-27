const { Announcement } = require("../models");
const pageController = {
  index: (req, res) => {
    res.render("index");
  },
  draw: async (req, res) => {
    const announcement = await Announcement.findByPk(1);
    res.render("draw", { announcement });
  },
  question: (req, res) => {
    res.render("question");
  },
};
module.exports = pageController;
