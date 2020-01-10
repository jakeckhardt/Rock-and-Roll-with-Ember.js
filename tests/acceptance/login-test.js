import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, pauseTest } from '@ember/test-helpers'; // eslint-disable-line no-unused-vars
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Log in with valid credentials', async function(assert) {
    let email = 'dave@tcv.com';
    let password = 'ThemCr00ked!';
    this.server.create('user', { email, password });

    await visit('/login');
    await fillIn('#email', email);
    await fillIn('#password', password);
    await click('[data-test-login-button]');

    assert.dom('[data-test-bands-empty-message]').hasText("Let's start by creating a band.", "A descriptive empty message is shown.");
  });
});
