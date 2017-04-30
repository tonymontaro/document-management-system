module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'regular',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Roles', null, {})
};
