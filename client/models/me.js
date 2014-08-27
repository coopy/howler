var Model = require('ampersand-model');


module.exports = Model.extend({
  initialize: function () {
    var self = this;

    this.listenTo(this, 'change:token', function () {
      localStorage.token = self.token;
      this.fetch();
    });

    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },

  url: 'http://wolves.technology/wolves/me',

  props: {
    id: 'string',
    username: 'username'
  },

  session: {
    token: 'string'
  },

  derived: {
    loggedIn: {
      deps: ['token'],
      fn: function () {
        return !!this.token;
      }
    }
  },

  ajaxConfig: function () {
    if (!this.loggedIn) {
      return {};
    }
    return {
      headers: {
        'Auth-Token': this.token
      }
    };
  }
});