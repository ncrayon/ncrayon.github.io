var angular

var app = angular.module('PortafolioApp',[
	'truncate', 
  'chart.js',
]);

//controllers
app.controller('SkillCtrl', function($scope, $http) {
  $scope.options = {
    width: 80,
    height: 80
  }

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

});