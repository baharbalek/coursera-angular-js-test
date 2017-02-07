(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('DIController', DIController);

DIController.$inject = ['$scope'];
function DIController($scope) {
  $scope.message = " ";
  $scope.inputtext = "";
  $scope.customStyle = {};

  $scope.LunchCheckController = function () {

  var space = "";
  var comma = ',';

  var arrayOfStrings = $scope.inputtext.split(comma);

  console.log("array size:" + arrayOfStrings.length);
  console.log(arrayOfStrings);
  var totalNum = 0;
  for(var  i =0; i<arrayOfStrings.length; i++){
      if(arrayOfStrings[i].trim() != space) {
        totalNum++;
      }
  }
  console.log("totalNum:" + totalNum);
  if(totalNum <= 0) {
    $scope.message = "Please enter data first";
    $scope.customStyle.style = {"color":"red", "border-color":"red" , "border":"1px solid"};
  }
  else if(totalNum <= 3) {
    $scope.message = "Enjoy!";
    $scope.customStyle.style = {"color":"green","border-color":"green" , "border":"1px solid"};
  }
  else {
    $scope.message = "Too much!";
    $scope.customStyle.style = {"color":"green","border-color":"green", "border":"1px solid"};
  }
};
}

})();
