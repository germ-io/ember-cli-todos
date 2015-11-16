import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  isRoot: DS.attr('boolean', { defaultValue: false }),
  commentsCount: DS.attr('number', { defaultValue: 0}),
  children: DS.hasMany('todo', {inverse: null, async: false}),
  ancestors: DS.hasMany('todo', {inverse: 'descendants', async: false}),
  descendants: DS.hasMany('todo', {inverse: 'ancestors', async: false})
});

export default Todo;
