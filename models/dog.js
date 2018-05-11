module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("dog", {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    picture: DataTypes.STRING,
    gender: {
      type: DataTypes.BOOLEAN
    },
    description: DataTypes.STRING,
    likes_dogs: DataTypes.BOOLEAN,
    likes_people: DataTypes.BOOLEAN
  });

  Dog.associate = function(models) {
    Dog.belongsTo(models.user, {
      foreignKey: "username"
    });
  };
  return Dog;
};
