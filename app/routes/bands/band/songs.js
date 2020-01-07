import Route from '@ember/routing/route';
import { reject } from 'rsvp'; // eslint-disable-line no-unused-vars

export default Route.extend({
  model() {
    return this.modelFor('bands.band');
  },

  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: '',
    });
  },
});