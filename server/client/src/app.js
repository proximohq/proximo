import './app.scss';

import $ from 'jquery';

import Router from './libs/router';
import LoginPage from './pages/login';

class App {
  /**
   * Runs the initialization code necesary to attach the app to the DOM
   */
  static init () {
    this.initDomElements();
    this.addPages();
  }

  static initDomElements () {
    const html = require('./app.pug')();

    $('body').html(html);
  }

  static addPages () {
    Router
      .page('/login', LoginPage)
      .init();
  }
}

global.App = App;
