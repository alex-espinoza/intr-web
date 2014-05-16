export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', {});
  },

  renderTemplate: function() {
    this.render('users.edit', {
      controller: 'users.new'
    });
  }
});
