module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    picture: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female"]
    },
    comment: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    color: DataTypes.STRING,
    personality: DataTypes.STRING,
    likes_dogs: DataTypes.BOOLEAN,
    likes_people: DataTypes.BOOLEAN,
    favorite_games: DataTypes.STRING
  });

  Dog.associate = function(models) {
    Dog.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Dog;
};
