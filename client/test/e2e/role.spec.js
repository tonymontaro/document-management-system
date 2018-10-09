import faker from 'faker';
import config from './config';

const newRole = faker.lorem.word();
const editedRole = faker.lorem.word();

export default {
  'Create role': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[href="role"]')
      .waitForElementVisible('Input#newRole')
      .setValue('Input#newRole', newRole)
      .click('button.waves-effect')
      .waitForElementVisible('.toast')
      .assert.containsText('li.collection-item:last-child', newRole)
      .end(),

  'Edit role': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[href="role"]')
      .waitForElementVisible('Input#newRole')
      .click('li.collection-item:last-child .edit-role')
      .waitForElementVisible('Input#name')
      .clearValue('Input#name')
      .setValue('Input#name', editedRole)
      .click('.modal-content button')
      .waitForElementVisible('.toast')
      .assert.containsText('li.collection-item:last-child', editedRole)
      .end(),

  'Delete role': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[href="role"]')
      .waitForElementVisible('Input#newRole')
      .assert.containsText('li.collection-item:last-child', editedRole)
      .click('li.collection-item:last-child .delete-role')
      .click('.delete-modal .red')
      .waitForElementVisible('.toast');
    browser
      .expect.element('li.collection-item:last-child').text.to.not.equal(editedRole);
    browser.end();
  }
};
