import './styles/style.scss';
import $ from 'jquery';

const API_BASE_URL = 'http://localhost:3000/api';

(function () {
  var html = require('./app.pug')();
  var app = $(html);

  app.find('form').submit(function (e) {
    e.preventDefault();

    var form = $(this);
    var email = form.find('[name=email]').val();
    var password = form.find('[name=password]').val();

    login()
      .then(storeAuthData);

    function login () {
      return $.ajax({
        type: 'POST',
        url: `${API_BASE_URL}/auth/login`,
        data: { email, password }
      });
    }

    function storeAuthData (response) {
      let storage = window.localStorage.proximo &&
        JSON.parse(window.localStorage.proximo) || {};

      storage.user = response.data.user;
      storage.token = response.token;
      console.log(storage);

      window.localStorage.proximo = JSON.stringify(storage);
    }
  });

  app.appendTo('body');
})();
