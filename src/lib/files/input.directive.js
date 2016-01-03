(function() {
  'use strict';

  angular
    .module('angularTyper.file')
    .component('input', {
      restrict: 'A',
      bindings: {
        input: '@'
      },
      isolate: false,
      controller: function(FileSvc, $element) {
        if (this.input) {
          FileSvc.addHtmlPath(this.input);
          $element.remove();
        } else {
          console.error('Input has no path specified');
        }
      }
    });

  /*.directive('input', input);

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
  }*/

})();
