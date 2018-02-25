beforeEach(() => {
  jasmine.addSpyStrategy('returnValueAndWaitForPromise', function afterPromiseIsDone (done, value) {
    return function fakeFunction () {
      return {
        then: (callback) => {
          callback();
          done();

          return value && Promise.resolve(value) || Promise.resolve();
        }
      };
    };
  });
});
