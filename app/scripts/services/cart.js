'use strict';

/**
 * @ngdoc service
 * @name xebiaApp.cart
 * @description
 * # cart
 * Factory in the xebiaApp.
 */
angular.module('xebiaApp')
  .factory('Cart', function (apiXebia) {

    var cart = {
      price: 0,
      nbBooks : 0,
      books : [],
      offers: []
    };

    var getBestOffers = function () {
      var isbn = getIsbnAllCart(),
          bestOffer = cart.price,
          remise = 0,
          commercialOffer = {};
      cart.offers = "";

      if(isbn != ""){
        apiXebia.getCustomersOrders(isbn).then(function (data) {
          return data.data.offers;
        }).then(function (data) {
          data.forEach(function(offer){
            switch (offer.type){
              case 'percentage':
                var percent = (cart.price * offer.value)/100;

                if(cart.price - percent < bestOffer){
                  commercialOffer = offer;
                  remise = percent;
                  bestOffer = cart.price - percent;
                }
                break;
              case 'minus':
                var minus = offer.value;

                if(cart.price - minus < bestOffer){
                  commercialOffer = offer;
                  remise = minus;
                  bestOffer = cart.price - offer.value;
                }
                break;
              case 'slice':
                var slice = parseInt(cart.price / offer.sliceValue, 10) * offer.value;

                if(cart.price - slice < bestOffer){
                  commercialOffer = offer;
                  remise = slice;
                  bestOffer = (cart.price * offer.value)/100;
                }
                break;
            }
          });
          cart.offers =  {'bestOffer': bestOffer, 'remise': remise, 'commercialOffer': commercialOffer };
        });
      }
    };

    var getIsbnAllCart = function () {
      var isbn = '';
      cart.books.forEach(function (book) {
        isbn += (',' + book.isbn).repeat(book.quantity);
      });
      return isbn.substring(1,isbn.length);
    };


    // Public API here
    return {
      getAllCart: function () {
        return cart;
      },
      addBook: function (book) {
        if(cart.books.indexOf(book) >= 0){
          cart.books[cart.books.indexOf(book)].quantity += 1;
        }else{
          cart.books.push(book);
          cart.books[cart.books.indexOf(book)].quantity = 1;
        }
        cart.price += book.price;
        cart.nbBooks += 1;
        getBestOffers();
        return cart;
      },
      removeBook: function (book) {
        var index = cart.books.indexOf(book);

        if(index >= 0) {
          if(cart.books[index].quantity > 1){
            cart.books[cart.books.indexOf(book)].quantity -= 1;
          }else{
            cart.books.splice(index, 1);
          }
          cart.price -= book.price;
          cart.nbBooks -= 1;
          getBestOffers();
        }

        return cart;
      },
      getIsbnAllCart : getIsbnAllCart,
      getOffers: function () {
        return cart.offers;
      }
    };
  });
