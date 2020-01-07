import Route from '@ember/routing/route';
import { reject } from 'rsvp';

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