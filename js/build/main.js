var angular;

var app = angular.module('PortafolioApp',[
	'truncate', 
  'chart.js',
]);

//controllers
app.controller('SkillCtrl', function($scope, $http) {
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

});
angular.module('truncate', [])
    .filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    })
    .filter('splitcharacters', function() {
        return function (input, chars) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                var prefix = input.substring(0, chars/2);
                var postfix = input.substring(input.length-chars/2, input.length);
                return prefix + '...' + postfix;
            }
            return input;
        };
    })
    .filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '…';
                }
            }
            return input;
        };
    });
(function () {
  "use strict";

  Chart.defaults.global.responsive = true;
  Chart.defaults.global.multiTooltipTemplate = "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>";

  Chart.defaults.global.colours = [
    { // light grey
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,0.8)"
    },    
    { // red
      fillColor: "rgba(247,70,74,0.2)",
      strokeColor: "rgba(247,70,74,1)",
      pointColor: "rgba(247,70,74,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(247,70,74,0.8)"
    },
    { // blue
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,0.8)"
    },
    { // green
      fillColor: "rgba(70,191,189,0.2)",
      strokeColor: "rgba(70,191,189,1)",
      pointColor: "rgba(70,191,189,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(70,191,189,0.8)"
    },
    { // yellow
      fillColor: "rgba(253,180,92,0.2)",
      strokeColor: "rgba(253,180,92,1)",
      pointColor: "rgba(253,180,92,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(253,180,92,0.8)"
    },
    { // grey
      fillColor: "rgba(148,159,177,0.2)",
      strokeColor: "rgba(148,159,177,1)",
      pointColor: "rgba(148,159,177,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(148,159,177,0.8)"
    },
    { // dark grey
      fillColor: "rgba(77,83,96,0.2)",
      strokeColor: "rgba(77,83,96,1)",
      pointColor: "rgba(77,83,96,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(77,83,96,1)"
    }
  ];

  angular.module("chart.js", [])
    .directive("chartBase", function () { return chart(); })
    .directive("chartLine", function () { return chart('Line'); })
    .directive("chartBar", function () { return chart('Bar'); })
    .directive("chartRadar", function () { return chart('Radar'); })
    .directive("chartDoughnut", function () { return chart('Doughnut'); })
    .directive("chartPie", function () { return chart('Pie'); })
    .directive("chartPolarArea", function () { return chart('PolarArea'); });

  function chart (type) {
    return {
      restrict: 'CA',
      scope: {
        data: '=',
        labels: '=',
        options: '=',
        series: '=',
        colours: '=',
        chartType: '=',
        legend: '@',
        click: '='
      },
      link: function (scope, elem, attrs) {
        var chart, container = document.createElement('div');
        container.className = 'chart-container';
        elem.replaceWith(container);
        container.appendChild(elem[0]);

        if (typeof G_vmlCanvasManager === 'object' && G_vmlCanvasManager !== null) {
          if (typeof G_vmlCanvasManager.initElement === 'function') {
              G_vmlCanvasManager.initElement(elem[0]);
          }
        }

        scope.$watch('data', function (newVal, oldVal) {
          if (! newVal || ! newVal.length || (hasDataSets(type) && ! newVal[0].length)) return;
          var chartType = type || scope.chartType;
          if (! chartType) return;

          if (chart) {
            if (canUpdateChart(chartType, newVal, oldVal)) return updateChart(chart, chartType, newVal, scope);
            chart.destroy();
          }

          chart = createChart(chartType, scope, elem);
        }, true);

        scope.$watch('chartType', function (newVal, oldVal) {
          if (! newVal) return;
          if (chart) chart.destroy();
          chart = createChart(newVal, scope, elem);
        });
      }
    };
  }

  function canUpdateChart(type, newVal, oldVal) {
    if (newVal && oldVal && newVal.length && oldVal.length) {
      return hasDataSets(type) ?
        newVal.length === oldVal.length && newVal[0].length === oldVal[0].length :
        newVal.length === oldVal.length;
    }
    return false;
  }

  function createChart (type, scope, elem) {
    var cvs = elem[0], ctx = cvs.getContext("2d");
    var data = hasDataSets(type) ?
      getDataSets(scope.labels, scope.data, scope.series || [], scope.colours) :
      getData(scope.labels, scope.data, scope.colours);
    var chart = new Chart(ctx)[type](data, scope.options || {});
    if (scope.click) {
      cvs.onclick = function (evt) {
        if (chart.getPointsAtEvent || chart.getSegmentsAtEvent) {
          var activePoints = hasDataSets(type) ? chart.getPointsAtEvent(evt) : chart.getSegmentsAtEvent(evt);
          scope.click(activePoints, evt);
        }
      };
    }
    if (scope.legend) setLegend(elem, chart);
    return chart;
  }

  function setLegend (elem, chart) {
    var $parent = elem.parent(),
        $oldLegend = $parent.find('chart-legend'),
        legend = '<chart-legend>' + chart.generateLegend() + '</chart-legend>';
    if ($oldLegend.length) $oldLegend.replaceWith(legend);
    else $parent.append(legend);
  }

  function updateChart (chart, type, values, scope) {
    if (hasDataSets(type)){
        chart.datasets.forEach(function (dataset, i) {
          if (scope.colours) updateColours(dataset, scope.colours[i]);
          (dataset.points || dataset.bars).forEach(function (dataItem, j) {
            dataItem.value = values[i][j];
          });
      });
    } else {
      chart.segments.forEach(function (segment, i) {
        segment.value = values[i];
        if (scope.colours) updateColours(segment, scope.colours[i]);
      });
    }
    chart.update();
  }

  function updateColours (item, colour) {
    item.fillColor = colour.fillColor;
    item.highlightColor = colour.highlightColor;
    item.strokeColor = colour.strokeColor;
    item.pointColor = colour.pointColor;
    item.pointStrokeColor = colour.pointStrokeColor;
  }

  function hasDataSets (type) {
    return ['Line', 'Bar', 'Radar'].indexOf(type) > -1;
  }

  function getDataSets (labels, data, series, colours) {
    colours = colours || Chart.defaults.global.colours;
    return {
      labels: labels,
      datasets: data.map(function (item, i) {
        var dataSet = clone(colours[i]);
        dataSet.label = series[i];
        dataSet.data = item;
        return dataSet;
      })
    };
  }

  function clone (obj) {
    var newObj = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) newObj[key] = obj[key];
    }
    return newObj;
  }

  function getData (labels, data, colours) {
    colours = colours || Chart.defaults.global.colours;
    return labels.map(function (label, i) {
      return {
        label: label,
        value: data[i],
        color: colours[i].strokeColor,
        highlight: colours[i].pointHighlightStroke
      };
    });
  }

})();
