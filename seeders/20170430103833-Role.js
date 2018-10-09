module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'regular',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Roles', null, {})
};
