import faker from 'faker';
import config from './config';

const fakeRole = faker.lorem.word();

export default {
  'Create role': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .pause(1000)
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .pause(1000)
      .click('a[href="role"]')
      .pause(1000)
      .setValue('Input#newRole', fakeRole)
      .click('button.waves-effect')
      .pause(1000)
      .assert.containsText('li.collection-item:last-child', fakeRole)
      .end(),
};
