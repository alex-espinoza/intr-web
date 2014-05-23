var CustomAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
  serverTokenEndpoint: '/api/v1/sessions',
  resourceName: 'user',

  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.token)) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  authenticate: function(credentials) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data = {};
      data[_this.resourceName] = {
        email: credentials.identification,
        password: credentials.password
      };
      _this.makeRequest(data).then(function(response) {
        Ember.run(function() {
          resolve({ token: response.data.user_token, user_id: response.data.user_id });
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          var response = JSON.parse(xhr.responseText);
          reject(response.message);
        });
      });
    });
  },

  invalidate: function() {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.ajax({
        url: _this.serverTokenEndpoint,
        type: 'DELETE',
        contentType: 'application/json',
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }
      }).then(function() {
        resolve();
      });
    });
  },

  makeRequest: function(data, resolve, reject) {
    if (!Ember.SimpleAuth.Utils.isSecureUrl(this.serverTokenEndpoint)) {
      Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
    }
    return Ember.$.ajax({
      url: this.serverTokenEndpoint,
      type: 'POST',
      data: data,
      dataType: 'json',
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('Accept', settings.accepts.json);
      }
    });
  }
});

export default CustomAuthenticator;

var CustomAuthorizer = Ember.SimpleAuth.Authorizers.Base.extend({
  authorize: function(jqXHR, requestOptions) {
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token'))) {
      jqXHR.setRequestHeader('Authorization', 'Token: ' + this.get('session.token'));
    }
  }
});

export default CustomAuthorizer;

export default {
  name: 'authentication',
  initialize: function(container, application) {
    Ember.SimpleAuth.Session.reopen({
      current_user: function() {
        var userId = this.get('user_id');
        if (!Ember.isEmpty(userId)) {
          return container.lookup('store:main').find('user', userId);
        }
      }.property('userId')
    });
    container.register('authenticators:custom', CustomAuthenticator);
    container.register('authorizer:custom', CustomAuthorizer);
    Ember.SimpleAuth.setup(container, application, {
      authorizerFactory: 'authorizer:custom'
    });
  }
};
