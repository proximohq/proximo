import './styles/style.scss';
import $ from 'jquery';

(function () {
  var html = require('./app.pug')();

  $('body').html(html);
})();
