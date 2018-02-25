import $ from 'jquery';
import config from 'config';
import storage from './storage';

export default {
  login: function login (email, password) {
    return $.ajax({
      type: 'POST',
      url: `${config.api.BASE_URL}/auth/login`,
      data: { email, password }
    })
    .then((response) => {
      storage.set('session', response);
    });
  }
};
