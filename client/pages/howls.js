var View = require('ampersand-view');
var HowlView = require('../views/howl');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.pages.howls,
  events: {
    'submit form': 'handleFormSubmit'
  },
  autoRender: true,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(
      window.app.howls,
      HowlView,
      this.queryByHook('howls-container'));
  },
  handleFormSubmit: function (event) {
    event.preventDefault();
    var howlInput = this.queryByHook('howl-input');
    var value = howlInput.value;

    if (value) {
      var model = window.app.howls.create({
        content: value,
        user: window.app.me
      }, {
        error: function () {
          howlInput.value = value;
          window.app.howls.remove(model);
          window.alert('Hey, something messed up there. Try howling again!');
        }
      });

      howlInput.value = '';
    }
  }
});