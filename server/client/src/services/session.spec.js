import $ from 'jquery';
import config from 'config';

import session from './session';
import storage from './storage';

const sessionData = {
  data: {
    user: { firstName: 'Jon', lastName: 'Snow', email: 'j.snow@example.com' }
  },
  token: '123.abc.456'
};

describe('Session', () => {
  describe('Login', () => {
    const email = 'info@example.com';
    const password = 'password';

    beforeEach(function () {
      spyOn($, 'ajax');
      spyOn(storage, 'set');
    });

    describe('when the login was successful', () => {
      beforeEach((done) => {
        $.ajax.and.returnValue(Promise.resolve(sessionData));

        session.login(email, password)
          .then(done);
      });

      it('calls the login endpoint', () => {
        expect($.ajax).toHaveBeenCalledWith({
          type: 'POST',
          url: `${config.api.BASE_URL}/auth/login`,
          data: { email, password }
        });
      });

      it('stores the session data in local storage', () => {
        expect(storage.set).toHaveBeenCalledWith('session', sessionData);
      });
    });

    describe('when the email is not right', () => {
      let returnedError;
      const expectedError = {
        code: 'USER_NOT_FOUND'
      };

      beforeEach((done) => {
        $.ajax.and.returnValue(Promise.reject(expectedError));

        session.login(email, password)
          .catch((error) => { returnedError = error; })
          .finally(done);
      });

      it('rejects the promise with a user not found error code', () => {
        expect(returnedError).toBe(expectedError);
      });
    });
  });

  describe('isLoggedIn', () => {
    let result;

    describe('when the user has logged in', () => {
      beforeEach(() => {
        storage.set('session', sessionData);

        result = session.isLoggedIn();
      });

      it('returns true', () => {
        expect(result).toBe(true);
      });
    });

    describe('when the user has not logged in', () => {
      beforeEach(() => {
        result = session.isLoggedIn();
      });

      it('returns false', () => {
        expect(result).toBe(false);
      });
    });
  });
});
