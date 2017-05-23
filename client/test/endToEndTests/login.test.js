import config from './config';

export default {
  'Login a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'admin')
      .setValue('Input[name=password]', 'alpine')
      .click('button')
      .pause(1000)
      .assert.containsText('h3.recent-documents', 'Recently Added Documents')
      .end(),
  'Invalid login': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=username]', 'anonymous')
      .setValue('Input[name=password]', 'oshey')
      .click('button')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
