module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    picture: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female"]
    },
    description: DataTypes.STRING,
    likes_dogs: DataTypes.BOOLEAN,
    likes_people: DataTypes.BOOLEAN
  });

  //   Dog.associate = function(models) {
  //     Dog.belongsTo(models.User, {
  //       foreignKey: {
  //         allowNull: true
  //       }
  //     });
  //   };
  return Dog;
};
