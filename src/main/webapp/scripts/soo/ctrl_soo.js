
app.controller("SooCtrl", function($scope, $http, $modal, http_method, timeFormat){


	/******************************
	 * 게시판 조회 시작
	 ******************************/

	$scope.soo = {
		obj : {
			cnt 			: 0,
			writerName 		: "",
			titleKeyword 	: "",
			contentKeyword 	: "",
			regDateStart 	: "",
			regDateEnd 		: "",
			sooList 		: []
		},
		func : {
			dateChange : function(text){
				if(text == "start"){
					if($scope.soo.obj.regDateStart != "" && $scope.soo.obj.regDateEnd != ""){
						if($scope.soo.obj.regDateStart > $scope.soo.obj.regDateEnd){
							swal.fire({
								title : "",
								text  : "종료기간이 시작기간보다 빠를 수 없습니다. ",
								icon  : "warning",
								confirmButtonText : "확인",
								showCloseButton: true
							}).then(function(){
								$scope.soo.obj.regDateStart = $scope.soo.obj.regDateEnd;
								$scope.$apply();
							});;
							return;
						}
					}
				}else if(text == "end"){
					if($scope.soo.obj.regDateStart != "" && $scope.soo.obj.regDateEnd != ""){
						if($scope.soo.obj.regDateStart > $scope.soo.obj.regDateEnd){
							swal.fire({
								title : "",
								text  : "종료기간이 시작기간보다 빠를 수 없습니다. ",
								icon  : "warning",
								confirmButtonText : "확인",
								showCloseButton: true
							}).then(function(){
								$scope.soo.obj.regDateEnd = $scope.soo.obj.regDateStart;
								$scope.$apply();
							});;
							return;
						}
					}
				}
				
			},
			searchSoo : function(){
				
				var params = {
					writerName 		: $scope.soo.obj.writerName,
					titleKeyword 	: $scope.soo.obj.titleKeyword,
					contentKeyword 	: $scope.soo.obj.contentKeyword,
					regDateStart 	: "",
					regDateEnd 		: "",
					startNum 		: (($scope.page.currentPage * $scope.page.userInPage) - 10).toString(),
					endNum 		: ($scope.page.userInPage * $scope.page.currentPage).toString(),
				}
				
				if($scope.soo.obj.regDateStart != ""){
					params.regDateStart = timeFormat.getDate_from_yyyymmddhhmiss($scope.soo.obj.regDateStart);
				}
				
				if($scope.soo.obj.regDateEnd != ""){
					params.regDateEnd = timeFormat.getEndDate_from_yyyymmddhhmiss($scope.soo.obj.regDateEnd);
				}
				
				http_method.getMessage(ctx + GET_SOO_LIST, params, function(res) {
				    console.log("sooList data: ", res.data);
					$scope.soo.obj.sooList = res.data.value.sooList;
					
					if($scope.soo.obj.cnt != res.data.value.cnt){
						$scope.soo.obj.cnt = res.data.value.cnt;
						$scope.page.initialize($scope.soo.obj.cnt);
					}

				}, function(res) {
				    console.log("Error: ", res);
				});

			},
			openMoal : function(objectData){
				var modalInstance = $modal.open({
					templateUrl : ctx + "/templates/sooDt/modal/tpl_content_sooDt_modal.html"+ "?" + Date.now(),
					controller: 'SooDetailCtrl',
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
			},
			writeMoal : function(objectData){
				console.log("새로 작성 클릭");
				var modalInstance = $modal.open({
					templateUrl : ctx + "/templates/soo/modal/tpl_content_sooNew_modal.html"+ "?" + Date.now(),
					controller: 'SooNewWriteCtrl',
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
			},
			del : function(data){				
				console.log("삭제 클릭", data);
				swal.fire({
					title : "삭제하시겠습니까?",
					text  : "",
					icon  : "warning",
					confirmButtonText : "네",
					showCloseButton: true
				}).then(function(result){
					if (result.isConfirmed) { 
			            http_method.deleteMessage(ctx + GET_SOO_LIST + "/" + data, null, function(res){
			                console.log("삭제 성공:", res);
			                $scope.soo.func.searchSoo();
			            },
			            function(res){
			                console.log("삭제 실패:", res);
			            });
			        } else {
			            console.log("삭제 취소됨");
			        }
				});								
			},
			updt : function(objectData){				
				console.log("수정 클릭");
				var modalInstance = $modal.open({
					templateUrl : ctx + "/templates/soo/modal/tpl_content_sooUpdate_modal.html"+ "?" + Date.now(),
					controller: 'SooUpdateCtrl',
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
									
			}, 
			
	    }
	}; 
	
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
			$scope.soo.func.searchSoo();
		},
		goToMin : function(){ 
			this.currentPage = 1; 
			this.paginationPage= 1;
			$scope.soo.func.searchSoo();
		},
		goToMax : function(){ 
			this.currentPage = this.maxPage;
			this.paginationPage = this.maxPaginationPage;
			$scope.soo.func.searchSoo();
		},
		goToBack : function(){
			if(this.currentPage > this.pageInPage){
				this.paginationPage--;
				this.currentPage = (this.paginationPage -1)  * this.pageInPage +1;
				$scope.soo.func.searchSoo();
			}				
		},
		goToFront : function(){
			if(this.maxPaginationPage > this.paginationPage){
				this.paginationPage++;
				this.currentPage = (this.paginationPage -1) * this.pageInPage +1;
				$scope.soo.func.searchSoo();
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
	
	$scope.soo.func.searchSoo();
	/****************************** 게시판 조회 종료 ******************************/

	
});