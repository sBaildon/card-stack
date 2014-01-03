'use strict';

var cardControllers = angular.module('cardControllers', []);

cardControllers.factory('messagePasser', function($rootScope) {
	var messagePasser = {};

	messagePasser.result = '';

	messagePasser.prepForBroadcast = function(msg) {
		this.result = msg;
		this.broadcastItem();
	};
	
	messagePasser.broadcastItem = function() {
		$rootScope.$broadcast('handleBroadcast');
	};
	
	return messagePasser;
});

cardControllers.controller('CardSelectorController', function($scope, $http, $filter, messagePasser) {

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
			messagePasser.prepForBroadcast(data)
		}).
		error(function(data) {
			messagePasser.result = "fail";
		});
	};

});

cardControllers.controller('CardViewerController', function($scope, messagePasser) {
	$scope.cards2 = messagePasser.result;

	$scope.indexVal = 0;
	$scope.cardToDisplay = $scope.cards2[$scope.indexVal];

	$scope.$on('handleBroadcast', function() {
		$scope.cards2 = messagePasser.result;
		$scope.cardToDisplay = $scope.cards2[$scope.indexVal];
	});


	$scope.flip = function(card) {
		card.selected = !card.selected;
	}

	$scope.incrementIndex = function() {
		$scope.indexVal = $scope.indexVal + 1;
		if ($scope.indexVal > $scope.cards2.length - 1) {
			$scope.indexVal = 0;
		}
		$scope.cardToDisplay = $scope.cards2[$scope.indexVal];
	}

	$scope.decrementIndex = function() {
		$scope.indexVal = $scope.indexVal - 1;
		if ($scope.indexVal < 0) {
			$scope.indexVal = $scope.cards2.length -1;
		}
		$scope.cardToDisplay = $scope.cards2[$scope.indexVal];
	}

});