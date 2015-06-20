var app = angular.module('color', []);

app.controller('mainController', function($scope) {
  var initialColor = '#ff0000';
  $scope.colors = {
    a: initialColor,
    b: Lib.colorToBlind(initialColor),
  };
  $scope.colorChange = function(){
    $scope.colors.b = Lib.colorToBlind($scope.colors.a);
  };
});