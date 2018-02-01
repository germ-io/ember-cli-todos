// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    limit: '',
  },

  model(params) {
    return this.store.query('todo', { limit: params.limit }).then((todos) => ({
      all: todos,
    }));
  }

});
