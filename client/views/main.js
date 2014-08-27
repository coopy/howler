var View = require('ampersand-view');
var templates = require('../templates');
var ViewSwitcher = require('ampersand-view-switcher');

module.exports = View.extend({
  events: {
    'click a[href]': 'handleLinkClick',
  },
  template: templates.body,
  initialize: function () {
    this.listenTo(window.app.router, 'page', this.handleNewPage);
  },
  render: function () {
    this.renderWithTemplate();
    this.pages = new ViewSwitcher(this.queryByHook('page-container'));
  },
  autoRender: true,
  handleLinkClick: function (e) {
    var target = e.target;
    var isLocal = target.host === window.location.host;

    if (isLocal && !e.altKey && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      window.app.router.history.navigate(target.pathname, { trigger: true });
    }
  },
  handleNewPage: function (pageView) {
    this.pages.set(pageView);
  }
});