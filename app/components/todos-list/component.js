import Ember from 'ember';
import { groupBy } from 'ember-group-by';

export default Ember.Component.extend({
  tagName: 'ul',
  categoryGrouping: function () {
    return groupBy(this, 'todos', 'owner');
  }.property(),
});
