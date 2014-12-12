var angular

angular.module('BlogApp',[
	'truncate',
  'infinite-scroll',
])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/blog', {
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