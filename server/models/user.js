/* eslint no-underscore-dangle: 0 */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { not: ['\\s+'] }
    },
    fullName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'authorId',
          as: 'documents',
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'SET NULL'
        });
      }
    },

    instanceMethods: {
      verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
      encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      }
    },

    hooks: {
      beforeCreate(user) {
        user.encryptPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.encryptPassword();
        }
      }
    }
  });
  return User;
};
