import './login.scss';

import $ from 'jquery';

import Session from '../services/session';

export default class LoginPage {
  /**
   * Displays the Login form
   */
  show () {
    this.initDomElements();
    this.addLoginFormBindings();

    $('#page-container').empty();
    this.page.appendTo('#page-container');
  }

  /**
   * Initializes the dom elements needed by the app.
   */
  initDomElements () {
    const html = require('./login.pug')();

    this.page = $(html);
    this.loginForm = this.page.find('form.login');
  }

  /**
   * Add bindings for user authentication.
   */
  addLoginFormBindings () {
    this.loginForm.submit((event) => {
      event.preventDefault();

      const email = this.loginForm.find('[name=email]').val();
      const password = this.loginForm.find('[name=password]').val();

      Session.login(email, password)
        .then(() => this.displayLoginMessage('success'))
        .catch(() => this.displayLoginMessage('failed'));

      return false;
    });
  }

  /**
   * Displays a login success or failed message.
   *
   * @param {String} messageType either success or failed.
   */
  displayLoginMessage (messageType) {
    this.page.find(`.login-${messageType}`)
      .slideDown('slow')
      .delay(3000)
      .slideUp('slow');
  }
}
