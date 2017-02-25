const dummyData = require('./dummy-data');
const UpdateOneController = require('../update-one-controller');
const CrudController = require('../crud-controller');

describe('Update One Controller', () => {
  describe('definitions', () => {
    it('should extend CrudController', isDefined);
  });

  describe('implementations', () => {
    beforeEach(setup);

    it('should pass scope params to the update method', passScopeParams);

    it('should reply with a 404 if no record was updated', reply404OnNoUpdate);

    it('should reply with a generic error if the record was not saved properly', handleUnknownError);

    it('should reply with the updated record if everything went well', replyWithRecordOnSuccess);
  });
});

function isDefined() {
  expect(UpdateOneController.prototype instanceof CrudController).toBe(true);
}

let data;
let ctrl;

function setup() {
  data = dummyData();

  ctrl = new UpdateOneController(
    data.request,
    data.response,
    data.model
  );
}

function passScopeParams(done) {
  const scope = {
    fields: [ 'firstName', 'lastName' ]
  };

  ctrl = new UpdateOneController(
    data.request,
    data.response,
    data.model,
    scope
  );

  ctrl.execute();

  setTimeout(() => {
    expect(data.record.update).toHaveBeenCalledWith(
      data.record,
      scope
    );
    done();
  });
}

function reply404OnNoUpdate(done) {
  data.expects.expect404(ctrl, done);
}

function handleUnknownError(done) {
  data.expects.handleErrors(ctrl, done);
}

function replyWithRecordOnSuccess(done) {
  ctrl.execute();

  setTimeout(() => {
    expect(data.record.update).toHaveBeenCalled();
    expect(data.response.json).toHaveBeenCalledWith(data.record);
    done();
  });
}
