'use strict';

describe('Controller: AuditExploreCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporter'));

  var AuditExploreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditExploreCtrl = $controller('AuditExploreCtrl', {
      $scope: scope
    });
  }));

});
