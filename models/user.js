// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     name: DataTypes.STRING
//   });

//   User.associate = function(models) {
//     User.hasMany(models.Dog, {
//       onDelete: "casecade"
//     });
//   };

//   return User;
// };

module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      notEmpty: true,
      foreignKey: true
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    last_login: {
      type: Sequelize.DATE
    },

    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  User.associate = function(models) {
    User.hasMany(models.dog, {
      onDelete: "cascade"
    });
  };

  return User;
};
