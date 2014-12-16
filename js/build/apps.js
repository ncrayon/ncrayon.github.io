'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "a.m.",
      "p.m."
    ],
    "DAY": [
      "domingo",
      "lunes",
      "martes",
      "mi\u00e9rcoles",
      "jueves",
      "viernes",
      "s\u00e1bado"
    ],
    "MONTH": [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ],
    "SHORTDAY": [
      "dom",
      "lun",
      "mar",
      "mi\u00e9",
      "jue",
      "vie",
      "s\u00e1b"
    ],
    "SHORTMONTH": [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic"
    ],
    "fullDate": "EEEE, d 'de' MMMM 'de' y",
    "longDate": "d 'de' MMMM 'de' y",
    "medium": "dd/MM/yyyy HH:mm:ss",
    "mediumDate": "dd/MM/yyyy",
    "mediumTime": "HH:mm:ss",
    "short": "dd/MM/yy HH:mm",
    "shortDate": "dd/MM/yy",
    "shortTime": "HH:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20ac",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": ".",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "macFrac": 0,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "macFrac": 0,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "es-es",
  "pluralCat": function (n) {  if (n == 1) {   return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);
var angular

angular.module('BlogApp',[
	'truncate',
  'infinite-scroll',
  'viewhead',
  'ngDisqus'
])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        isActiveBlog: 'blogActive',
        isActiveProject: ''
    })
      .when('/blog/:id', {
        templateUrl: 'views/details.blog.html',
        controller: 'DetailsBlogCtrl',
        isActiveBlog: 'blogActive',
        isActiveProject: ''
    })
      .when('/projects/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        isActiveBlog: '',
        isActiveProject: 'projectActive'
    })
      .when('/projects/:id', {
        templateUrl: 'views/details.projects.html',
        controller: 'DetailsProjectsCtrl',
        isActiveBlog: '',
        isActiveProject: 'projectActive'
    })
      .otherwise({
      	redirectTo: '/blog'
    });
 })
.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.isActiveBlog = current.$$route.isActiveBlog; 
        $rootScope.isActiveProject = current.$$route.isActiveProject;
    });
}]);
'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('BlogApp')
  .controller('BlogCtrl', function ($scope, $http) {
  	var urlBase = "http://d3ka4gl7g4ooi1.herokuapp.com/api/";
  	var urlBlog = "posts/"
  	var jsonP = '?min=0&max=12';
    var postLoaded = {
      cargados: 0, 
    }
    $scope.listadoEntradas = []

  	//funcion para cargar datos
    $scope.loadData = function(min,max) {
        $scope.responseClass = 'flaticon-loadBlog';

        $http.get(urlBase + urlBlog + '?min='+min+'&max='+max, { cache: true})
        .success(function(data){
            if(data.length === 1){
              $scope.listadoEntradas.push(data[0])
            }
            $scope.responseClass = 'hide';
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData(0,1);

    $scope.pagingLoad = function() {
      var loaded = postLoaded.cargados+=1
      $scope.loadData(loaded,loaded+1);

    }
  });
'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:DetailsBlogCtrl
 * @description
 * # DetailsBlogCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('BlogApp')
  .controller('DetailsBlogCtrl', function ($scope, $routeParams, $http) {
  	var urlBase = "http://d3ka4gl7g4ooi1.herokuapp.com/api/";
  	var urlBlog = "post/";
    var jsonP = '?callback=JSON_CALLBACK';
	  var idEntrada = $scope.id = $routeParams.id;

  	//funcion para cargar datos
    $scope.loadData = function() {
        $scope.responseClass = 'flaticon-loadBlog';
        
        $http.get(urlBase + urlBlog + idEntrada, { cache: true})
        .success(function(data){
            $scope.entrada = data;
            $scope.responseClass = 'hide';
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData();
  });
'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('BlogApp')
  .controller('ProjectsCtrl', function ($scope, $http) {
  	var urlBase = "http://d3ka4gl7g4ooi1.herokuapp.com/api/";
  	var urlBlog = "projects/"
  	var jsonP = '?min=0&max=12';
    var postLoaded = {
      cargados: 0, 
    }
    $scope.projects = []

  	//funcion para cargar datos
    $scope.loadData = function(min,max) {
        $scope.responseClass = 'flaticon-loadBlog';

        $http.get(urlBase + urlBlog + '?min='+min+'&max='+max, { cache: true})
        .success(function(data){
            if(data.length === 1){
              $scope.projects.push(data[0])
            }
            $scope.responseClass = 'hide';
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData(0,1);

    $scope.pagingLoad = function() {
      var loaded = postLoaded.cargados+=1
      $scope.loadData(loaded,loaded+1);

    }
  });
'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:DetailsProjectsCtrl
 * @description
 * # DetailsProjectsCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('BlogApp')
  .controller('DetailsProjectsCtrl', function ($scope, $routeParams, $http) {
  	var urlBase = "http://d3ka4gl7g4ooi1.herokuapp.com/api/";
  	var urlBlog = "project/";
    var jsonP = '?callback=JSON_CALLBACK';
	  var idEntrada = $scope.id = $routeParams.id;

  	//funcion para cargar datos
    $scope.loadData = function() {
        $scope.responseClass = 'flaticon-loadBlog';
        
        $http.get(urlBase + urlBlog + idEntrada + jsonP, { cache: true})
        .success(function(data){
            $scope.proyectos = data;
            $scope.responseClass = 'hide';
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData();
  });
angular.module('truncate', [])
    .filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    })
    .filter('splitcharacters', function() {
        return function (input, chars) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                var prefix = input.substring(0, chars/2);
                var postfix = input.substring(input.length-chars/2, input.length);
                return prefix + '...' + postfix;
            }
            return input;
        };
    })
    .filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '…';
                }
            }
            return input;
        };
    });
/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
var mod;mod=angular.module("infinite-scroll",[]),mod.directive("infiniteScroll",["$rootScope","$window","$timeout",function(i,n,e){return{link:function(t,l,o){var r,c,f,a;return n=angular.element(n),f=0,null!=o.infiniteScrollDistance&&t.$watch(o.infiniteScrollDistance,function(i){return f=parseInt(i,10)}),a=!0,r=!1,null!=o.infiniteScrollDisabled&&t.$watch(o.infiniteScrollDisabled,function(i){return a=!i,a&&r?(r=!1,c()):void 0}),c=function(){var e,c,u,d;return d=n.height()+n.scrollTop(),e=l.offset().top+l.height(),c=e-d,u=n.height()*f>=c,u&&a?i.$$phase?t.$eval(o.infiniteScroll):t.$apply(o.infiniteScroll):u?r=!0:void 0},n.on("scroll",c),t.$on("$destroy",function(){return n.off("scroll",c)}),e(function(){return o.infiniteScrollImmediateCheck?t.$eval(o.infiniteScrollImmediateCheck)?c():void 0:c()},0)}}}]);

(function (angular, document) {

     var mod = angular.module('viewhead', []);

     mod.directive(
         'viewTitle',
         ['$rootScope', function ($rootScope) {
             return {
                 restrict: 'EA',
                 link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                     // If we've been inserted as an element then we detach from the DOM because the caller
                     // doesn't want us to have any visual impact in the document.
                     // Otherwise, we're piggy-backing on an existing element so we'll just leave it alone.
                     var tagName = iElement[0].tagName.toLowerCase();
                     if (tagName === 'view-title' || tagName === 'viewtitle') {
                         iElement.remove();
                     }

                     scope.$watch(
                         function () {
                             return iElement.text();
                         },
                         function (newTitle) {
                             $rootScope.viewTitle = newTitle;
                         }
                     );
                     scope.$on(
                         '$destroy',
                         function () {
                             delete $rootScope.viewTitle;
                         }
                     );
                 }
             };
         }]
     );

     mod.directive(
         'viewHead',
         function () {
             var head = angular.element(document.head);
             return {
                 restrict: 'A',
                 link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                     // Move the element into the head of the document.
                     // Although the physical location of the document changes, the element remains
                     // bound to the scope in which it was declared, so it can refer to variables from
                     // the view scope if necessary.
                     head.append(iElement);

                     // When the scope is destroyed, remove the element.
                     // This is on the assumption that we're being used in some sort of view scope.
                     // It doesn't make sense to use this directive outside of the view, and nor does it
                     // make sense to use it inside other scope-creating directives like ng-repeat.
                     scope.$on(
                         '$destroy',
                         function () {
                             iElement.remove();
                         }
                     );
                 }
             };
         }
     );

})(angular, document);

/* 
 * angular-disqus 1.1.0
 * http://github.com/kirstein/angular-disqus
 * 
 * Licensed under the MIT license
 */
(function (angular, window) {
  'use strict';

  var disqusModule = angular.module('ngDisqus', [ ]);

  /**
   * $disqus provider.
   */
  disqusModule.provider('$disqus', function() {
    var TYPE_EMBED = 'embed.js'; // general disqus embed script
    var TYPE_COUNT = 'count.js'; // used for count

    // Placeholder for the disqus shortname
    var shortname = 'nelkitblog';

    /**
     * @return {Element} dom element for script adding
     */
    function getScriptContainer() {
      return (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    }

    /**
     * @return {String} disqus shortname
     */
    function getShortname() {
      return shortname || window.disqus_shortname;
    }

    /**
     * @param {String} shortname disqus shortname
     * @param {String} file file name to add.
     * @return {String} disqus embed src with embedded shortname
     */
    function getScriptSrc(shortname, file) {
      return '//' + shortname + '.disqus.com/' + file;
    }

    /**
     * Builds the script tag
     *
     * @param {String} src script source
     * @return {Element} script element
     */
    function buildScriptTag(src) {
      var script = document.createElement('script');

      // Configure the script tag
      script.type  = 'text/javascript';
      script.async = true;
      script.src   = src;

      return script;
    }

    /**
     * Searches the given element for defined script tag
     * if its already there then return true. Otherwise return false
     *
     * @param {Element} element element to search within
     * @param {String} scriptSrc script src
     * @return {Boolean} true if its there, false if its not
     */
    function hasScriptTagInPlace(container, scriptSrc) {
      var scripts   = container.getElementsByTagName('script'),
      script, i;

      for (i = 0; i < scripts.length; i += 1) {
        script = scripts[i];

        // Check if the name contains the given values
        // We need to check with indexOf because browsers replace // with their protocol
        if (~script.src.indexOf(scriptSrc)) {
          return true;
        }
      }

      return false;
    }

    /**
     * Writes disqus globals to window object.
     * Needed for the first load. Otherwise the disqus wouldn't know what thread comments to load.
     *
     * @param {String} id disqus identifier
     * @param {String} url disqus url
     * @param {String} shortname disqus shortname
     */
    function setGlobals(id, url, shortname) {
      window.disqus_identifier = id;
      window.disqus_url        = url;
      window.disqus_shortname  = shortname;
    }

    /**
     * Refreshes the count from DISQUSWIDGETS.
     */
    function getCount() {
      var widgets = window.DISQUSWIDGETS;
      if (widgets && angular.isFunction(widgets.getCount)) {
        widgets.getCount();
      }
    }

    /**
     * Trigger the reset comment call
     * @param  {String} $location location service
     * @param  {String} id Thread id
     */
    function resetCommit($location, id) {
      window.DISQUS.reset({
        reload: true,
        config : function() {
          this.page.identifier = id;
          this.page.url        = $location.absUrl();
        }
      });
    }

    /**
     * Adds disqus script tag to header by its type.
     * If the script tag already exists in header then wont continue.
     *
     * Adds script tags by their type.
     * Currently we are using two types:
     *  1. count.js
     *  2. embed.js
     *
     * @param {String} shortname disqus shortname
     * @param {String} type disqus script tag type
     */
    function addScriptTag(shortname, type) {
      var container = getScriptContainer(),
      scriptSrc = getScriptSrc(shortname, type);

      // If it already has a script tag in place then lets not do anything
      // This might happen if the user changes the page faster than then disqus can load
      if (hasScriptTagInPlace(container, scriptSrc)) {
        return;
      }

      // Build the script tag and append it to container
      container.appendChild(buildScriptTag(scriptSrc));
    }


    /**
     * @param {String} sname shortname
     */
    this.setShortname = function(sname) {
      shortname = sname;
    };

    // Provider constructor
    this.$get = [ '$location', function($location) {

      /**
       * Resets the comment for thread.
       * If disqus was not defined then it will add disqus to script tags.
       * If disqus was initialized earlier then it will just use disqus api to reset it
       *
       * @param  {String} id required thread id
       */
      function commit(id) {
        var shortname = getShortname();

        if (!angular.isDefined(shortname)) {
          throw new Error('No disqus shortname defined');
        } else if (!angular.isDefined(id)) {
          throw new Error('No disqus thread id defined');
        } else if (angular.isDefined(window.DISQUS)) {
          resetCommit($location, id);
        } else {
          setGlobals(id, $location.absUrl(), shortname);
          addScriptTag(shortname, TYPE_EMBED);
        }
      }

      /**
       * Loads the comment script tag and initiates the comments.
       * Sets the globals according to the current page.
       *
       * If the embed disqus is not added to page then adds that.
       *
       * @param {String} id thread id
       */
      function loadCount(id) {
        setGlobals(id, $location.absUrl(), shortname);
        addScriptTag(getShortname(), TYPE_EMBED);
        addScriptTag(getShortname(), TYPE_COUNT);
        getCount();
      }

      // Expose public api
      return {
        commit       : commit,
        getShortname : getShortname,
        loadCount    : loadCount
      };
    }];
  });

  /**
   * Disqus thread comment directive.
   * Used to display the comments block for a thread.
   */
  disqusModule.directive('disqus', [ '$disqus', function($disqus) {

    return {
      restrict : 'AC',
      replace  : true,
      scope    : {
        id : '=disqus',
      },
      template : '<div id="disqus_thread"></div>',
      link: function link(scope) {
        scope.$watch('id', function(id) {
          if (angular.isDefined(id)) {
            $disqus.commit(id);
          }
        });
      }
    };
  }]);

  /**
   * Disqus comment count directive.
   * Just wraps `disqus-identifier` to load the disqus comments count script tag on page
   */
  disqusModule.directive('disqusIdentifier', [ '$disqus', function($disqus) {
    return {
      restrict : 'A',
      link     : function(scope, elem, attr) {
        $disqus.loadCount(attr.disqusIdentifier);
      }
    };
  }]);

})(angular, this);
