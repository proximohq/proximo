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
      findAndCountAll: jasmine.createSpy('findAll')
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
      model, req, res
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
          limit: DEFAULT_LIMIT,
          where: undefined
        });

        done();
      });
    });

    it('should handle model errors', (done) => {
      const error = new Error('message');
      const expectedResult = {
        error: true,
        details: error
      };

      model.findAndCountAll.and.returnValue(Promise.reject(error));

      ctrl.execute();

      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
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
  });
});
