import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing', "todo.hidden:hide"],
  categories: ['red', 'blue', 'green', 'yellow'],
  owners: ['Riqwan Thamir', 'Subu', 'Yuvaraja', 'Vikram Bhaskaran', 'Gautham Shankar', 'Paddy Lingesh'],

  sortChildrenBy: ['position'],
  sortedChildren: Ember.computed.sort('todo.children', 'sortChildrenBy'),
  init() {
    this._super(...arguments);
    this.set('isEditing', false);
    this.set('dateMode', false);
  },

  title: Ember.computed('todo.title', function() {
    return this.get('todo.title').trim();
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

  setId: function () {
    this.$().data('id', this.get('todo.id'));
  }.on('didInsertElement'),


  expanded: function () {
    this.$('ol').removeClass('closed');
    this.$().removeClass('mjs-nestedSortable-collapsed').addClass('mjs-nestedSortable-expanded');
    console.log(this.get('todo.title'))
    this.set('isCollapsed', false);
    return false;
  },

  actions: {
    editTodo() {
      this.set('isEditing', true);
    },

    save(todo, title) {
      this.set('isEditing', false);

      todo.set('title', title);
      todo.save();
    },

    saveCategory(category) {
      this.set('isEditing', false);
      let todo = this.get('todo');

      todo.set('category', category);
      todo.save();
    },

    saveOwner(owner) {
      this.set('isEditing', false);
      let todo = this.get('todo');
      todo.set('owner', owner);
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
    expand() {
      this.$('ol').removeClass('closed');
      this.$().removeClass('mjs-nestedSortable-collapsed').addClass('mjs-nestedSortable-expanded');
      this.set('isCollapsed', false);
    },
    collapse() {
      this.$('ol').addClass('closed');
      this.$().removeClass('mjs-nestedSortable-expanded').addClass('mjs-nestedSortable-collapsed');
      this.set('isCollapsed', true);
    }
  },
});
