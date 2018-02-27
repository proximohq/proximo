import pageLibrary from 'page';
import RouterInjector from 'inject-loader!./router';

describe('Router', () => {
  let Router, page, goTo;

  class HomePage {
    show () {
      goTo = this.goTo;
    }
  }

  beforeEach(() => {
    page = { spy: pageLibrary };
    goTo = null;

    spyOn(page, 'spy').and.callThrough();

    Router = RouterInjector({
      page: page.spy
    });
  });

  describe('when running the init method', () => {
    beforeEach(() => {
      Router.init();
    });

    it('configures the router so it uses hashbang', () => {
      expect(page.spy).toHaveBeenCalledWith({
        hashbang: true
      });
    });
  });

  describe('when adding a new HomePage page', () => {
    let pageHandler, result;

    beforeEach(() => {
      result = Router.page('/page', HomePage);

      Router.init();
    });

    it('adds a new page', () => {
      expect(page.spy).toHaveBeenCalledWith('/page', jasmine.any(Function));
    });

    it('returns a copy of Router', () => {
      expect(result).toBe(Router);
    });
  });

  describe('when the page is displayed', () => {
    beforeEach(() => {
      spyOn(HomePage.prototype, 'show').and.callThrough();
      Router.page('/page', HomePage).init();
      page.spy('/page');
    });

    it('calls the .show method of the HomePage class', () => {
      expect(HomePage.prototype.show).toHaveBeenCalled();
    });
  });

  describe('when going to a new page', () => {
    beforeEach(() => {
      Router.goTo('/page');
    });

    it('goes to the specific page', () => {
      expect(page.spy).toHaveBeenCalledWith('/page');
    });
  });

  describe('when the page calls its go to function', () => {
    beforeEach(() => {
      spyOn(Router, 'goTo');

      Router.page('/page', HomePage).init();
      page.spy('/page');
      goTo('/admin');
    });

    it('calls the goTo method of the router', () => {
      expect(Router.goTo).toHaveBeenCalledWith('/admin');
    });
  });
});
