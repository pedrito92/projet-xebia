'use strict';

/**
 * @ngdoc function
 * @name xebiaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xebiaApp
 */
angular.module('xebiaApp')
  .controller('LibraryCtrl', function ($scope, $location, apiXebia, Cart) {

    $scope.books = [];
    $scope.disabled = false;
    $scope.cart = Cart;

    $scope.showCart = function () {
      $location.url("/cart");
    };

    apiXebia.getBooks.then(function (data) {
      $scope.books = data.data;
    });
  });
