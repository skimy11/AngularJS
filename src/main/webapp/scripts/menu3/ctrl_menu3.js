
app.controller("Menu3Ctrl", function($scope, $http){
	//$scope.$parent.selectMenu(6);
	
	$scope.data = "3";
	$scope.menu3 = {
		obj : {
			a : 1,
			b : 2,
			c : 3,
		},
		func : {
			
		}
	}
	
	$scope.str = {name : "이기민", age : 28}
	console.log(angular.isObject($scope.str));  //false
});