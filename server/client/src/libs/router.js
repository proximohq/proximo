const page = require('page');

class Router {
  /**
   * Initializes the Page router using the hashbang URL method.
   */
  init () {
    page({
      hashbang: true
    });
  }

  /**
   * Defines a new page by their page and the handler class.
   * It also adds a goTo method to the handler.
   *
   * @param {String} path the path to match the page handler.
   * @param {Class} PageHandler a class that implements the .show method that will
   * run when the path matches the current URL.
   * @return {Router} a reference to itself.
   */
  page (path, PageHandler) {
    PageHandler.prototype.goTo = (path) => this.goTo(path);
    page(path, () => {
      const pageHandler = new PageHandler();

      pageHandler.show();
    });

    return this;
  }

  /**
   * Goes to the given path.
   *
   * @param {String} path the URL path to go to.
   */
  goTo (path) {
    page(path);
  }
}

module.exports = new Router();
