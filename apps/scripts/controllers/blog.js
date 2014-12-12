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
  	var urlBase = "http://nichc-portfolio.herokuapp.com/api/";
  	var urlBlog = "entradas/"
  	var jsonP = '?callback=JSON_CALLBACK';

  	//funcion para cargar datos
    $scope.loadData = function() {
        $scope.responseClass = 'flaticon-loadBlog';

        $http.get(urlBase + urlBlog + jsonP, { cache: true})
        .success(function(data){
            $scope.listadoEntradas = data;
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