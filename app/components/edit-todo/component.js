import Ember from 'ember';

export default Ember.TextArea.extend({
  didInsertElement() {
    this.$().focus();
    this.$().addClass('focus'); // headless testing is brittle

    this.$().atwho({
      at: '@',
      data: ['riqwan', 'thamir', 'subu', 'gautham', 'charizard', 'vikram', 'vikash'],
      limit: 7,
    });
  },
});
