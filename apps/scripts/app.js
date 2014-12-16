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