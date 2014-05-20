var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('users', function() {
    this.route('show', { path: ':user_id' });
    this.route('edit', { path: ':user_id/edit' });
    this.route('new');
  });
});

export default Router;
