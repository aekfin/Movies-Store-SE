var app = angular.module('AdminMovieStore',['ngCookies','ui.bootstrap','MovieStore']);

app.controller('MenuController', function($scope,$log,$http,$cookies,$rootScope,$window){
	$scope.loadAccount = function(){
		$http.post("php/GetDataByID.php",{'id':$cookies.get('logonUser.id'),'table':"accounts"}).success(function(data){
		  $scope.user = data[0];
		});
	}

	$scope.loadAccount();

});