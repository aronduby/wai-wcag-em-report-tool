'use strict';

angular.module('wcagReporter')
.controller('AuditTestCtrl', function ($scope, appState) {
    var stateIndex = 4;
  	$scope.state = appState;
  	if (appState.currentStateIndex < stateIndex) {
  		appState.currentStateIndex = stateIndex;
  	}
    
});
