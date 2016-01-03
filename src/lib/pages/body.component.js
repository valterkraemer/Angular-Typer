(function() {
  'use strict';

  angular
    .module('angularTyper.pages')

  .component('body', {
    transclude: false,
    controllerAs: 'vm',
    controller: function($element, $compile, $q, $templateRequest, FileSvc, ImgSvc, $timeout, bibliograpySvc, $handler, $scope, $rootScope) {
      var vm = this;

      $rootScope.vars = {
        headings: [],
        cites: []
      };

      vm.headings = [];
      vm.cites = [];

      var timeStart = new Date();
      var pageTemplate;
      var compiledHtml;

      $timeout()
        .then(loadHtml)
        .then(compileHtml)
        .then(ImgSvc.getPromises) // Wait until all images are loaded
        .then(function() {
          $timeout(function() {
            splitIntoPages();
          }, 100);
        });


      function loadHtml() {
        return $q.all([
          $templateRequest('lib/page-template.html'),
          FileSvc.getHtml(),
          bibliograpySvc.promise
        ]);
      }

      function compileHtml(data) {

        pageTemplate = data[0];
        
        //var html = '<div></div>' + data[1].join(''); // div to be able to start document without '<' character 
        var html = data[1].join('');

        if (!html) {
          console.error('No html');
          return;
        }

        compiledHtml = $compile('<div>' + html + '</div>')($rootScope)[0].childNodes; // Divs so that ng-repeat has parent element

        return $timeout;
      }

      function splitIntoPages() {

        var pageNumber = 0;
        var firstTry = false;
        var clearpage = false;

        var node = compiledHtml[0];
        var nextNode = node.nextSibling;

        while (node) {
          var pageScope = $scope.$new(true);
          pageScope.pageNumber = ++pageNumber;

          var page = $compile(pageTemplate)(pageScope)[0];

          $element.append(page);

          var inner = page.firstElementChild;

          if (clearpage) {

            angular.element(inner).append(node);
            clearpage = false;

            node = nextNode;
            if (node) {
              nextNode = node.nextSibling;
            }
          }

          fillpage:
            while (node) {
              
              angular.element(inner).append(node);

              // elements with 'clearpage' attribute will make new page
              if (node.attributes) {
                for (var j = 0; j < node.attributes.length; j++) {
                  if (node.attributes[j].name === 'clearpage') {
                    firstTry = false;
                    clearpage = true;
                    break fillpage;
                  }
                }
              }

              // Checking width to be able to support multiple columns
              if (inner.scrollHeight <= inner.clientHeight && inner.scrollWidth <= inner.clientWidth) {
                node = nextNode;
                if (node) {
                  nextNode = node.nextSibling;
                }

                firstTry = false;
                continue;
              }

              // If not a span, create a new page and append it
              if (node.nodeName !== '#text') {
                if (firstTry) {
                  $handler.warn('Element over 1 page in size');
                  return;
                }
                firstTry = true;
                break;
              }

              var clone = node.cloneNode(1);

              // Use binary search to find place were overflown
              var min = 0;
              var max = clone.length;
              var middle;

              while (min <= max) {
                middle = parseInt(min + (max - min) / 2);
                node.nodeValue = clone.nodeValue.substring(0, middle);

                if ((inner.scrollHeight > inner.clientHeight) || (inner.scrollWidth > inner.clientWidth)) {
                  max = middle - 1;
                } else {
                  min = middle + 1;
                }
              }

              // Check if breakpoint should be at space or newline character
              var lastIndex = Math.max(
                node.nodeValue.lastIndexOf(' '),
                node.nodeValue.lastIndexOf('\n')
              );

              node.nodeValue = node.nodeValue.substring(0, lastIndex);

              clone.nodeValue = clone.nodeValue.substring(lastIndex + 1);

              //compiledHtml.splice(i + 1, 0, clone);

              node = nextNode;
              if (node) {
                nextNode = node.nextSibling;
              }
              nextNode = node.nextSibling;
              firstTry = false;
              break;
            }
        }

        $rootScope.$broadcast('pagesSplitted');
        //alert(new Date() - timeStart);
      }
    }
  });

})();
