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
  invalidToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE0OTM2MjQ5MTcsImV4cCI6MTQ5MzcxMTMxN30.A3dy4bPUEa3QsML03UKDjqC9wcmAjV0ub8aWu1niaL',
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
