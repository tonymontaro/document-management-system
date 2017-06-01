/* eslint no-underscore-dangle: 0 */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Username already exist' },
      validate: {
        not: { args: ['\\s+'], msg: 'Use a valid username' },
        notEmpty: { args: true, msg: 'Username cannot be empty' } }
    },
    fullName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Email already exist' },
      validate: { isEmail: { args: true, msg: 'Use a valid email' } }
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
      /**
      * Verify provided user password
      *
      * @param {String} password
      * @returns {Boolean} no return
      */
      verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
      * Encryp user's password
      *
      * @returns {Undefined} no return
      */
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
