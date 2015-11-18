// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    limit: '',
    state: { refreshModel: true }
  },

  model(params) {
    return this.store.query('todo', {limit: params.limit}).then((todos) => ({
      all: todos,
      filter: params.state
    }));
  }

});
