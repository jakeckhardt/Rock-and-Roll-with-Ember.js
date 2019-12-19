import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cats/cat', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cats/cat');
    assert.ok(route);
  });
});
