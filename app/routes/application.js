export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    signIn: function() {
      this.get('session').authenticate('authenticators:custom', {});
    }
  }
});
