var angular

angular.module('PortafolioApp',[])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
    })
      .otherwise({
      	redirectTo: '/'
    });
 });