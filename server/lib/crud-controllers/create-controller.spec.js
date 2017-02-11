const CreateController = require('./create-controller');
const CrudController = require('./crud-controller');

describe('', () => {
  describe('definitions', () => {
    it('should extend CrudController', isDefined);
  });

  describe('implementations', () => {
    beforeEach(setup);

    it('should attempt to create a record', attemptToCreateRecord);

    it('should reply with a validation error if the record was not valid', attemptWithInvalidRecord);

    it('should reply with a generic error if the record was not saved properly', handleUnknownError);

    it('should reply with the created record if successful', handleSuccess);
  });
});


function isDefined() {
  expect(CreateController.prototype instanceof CrudController).toBe(true);
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
    create: jasmine.createSpy('create')
    .and.returnValue(Promise.resolve(record))
  };

  request = { query: {}, body: record};
  response = {};

  response.status = jasmine.createSpy('status')
  .and.returnValue(response);

  response.json = jasmine.createSpy('json')
  .and.returnValue(response);

  ctrl = new CreateController(request, response, model);
}

function attemptToCreateRecord() {
  ctrl.execute();

  expect(model.create).toHaveBeenCalledWith(record);
}

function attemptWithInvalidRecord(done) {
  const errors = ['Error1', 'Error2'];

  model.create.and.returnValue(Promise.reject({
    name: 'SequelizeValidationError',
    message: 'Validation Error',
    errors: errors
  }));

  ctrl.execute();

  setTimeout(() => {
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      name: 'ValidationError',
      message: 'Validation Error',
      errors: errors
    });
    done();
  });
}

function handleUnknownError(done) {
  const errors = ['Error1', 'Error2'];
  const name = 'SomeOtherError' + Math.random();
  const message = Math.random();

  model.create.and.returnValue(Promise.reject({
    name: name,
    message: message,
    errors: errors
  }));

  ctrl.execute();

  setTimeout(() => {
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      name: name,
      message: message,
      errors: errors
    });
    done();
  });
}

function handleSuccess(done) {
  ctrl.execute();

  setTimeout(() => {
    expect(response.json).toHaveBeenCalledWith(record);
    done();
  });
}
