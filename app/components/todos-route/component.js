import Ember from 'ember';
import groupBy from 'ember-group-by';

const {
  Component,
  computed,
  computed: { filterBy },
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),
  isGrouped: false,
  filterBy: [],
  filterText: '',
  sorts: ['sortedTodoByComments', 'sortedTodoByTime', 'sortedTodoByCommentsDesc', 'sortedTodoByTimeDesc', 'sortedTodoByOwner'],
  currentSort: 'sortedTodoByComments',
  categoryGrouping: groupBy('filteredResults', 'category'),

  filteredResults: computed('filterBy.[]', 'filtered.[]', function(actionable, index, array) {
    let _this = this;

    if (_this.get('filterBy').length)  {
      return this.get('filtered').filter(function(todo) {
        return _this.get('filterBy').contains(todo.get('owner'));
      });
    } else {
      return this.get('filtered');
    }
  }),
  // currentSort: ['commentsCount:asc'],
  // filteredResults: computed.sort('justFilteredResults', 'currentSort'),
  filtered: computed('todos.@each.isCompleted', 'filter', function() {
    switch (this.get('filter')) {
    case 'active':
      return this.get('active');
    case 'completed':
      return this.get('completed');
    default:
      return this.get('todos');
    }
  }),

  completed: filterBy('todos', 'isCompleted', true),
  active: filterBy('todos', 'isCompleted', false),

  allAreDone: computed.empty('active'),

  inflection: computed('active.length', function() {
    let active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }).readOnly(),

  actions: {
    changeListType() {
      this.toggleProperty('isGrouped');
    },

    createTodo(title) {
      let store = this.get('store');

      if (title && !title.trim()) {
        this.set('newTitle', '');
        return;
      }

      // Create the new Todo model
      let todo = store.createRecord('todo', {
        title: title,
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },

    completeAll() {
      let todos = this.get('todos');
      let allAreDone = this.get('allAreDone');

      todos.setEach('isCompleted', !allAreDone);
      todos.invoke('save');
    },

    clearCompleted() {
      let completed = this.get('completed');

      completed
        .toArray() // clone the array, so it is not bound while we iterate over and delete.
        .invoke('destroyRecord');
    },
    filterByUser(){
      let filterText = this.get('filterText');
      if (!Ember.isBlank(filterText)) {
        this.get('filterBy').clear();
        let filterBy = filterText.split(",").map(f => f.trim());
        this.get('filterBy').pushObjects(filterBy);
      } else {
        this.set('filterBy', []);
      }
    },
    selectSort(selection) {
      this.set('currentSort', selection);
    },
  }
});
