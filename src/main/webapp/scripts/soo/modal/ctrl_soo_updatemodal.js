app.controller("SooUpdateCtrl", function($scope, modal_data, $modalInstance, http_method) {
    console.log("SooUpdateCtrl");
    console.log("modal_data의 타입:", typeof modal_data);
    console.log("modal_data의 내용:", modal_data);

    // modal_data가 객체인지 확인하고 초기값 설정
    if (typeof modal_data === 'number') {
        $scope.update_soo_info = {
            obj: {
                id: modal_data, 
                content: '',
                regDate: '',
                title: '',
                writerName: ''
            },
            func: {
                dtl: function() {
                    console.log("수정 상세");
                    console.log("modal_data id:", $scope.update_soo_info.obj.id);
                    
                    // ID를 포함한 상세 정보 조회 URL 생성
                    var url = ctx + "/soo/sooList/" + $scope.update_soo_info.obj.id;
                    console.log("url :", url);

                    // 서버에서 데이터 가져오기
                    http_method.getMessage(url, {}, function(res) {
                        if (res.data.code === 200) {
                            // 서버에서 가져온 데이터를 바인딩
                            var data = res.data.value;
                            $scope.update_soo_info.obj.title = data.title;
                            $scope.update_soo_info.obj.content = data.content;
                            $scope.update_soo_info.obj.writerName = data.writerName;
                            $scope.update_soo_info.obj.regDate = data.regDate;
                        } else {
                            Swal.fire({
                                title: "데이터 가져오기 실패",
                                text: res.data.msg || "데이터를 가져오는 중 오류가 발생했습니다.",
                                icon: "error",
                                confirmButtonText: "확인"
                            });
                        }
                    }, function(res) {
                        console.log("데이터 가져오기 실패: ", res);
                    });
                },
                cancel: function() {
                    $modalInstance.close("success");
                },
                update: function() {
                    console.log("저장클릭");

                    // 수정된 데이터를 서버로 전송할 파라미터 구성
                    var updateSooInfo = {         
                        id: $scope.update_soo_info.obj.id, 
                        title: $scope.update_soo_info.obj.title,
                        content: $scope.update_soo_info.obj.content,
                        regDate: $scope.update_soo_info.obj.regDate || new Date().toISOString().slice(0, 19).replace('T', ' '),
                        writerName: $scope.update_soo_info.obj.writerName || "USER"
                    };
                    console.log("업데이트할 데이터:", updateSooInfo);

                    // 서버에 데이터 전송
                   http_method.postMessage(ctx + SOO_BOARD, updateSooInfo, function(res) {
				    console.log("서버 응답: ", res);
				
				    if (res.data.code === 200) { 
				        Swal.fire({
				            title: "업데이트 완료",
				            text: "게시판 정보가 성공적으로 업데이트되었습니다.",
				            icon: "success",
				            confirmButtonText: "확인"
				        }).then(function() {
				            window.location.reload(); 
				        });
				    } else {
				        Swal.fire({
				            title: "업데이트 실패",
				            text: res.data.msg || "업데이트 중 오류가 발생했습니다.",
				            icon: "error",
				            confirmButtonText: "확인"
				        });
				    }
				}, function(res) {
				    console.log("저장 실패: ", res);
				});

                }
            }
        };
        // 모달이 열릴 때 자동으로 데이터 가져오기
        $scope.update_soo_info.func.dtl();
    } else {
        console.error("modal_data가 객체가 아닙니다.");
    }
});
