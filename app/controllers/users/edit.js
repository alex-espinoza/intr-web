export default Ember.ObjectController.extend({
  deleteMode: false,

  actions: {
    delete: function(model) {
      this.toggleProperty('deleteMode');
    },
    confirmDelete: function(model) {
      model.deleteRecord();
      model.save();
      this.transitionToRoute('users.index');
      this.set('deleteMode', false);
    },
    cancelDelete: function() {
      this.set('deleteMode', false);
    }
  }
});
