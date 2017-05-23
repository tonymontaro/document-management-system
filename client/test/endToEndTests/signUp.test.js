import faker from 'faker';
import config from './config';

export default {
  'Register a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signup')
      .setValue('Input[name=fullName]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=username]', faker.internet.userName())
      .setValue('Input[name=password]', faker.internet.password())
      .click('select option[value="2"]')
      .setValue('textarea', faker.lorem.sentence())
      .click('button')
      .pause(2000)
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .end(),
  'Invalid signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signup')
      .setValue('Input[name=fullName]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', faker.internet.password())
      .click('select option[value="2"]')
      .setValue('textarea', faker.lorem.sentence())
      .click('button')
      .pause(1000)
      .assert.urlContains('signup')
      .end()
};
