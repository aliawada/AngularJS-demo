/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

 try {
 	window.$ = window.jQuery = require('jquery');
 } catch (e) {}

/**
 * Dependencies
 */
 require('angular');
 require('ui-bootstrap4');
 require('./app.module');
 require('./controllers/index.controller');
 require('./modals/people.modal');
 require('./directives/modal.directive');

