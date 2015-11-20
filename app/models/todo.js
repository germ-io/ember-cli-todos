import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  owner: DS.attr('string', { defaultValue: 'Anonymous' }),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  isRoot: DS.attr('boolean', { defaultValue: false }),
  category: DS.attr('string', { defaultValue: 'red' }),
  commentsCount: DS.attr('number', { defaultValue: 0}),
  position: DS.attr('number'),
  parent: DS.belongsTo('todo', {inverse: 'children', async: false}),
  children: DS.hasMany('todo', {inverse: 'parent', async: false}),
  createdAt: DS.attr('date'),
});

export default Todo;
