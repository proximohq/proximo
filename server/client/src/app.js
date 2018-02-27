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

  /**
   * Attaches the App template to the body.
   */
  static initDomElements () {
    const html = require('./app.pug')();

    $('body').html(html);
  }

  /**
   * Defines all the pages that are part of this app.
   */
  static addPages () {
    Router
      .page('/', HomePage)
      .page('/login', LoginPage)
      .init();
  }

  /**
   * Redirects the user to the home page or the login page depending
   * if they are logged in or not.
   */
  static handleUserWelcomePage () {
    const welcomePage = session.isLoggedIn() ? '/' : '/login';

    Router.goTo(welcomePage);
  }
}

global.App = App;
