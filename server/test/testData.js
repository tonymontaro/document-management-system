import faker from 'faker';

export default {
  userOne: {
    username: 'kenpachi',
    fullName: 'Kenpachi Zaraki',
    email: faker.internet.email(),
    password: 'bankai',
    roleId: 2
  },
  userTwo: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  userThree: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  invalidUserDetails: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: 'myemail@yahoo',
    password: faker.internet.password(),
    roleId: 2
  },
  roleOne: {
    name: 'editor'
  },
  admin: {
    username: 'admin',
    password: 'alpine'
  },
  regularUser: {
    username: 'montaro',
    password: 'montaro'
  }
};
