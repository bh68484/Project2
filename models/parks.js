module.exports = function(sequelize, DataTypes) {
  var Parks = sequelize.define("parks", {
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

  Parks.associate = function(models) {
    Parks.hasMany(models.dog, { as: "Dogs" });
  };

  return Parks;
};
