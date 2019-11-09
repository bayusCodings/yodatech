'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    movieId: DataTypes.STRING,
    comment: DataTypes.STRING(500),
    ipAddress: DataTypes.STRING(50)
  },
  {
    timestamps: true,
  });
  
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};