const SelectAllController = require('./select-all-controller');

describe('SelectAllController', () => {
  let ctrl, model, req, res, list;
  const DEFAULT_LIMIT = 100;

  it('should be defined', () => {
    expect(typeof SelectAllController).toBe('function');
  });

  it('should define an execute method', () => {
    expect(typeof SelectAllController.prototype.execute).toBe('function');
  });

  function setup() {
    list = ['a', 'b', 'c'];

    model = {
      findAndCountAll: jasmine.createSpy('findAndCountAll')
      .and.returnValue(Promise.resolve({
        count: list.length,
        rows: list
      }))
    };

    req = { query: {} };
    res = {};

    res.status = jasmine.createSpy('status')
    .and.returnValue(res),

    res.json = jasmine.createSpy('json');

    ctrl = new SelectAllController(
      req, res, model
    );
  }

  describe('resolving a request', () => {
    beforeEach(setup);

    it('should response a json list from the model', (done) => {
      let expectedResult = {
        count: list.length,
        result: list
      };

      ctrl.execute();

      setTimeout(() => {
        expect(res.json).toHaveBeenCalledWith(expectedResult);
        done();
      });
    });

    it('should limit the number of results to default limit', (done) => {
      ctrl.execute();

      setTimeout(() => {
        expect(model.findAndCountAll).toHaveBeenCalledWith({
          limit: DEFAULT_LIMIT
        });

        done();
      });
    });

    it('should handle model errors', (done) => {
      const error = {
        name: 'Error',
        message: 'Some Error',
        errors: ['Error1', 'Error2']
      };

      model.findAndCountAll.and.returnValue(Promise.reject(error));

      ctrl.execute();

      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
        done();
      });
    });
  });

  describe('Filtering', () => {
    beforeEach(setup);

    it('should accept a where filter', (done) => {
      const where = {
        firstName: 'Jon',
        lastName: 'Snow'
      };

      req.query = {
        where: where
      };

      ctrl.execute();

      setTimeout(() => {
        expect(model.findAndCountAll).toHaveBeenCalledWith({
          where: where,
          limit: DEFAULT_LIMIT
        });
        done();
      });
    });

    it('should extend a scope filter', (done) => {
      let scope = {
        where: { id: 1 }
      };

      ctrl = new SelectAllController(req, res, model, scope);

      ctrl.execute();

      setTimeout(() => {
        scope.limit = 100;

        expect(model.findAndCountAll).toHaveBeenCalledWith(scope);
        done();
      });
    });

  });
});
