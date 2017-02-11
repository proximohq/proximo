const FindByIdController = require('./find-by-id-controller');
const CrudController = require('./crud-controller');

describe('FindByIdController', () => {
  describe('Definitions', () => {
    it('should be defined', shouldBeDefined);
  });

  describe('Usage', () => {
    beforeEach(setup);

    it('should find a record by id and display it', findById);

    it('should display 404 if the record was not found', notFound);

    it('should display 500 if an error ocurred', handleErrors);
  });
});

function shouldBeDefined() {
  expect(FindByIdController.prototype instanceof CrudController).toBe(true);
}

let ctrl;
let request;
let response;
let model;
let record;

function setup() {
  record = {
    firstName: 'Jon',
    lastName: 'Snow',
    job: 'commander of the wall'
  };

  model = {
    findOne: jasmine.createSpy('findOne')
    .and.returnValue(Promise.resolve(record))
  };

  request = { query: {}, params: { id: 99 } };
  response = {};

  response.status = jasmine.createSpy('status')
  .and.returnValue(response);

  response.json = jasmine.createSpy('json')
  .and.returnValue(response);

  ctrl = new FindByIdController(request, response, model);
}

function findById(done) {
  ctrl.execute();

  setTimeout(() => {
    const args = model.findOne.calls.argsFor(0) || [{}];

    expect(model.findOne).toHaveBeenCalled();
    expect(args[0].where).toEqual({
      id: 99
    });
    expect(response.json).toHaveBeenCalledWith(record);
    done();
  });
}

function notFound(done) {
  model.findOne.and.returnValue(Promise.resolve(null));

  ctrl.execute();

  setTimeout(() => {
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith(null);
    done();
  });
}

function handleErrors(done) {
  const error = {
    name: 'SomeError',
    message: 'Some Error',
    errors: []
  };

  model.findOne.and.returnValue(Promise.reject(error));

  ctrl.execute();

  setTimeout(() => {
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith(error);
    done();
  });
}
