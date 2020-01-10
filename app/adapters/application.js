// import ApplicationAdapter from './application';
// import DS from 'ember-data';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

// const { JSONAPIAdapter } = DS;

// export default JSONAPIAdapter.extend(DataAdapterMixin, {
//   authorize(xhr) {
//     console.log('what');
//     let { token } = this.session.data.authenticated;
//     console.log('asdf');
//     console.log(token);
//     if (token) {
//       xhr.setRequestHeader('Authorization', `Bearer ${token}`);
//     }
//   }
// });

// import DS from 'ember-data';
// const { JSONAPIAdapter } = DS;

// export default class ApplicationAdapter extends JSONAPIAdapter {

//   headers = {
//     'Authorization': this,
//   };
// }

import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default DS.JSONAPIAdapter.extend({
  session: service('session'),
  headers: computed('session.authToken', function() {
    let { token } = this.session.data.authenticated;
    return {
      'Authorization': `Bearer ${ token }`,
    };
  })
});
