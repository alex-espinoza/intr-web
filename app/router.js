var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource('users', function() {
    this.route('show', { path: ':user_id' });
  });
});

export default Router;
