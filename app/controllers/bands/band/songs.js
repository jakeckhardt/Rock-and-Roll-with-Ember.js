import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { empty, sort } from '@ember/object/computed';

export default Controller.extend({
    isAddingSong: false,
    newSongName: '',

    isAddButtonDisabled: empty('newSongName'),

    addSong: action(function() {
        this.set('isAddingSong', true);
    }),

    cancelAddSong: action(function() {
        this.set('isAddingSong', false);
    }),

    saveSong: action( async function(event) {
        event.preventDefault();
        let newSong = this.store.createRecord( 'song', { 
            title: this.get('newSongName'),
            band: this.model
        });
        await newSong.save();
        this.set('newSongName', '');
    }),

    updateRating: action(function(song, rating) {
        song.set('rating', song.rating === rating ? 0 : rating);
        song.save();
    }),

    sortBy: 'ratingDesc',

    sortProperties: computed('sortBy', function(){
      let options = {
        ratingDesc: ['rating:desc', 'title:asc'],
        ratingAsc: ['rating:asc', 'title:asc'],
        titleDesc: ['title:desc'],
        titleAsc: ['title:asc']
      };
      return options[this.sortBy];
    }),

    sortedSongs: sort('matchingSongs', 'sortProperties'),

    searchTerm: '',

    matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
      let searchTerm = this.searchTerm.toLowerCase();
      return this.model.get('songs').filter((song) => {
        return song.title.toLowerCase().includes(searchTerm);
      })
    }),

    queryParams: {
      sortBy: 's',
      searchTerm: 'q',
    }

    /*When a song is mistakenly made, use this to delete it.
    
    clickDelete: action(function(song) {
        song.destroyRecord();
    })
    */
});
