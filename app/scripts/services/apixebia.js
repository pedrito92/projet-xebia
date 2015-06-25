'use strict';

/**
 * @ngdoc service
 * @name xebiaApp.apiXebia
 * @description
 * # apiXebia
 * Factory in the xebiaApp.
 */
angular.module('xebiaApp')
  .factory('apiXebia', function ($http) {

    var getBooks = $http.get("http://henri-potier.xebia.fr/books").success(function (data) {
      return data;
    });

    var getCustomersOrders = function (isbn) {
      console.log("http://henri-potier.xebia.fr/books/"+isbn+"/commercialOffers");
      return $http.get("http://henri-potier.xebia.fr/books/"+isbn+"/commercialOffers")
    };

    // Public API here
    return {
      getBooks : getBooks,
      getCustomersOrders: getCustomersOrders
    };
  });
