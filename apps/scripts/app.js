var angular

angular.module('BlogApp',[
	'truncate',
  'infinite-scroll',
  'viewhead',
  'ngDisqus'
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