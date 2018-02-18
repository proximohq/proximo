/* eslint-env jasmine */

const CreateController = require('../create-controller');
const CrudController = require('../crud-controller');
const dummyData = require('./dummy-data');

describe('CreateController', () => {
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

function isDefined () {
  expect(CreateController.prototype instanceof CrudController).toBe(true);
}

let data;
let ctrl;

function setup () {
  data = dummyData();

  ctrl = new CreateController(
    data.request,
    data.response,
    data.model
  );
}

function attemptToCreateRecord () {
  ctrl.execute();

  expect(data.model.create).toHaveBeenCalledWith(data.record);
}

function attemptWithInvalidRecord (done) {
  const errors = ['Error1', 'Error2'];

  data.model.create.and.returnValue(Promise.reject({
    name: 'SequelizeValidationError',
    message: 'Validation Error',
    errors: errors
  }));

  ctrl.execute();

  setTimeout(() => {
    expect(data.response.status).toHaveBeenCalledWith(400);
    expect(data.response.json).toHaveBeenCalledWith({
      name: 'ValidationError',
      message: 'Validation Error',
      errors: errors
    });
    done();
  });
}

function handleUnknownError (done) {
  data.expects.handleErrors(ctrl, done);
}

function handleSuccess (done) {
  ctrl.execute();

  setTimeout(() => {
    expect(data.response.json).toHaveBeenCalledWith(data.record);
    done();
  });
}
