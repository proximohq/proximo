const dummyData = require('./dummy-data');
const DeleteOneController = require('../delete-one-controller');
const CrudController = require('../crud-controller');

describe('Delete One Controller', () => {
  describe('definitions', () => {
    it('should extend CrudController', isDefined);
  });

  describe('implementations', () => {
    beforeEach(setup);

    it('should reply with a 404 if no record was deleted', reply404OnNoUpdate);

    it('should reply with a generic error if the record was not deleted properly', handleUnknownError);

    it('should reply with null if everything went well', replyWithNullOnSuccess);
  });
});

function isDefined() {
  expect(DeleteOneController.prototype instanceof CrudController).toBe(true);
}

let data;
let ctrl;

function setup() {
  data = dummyData();

  ctrl = new DeleteOneController(
    data.request,
    data.response,
    data.model
  );
}

function reply404OnNoUpdate(done) {
  data.expects.expect404(ctrl, done);
}

function handleUnknownError(done) {
  data.expects.handleErrors(ctrl, done);
}

function replyWithNullOnSuccess(done) {
  ctrl.execute();

  setTimeout(() => {
    expect(data.record.destroy).toHaveBeenCalled();
    expect(data.response.json).toHaveBeenCalledWith(null);
    done();
  });
}
