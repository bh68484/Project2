module.exports = function(sequelize, DataTypes) {
  var Parks = sequelize.define("Parks", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    dogpark: DataTypes.STRING,
    greenwayAcess: DataTypes.STRING,
    walkingTrails: DataTypes.STRING,
    restrooms: DataTypes.STRING,
    field: DataTypes.STRING,
    url: DataTypes.STRING
  });

  return Parks;
};