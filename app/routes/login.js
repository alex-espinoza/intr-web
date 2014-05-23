export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  setupController: function(controller, model) {
    controller.set('errorMessage', null);
  },

  actions: {
    sessionAuthenticationFailed: function(message) {
      this.controller.set('errorMessage', message);
    }
  }
});
