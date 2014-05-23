export default Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.find('user', params.user_id);
  },

  actions: {
    save: function(model) {
      model.save();
      this.transitionTo('users.show', model);
    }
  }
});
