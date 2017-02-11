const SelectAllController = require('../select-all-controller');
const CrudController = require('../crud-controller');
const dummyData = require('./dummy-data');

describe('SelectAllController', () => {

  describe('definitions', () => {
    it('should be defined', isDefined);
  });

  describe('usage', () => {
    beforeEach(setup);

    describe('resolving a request', () => {
      it('should response a json list from the model', successResponse);

      it('should limit the number of results to default limit', limitResults);

      it('should handle model errors', handleErrors);
    });
  });

  describe('Filtering', () => {
    it('should accept a where filter', whereFilter);

    it('should extend a scope filter', extendScope);
  });

});

function isDefined() {
  expect(SelectAllController.prototype instanceof CrudController).toBe(true);
}

let data;
let ctrl;
const DEFAULT_LIMIT = 100;

function setup() {
  data = dummyData();

  ctrl = new SelectAllController(
    data.request,
    data.response,
    data.model
  );
}

function successResponse(done) {
  let expectedResult = {
    count: data.list.length,
    result: data.list
  };

  ctrl.execute();

  setTimeout(() => {
    expect(data.response.json).toHaveBeenCalledWith(expectedResult);
    done();
  });
}

function limitResults(done) {
  ctrl.execute();

  setTimeout(() => {
    expect(data.model.findAndCountAll).toHaveBeenCalledWith({
      limit: DEFAULT_LIMIT
    });

    done();
  });
}

function handleErrors(done) {
  data.model.findAndCountAll.and.returnValue(Promise.reject(data.error));

  ctrl.execute();

  setTimeout(() => {
    expect(data.response.status).toHaveBeenCalledWith(500);
    expect(data.response.json).toHaveBeenCalledWith(data.error);
    done();
  });
}

function whereFilter(done) {
  const where = {
    firstName: 'Jon',
    lastName: 'Snow'
  };

  data.request.query = {
    where: where
  };

  ctrl.execute();

  setTimeout(() => {
    expect(data.model.findAndCountAll).toHaveBeenCalledWith({
      where: where,
      limit: DEFAULT_LIMIT
    });
    done();
  });
}

function extendScope(done) {
  let scope = {
    where: { id: 1 }
  };

  ctrl = new SelectAllController(
    data.request,
    data.response,
    data.model,
    scope
  );

  ctrl.execute();

  setTimeout(() => {
    scope.limit = 100;

    expect(data.model.findAndCountAll).toHaveBeenCalledWith(scope);
    done();
  });
}
