const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.bulkInsert('Users', [{
    username: 'admin',
    fullName: 'Administrator',
    email: 'admin@dms.com',
    password: bcrypt.hashSync('alpine', bcrypt.genSaltSync(10)),
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'montaro',
    fullName: 'Tony Montaro',
    email: 'bossmontaro@gmail.com',
    password: bcrypt.hashSync('montaro', bcrypt.genSaltSync(10)),
    roleId: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) =>
  queryInterface.bulkDelete('Users', null, {})
};
