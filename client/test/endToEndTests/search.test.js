import config from './config';

export default {
  'Search for a document': browser =>
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
      .click('a.btn-floating')
      .pause(1000)
      .setValue('Input#search', 'DMS Welcome Message')
      .keys(browser.Keys.ENTER)
      .pause(1000)
      .assert.containsText('span.card-title', 'DMS Welcome Message')
      .end(),
};
