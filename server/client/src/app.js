import './app.scss';

import $ from 'jquery';

import session from './services/session';
import Router from './libs/router';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';

class App {
  /**
   * Runs the initialization code necesary to attach the app to the DOM
   */
  static init () {
    this.initDomElements();
    this.addPages();
    this.handleUserWelcomePage();
  }

  static initDomElements () {
    const html = require('./app.pug')();

    $('body').html(html);
  }

  static addPages () {
    Router
      .page('/', HomePage)
      .page('/login', LoginPage)
      .init();
  }

  static handleUserWelcomePage () {
    const welcomePage = session.isLoggedIn() ? '/' : '/login';

    Router.goTo(welcomePage);
  }
}

global.App = App;
