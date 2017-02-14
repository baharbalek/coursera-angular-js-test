(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();

  buyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var buyItems = [{ name: "cookies", quantity: 10 },
                  { name: "rice", quantity: 2 },
                  { name: "pasta", quantity: 3 },
                  { name: "cake", quantity: 5 },
                  { name: "tea", quantity: 1 },
                  { name: "soap", quantity: 2 }];


  var boughtItems = [];

  service.removeItem = function (itemIdex) {

    var item = {
      name: buyItems[itemIdex].name,
      quantity: buyItems[itemIdex].quantity
    };
    boughtItems.push(item);
    buyItems.splice(itemIdex, 1);
  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
