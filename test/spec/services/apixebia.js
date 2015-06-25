'use strict';

describe('Service: apiXebia', function () {

  // load the service's module
  beforeEach(module('xebiaApp'));

  // instantiate service
  var apiXebia;
  beforeEach(inject(function (_apiXebia_) {
    apiXebia = _apiXebia_;
  }));

  it('should do something', function () {
    expect(!!apiXebia).toBe(true);
  });

});
