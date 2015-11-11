(function() {
  'use strict';

  angular.module('angularTyper.pageSplitter', [])

  .directive('angularTyper', function($timeout, fetchFiles, $compile, config, $templateRequest, $q) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {

        var startTimestamp = new Date();
        var pageNumber = 0;

        var page;

        var promises = [
          $templateRequest('lib/page-template.html'),
          fetchFiles.html(config.parts)
        ];

        $q.all(promises).then(function(data) {
          var pageTemplate = data[0];

          var html = data[1].join();
          var content = $compile(html)(scope);

          var i = 0;

          $timeout(function() {
            while (i < content.length) {
              var pageScope = scope.$new(false, scope);
              page = $compile(pageTemplate)(pageScope);
              elem.append(page);
              page = page.children();
              pageNumber++;
              pageScope.pageNumber = pageNumber;
              scope.totPages = pageNumber;

              while (i < content.length) {

                angular.element(page[0]).append(content[i]);

                // <clearpage></clearpage> will make new page
                if (content[i].nodeName === 'CLEARPAGE') {
                  i++;
                  break;
                }

                if (page[0].scrollHeight <= page[0].clientHeight) {
                  i++;
                  continue;
                }

                // If not a span, create a new page and append it
                if (content[i].nodeName !== 'SPAN') {
                  break;
                }

                var clone = content[i].cloneNode(1);
                content[i].innerHTML = '';

                var min = 0;
                var max = clone.innerHTML.length;
                var middle;

                while (min <= max) {
                  middle = parseInt(min + (max - min) / 2);
                  content[i].innerHTML = clone.innerHTML.substring(0, middle);

                  if (page[0].scrollHeight > page[0].clientHeight) {
                    max = middle - 1;
                  } else {
                    min = middle + 1;
                  }
                }

                var lastIndex = content[i].innerHTML.lastIndexOf(' ');
                content[i].innerHTML = content[i].innerHTML.substring(0, lastIndex);

                clone.innerHTML = clone.innerHTML.substring(lastIndex + 1);

                content.splice(i + 1, 0, clone);

                i++;
                break;
              }

            }
          });


          //alert('Pages: ' + pageNumber + ', time: ' + (new Date() - startTimestamp));
        });

      }
    };
  });

})();
