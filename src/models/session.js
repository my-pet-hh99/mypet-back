"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Session.init(
    {
      sessionId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  Session.associate = function (models) {
    Session.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return Session;
};
