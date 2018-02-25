import $ from 'jquery';

beforeEach(() => {
  $('body').empty();
  delete window.localStorage.proximo;
});
