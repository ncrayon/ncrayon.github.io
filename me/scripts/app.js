var angular

angular.module('PortafolioApp',[
	'truncate'
])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
      .when('/blog/', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
      .when('/blog/:id', {
        templateUrl: 'views/details.blog.html',
        controller: 'DetailsBlogCtrl'
    })
      .otherwise({
      	redirectTo: '/'
    });
 });