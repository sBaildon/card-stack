'use strict';

var cardApp = angular.module('cardApp', ['ngRoute', 'cardControllers']);

cardApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/viewer', {
			templateUrl: 'partials/viewer.html',
			controller: 'CardViewerController'
		}).
		otherwise({
			templateUrl: 'partials/selector.html',
			controller: 'CardSelectorController'
		});
	}
]);