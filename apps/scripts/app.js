var angular

angular.module('BlogApp',[
	'truncate',
  'infinite-scroll',
  'viewhead'
])
.config(function ($routeProvider) {
    /* rutas */
    $routeProvider
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        title: 'Blog de UI/UX, Front End & Back End Developer',
        isActiveBlog: 'blogActive',
        isActiveProject: ''
    })
      .when('/blog/:id', {
        templateUrl: 'views/details.blog.html',
        controller: 'DetailsBlogCtrl',
        title: 'Blog de UI/UX, Front End & Back End Developer',
        isActiveBlog: 'blogActive',
        isActiveProject: ''
    })
      .when('/projects/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        title: 'Mis Proyectos',
        isActiveBlog: '',
        isActiveProject: 'projectActive'
    })
      .when('/projects/:id', {
        templateUrl: 'views/details.projects.html',
        controller: 'DetailsProjectsCtrl',
        title: 'Mis Proyectos',
        isActiveBlog: '',
        isActiveProject: 'projectActive'
    })
      .otherwise({
      	redirectTo: '/blog'
    });
 })
.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.isActiveBlog = current.$$route.isActiveBlog; 
        $rootScope.isActiveProject = current.$$route.isActiveProject;
    });
}]);