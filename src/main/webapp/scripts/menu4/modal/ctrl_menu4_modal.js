
app.controller("BoardDetailCtrl", function($scope, modal_data, $modalInstance){
	
	$scope.board = {
		obj : {
			id 			: modal_data.id,
			content 	: modal_data.content,
			regDate 	: modal_data.regDate,
			title 		: modal_data.title,
			writerName 	: modal_data.writerName			
		},
		func : {
			cancel : function(){
				$modalInstance.close("success");
			}
		}
	}
	console.log("moda_data: ", modal_data);
	$scope.result_data = modal_data;
});