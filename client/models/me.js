var Model = require('ampersand-model');


module.exports = Model.extend({
  initialize: function () {
    var self = this;

    this.listenTo(this, 'change:token', function () {
      localStorage.token = self.token;
    });

    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },

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
  }
});