'use strict';

var cardApp = angular.module('cardApp', ['ngRoute']);

cardApp.controller('CardSelectorController', function($scope, $http, $filter) {

	$http.get('../php/get_modules.php').
	success(function(data) {
		$scope.cards = data;
		$scope.cards = $filter('orderBy')($scope.cards, 'code');
	}).
	error(function(data) {
		$scope.cards = [{'code': 'ERROR'}];
	});

	$scope.totalSelected = 0;
	$scope.canContinue = false;

	$scope.toggle = function(card) {
		card.selected = !card.selected;
		if (!card.selected) {
			$scope.totalSelected = $scope.totalSelected - 1;
		} else {
			$scope.totalSelected = $scope.totalSelected + 1;
		}
		if ($scope.totalSelected > 0) {
			$scope.canContinue = true;
		} else {
			$scope.canContinue = false;
		}
	};

	$scope.proceed = function() {
		$scope.selectedCards = $filter('filter')($scope.cards, 'true');
		$http.post('../php/get_cards.php', $scope.selectedCards).
		success(function(data) {
			$scope.test = data;
		}).
		error(function(data) {
			$scope.test = "fail";
		});
	};

});

cardApp.controller('CardViewerController', function($scope) {

});