app.controller("SooNewWriteCtrl", function($scope, modal_data, $modalInstance, http_method) {
    console.log("SooNewWriteCtrl");
    
    // 초기값 설정
    $scope.soo = {
        obj: {
            id: modal_data ? modal_data.id : null,
            content: modal_data ? modal_data.content : "",
            regDate: modal_data ? modal_data.regDate : new Date(),
            title: modal_data ? modal_data.title : "",
            writerName: modal_data ? modal_data.writerName : ""
        },
        func: {
            cancel: function() {
                $modalInstance.close("success");
            }
        }
    };
    console.log("moda_data: ", modal_data);
    $scope.result_data = modal_data;
    
    // 게시판 추가
    $scope.input_soo_info = {
        obj: {
            list: [] // 게시판 등록 리스트
        },
        func: {
            add: function() {
                console.log("저장클릭");
                
                // 서버에서 최신 ID 가져오기
                http_method.getMessage(ctx + GET_LATEST_ID, {}, function(res) {
				    var latestId = res.data;
				    console.log("Latest ID: ", latestId);
				    var newId = Number(latestId) + 1; 
				    console.log("New ID: ", newId); 
				
				    var soo_info = {
				        id: newId, // 새로운 ID 값
				        title: $scope.soo.obj.newTitle || "",
				        content: $scope.soo.obj.newCnt || "",
				        writer_name: $scope.soo.obj.newWriterName || "USER",
				        reg_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
				    };
				
				    console.log("SOO Info:", soo_info);
				    $scope.input_soo_info.obj.list.push(soo_info);
				    console.log("현재 리스트 상태: ", $scope.input_soo_info.obj.list);
				
				    // 서버로 데이터 전송
				    $scope.input_soo_info.func.putSooInfoList();
				}, function(res) {
				    console.log("최신 ID 가져오기 실패: ", res);
				});

            },
    
            putSooInfoList: function() {
			    console.log("데이터 전송 중...");
			
			    var params = {
			        soo_list: $scope.input_soo_info.obj.list
			    };
			
			    console.log("전송할 데이터: ", JSON.stringify(params, null, 2));
			
			    // 서버에 데이터 전송 
			    http_method.postMessage(ctx + SOO_BOARD, params, function(res) {
			        console.log("서버 응답: ", res);
			
			        // 작성 완료 후 알림창 표시
			        Swal.fire({
			            title: "작성 완료",
			            text: "작성 완료되었습니다.",
			            icon: "success",
			            confirmButtonText: "확인"
			        }).then(function() {
			            // 사용자가 알림창의 "확인" 버튼을 클릭하면 페이지 새로고침
			            window.location.reload(); // 페이지 새로고침
			        });
			
			    }, function(res) {
			        console.log("저장 실패: ", res); // 실패 시 처리
			    });
			}
        }
    };
});
