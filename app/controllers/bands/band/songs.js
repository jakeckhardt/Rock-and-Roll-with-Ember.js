import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';

export default Controller.extend({
    isAddingSong: false,
    newSongName: '',

    isAddButtonDisablerd: empty('newSongName'),

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

    /*When a song is mistakenly made, use this to delete it.
    
    clickDelete: action(function(song) {
        song.destroyRecord();
    })
    */
});
