import Ember from 'ember';
import { sortBy } from 'ember-group-by';

export default Ember.Component.extend({
  tagName: 'ul',

  commentSorting: ['commentsCount'],
  timeSorting: ['createdAt'],
  sortedTodoByComments: function () {
    return sortBy(this, 'todos', 'commentSorting');
  }.property(),
  sortedTodoByTime: function () {
    return sortBy(this, 'todos', 'timeSorting');
  }.property(),

  commentSortingDesc: ['commentsCount:desc'],
  timeSortingDesc: ['createdAt:desc'],
  ownerSortingAsc: ['owner:asc'],

  sortedTodoByCommentsDesc: function () {
    return sortBy(this, 'todos', 'commentSortingDesc');
  }.property(),
  sortedTodoByTimeDesc: function () {
    return sortBy(this, 'todos', 'timeSortingDesc');
  }.property(),
  sortedTodoByOwner: function () {
    return sortBy(this, 'todos', 'ownerSortingAsc');
  }.property(),

  sortedArray: Ember.computed('todos.@each.{commentsCount,createdAt}', 'currentSort', function() {
    let currentSort = this.get('currentSort');
    return this.get(currentSort);
  }),
});
