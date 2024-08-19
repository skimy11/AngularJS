app.controller("Menu1Ctrl", function($scope, $http, $timeout, $modal, normalization, http_method, $rootScope){
	//$scope.$parent.selectMenu(6);
	
	/******************************
	 * 사용자 등록 시작
	 ******************************/
	$scope.input_user_info = {
			obj : {
				list : []	// 사용자 등록 리스트
			},
			func : {
				add : function(){	// 사용자를 등록 테이블에 추가 하기 위한 function
					var user_info = {
							email : "togusa@eburin.com",
							user_id : "",
							user_passwd : "",
							phone_number : "",
							user_name : "",
							chk_msg_email : "",
							chk_msg_user_id : "",
							chk_msg_user_passwd : "",
							chk_msg_phone_number : "",
							chk_msg_user_name : ""
					}
					$scope.input_user_info.obj.list.push(user_info);
					
					// 마지막 입력된 데이터로 focus 이동 
					$timeout($scope.input_user_info.func.moveFocus, 500);
				},
				del : function(idx){	// 사용자 등록 테이블에서 삭제 하기 위한 function
					$scope.input_user_info.obj.list.splice(idx, 1);
				},
				moveFocus :function(){	// 사용자 등록 테이블에 input box 추가 시  Focus 이동
			        // 포커스를 설정할 요소 선택
			        var targetElement = document.getElementById("idx" + ($scope.input_user_info.obj.list.length - 1));

			        // 포커스 설정
			        targetElement.focus();
				},
				putUserInfoList : function(){	// 입력된 사용자들을 Database에 저장하기 위한 function
					
					params = {
							user_list : $scope.input_user_info.obj.list
					}
					
					http_method.putMessage(ctx + DEFAULT_USER_INFO, params, function(res){
						console.log(res);
						$scope.view_user_info.func.getUserInfo();
						
						$scope.fail_input_user_info.obj.list = res.data.value;
					},
					function(res){
						console.log(res);
					})
					
				}
			}
	}

	$scope.$watch('input_user_info.obj.list', function(newVal, oldVal) {
		for(var idx = 0; idx < $scope.input_user_info.obj.list.length; idx++){
			// 이메일 형식 체크
			if(normalization.checkEmail($scope.input_user_info.obj.list[idx].email) == false){
				$scope.input_user_info.obj.list[idx].chk_msg_email = "Email 형식이 맞지 않습니다.";
			}else{
				$scope.input_user_info.obj.list[idx].chk_msg_email = "";
			}
			
			// 사용자 ID Null 체크
			if (normalization.isNull($scope.input_user_info.obj.list[idx].user_id) == true){
				$scope.input_user_info.obj.list[idx].chk_msg_user_id = "사용자 ID가 입력 되지 않았습니다.";
			}else{
				$scope.input_user_info.obj.list[idx].chk_msg_user_id = "";
			}
			
			// 사용자 Password Null 체크
			if (normalization.isNull($scope.input_user_info.obj.list[idx].user_passwd) == true){
				$scope.input_user_info.obj.list[idx].chk_msg_user_passwd = "사용자 Password가 입력 되지 않았습니다.";
			}else{
				$scope.input_user_info.obj.list[idx].chk_msg_user_passwd = "";
			}
			
			// 사용자 이름 Null 체크
			if (normalization.isNull($scope.input_user_info.obj.list[idx].user_name) == true){
				$scope.input_user_info.obj.list[idx].chk_msg_user_name = "사용자 이름이 입력되지 않았습니다.";
			}else{
				$scope.input_user_info.obj.list[idx].chk_msg_user_name = "";
			}
			
			// 연락처 변환 및 형식 체크
			$scope.input_user_info.obj.list[idx].phone_number = normalization.formatContact($scope.input_user_info.obj.list[idx].phone_number)
			if(normalization.checkContact($scope.input_user_info.obj.list[idx].phone_number) == false){
				$scope.input_user_info.obj.list[idx].chk_msg_phone_number = "연락처 형식이 맞지 않습니다.";
			}else{
				$scope.input_user_info.obj.list[idx].chk_msg_phone_number = "";
			}
		}
	}, true);
	
	
	/**
	 * 최초 1개의 입력 정보만 추가 한다.
	 */
	$scope.input_user_info.func.add();
	
	/****************************** 사용자 등록 종료 ******************************/
	console.log($rootScope.test);
	
	/******************************
	 * 사용자 조회 시작
	 ******************************/
	$scope.view_user_info = {
			obj : {
				list : []
			},
			func : {
				getUserInfo : function(){
/*					params = {
							user_list : $scope.input_user_info.obj.list
					}*/
					
					http_method.getMessage(ctx + DEFAULT_USER_INFO, null, function(res){
						//console.log(res);
						$scope.view_user_info.obj.list = res.data.value;
						console.table($scope.view_user_info.obj.list);
					},
					function(res){
						console.log(res);
					})
				}
			}
	}
	
	$scope.view_user_info.func.getUserInfo();
	
	/****************************** 사용자 조회 종료 ******************************/
	
	/******************************
	 * 사용자 등록 실패 시작
	 ******************************/
	$scope.fail_input_user_info = {
			obj : {
				list : []
			},
			func : {
				openDetailInfo : function(data){
					var modalInstance = $modal.open({
						templateUrl : ctx + "/templates/menu1/modal/modal_content_detail_info.html"+ "?" + Date.now(),
						controller: 'UserDetailCtrl',
						size : "510xy",
						backdrop: 'static',
						resolve:{
							modal_data : function(){
								return data;
							}
						}
					});
					
					modalInstance.result.then(function(data){
						if(data == "cancel"){
						}else{
						}
					});
				}
			}
	}
	/****************************** 사용자 등록 실패 종료 ******************************/
	
	/******************************
	 * 사용자 삭제 시작
	 ******************************/
	$scope.delete_user_info={
		obj : {
			
		},
		func : {
			deleteUserInfo : function(data){
				http_method.deleteMessage(ctx + DEFAULT_USER_INFO + "/" + data, null, function(res){
						console.log(res);
						$scope.view_user_info.func.getUserInfo();
				},
				function(res){
					console.log(res);
				})
			}
		}
	}
	/****************************** 사용자 삭제 종료 ******************************/
	
});