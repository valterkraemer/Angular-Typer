(function() {
  'use strict';

  angular
    .module('angularTyper.pages').run(runBlock);

  runBlock.$inject = ['$rootScope', '$compile', '$q', '$templateRequest', 'FileSvc', 'ImgSvc', '$timeout', 'bibliograpySvc'];

  function runBlock($rootScope, $compile, $q, $templateRequest, FileSvc, ImgSvc, $timeout, bibliograpySvc) {

    var timeStart = new Date();
    var pageTemplate;
    var compiledHtml;

    var elem = angular.element(document.body);

    $timeout()
      .then(loadHtml)
      .then(compileHtml)
      .then(ImgSvc.getPromises) // Wait until all images are loaded
      .then(function() {
        $timeout(function() {
          splitIntoPages();
        });
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
      var html = '<div></div>' + data[1].join(''); // div to be able to start document without '<' character

      if (!html) {
        console.error('No html');
        return;
      }

      compiledHtml = $compile(html)($rootScope);
      return $timeout;
    }

    function splitIntoPages() {

      var i = 0;
      var pageNumber = 0;
      var firstTry = false;

      while (i < compiledHtml.length) {

        var page = $compile(pageTemplate)($rootScope)[0];

        page.classList.add('page-' + (++pageNumber));
        elem.append(page);
        var inner = page.firstElementChild;

        while (i < compiledHtml.length) {

          angular.element(inner).append(compiledHtml[i]);

          // <clearpage></clearpage> will make new page
          if (compiledHtml[i].nodeName === 'CLEARPAGE') {
            i++;
            firstTry = false;
            break;
          }

          // Checking width to be able to support multiple columns
          if (inner.scrollHeight <= inner.clientHeight && inner.scrollWidth <= inner.clientWidth) {
            i++;
            firstTry = false;
            continue;
          }

          // If not a span, create a new page and append it
          if (compiledHtml[i].nodeName !== 'SPAN') {
            if (firstTry) {
              console.warn('Element over 1 page in size');
              return;
            }
            firstTry = true;
            break;
          }

          var clone = compiledHtml[i].cloneNode(1);

          // Use binary search to find place were overflown
          var min = 0;
          var max = clone.innerHTML.length;
          var middle;

          while (min <= max) {
            middle = parseInt(min + (max - min) / 2);
            compiledHtml[i].innerHTML = clone.innerHTML.substring(0, middle);

            if ((inner.scrollHeight > inner.clientHeight) || (inner.scrollWidth > inner.clientWidth)) {
              max = middle - 1;
            } else {
              min = middle + 1;
            }
          }

          // Check if breakpoint should be at space or newline character
          var lastIndex = Math.max(
            compiledHtml[i].innerHTML.lastIndexOf(' '),
            compiledHtml[i].innerHTML.lastIndexOf('\n')
          );

          compiledHtml[i].innerHTML = compiledHtml[i].innerHTML.substring(0, lastIndex);

          clone.innerHTML = clone.innerHTML.substring(lastIndex + 1);

          compiledHtml.splice(i + 1, 0, clone);

          i++;
          firstTry = false;
          break;
        }
      }

      $rootScope.$broadcast('pagesSplitted');

      //alert('Rendertime: ' + (new Date() - timeStart) + 'ms');

    }
  }

})();