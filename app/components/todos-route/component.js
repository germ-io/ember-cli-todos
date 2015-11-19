import Ember from 'ember';
import { groupBy } from 'ember-group-by';

const {
  Component,
  computed,
  computed: { filterBy },
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),
  isGrouped: false,
  userGrouped: false,
  filterBy: [],
  filterText: '',
  sorts: ['sortedTodoByComments', 'sortedTodoByTime', 'sortedTodoByCommentsDesc', 'sortedTodoByTimeDesc', 'sortedTodoByOwner'],
  currentSort: 'sortedTodoByComments',
  categoryGrouping: function () {
    return groupBy(this, 'filtered', 'category');
  }.property(),

  filteredResults: Ember.observer('filterBy.[]', 'filtered.[]', function(actionable, index, array) {
    let _this = this;

    if (_this.get('filterBy').length)  {
      let filtered = this.get('filtered').forEach(function(todo) {
        todo.set('hidden', !_this.get('filterBy').contains(todo.get('owner')))
      });
      return filtered;
    } else {
      return this.get('filtered').forEach(function(todo) {
        todo.set('hidden', false);
      });
    }
  }),

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

    changeUserGrouping() {
      this.toggleProperty('userGrouped');
    },

    createTodo(ev) {
      let todos = this.get('todos');
      let store = this.get('store');
      if (ev.keyCode != 13) {
        return;
      }

      var title = ev.target.value;

      if (title && !title.trim()) {
        return;
      }
      // Create the new Todo model
      var todo = store.createRecord('todo', {
        title: title,
        owner: ['Riqwan Thamir', 'Subu', 'Yuvaraja', 'Vikram Bhaskaran', 'Gautham Shankar', 'Paddy Lingesh'][Math.floor(Math.random() * 6)]
      });
      ev.target.value = "";
      // Save the new model
      todo.save();
      todos.loadRecords(store.peekAll('todo'));
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
    filterByUser(ev){
      if (ev.keyCode != 13) {
        return;
      }
      let filterText = ev.target.value;
      if (!Ember.isEmpty(filterText)) {
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
