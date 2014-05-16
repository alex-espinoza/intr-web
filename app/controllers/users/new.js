export default Ember.ObjectController.extend({
  actions: {
    save: function(model) {
      var newUser = this.store.createRecord('user', model);
      newUser.save();
      this.transitionToRoute('users.index');
    },
    delete: function() {
      this.transitionToRoute('users.index');
    }
  }
});
