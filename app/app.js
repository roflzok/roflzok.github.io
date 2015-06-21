var app = angular.module('color', []);

app.controller('mainController', function($scope) {
  $scope.colorPairs = [0];
  $scope.addPair = function() {
    $scope.colorPairs.push($scope.colorPairs.length);
  };
});

app.directive('colorPair', function() {
  return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'app/templates/color-pair.html',
      link: function($scope, elem, attrs) {
        var init = function(){
          $scope.input = '#ff0000';
          elem.find('#minicolors').minicolors({
            defaultValue: $scope.input, // for plug-in default before ng binding
          });
          $scope.colorChange();
        };
                
        $scope.colorChange = function(fallback){
          try {
            $scope.output = Lib.colorToBlind($scope.input);
            $scope.assessment = Lib.colorAssessment($scope.input, $scope.output);
          } catch (e) {
            if (fallback) {
              console.log('re-init!');
              init();
            }
          }
        };

        init();
      },
  };
});

app.directive('colorBlock', function() {
  return {
      restrict: 'E',
      replace: true,
      scope: {
        ngModel: '=',
        onClick: '=',
      },
      template: '<div class="color-block" style="background-color:{{ngModel}}"></div>',
      link: function($scope, elem, attrs) {},
  };
});
