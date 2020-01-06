import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import { visit, click, fillIn, currentURL, pauseTest } from '@ember/test-helpers'; // eslint-disable-line no-unused-vars
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

    assert.dom('[data-test-band-list-item]').exists({count:2}, 'All bank links are rendered', 'A new bank link is rendered');
    assert.dom('[data-test-band-list-item]:nth-child(2)').hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-songs-nav] > .active').hasText('Songs', 'The songs tab is active');    
  });

  test('Sort songs in various ways', async function(assert) {
    let band = this.server.create('band', {title: 'Them Crooked Vultures'});
    this.server.create('song', {title: 'Elephants', rating: 5, band});
    this.server.create('song', {title: 'New Fang', rating: 4, band});
    this.server.create('song', {title: 'Mind Eraser, No Chaser', rating: 4, band});
    this.server.create('song', {title: 'Spinning in Daffodils', rating: 5, band});

    await visit('/');
    await click('[data-test-band-link]');

    assert.dom('[data-test-song-list-item]:first-of-type').hasText('Elephants', 'The first song is the highest ranked, first one in the alphabet');
    assert.dom('[data-test-song-list-item]:last-of-type').hasText('New Fang', 'The last songs is the lowest ranked, last one in the alphabet');
  
    await click('[data-test-sort-by-title-desc]');
    assert.equal(currentURL(), '/bands/1/songs?s=titleDesc');

    assert.dom('[data-test-song-list-item]:first-of-type').hasText('Spinning in Daffodils', 'The first song is the one that comes last in the alphabet');
    assert.dom('[data-test-song-list-item]:last-of-type').hasText('Elephants', 'The last song is the one that comes first in the alphabet');

    await click('[data-test-sort-by-title-asc]');
    assert.equal(currentURL(), '/bands/1/songs?s=titleAsc');

    assert.dom('[data-test-song-list-item]:first-of-type').hasText('Elephants', 'The first song is the one that comes first in the alphabet');
    assert.dom('[data-test-song-list-item]:last-of-type').hasText('Spinning in Daffodils', 'The last song is the one that comes last in the alphabet');

    await click('[data-test-sort-by-rating-desc]');


    assert.dom('[data-test-song-list-item]:first-of-type').hasText('Elephants', 'The first song is the one that comes first with the highest rating');
    assert.dom('[data-test-song-list-item]:last-of-type').hasText('New Fang', 'The last song is the one that comes last with the lowest rating');

    await click('[data-test-sort-by-rating-asc]');
    assert.equal(currentURL(), '/bands/1/songs?s=ratingAsc');

    assert.dom('[data-test-song-list-item]:first-of-type').hasText('Mind Eraser, No Chaser', 'The first song is the one that comes last with the highest rating');
    assert.dom('[data-test-song-list-item]:last-of-type').hasText('Spinning in Daffodils', 'The last song is the one that comes first with the lowest rating');
  });

  test('Search songs', async function(assert) {
    let band = this.server.create('band', {title: 'Them Crooked Vultures'});
    this.server.create('song', {title: 'Elephants', rating: 5, band});
    this.server.create('song', {title: 'New Fang', rating: 4, band});
    this.server.create('song', {title: 'Mind Eraser, No Chaser', rating: 4, band});
    this.server.create('song', {title: 'Spinning in Daffodils', rating: 5, band});
    this.server.create('song', {title: 'No One Loves Me & Neither Do I', rating: 5, band});

    await visit('/');
    await click('[data-test-band-link]');
    await fillIn('[data-test-search-box]', 'no');

    assert.equal(currentURL(), '/bands/1/songs?q=no');

    assert.dom('[data-test-song-list-item]').exists({ count: 2 }, 'The songs matching the search term are displayed');

    await click('[data-test-sort-by-title-desc]');
    assert.dom('[data-test-song-list-item]:first-of-type').hasText('No One Loves Me & Neither Do I', 'A matching song that comes later in the alphabet appears on top');
    assert.dom('[data-test-song-list-item]:last-of-type').hasText('Mind Eraser, No Chaser', 'A matching song that comes sooner in the alphabet appears on bottom');
  
    assert.ok(currentURL().includes('q=no'));
    assert.ok(currentURL().includes('s=titleDesc'));
  });
});


