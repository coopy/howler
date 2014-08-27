var Collection = require('ampersand-rest-collection');
var Howl = require('./howl');
// Plays a wolf howl mp3 clip on invokation.
var howler = require('howler');

module.exports = Collection.extend({
  model: Howl,
  comparator: function (model) {
    return -model.createdAt.valueOf();
  },
  url: 'http://wolves.technology/howls',
  initialize: function () {
    var self = this;
    this.fetch();
    this.fetchRealtime();
    window.setInterval(function () {
      self.invoke('calculateTimeAgo');
    }, 1000 * 10);
  },
  fetchRealtime: function () {
    var self = this;
    var connection = new WebSocket('ws://wolves.technology');

    connection.onmessage = function (event) {
      //Grab the message data (at event.data) and parse it into data
      var message = JSON.parse(event.data);

      //log it to the console
      console.log(message);

      console.log(self.url, message.channel);

      if (message.channel === self.url && message.action === 'update') {
        self.fetchById(message.id);
        howler();
      }

    };
  }
});