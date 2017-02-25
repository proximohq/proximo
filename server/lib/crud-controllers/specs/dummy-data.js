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

  record.update = jasmine.createSpy('update')
  .and.returnValue(Promise.resolve(record));

  record.destroy = jasmine.createSpy('destroy')
  .and.returnValue(Promise.resolve());

  model = {
    create: jasmine.createSpy('create')
    .and.returnValue(Promise.resolve(record)),

    update: jasmine.createSpy('update')
    .and.returnValue(Promise.resolve(record)),

    findOne: jasmine.createSpy('findOne')
    .and.callFake((params) => {
      if (params.where.id !== 99) return Promise.resolve(null);

      return Promise.resolve(record);
    }),

    findById: jasmine.createSpy('findById')
    .and.callFake((id) => {
      if (id !== 99) return Promise.resolve(null);

      return Promise.resolve(record);

    }),

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
    model.findOne.and.callFake(() => Promise.reject(error));
    model.create.and.callFake(() => Promise.reject(error));
    record.update.and.callFake(() => Promise.reject(error));
    record.destroy.and.callFake(() => Promise.reject(error));

    ctrl.execute();

    setTimeout(() => {
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith(error);
      done();
    });
  }

  function expect404(ctrl, done) {
    request.params.id = 200;

    ctrl.execute();

    setTimeout(() => {
      expect(response.status).toHaveBeenCalledWith(404);
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
      handleErrors,
      expect404
    }
  };
};
