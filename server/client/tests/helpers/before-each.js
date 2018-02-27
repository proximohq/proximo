import $ from 'jquery';

beforeEach(() => {
  $('body').html('<div id="page-container"></div>');
  delete window.localStorage.proximo;
});
