'use strict';

/**
 * @ngdoc overview
 * @name xebiaApp
 * @description
 * # xebiaApp
 *
 * Main module of the application.
 */
angular
  .module('xebiaApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
