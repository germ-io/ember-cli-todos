import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  owner: DS.attr('string', { defaultValue: 'Anonymous' }),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  commentsCount: DS.attr('number', { defaultValue: 0}),
  createdAt: DS.attr('string'),
});

Todo.reopenClass({
  FIXTURES: [
      { id: 1, title: 'Todoable for', owner: 'paddy', isCompleted: false, commentsCount: 5, createdAt: 1447663614 },
{ id: 2, title: 'Todoable for', owner: 'vikram', isCompleted: false, commentsCount: 1, createdAt: 1447663614 },
{ id: 3, title: 'Todoable for', owner: 'vikash', isCompleted: false, commentsCount: 4, createdAt: 1447663614 },
{ id: 4, title: 'Todoable for', owner: 'yuva', isCompleted: false, commentsCount: 5, createdAt: 1447663614 },

  ],
});

export default Todo;
