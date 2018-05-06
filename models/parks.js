module.exports = function(sequelize, DataTypes) {
  var Parks = sequelize.define("Parks", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    dogpark: DataTypes.STRING,
    greenwayAcess: DataTypes.STRING,
    walkingTrails: DataTypes.STRING,
    restrooms: DataTypes.STRING,
    field: DataTypes.STRING,
    url: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING 
  });

  return Parks;
};