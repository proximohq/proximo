import $ from 'jquery';

import Login from './login';
import Session from '../../services/session';

describe('Login', () => {
  const email = 'info@example.com';
  const password = 'password';

  beforeEach(() => {
    new Login().show();

    $('form.login [name=email]').val(email);
    $('form.login [name=password]').val(password);
  });

  it('defines a login form inside the #page-container', () => {
    expect($('#page-container > .login-page form.login').length).toBe(1);
  });

  it('has a hidden login message', () => {
    expect($('.login-success').length).toBe(1);
    expect($('.login-success').is(':visible')).toBe(false);
  });

  it('has a hidden login failed message', () => {
    expect($('.login-failed').length).toBe(1);
    expect($('.login-failed').is(':visible')).toBe(false);
  });

  describe('when submitting the login form', () => {
    beforeEach(() => {
      spyOn(Session, 'login').and.returnValue(Promise.resolve());

      $('form.login').submit();
    });

    it('sends the form values to the Session service', () => {
      expect(Session.login).toHaveBeenCalledWith(email, password);
    });
  });

  describe('when the login was successful', () => {
    beforeEach((done) => {
      spyOn(Session, 'login').and
        .returnValueAndWaitForPromise(done);

      $('form.login').submit();
    });

    it('displays a login sucess message', () => {
      expect($('.login-success').is(':visible')).toBe(true);
    });
  });

  describe('when the login was not successful', () => {
    beforeEach((done) => {
      spyOn(Session, 'login').and
        .returnValueAndWaitForPromise(done, Promise.reject());

      $('form.login').submit();
    });

    it('displays a login failed message', () => {
      expect($('.login-failed').is(':visible')).toBe(true);
    });
  });
});
