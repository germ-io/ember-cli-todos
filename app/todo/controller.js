// controllers/todos.js
import Ember from 'ember';

export default Ember.Controller.extend({
  limit: 1000,
  queryParams: [
    'limit'
  ],
});
