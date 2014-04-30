export default Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false,

  usersCount: function() {
    return this.get('model.length');
  }.property('@each')
});
