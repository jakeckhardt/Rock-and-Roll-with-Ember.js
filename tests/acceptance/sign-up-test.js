import { module, test } from 'qunit';
import { visit, fillIn, Click, currentURL, click } from '@ember/test-helpers'; // eslint-disable-line no-unused-vars
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support'

module('Acceptance | sign up', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Successful Sign up', async function(assert) {
    await visit('/sign-up');
    await fillIn('#email', 'dave@tcv.com');
    await fillIn('#password', 'ThemCr00ked!');
    await click('[data-test-sign-up-button]');

    assert.dom('[data-test-form-header]').hasText('Log in to R&R', 'User is redirected to log in');
  });
});
