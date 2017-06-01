import faker from 'faker';
import config from './config';

const username = faker.internet.userName();
const password = faker.internet.password();
const about = faker.lorem.sentence();
const newAbout = faker.lorem.sentence();

export default {
  'Register a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('#signup')
      .click('#signup')
      .setValue('input[name=fullName]', faker.name.findName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .setValue('textarea', about)
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('#userName', username)
      .end(),

  'Login a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('#userName', username)
      .end(),

  "Admin can upgrade a user's role'": browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[href="user"]')
      .waitForElementVisible('table')
      .assert.containsText('tbody tr:first-child .user-role', 'regular')
      .click('tbody tr:first-child .edit-user')
      .waitForElementVisible('select')
      .click('select option[value="1"]')
      .click('.modal-content button.waves-effect')
      .waitForElementVisible('.toast')
      .assert.containsText('tbody tr:first-child .user-role', 'admin')
      .end(),

  'A user can update his/her details': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('span#userName')
      .waitForElementVisible('.fa-user')
      .click('.fa-user')
      .waitForElementVisible('.about-card')
      .assert.containsText('.card-content p', about)
      .click('a.waves-effect')
      .waitForElementVisible('textarea')
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .clearValue('textarea')
      .setValue('textarea', newAbout)
      .click('button.waves-effect')
      .waitForElementVisible('.toast')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('span#userName')
      .waitForElementVisible('.fa-user')
      .click('.fa-user')
      .waitForElementVisible('.about-card')
      .assert.containsText('.card-content p', newAbout)
      .end(),

  'Search for a user by username': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'alpine')
      .click('button')
      .waitForElementVisible('h3.recent-documents')
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .click('a[href="user"]')
      .waitForElementVisible('table')
      .setValue('input#search', 'montaro')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.toast')
      .assert.containsText('tbody tr:first-child td', 'Tony Montaro')
      .end(),

  'Invalid signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signup')
      .setValue('input[name=fullName]', faker.name.findName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .setValue('textarea', faker.lorem.sentence())
      .click('button')
      .waitForElementVisible('.toast')
      .assert.urlContains('signup')
      .end(),

  'Invalid login': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=username]', 'anonymous')
      .setValue('input[name=password]', 'oshey')
      .click('button')
      .waitForElementVisible('.toast')
      .assert.urlContains('login')
      .end();
  }
};
