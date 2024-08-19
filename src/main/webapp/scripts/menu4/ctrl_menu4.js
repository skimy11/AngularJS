
app.controller("Menu4Ctrl", function($scope, $http, $modal, http_method){
	//$scope.$parent.selectMenu(6);
	$scope.board = {
		obj : {
			cnt 			: 0,
			writerName 		: "",
			titleKeyword 	: "",
			contentKeyword 	: "",
			regDateStart 	: "",
			regDateEnd 		: "",
			boardList 		: []
		},
		func : {
			dateChange : function(text){
				if(text == "start"){
					if($scope.board.obj.regDateStart != "" && $scope.board.obj.regDateEnd != ""){
						if($scope.board.obj.regDateStart > $scope.board.obj.regDateEnd){
							swal.fire({
								title : "",
								text  : "종료기간이 시작기간보다 빠를 수 없습니다. ",
								icon  : "warning",
								confirmButtonText : "확인",
								showCloseButton: true
							}).then(function(){
								$scope.board.obj.regDateStart = $scope.board.obj.regDateEnd;
								$scope.$apply();
							});;
							return;
						}
					}
				}else if(text == "end"){
					if($scope.board.obj.regDateStart != "" && $scope.board.obj.regDateEnd != ""){
						if($scope.board.obj.regDateStart > $scope.board.obj.regDateEnd){
							swal.fire({
								title : "",
								text  : "종료기간이 시작기간보다 빠를 수 없습니다. ",
								icon  : "warning",
								confirmButtonText : "확인",
								showCloseButton: true
							}).then(function(){
								$scope.board.obj.regDateEnd = $scope.board.obj.regDateStart;
								$scope.$apply();
							});;
							return;
						}
					}
				}
				
			},
			searchBoard : function(){
				
				var params = {
					writerName 		: $scope.board.obj.writerName,
					titleKeyword 	: $scope.board.obj.titleKeyword,
					contentKeyword 	: $scope.board.obj.contentKeyword,
					regDateStart 	: $scope.board.obj.regDateStart,
					regDateEnd 		: $scope.board.obj.regDateEnd,
					startNum 		: (($scope.page.currentPage * $scope.page.userInPage) - 10).toString(),
					endNum 		: ($scope.page.userInPage * $scope.page.currentPage).toString(),
				}
				
				http_method.getMessage(ctx + GET_BOARD_LIST, params, function(res){
					console.log("boardList data: ", res.data);
					$scope.board.obj.boardList = res.data.value.boardList;
					
					if($scope.board.obj.cnt != res.data.value.cnt){
						$scope.board.obj.cnt = res.data.value.cnt;
						$scope.page.initialize($scope.board.obj.cnt);
					}
				},
				function(res){
					console.log(res);
				});
			},
			openMoal : function(objectData){
				var modalInstance = $modal.open({
					templateUrl : ctx + "/templates/menu4/modal/tpl_content_menu4_modal.html"+ "?" + Date.now(),
					controller: 'BoardDetailCtrl',
					size : "lg",
					backdrop: 'static',
					resolve:{
						modal_data : function(){
							return objectData;
						}
					}
				});
					
				modalInstance.result.then(function(data){
					console.log(data);
					if(data == "cancel"){
					}else{
					}
				});
			}
		}
	}
	
	$scope.page = {
		userInPage : 10,
		maxPage : 1,
		currentPage : 1,
		pagination: new Array(1),
		getNumber : function(num) {
		    this.pagination = new Array(num);   
		},
			
		paginationPage : 1,
		maxPaginationPage : 1,
		pageInPage : 10,
			
		initialize : function(length){// page를 사용하려면 게시글의 겟수를 받아와서 initialize 하여 사용한다.
			this.currentPage = 1;
			this.paginationPage = 1;
				
			var round = Math.floor(length / this.userInPage);
			var other = length % this.userInPage;
			if(other > 0){
				round++;
			}
				
			this.maxPage = Math.ceil(round);
				
			var round2 = round / this.pageInPage;
			var other2 = round % this.pageInPage;
			if(!other2) round2++;
				
			this.maxPaginationPage = Math.ceil(round2);
			this.getNumber(this.maxPage);
				
			//sessionStorage.setItem("maxPage", $scope.page.maxPage);
			//sessionStorage.setItem("maxPaginationPage", $scope.page.maxPaginationPage);
		},
		setCurrentPage : function(input){
			if(this.maxPage < input){ this.currentPage = this.maxPage; return;}
			if(input <= 0){ this.currentPage = 1; return;}
			this.currentPage = input;
			$scope.board.func.searchBoard();
		},
		goToMin : function(){ 
			this.currentPage = 1; 
			this.paginationPage= 1;
			$scope.board.func.searchBoard();
		},
		goToMax : function(){ 
			this.currentPage = this.maxPage;
			this.paginationPage = this.maxPaginationPage;
			$scope.board.func.searchBoard();
		},
		goToBack : function(){
			if(this.currentPage > this.pageInPage){
				this.paginationPage--;
				this.currentPage = (this.paginationPage -1)  * this.pageInPage +1;
				$scope.board.func.searchBoard();
			}				
		},
		goToFront : function(){
			if(this.maxPaginationPage > this.paginationPage){
				this.paginationPage++;
				this.currentPage = (this.paginationPage -1) * this.pageInPage +1;
				$scope.board.func.searchBoard();
			}
		},
		setTotalCnt : function(length){
			var round = Math.floor(length / this.userInPage);
			var other = length % this.userInPage;

			if(other > 0){
				round++;
			}
				
			this.maxPage = Math.ceil(round);
				
			var round2 = round / this.pageInPage;
			var other2 = round % this.pageInPage;
			if(!other2) round2++;
				
			this.maxPaginationPage = Math.ceil(round2);
			this.getNumber(this.maxPage);
		}
	}
	
	$scope.board.func.searchBoard();
});