var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var HowlsPage = require('./pages/howls');
var qa = require('querystring');

module.exports = Router.extend({
  routes: {
    ''      : 'home',
    'howls' : 'howls',
    'login' : 'login',
    'auth/callback': 'authCallback'
  },

  home: function () {
    this.trigger('page', new HomePage());
  },

  howls: function () {
    this.trigger('page', new HowlsPage());
  },

  login: function () {
    var redirect = encodeURIComponent(window.location.origin + '/auth/callback');
    window.location = 'http://wolves.technology/authorize?redirect_uri=' + redirect;
  },

  authCallback: function () {
    var hash = window.location.hash.slice(1);
    var token = qa.parse(hash).access_token;
    window.app.me.token = token;
    this.redirectTo('/howls');
  }
});
