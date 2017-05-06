module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Documents', [{
      title: 'DMS Welcome Message',
      content: `Hello and welcome, if this is the first time running the app,
you can login with the following default admin settings:
username: admin
password: alpine
Please login and change the default root password.`,
      authorId: 1,
      authorRoleId: 1,
      access: 'public',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'A Song of Ice and Fire III',
      content: `The day was grey and bitter cold, and the dogs would not take the scent.
The big black bitch had taken one sniff at the bear tracks, backed off, and skulked back to the pack with her tail between her legs.
The dogs huddled together miserably on the riverbank as the wind snapped at them.
Chett felt it too, biting through his layers of black wool and boiled leather.
It was too bloody cold for man or beast, but here they were. His mouth twisted, and he could almost feel the boils that covered his cheeks and neck growing red and angry.
I should be safe back at the Wall, tending the bloody ravens and making fires for old Maester Aemon. It was the bastard Jon Snow who had taken that from him, him and his fat friend Sam Tarly.
It was their fault he was here, freezing his bloody balls off with a pack of hounds deep in the haunted forest.`,
      authorId: 2,
      authorRoleId: 2,
      access: 'public',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
  down: (queryInterface, Sequelize) =>
  queryInterface.bulkDelete('Documents', null, {})
};
