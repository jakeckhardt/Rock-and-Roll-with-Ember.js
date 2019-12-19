import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import { visit, pauseTest } from '@ember/test-helpers';
import Pretender from 'pretender';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { createBand } from 'rarwe/tests/helpers/custom-helpers';

module('Acceptance | bands', function(hooks){
  setupTest(hooks);
  setupMirage(hooks);


  const data = [
    {
      id: 1,
      type: 'bands',
      attributes: {
        name: 'Radiohead'
      }
    },
    {
      id: 2,
      type: 'bands',
      attributes: {
        name: 'Long Distance Calling'
      }
    },
  ];

  test('List bands', async function(assert) {
    

    const server = new Pretender(function() { // eslint-disable-line no-unused-vars
      this.get('/bands', function() {
        var response = { data };
        return [200, { 'Content-Type': 'application/vnd.api+json' },
        JSON.stringify(response)];
      });
    });
    
    await visit('/');
    assert.dom('[data-test-band-list-item]').exists({count:2}, 'All band links are rendered');
    assert.dom('[data-test-band-list-item]:nth-child(1)').hasText("Radiohead", 'First band list contains the band name');
    assert.dom('[data-test-band-list-item]:nth-child(2)').hasText("Long Distance Calling", 'Other band has a band name as well');
  });



  

  test('Create a band', async function(assert) {
    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');
    await createBand('Caspian');
    await pauseTest();

    assert.dom('[data-test-band-list-item]').exists({count:2}, 'All bank links are rendered', 'A new bank link is rendered');
    assert.dom('[data-test-band-list-item]:nth-child(2)').hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-songs-nav] > .active').hasText('Songs', 'The songs tab is active');

    
  });
});


