'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('PortafolioApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });