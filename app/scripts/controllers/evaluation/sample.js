'use strict';

angular.module('wcagReporter')
.controller('EvalSampleCtrl', function ($scope, appState, $location,
evalExploreModel, evalSampleModel, evalAuditModel) {
    $scope.state = appState.moveToState('sample');

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample     = evalSampleModel.randomSample;

    $scope.exploreModel     = evalExploreModel;

    evalAuditModel.updateToConformance();

    if ($scope.structuredSample &&
    $scope.structuredSample.webpage.length === 0) {
        var strPage = evalSampleModel.addNewStructuredPage();
        evalAuditModel.addPageForAsserts(strPage);

        if ($scope.randomSample &&
        $scope.randomSample.webpage.length === 0) {
            var rndPage = evalSampleModel.addNewRandomPage();
            evalAuditModel.addPageForAsserts(rndPage);
        }
    }

    $scope.getPageAdder = function (sample) {
        return function () {
            var page = evalSampleModel.addNewPage(sample);
            evalAuditModel.addPageForAsserts(page);
            return page;
        };
    };

    $scope.getPageRemover = function (sample) {
        return function (index) {
            var page = evalSampleModel.removePage(sample, index);
            evalAuditModel.removePageFromAsserts(page);
        };
    };

    $scope.randPageCount = function () {
        return Math
        .ceil($scope.structuredSample.webpage.length / 10);
    };

    $scope.processInput = function () {
        var errors = evalSampleModel.validate();
        if (errors.length > 0) {
            // display errors
            // prevent default
        } else {
            // continue to next step
        }
    };

    $scope.nextStep = function () {
        $location.path('/evaluation/audit');
    };

    $scope.previousStep = function () {
        $location.path('/evaluation/explore');
    };

    $scope.nextStepName = 'STEP_AUDIT';
    $scope.previousStepName = 'STEP_EXPLORE';

});
