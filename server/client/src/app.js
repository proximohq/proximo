import $ from 'jquery';

import './styles/style.scss';
import './app.scss';

import Session from './services/session';

class App {
  /**
   * Runs the initialization code necesary to attach the app to the DOM
   */
  static init () {
    this.initDomElements();
    this.addLoginFormBindins();

    this.app.appendTo('body');
  }

  /**
   * Initializes the dom elements needed by the app.
   */
  static initDomElements () {
    const html = require('./app.pug')();

    this.app = $(html);
    this.loginForm = this.app.find('form.login');
  }

  /**
   * Add bindings for user authentication.
   */
  static addLoginFormBindins () {
    this.loginForm.submit((event) => {
      event.preventDefault();

      const email = this.loginForm.find('[name=email]').val();
      const password = this.loginForm.find('[name=password]').val();

      Session.login(email, password)
        .then(() => this.displayLoginMessage('success'))
        .catch(() => this.displayLoginMessage('failed'));
    });
  }

  /**
   * Displays a login success or failed message.
   *
   * @param {String} messageType either success or failed.
   */
  static displayLoginMessage (messageType) {
    this.app.find(`.login-${messageType}`)
      .slideDown('slow')
      .delay(3000)
      .slideUp('slow');
  }
}

global.App = App;

export default App;
