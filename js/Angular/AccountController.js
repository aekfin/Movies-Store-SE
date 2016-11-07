var app = angular.module('MovieAccount',['ui.bootstrap']);

app.controller('AccountController', function($scope,$http){
	$scope.Register = function(){
		console.log($scope.firstName);
		console.log(Hello);
	}
});