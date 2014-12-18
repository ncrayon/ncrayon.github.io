var angular;

var app = angular.module('PortafolioApp',[
	'truncate', 
  'chart.js',
]);

//controllers
app.controller('SkillCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.options = {
    width: 80,
    height: 80
  };

  $scope.skill = [
    {
      imagen:"img/angular.png",
      name:"AngularJS",
      data:[
        55, 45
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(247,70,74,.9)",
        },
      ]
    },
    {
      imagen:"img/django.png",
      name:"Django & Python",
      data:[
        40, 60
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(9,46,32,.9)",
        },
      ]
    },
    {
      imagen:"img/htmlycss.png",
      name:"HTML5 & CSS3",
      data:[
        10, 90
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(228,77,38,.9)",
        },
      ]
    },
    {
      imagen:"img/less+stylus.png",
      name:"LESS & Stylus",
      data:[
        30, 70
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(179,209,7,.9)",
        },
      ]
    },
    {
      imagen:"img/js.png",
      name:"JavaScript",
      data:[
        35, 65
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(240,219,79,.9)",
        },
      ]
    },
    {
      imagen:"img/nodejs.png",
      name:"NodeJS",
      data:[
        70, 30
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(131,205,41,.9)",
        },
      ]
    },
    {
      imagen:"img/swift.png",
      name:"Swift y Desarrollo para iPhone",
      data:[
        60, 40
      ],
      labels:[
        "Falta Por Aprender", "Conocimiento"
      ],
      colours:[
        {
          strokeColor: "rgba(255,255,255,.9)",
        },
        {//cambiar
          strokeColor: "rgba(255,60,40,.9)",
        },
      ]
    },
  ];
}]);

app.controller('ContactCtrl',['$scope', '$http','$timeout', function($scope, $http, $timeout) {
    var urlBase = 'http://d3ka4gl7g4ooi1.herokuapp.com/sendmail';
    var jsonP = '&callback=JSON_CALLBACK'; 

    $scope.name = '';
    $scope.mail = '';
    $scope.msg = '';

    $scope.sendmail = function() {
      $scope.responseClass = 'flaticon-load';
      $scope.response = '';

      if($scope.name==='' || $scope.mail==='' || $scope.msg===''){
        $scope.response = 'No Deje Campos en Blanco, Por Favor';
        $scope.responseClass = 'warning';
        $timeout(function(){ 
          $scope.responseClass = 'hide';
        }, 4000);
      }else{
        $http.get(urlBase+
          '?name='+$scope.name+
          '&mail='+$scope.mail+
          '&msg='+$scope.msg,
           { cache: true}
          )
         .success(function(data){
            $scope.response = data;
            $scope.responseClass = 'success';
            $scope.name = '';
            $scope.mail = '';
            $scope.msg = '';
            $timeout(function(){ 
              $scope.responseClass = 'hide';
            }, 4000);
        })
        .error(function (data, status) {
            console.log(status);
        });
      }
    }; 

    $scope.social = [
      {
        link: 'https://twitter.com/cnelkit',
        classes: 'flaticon-twitter twitter',
      },
      {
        link: 'https://github.com/nelkit',
        classes: 'flaticon-github github',
      },
      {
        link: 'https://www.behance.net/nelkitisaef6da',
        classes: 'flaticon-behance behance',
      },
      {
        link: 'https://dribbble.com/cnelkit',
        classes: 'flaticon-dribbble dribbble',
      },
      {
        link: 'https://www.linkedin.com/pub/nelkit-chavez-calona/94/53a/b05',
        classes: 'flaticon-linkedin linkedin',
      }
    ];     
}]);

app.controller('ProjectsCtrl',['$scope', '$http','$timeout',function($scope, $http, $timeout) {
    var urlBase = 'http://d3ka4gl7g4ooi1.herokuapp.com/api/projects?min=0&max=6';
    var jsonP = '&callback=JSON_CALLBACK';   

    //funcion para cargar datos
    $scope.loadData = function() {
        $scope.responseClass = 'flaticon-loadBlog';
       
        $http.get(urlBase,{ cache: true}).success(function(data){
            $scope.projects = data;
            $scope.responseClass = 'hide';
        })
        .error(function (data, status) {
          console.log(status);
        });
    };
    $scope.loadData();
}]);





