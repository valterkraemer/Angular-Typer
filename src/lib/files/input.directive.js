(function() {
  'use strict';

  angular
    .module('angularTyper.file')
    .directive('input', input);

  input.$inject = ['FileSvc'];

  function input(FileSvc) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        if (attrs.input) {
          FileSvc.addHtmlPath(attrs.input);
          elem.remove();
        } else {
          console.error('Input has no path specified');
        }
      }
    };
  }

})();