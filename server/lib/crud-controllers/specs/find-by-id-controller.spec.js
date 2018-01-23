/* eslint-env jasmine */

const FindByIdController = require('../find-by-id-controller');
const CrudController = require('../crud-controller');
const dummyData = require('./dummy-data');

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

function shouldBeDefined () {
  expect(FindByIdController.prototype instanceof CrudController).toBe(true);
}

let data;
let ctrl;

function setup () {
  data = dummyData();

  ctrl = new FindByIdController(
    data.request,
    data.response,
    data.model
  );
}

function findById (done) {
  ctrl.execute();

  setTimeout(() => {
    const args = data.model.findOne.calls.argsFor(0) || [{}];

    expect(data.model.findOne).toHaveBeenCalled();
    expect(args[0].where).toEqual({
      id: 99
    });
    expect(data.response.json).toHaveBeenCalledWith(data.record);
    done();
  });
}

function notFound (done) {
  data.model.findOne.and.returnValue(Promise.resolve(null));

  ctrl.execute();

  setTimeout(() => {
    expect(data.response.status).toHaveBeenCalledWith(404);
    expect(data.response.json).toHaveBeenCalledWith(null);
    done();
  });
}

function handleErrors (done) {
  data.expects.handleErrors(ctrl, done);
}
