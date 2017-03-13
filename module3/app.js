(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.factory('FoundListFactory', FoundListFactory)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html'
    // scope: {
    //   found: '<',
    //   onRemove: '&'
    // },
    // controller: FoundItemsDirectiveController,
    // controllerAs: 'list',
    // bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

}

NarrowItDownController.$inject = ['FoundListFactory','$scope'];
function NarrowItDownController(FoundListFactory,$scope){
  var list = this;
  var foundList = FoundListFactory();

  list.found = foundList.getItems();

  list.narrowIt = function(){
    var fullMenuArray = foundList.getMatchedMenuItems();


    fullMenuArray.then(function(response){
      var fullMenuArray = response.data.menu_items;

      console.log(fullMenuArray);
      var i;
      // var found = [];
      for(i = 0; i<fullMenuArray.length;i++){
        if(fullMenuArray[i].description.toLowerCase().indexOf($scope.searchTerm) !== -1){
          foundList.push(fullMenuArray[i]);
        }

      }
      // list.found = found;
      console.log(foundList);
      // console.log(found);
    })
    .catch(function(error){
      console.log("Something went terribly wrong");
    });
  }

  list.removeItem = function (itemIndex) {
    foundList.removeItem(itemIndex);
};

}

function FoundListFactory() {
  var factory = function () {
    return new MenuSearchService();
  };

  return factory;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;
  // List of found items
  var items = [];

  service.getMatchedMenuItems = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

    service.getItems = function () {
      return items;
    };

    service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
}
})();
