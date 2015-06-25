'use strict';

/**
 * @ngdoc function
 * @name xebiaApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the xebiaApp
 */
angular.module('xebiaApp')
  .controller('CartCtrl', function ($scope, $location, apiXebia, Cart) {
    var cart = Cart.getAllCart();

    if(cart.books.length == 0 || cart == undefined) $location.url("/about");
    $scope.cart = Cart;

    $scope.showLibrary = function(){
      $location.url("/");
    };
  });
