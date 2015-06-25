'use strict';

describe('Directive: cartPreview', function () {

  // load the directive's module
  beforeEach(module('xebiaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-preview></cart-preview>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cartPreview directive');
  }));
});
