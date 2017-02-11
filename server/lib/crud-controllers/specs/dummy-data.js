module.exports = function() {
  let request;
  let response;
  let model;
  let record;
  let list;
  let error;

  list = ['a', 'b', 'c'];

  record = {
    firstName: 'Jon',
    lastName: 'Snow',
    job: 'commander of the wall'
  };

  model = {
    create: jasmine.createSpy('create')
    .and.returnValue(Promise.resolve(record)),

    findOne: jasmine.createSpy('findOne')
    .and.returnValue(Promise.resolve(record)),

    findAndCountAll: jasmine.createSpy('findAndCountAll')
    .and.returnValue(Promise.resolve({
      count: list.length,
      rows: list
    }))
  };

  request = { query: {}, body: record, params: { id: 99 } };
  response = {};

  response.status = jasmine.createSpy('status')
  .and.returnValue(response);

  response.json = jasmine.createSpy('json')
  .and.returnValue(response);

  error = {
    name: 'SomeUnknownError',
    message: 'Some Unknown Error',
    errors: [ 'Error1', 'Error2', 'Error3' ]
  };

  function handleErrors(ctrl, done) {
    model.findOne.and.returnValue(Promise.reject(error));
    model.create.and.returnValue(Promise.reject(error));

    ctrl.execute();

    setTimeout(() => {
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith(error);
      done();
    });
  }

  return {
    request,
    response,
    model,
    record,
    list,
    error,
    expects: {
      handleErrors
    }
  };
};
