var Hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var config = require('getconfig');
var templatizer = require('templatizer');
var stylizer = require('stylizer');

var server = Hapi.createServer(3000, 'localhost');

server.pack.register({
  plugin: moonboots,
  options: {
    appPath: '/{p*}',
    moonboots: {
      main: __dirname + '/client/app.js',
      developmentMode: config.isDev,
      beforeBuildJS: function () {
        templatizer(
          __dirname + '/templates',
          __dirname + '/client/templates.js');
      },
      beforeBuildCSS: function (done) {
        stylizer({
          infile: __dirname + '/assets/styles/main.styl',
          outfile: __dirname + '/assets/main.css',
          development: config.isDev,
          watch: __dirname + '/assets/**/*.styl'
        }, done);
      },
      stylesheets: [
        __dirname + '/assets/bootstrap.css',
        __dirname + '/assets/main.css'
      ]
    }
  }
}, function () {
  console.log('running server at http://localhost:3000 :)');
  server.start();
});
