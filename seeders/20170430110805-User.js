const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
  queryInterface.bulkInsert('Users', [{
    username: 'admin',
    fullName: 'Administrator',
    email: 'admin@dms.com',
    password: bcrypt.hashSync('alpine', bcrypt.genSaltSync(10)),
    roleId: '1',
    about: 'I am the admin, better change my password and this about message.',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'montaro',
    fullName: 'Tony Montaro',
    email: 'bossmontaro@gmail.com',
    password: bcrypt.hashSync('montaro', bcrypt.genSaltSync(10)),
    roleId: '2',
    about: 'I love playing chess.',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface =>
  queryInterface.bulkDelete('Users', null, {})
};
