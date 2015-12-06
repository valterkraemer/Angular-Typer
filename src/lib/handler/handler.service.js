(function() {
  'use strict';

  angular
    .module('angularTyper.handler', [])
    .service('$handler', handler);

  handler.$inject = ['$log'];

  function handler($log) {
    return $log;
  }

})();
