const page = require('page');

class Router {
  init () {
    page({
      hashbang: true
    });
  }

  page (path, PageHandler) {
    page(path, () => {
      const pageHandler = new PageHandler();

      pageHandler.show();
    });

    return this;
  }

  goTo (path) {
    page(path);
  }
}

module.exports = new Router();
