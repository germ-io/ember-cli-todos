import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',

  commentSorting: ['commentsCount'],
  timeSorting: ['createdAt'],
  sortedTodoByComments: Ember.computed.sort('todos', 'commentSorting'),
  sortedTodoByTime: Ember.computed.sort('todos', 'timeSorting'),

  commentSortingDesc: ['commentsCount:desc'],
  timeSortingDesc: ['createdAt:desc'],
  ownerSortingAsc: ['owner:asc'],

  sortedTodoByCommentsDesc: Ember.computed.sort('todos', 'commentSortingDesc'),
  sortedTodoByTimeDesc: Ember.computed.sort('todos', 'timeSortingDesc'),
  sortedTodoByOwner: Ember.computed.sort('todos', 'ownerSortingAsc'),

  sortedArray: Ember.computed('todos.@each.{commentsCount,createdAt}', 'currentSort', function() {
    let currentSort = this.get('currentSort');
    return this.get(currentSort);
  }),
});
