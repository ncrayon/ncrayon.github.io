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
        metaDescription: 'blog donde comparto algunos de mis conocimientos en backend, frontend, UX y UI asi como de desarrollo para moviles',
        metaKeywords: 'desarrollo,django,angularjs,moviles,frontend,backend,ui,ux',
        isActiveBlog: 'blogActive',
        isActiveProject: '0'
    })
      .when('/blog/:id', {
        templateUrl: 'views/details.blog.html',
        controller: 'DetailsBlogCtrl',
        metaDescription: 'blog donde comparto algunos de mis conocimientos en backend, frontend, UX y UI asi como de desarrollo para moviles',
        metaKeywords: 'desarrollo,django,angularjs,moviles,frontend,backend,ui,ux',
        isActiveBlog: 'blogActive',
        isActiveProject: '0'
    })
      .when('/projects/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        metaDescription: 'Todos mis Proyectos Realizados a lo largo de mi vida profesional',
        metaKeywords: 'desarrollo,django,angularjs,moviles,frontend,backend,ui,ux',
        isActiveBlog: '0',
        isActiveProject: 'projectActive'
    })
      .when('/projects/:id', {
        templateUrl: 'views/details.projects.html',
        controller: 'DetailsProjectsCtrl',
        metaDescription: 'Todos mis Proyectos Realizados a lo largo de mi vida profesional',
        metaKeywords: 'desarrollo,django,angularjs,moviles,frontend,backend,ui,ux',
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
        $rootScope.metaDescription = current.$$route.metaDescription; 
        $rootScope.metaKeywords = current.$$route.metaKeywords;
    });
}])
.filter('unsafe', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);