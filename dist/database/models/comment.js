'use strict';

module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    movieId: DataTypes.INTEGER,
    comment: DataTypes.STRING(500),
    ipAddress: DataTypes.STRING(50)
  }, {
    timestamps: true
  });

  Comment.associate = function (models) {// associations can be defined here
  };

  return Comment;
};