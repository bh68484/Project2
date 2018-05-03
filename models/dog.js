module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    color: DataTypes.STRING,
    personality: DataTypes.STRING,
    likes_dogs: DataTypes.BOOLEAN,
    likes_people: DataTypes.BOOLEAN,
    favorite_games: DataTypes.STRING
    //Add Parks Visited
    //Add Dog Buddies
  });
  return Dog;
};
