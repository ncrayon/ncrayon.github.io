var angular

angular.module('BlogApp',[
	'truncate'
])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/', {
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