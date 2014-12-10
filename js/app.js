var angular

var app = angular.module('PortafolioApp',[
	'truncate', 
  'angular.directives-chartjs-doughnut',
]);

//controllers
app.controller('MainCtrl', function($scope) {
  $scope.doughnutData = [
    {habilidad: [
      {value: 30, color:"#F7464A"},
      {value : 50, color : "#E2EAE9"}
    ]},
    {habilidad: [
      {value: 30, color:"#000"},
      {value : 50, color : "#E2EAE9"}
    ]},
  ]
});