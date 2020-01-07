import Route from '@ember/routing/route';
import wait from 'rarwe/utils/wait'; // eslint-disable-line no-unused-vars
import { action } from "@ember/object"; // eslint-disable-line no-unused-vars

export default Route.extend({

  async model() {
    // await wait(3000);
    return this.store.findAll('band');
  },

  // loading: action(function() {
  //   window.alert("Loading the band's songs, OK?");
  // }),
});
