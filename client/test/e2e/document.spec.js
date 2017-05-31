import faker from 'faker';
import config from './config';

const newTitle = faker.lorem.words(2);
const editedTitle = faker.lorem.words(2);

export default {
  'Create document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[data-activates=documents-dropdown]')
      .waitForElementVisible('a[href="document/new"]')
      .click('a[href="document/new"]')
      .waitForElementVisible('.mce-i-code')
      .setValue('Input[name=title]', newTitle)
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button.waves-effect')
      .click('button.waves-effect')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('span.card-title', newTitle)
      .end(),

  'Open document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .click('span.card-title')
      .waitForElementVisible('.document')
      .assert.containsText('.document h3', newTitle)
      .end(),

  'Search for a document': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('input#search')
      .setValue('input#search', 'Doc-Mage Welcome Message')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.toast')
      .assert.containsText('span.card-title', 'Doc-Mage Welcome Message')
      .end(),

  'Edit document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .click('.edit-btn')
      .waitForElementVisible('.mce-i-code')
      .clearValue('Input[name=title]')
      .setValue('Input[name=title]', editedTitle)
      .click('button.waves-effect')
      .waitForElementVisible('h3.recent-documents');
    browser
      .expect.element('span.card-title').text.to.equal(editedTitle);
    browser.end();
  },

  'Delete document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('span.card-title', editedTitle)
      .click('.delete-btn')
      .waitForElementVisible('.delete-modal .red')
      .click('.delete-modal a.red')
      .waitForElementVisible('.toast');
    browser
      .expect.element('span.card-title').text.to.not.equal(editedTitle);
    browser.end();
  }
};
