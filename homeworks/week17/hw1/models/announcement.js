'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Announcement.init({
    title: DataTypes.STRING,
    beginning: DataTypes.DATE,
    expired: DataTypes.DATE,
    description: DataTypes.TEXT,
    prize: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Announcement',
  });
  return Announcement;
};