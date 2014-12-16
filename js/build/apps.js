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
  'ngRoute',
  'ngDisqus',
	'truncate',
  'infinite-scroll',
  'viewhead',
])
.config(function ($routeProvider,$disqusProvider, $locationProvider) {
    $disqusProvider.setShortname('nelkitblog'); // Configure the disqus shortname
    $locationProvider.hashPrefix('!'); 
    /* rutas */
    $routeProvider
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        isActiveBlog: 'blogActive',
        isActiveProject: '0'
    })
      .when('/blog/:id', {
        templateUrl: 'views/details.blog.html',
        controller: 'DetailsBlogCtrl',
        isActiveBlog: 'blogActive',
        isActiveProject: '0'
    })
      .when('/projects/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        isActiveBlog: '0',
        isActiveProject: 'projectActive'
    })
      .when('/projects/:id', {
        templateUrl: 'views/details.projects.html',
        controller: 'DetailsProjectsCtrl',
        isActiveBlog: '0',
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
}])
.filter('unsafe', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
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
	  $scope.id = $routeParams.id;

  	//funcion para cargar datos
    $scope.loadData = function() {
        $scope.responseClass = 'flaticon-loadBlog';
        
        $http.get(urlBase + urlBlog + $scope.id + jsonP, { cache: true})
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
        
        $http.get(urlBase + urlBlog + idEntrada, { cache: true})
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
(function () {
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
})();
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
