import $ from 'jquery';

import './styles/style.scss';
import './app.scss';

import Session from './services/session';

class App {
  /**
   * Runs the initialization code necesary to attach the app to the DOM
   */
  static init () {
    const html = require('./app.pug')();
    this.app = $(html);

    this.addLoginFormBindins();

    this.app.appendTo('body');
  }

  /**
   * Add bindings for user authentication.
   */
  static addLoginFormBindins () {
    const form = this.app.find('form.login');

    form.submit((event) => {
      event.preventDefault();

      const email = form.find('[name=email]').val();
      const password = form.find('[name=password]').val();

      Session.login(email, password)
        .then(() => {
          this.app.find('.login-success')
            .slideDown('slow')
            .delay(3000)
            .slideUp('slow');
        })
        .catch(() => {
          this.app.find('.login-failed')
            .slideDown('slow')
            .delay(3000)
            .slideUp('slow');
        });
    });
  }
}

global.App = App;

export default App;
