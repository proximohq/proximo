import $ from 'jquery';
import config from 'config';
import storage from './storage';

export default {
  /**
   * Logins the user using the given email and password. The result is stored
   * in a session storage.
   *
   * @param {String} email
   * @param {String} password
   * @return {Promise} resolves to nothing after the login has been completed successfully.
   */
  login: function login (email, password) {
    return $.ajax({
      type: 'POST',
      url: `${config.api.BASE_URL}/auth/login`,
      data: { email, password }
    })
    .then((response) => {
      storage.set('session', response);
    });
  },

  isLoggedIn: function () {
    const sessionStorage = storage.get('session');

    return !!sessionStorage;
  }
};
