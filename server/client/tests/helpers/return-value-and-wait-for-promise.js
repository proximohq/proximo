beforeEach(() => {
  /**
   * Implements a spy strategy that allows to test what happens after a promise
   * ran source file code and is done. Useful to test outcomes of promises that
   * are executed in the source file but are not returned so the test file has no
   * access to it.
   *
   * @param {Function} done the function that determines the tests should continue executing.
   * @param {*} value An optional value to return to the promise chain.
   * @return {function} the spy strategy function.
   */
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
