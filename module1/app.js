(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = " ";
  $scope.inputtext = "";
  $scope.customStyle = {};

  $scope.checkInputText = function () {
      var arrayOfStrings = $scope.inputtext.split(',');
      var totalNum = calculateTotalNum(arrayOfStrings);

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

function calculateTotalNum(arrayOfStrings){
  console.log("array size:" + arrayOfStrings.length);
  console.log(arrayOfStrings);
  var totalNum = 0;
  for(var  i =0; i<arrayOfStrings.length; i++){
      if(arrayOfStrings[i].trim() != "") {
        totalNum++;
      }
  }
  console.log("totalNum:" + totalNum);
  return totalNum;
}
})();
