const SelectAllController = require('./select-all-controller');

describe('SelectAllController', () => {
  it('should be defined', () => {
    expect(typeof SelectAllController).toBe('function');
  });

  it('should define an execute method', () => {
    expect(typeof SelectAllController.prototype.execute).toBe('function');
  });

  describe('resolving a request', () => {
    let ctrl, model, req, res, list;

    beforeEach(() => {
      list = ['a', 'b', 'c'];

      model = {
        findAndCountAll: jasmine.createSpy('findAll')
        .and.returnValue(Promise.resolve({
          count: list.length,
          rows: list
        }))
      };

      req = {};
      res = {};

      res.status = jasmine.createSpy('status')
      .and.returnValue(res),

      res.json = jasmine.createSpy('json');

      ctrl = new SelectAllController(
        model, req, res
      );
    });

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

    it('should limit the number of results to 100', (done) => {
      ctrl.execute();

      setTimeout(() => {
        expect(model.findAndCountAll).toHaveBeenCalledWith({
          limit: 100
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
});
