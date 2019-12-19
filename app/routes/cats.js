import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

let Cats = EmberObject.extend({
    name: ''
});

let Friends = EmberObject.extend({
    name: ''
});

export default Route.extend({
    model() {
        let kyle = Friends.create({
            name: "Kyle"
        });

        let meyerton = Friends.create({
            name: "Meyerton"
        });

        let drew = Friends.create({
            name: "Drew"
        });

        let tyler = Friends.create({
            name: "Tyler"
        });

        let bandFriends = Cats.create({
            name: 'Band Friends',
            slug: 'band-friends',
            friends: A([kyle, meyerton])
        });

        let workFriends = Cats.create({
            name: 'Work Friends',
            slug: 'work-friends',
            friends: A([drew, tyler])
        });

        return A([bandFriends, workFriends]);
    }
});
