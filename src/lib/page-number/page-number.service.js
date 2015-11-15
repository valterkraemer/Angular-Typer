(function() {
  'use strict';

  angular.module('angularTyper.pageNumber')
 .service('PageNumber', PageNumber);

 function PageNumber() {

    return {
      get: function(element) {
        var el = element[0];

        while (1) {
          if (!el.parentElement) {
            console.error('Page ancestor not found');
            return;
          }

          el = el.parentElement;

          if (el.classList.contains('page')) {
            break;
          }
        }

        var pageNumber;

        for (var i = 0; i < el.classList.length; i++) {
          if (el.classList[i].indexOf('page-') === 0) {
            var items = el.classList[i].split('page-');
            pageNumber = items[1];
          }
        }

        if (!pageNumber) {
          console.error('Page ancestor did not have page number class');
          return;
        }

        return pageNumber;
      }
    };

  }

})();