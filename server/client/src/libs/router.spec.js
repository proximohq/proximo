import pageLibrary from 'page';
import RouterInjector from 'inject-loader!./router';

class HomePage {
  show () {}
}

describe('Router', () => {
  let Router, page;

  beforeEach(() => {
    page = { spy: pageLibrary };

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
    let result;

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
});
