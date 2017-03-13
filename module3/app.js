(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .factory('FoundListFactory', FoundListFactory)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'

    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;


  list.foundAny = function () {
    if (list.found == undefined)
    return false;
    else if(list.found.length > 0)
      return false;
    else return true;
  }

}

NarrowItDownController.$inject = ['FoundListFactory','$scope'];
function NarrowItDownController(FoundListFactory,$scope){
  var list = this;
  var foundList = FoundListFactory();

  list.narrowIt = function(){
    var searchTerm = $scope.searchTerm;
    console.log("searchTerm", searchTerm);
    var fullMenuArray = foundList.getMenuItems();

    fullMenuArray.then(function (response) {
      foundList.initialize();
      var fullMenuArray = response.data.menu_items;
      console.log(fullMenuArray);
      if(searchTerm != "") {
        var i;
        for (i = 0; i < fullMenuArray.length; i++) {
          if (fullMenuArray[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundList.addItem(fullMenuArray[i]);
          }
        }
      }
      list.found = foundList.getItems();
      console.log("list.foundAny" , list.foundAny);
      console.log("foundList", foundList);
      console.log("list.found", list.found);
      })
        .catch(function (error) {
          console.log("Something went terribly wrong");
        });
  }

  list.removeItem = function (itemIndex) {
    foundList.removeItem(itemIndex);
};

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function FoundListFactory($http, ApiBasePath) {
  var factory = function () {
    return new MenuSearchService($http, ApiBasePath);
  };

  return factory;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;
  // List of found items
  var items = [];

  service.getMenuItems = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

    service.getItems = function () {
      return items;
    };

    service.addItem = function (item) {
      items.push(item);
    }

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    }

    service.initialize = function () {
      items = [];
    }


  };
})();
