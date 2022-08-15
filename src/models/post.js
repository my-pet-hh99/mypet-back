"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      postId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      imageUrl: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      sourceKey: "postId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return Post;
};
