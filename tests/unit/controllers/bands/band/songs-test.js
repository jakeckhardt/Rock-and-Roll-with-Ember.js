import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | bands/band/songs', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('isAddButtonDisabled', function(assert) {

    let controller = this.owner.lookup('controller:bands/band/songs');
    // By default the controllers function isAddButtonDisabled is true, which disables the button

    controller.set('newSongName', 'Belenos');
    // This should now set isAddButtonDisabled to false, which will allow the button to be used
    assert.notOk(controller.get('isAddButtonDisabled'), 'The button is not disabled when there is a title');

    controller.set('newSongName', '');
    //This sets it back to true, which disables the button
    assert.ok(controller.get('isAddButtonDisabled'), 'The button is disabled when the title is empty');
  });
});
