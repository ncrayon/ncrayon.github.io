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
        $http.get(urlBase + urlBlog + jsonP)
        .success(function(data){
            $scope.listadoEntradas = data;
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData();
  });