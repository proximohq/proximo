/* globals App */

import $ from 'jquery';

import session from './services/session';
import Router from './libs/router';
import LoginPage from './pages/login/login.js';
import HomePage from './pages/home/home';

describe('App', () => {
  beforeEach(() => {
    spyOn(Router, 'page').and.callThrough();
    require('./app');
  });

  describe('the template', () => {
    beforeEach(() => {
      App.init();
    });

    it('attaches a #page-container element', () => {
      expect($('#page-container').length).toBe(1);
    });
  });

  describe('page definitions', () => {
    beforeEach(() => {
      App.init();
    });

    it('defines a login page', () => {
      expect(Router.page).toHaveBeenCalledWith('/login', LoginPage);
    });

    it('defines a home page', () => {
      expect(Router.page).toHaveBeenCalledWith('/', HomePage);
    });
  });

  describe('redirecting the user', () => {
    beforeEach(() => {
      spyOn(session, 'isLoggedIn');
      spyOn(Router, 'goTo');
    });

    describe('when the user is logged in', () => {
      beforeEach(() => {
        session.isLoggedIn.and.returnValue(true);

        App.init();
      });

      it('displays the home page', () => {
        expect(Router.goTo).toHaveBeenCalledWith('/');
      });
    });

    describe('when the user has not logged in', () => {
      beforeEach(() => {
        session.isLoggedIn.and.returnValue(false);

        App.init();
      });

      it('displays the login page', () => {
        expect(Router.goTo).toHaveBeenCalledWith('/login');
      });
    });
  });
});
