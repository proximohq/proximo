/* globals App */

import $ from 'jquery';

import Router from './libs/router';
import LoginPage from './pages/login';

describe('App', () => {
  beforeEach(() => {
    spyOn(Router, 'page').and.returnValue(Router);
    require('./app');

    App.init();
  });

  it('attaches a #page-container element', () => {
    expect($('#page-container').length).toBe(1);
  });

  it('defines a login page', () => {
    expect(Router.page).toHaveBeenCalledWith('/login', LoginPage);
  });
});
