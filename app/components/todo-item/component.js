import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing'],

  init() {
    this._super(...arguments);
    this.set('isEditing', false);
    this.set('dateMode', false);
  },

  title: Ember.computed('todo.title', function() {
    return `${this.get('todo.title')} for ${this.get('owner')}`;
  }),

  isCompleted: Ember.computed('todo.isCompleted', function() {
    return this.get('todo.isCompleted');
  }),

  comments: Ember.computed('todo.isCompleted', function() {
    return `${this.get('todo.commentsCount')} comments`;
  }),

  owner: Ember.computed('todo.owner', function() {
    return this.get('todo.owner');
  }),

  createdAt: Ember.computed('todo.createdAt', function() {
    var date = new Date(this.get('todo.createdAt'));

    return date;
  }),
  saveTodo: Ember.observer('date', function () {
    let todo = this.get('todo');
    todo.set('createdAt', new Date(this.get('date')));
    todo.save();
  }),

  actions: {
    editTodo() {
      this.set('isEditing', true);
    },

    save(todo, title) {
      this.set('isEditing', false);

      todo.set('title', title);
      todo.save();
    },

    removeTodo(todo) {
      todo.destroyRecord();
    },

    toggleCompleteTodo(todo) {
      todo.toggleProperty('isCompleted');
      todo.save().then(function () {
        todo.get('ancestors').reload();
        todo.get('descendants').reload();
      });
    },

    toggleDateMode() {
      this.set('dateMode', true);
    },
  }
});
