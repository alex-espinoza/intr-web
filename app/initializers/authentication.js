var CustomAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
  serverTokenEndpoint: '/api/v1/sessions',
  resourceName: 'user',

  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.auth_token) && !Ember.isEmpty(properties.auth_email)) {
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
          resolve(response);
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  invalidate: function() {
    return Ember.RSVP.resolve();
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

export default {
  name: 'authentication',
  initialize: function(container, application) {
    container.register('authenticators:custom', CustomAuthenticator);
    Ember.SimpleAuth.setup(container, application);
  }
};
