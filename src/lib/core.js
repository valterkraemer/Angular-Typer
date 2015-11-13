(function() {
  'use strict';

  angular.module('angularTyper.core', [])

  .directive('angularTyper', function($compile, $q, $templateRequest, $timeout, config, fetchFiles, tableOfContentsSvc, bibliograpySvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {

        scope.headingNumbers = {
          h1: 0,
          h2: 0,
          h3: 0,
          h4: 0,
          h5: 0
        };

        var promises = [
          $templateRequest('lib/page-template.html'),
          fetchFiles.html(config.parts)
        ];

        $q.all(promises).then(function(data) {

          var pageTemplate = data[0];
          var html = data[1].join('');

          var content = $compile(html)(scope);
          scope.headings = tableOfContentsSvc.getHeadings();
          scope.cites = bibliograpySvc.getCites();

          var i = 0;

          $timeout(function() {

            while (i < content.length) {
              var page = $compile(pageTemplate)(scope);
              elem.append(page);
              page = page.children();

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

        });

      }
    };
  });

})();