import faker from 'faker';
import config from './config';

const fakeTitle = faker.lorem.words(2);

export default {
  'Create document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .pause(1000)
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[data-activates=documents-dropdown]')
      .pause(1000)
      .click('a[href="document/new"]')
      .pause(1000)
      .setValue('Input[name=title]', fakeTitle)
      .click('select option[value="public"]')
      .setValue('textarea#hiddenContentArea', faker.lorem.paragraphs())
      .click('button.waves-effect')
      .pause(1000)
      .assert.containsText('span.card-title', fakeTitle)
      .end(),
};
