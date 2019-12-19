import Route from '@ember/routing/route';

export default Route.extend({

    model: function(params) {
        //let bands = this.modelFor('bands');
        return this.store.findRecord('band', params.id);
    },
});
