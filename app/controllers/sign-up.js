import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
  router: service(),

  signUp: action(async function(event) {
    event.preventDefault();
    let { email, password } = this;
    let user = this.store.createRecord('user', { email, password });
    try {
      await user.save();
      await this.router.transitionTo('login');
    }
    catch(error) {
      console.log(error); // eslint-disable-line no-console
    }
    
  }),
});
