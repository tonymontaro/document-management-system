import faker from 'faker';

export default {
  userOne: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  userTwo: {
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
  adminUser: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
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
