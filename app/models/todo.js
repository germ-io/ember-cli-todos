import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  owner: DS.attr('string', { defaultValue: 'Anonymous' }),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  isRoot: DS.attr('boolean', { defaultValue: false }),
  category: DS.attr('string', { defaultValue: 'red' }),
  commentsCount: DS.attr('number', { defaultValue: 0}),
  children: DS.hasMany('todo', {inverse: null, async: false}),
  ancestors: DS.hasMany('todo', {inverse: 'descendants', async: false}),
  descendants: DS.hasMany('todo', {inverse: 'ancestors', async: false}),
  createdAt: DS.attr('date')
});

export default Todo;
