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
        $scope.colorChange = function(){
          try {
            $scope.output = Lib.colorToBlind($scope.input);
          } catch (e) {}
        };

        // init
        $scope.input = '#ff0000';
        $('input#minicolors').minicolors({
          defaultValue: $scope.input, // for plug-in default before ng binding
        });
        $scope.colorChange();
      },
  };
});
