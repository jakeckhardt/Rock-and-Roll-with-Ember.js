import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        let cats = this.modelFor('cats');
        return cats.find(cat => cat.slug === params.slug);
    }
});
