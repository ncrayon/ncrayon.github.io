var angular

angular.module('PortafolioApp',[])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    }).otherwise({
      redirectTo: '/'
    });
 });