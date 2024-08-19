app.directive('cesiumViewer', function(){
	return {
		restrict : 'A',
		link : function(scope, element, attrs){
			(async () => {
				const HomeCoordinates = Cesium.Cartesian3.fromDegrees(127.3801, 36.35944, 1500000);	//매그놀리아 좌표
				const terrainProvider = await Cesium.createWorldTerrainAsync();
				const viewer = new Cesium.Viewer(element[0], {
					terrainProvider : terrainProvider,
					navigationHelpButton: false,
					homebutton : true
				});
				
				viewer.scene.screenSpaceCameraController.inertiaZoom = 0.9;				// 확대와 축소 시 탄성(부드러움) 
				viewer.scene.screenSpaceCameraController.minimumZoomDistance = 200;		// 축소 최소 거리
				viewer.scene.screenSpaceCameraController._zoomFactor = 5;				//스크롤 줌 시 한 번의 거리
				
				const scene = viewer.scene;
				const camera = viewer.camera;
				const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
				
				handler.setInputAction(function (movement) {
					if (scope.menu2.obj.isAreaSelectionMode && viewer.scene.globe.tilesLoaded) {
						if(scope.menu2.obj.shapeType != 'line'){
							const startPositionCartesian = scene.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
							
							scope.menu2.func.handleCreateShape(movement);
							scope.menu2.obj.updateShapeId = handler.setInputAction(function (movement) {
								scope.menu2.func.handleUpdateShape(movement, startPositionCartesian);
							}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
						}
					}
				}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
				
				handler.setInputAction(function () {
					if(scope.menu2.obj.shapeType != 'line'){
						scope.menu2.func.handleCompleteShape();						
					}
				}, Cesium.ScreenSpaceEventType.LEFT_UP);
				
				handler.setInputAction(function(click){
					if (scope.menu2.obj.isAreaSelectionMode) {
						scope.menu2.func.clickPoint(click);
					}
				}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
				
				handler.setInputAction(function(click){
					if (scope.menu2.obj.isAreaSelectionMode){
						scope.menu2.func.handleCompleteShape();
					}
				}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
				
				//처음 위치 설정
				viewer.camera.setView({
					destination: HomeCoordinates,
					orientation: {
						heading: Cesium.Math.toRadians(0.0),
				    	pitch: Cesium.Math.toRadians(-90.0),
				    	roll: 0.0
				  	}
				});
				
				// 홈 버튼 클릭 시 실행될 함수 재정의
				viewer.scene.camera.flyHome = function(duration) {
					viewer.camera.flyTo({
						destination: HomeCoordinates,
						orientation: {
							heading: Cesium.Math.toRadians(0.0),
							pitch: Cesium.Math.toRadians(-90.0),
							roll: 0.0
						},
						duration: duration // 애니메이션 지속 시간 (초)
					});
				};
					
				// 뷰어가 완전히 로드되면 zoom 기능 활성화
				viewer.scene.globe.tileLoadProgressEvent.addEventListener(() => {
					if (viewer.scene.globe.tilesLoaded) {
						handler.setInputAction(function (movement){
							scope.menu2.func.showCartographic(movement);
						}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
						scope.menu2.obj.viewer = viewer; // 뷰어 객체 할당
						scope.menu2.obj.handler = handler;
						scope.menu2.obj.scene = scene;
						scope.menu2.obj.camera = camera;
						scope.$apply(); // 변경 사항 적용
					}
						
				});
			})();
		}
	}
})


app.controller("Menu2Ctrl", function($scope, $http, $location, $rootScope) {
	//$scope.$parent.selectMenu(6);
	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYWJlYjRmYy03ZTAxLTRjMDAtYTA3NC0wNTg2M2RiOThkNTIiLCJpZCI6MjIyMTkxLCJpYXQiOjE3MTgzNTI0MjJ9.Ieo02cB_7Iin7ed4IN_Vnv0ivyuXkNBHduWnFFVm7hw';
	
	$scope.menu2 = {
		obj : {
			viewer : "",
			shapeType : null,
			figure : null,
			isAreaSelectionMode : false,
			coordinates : {},
			points : [],
			handler : null,
			scene : null,
			camera : null,
			updateShapeId : null,
		},
		func : {
			animateZoom : function(endHeight){
				const startHeight = $scope.menu2.obj.camera.positionCartographic.height;
				const duration = 300; // 1초 (밀리초 단위)
				const startTime = performance.now();
				
				function animate(time) {
					const elapsed = time - startTime;
					const progress = Math.min(elapsed / duration, 1);
					const currentHeight = startHeight + (endHeight - startHeight) * progress;

					$scope.menu2.obj.camera.position = Cesium.Cartesian3.fromRadians(
						$scope.menu2.obj.camera.positionCartographic.longitude,
						$scope.menu2.obj.camera.positionCartographic.latitude,
						currentHeight
					);

					if (progress < 1) {
						requestAnimationFrame(animate);
					}
				}
				requestAnimationFrame(animate);
			},
			zoomIn : function(){	//확대
				const endHeight = $scope.menu2.obj.camera.positionCartographic.height * 0.5; // 확대 정도 조절 (값을 변경하여 조절 가능)
 				$scope.menu2.func.animateZoom(endHeight);
			},
			zoomOut : function(){	//축소
				const endHeight = $scope.menu2.obj.camera.positionCartographic.height * 1.5; // 확대 정도 조절 (값을 변경하여 조절 가능)
				$scope.menu2.func.animateZoom(endHeight);
			},
			flyToPosition : function(){	//위치 이동
				$scope.menu2.obj.viewer.camera.flyTo({
        			destination: Cesium.Cartesian3.fromDegrees(127.38576, 36.36675, 100),
        			orientation: {
            			heading: Cesium.Math.toRadians(0.0),
            			pitch: Cesium.Math.toRadians(-15.0)
        			}
    			});
			},
			toggleMode : function(shapeType){
				$scope.menu2.obj.isAreaSelectionMode = !$scope.menu2.obj.isAreaSelectionMode;
				
				$scope.menu2.obj.shapeType = shapeType;		
				
				if (!$scope.menu2.obj.isAreaSelectionMode && $scope.menu2.obj.figure) {
					$scope.menu2.obj.viewer.entities.remove($scope.menu2.obj.figure);
					$scope.menu2.obj.figure = null;
					$scope.menu2.obj.points = [];
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableRotate = true; // 회전 비활성화
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableTranslate = true; // 이동 비활성화
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableZoom = true;
				}
			},
			handleCameraMovement : function(movement){
				const scene = $scope.menu2.obj.viewer.scene;
				const camera = $scope.menu2.obj.viewer.camera;
				if (!$scope.menu2.obj.previousMousePosition) {
					$scope.menu2.obj.previousMousePosition = movement.position;
					return;
				}

				if (Cesium.defined(movement.endPosition) && Cesium.defined($scope.menu2.obj.previousMousePosition)) {
					const deltaX = movement.endPosition.x - $scope.menu2.obj.previousMousePosition.x;
					const deltaY = movement.endPosition.y - $scope.menu2.obj.previousMousePosition.y;
					$scope.menu2.obj.previousMousePosition = movement.endPosition;

					if (scene.mode === Cesium.SceneMode.SCENE2D || scene.mode === Cesium.SceneMode.COLUMBUS_VIEW) {
						camera.moveLeft(deltaX * 0.005);
						camera.moveUp(deltaY * 0.005);
					} else {
						camera.rotate(Cesium.Cartesian3.UNIT_Z, -deltaX * 0.005);
						camera.rotate(camera.right, deltaY * 0.005);
					}
				}
			},
			handleCreateShape : function(movement){
				$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableRotate = false; // 회전 비활성화
				$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableTranslate = false; // 이동 비활성화
				const scene = $scope.menu2.obj.viewer.scene;
				const startPositionCartesian = scene.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
						
				if (Cesium.defined(startPositionCartesian)) {
					const startPositionCartographic = scene.globe.ellipsoid.cartesianToCartographic(startPositionCartesian);
							
					if($scope.menu2.obj.figure){
						$scope.menu2.obj.viewer.entities.remove($scope.menu2.obj.figure);
					}
							
					switch ($scope.menu2.obj.shapeType) {
						case 'triangle':
							$scope.menu2.obj.figure = $scope.menu2.obj.viewer.entities.add({
								position: startPositionCartesian,
								polygon: {
									hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights([
										Cesium.Math.toDegrees(startPositionCartographic.longitude), Cesium.Math.toDegrees(startPositionCartographic.latitude), 0, // 시작점
                    					Cesium.Math.toDegrees(startPositionCartographic.longitude), Cesium.Math.toDegrees(startPositionCartographic.latitude), 0, // 임시 꼭짓점 (나중에 업데이트)
                    					Cesium.Math.toDegrees(startPositionCartographic.longitude), Cesium.Math.toDegrees(startPositionCartographic.latitude), 0  // 임시 꼭짓점 (나중에 업데이트)
									])),
									material: Cesium.Color.RED.withAlpha(0.5),
									//height: 100000 // 색상 및 투명도 설정
								}
							});
								break;
						case 'rectangle':
							$scope.menu2.obj.figure = $scope.menu2.obj.viewer.entities.add({
								rectangle: {
									coordinates: Cesium.Rectangle.fromCartographicArray([startPositionCartographic, startPositionCartographic]),
									material: Cesium.Color.BLUE.withAlpha(0.5), // 투명하게 설정
									//height : 10000
								}
							});
							break;
						case 'circle':
							$scope.menu2.obj.figure = $scope.menu2.obj.viewer.entities.add({
								position: startPositionCartesian,
								ellipse: {
									semiMinorAxis: 0, // 초기 반지름 0
									semiMajorAxis: 0,
									//height : 10000,
									material: Cesium.Color.BLUE.withAlpha(0.5)
								}
							});
									
							break;
					}
				}
			},
			handleUpdateShape : function(movement, startPositionCartesian){
				const startPositionCartographic = $scope.menu2.obj.scene.globe.ellipsoid.cartesianToCartographic(startPositionCartesian);
				const scene = $scope.menu2.obj.scene;
				
				if ($scope.menu2.obj.isAreaSelectionMode && Cesium.defined($scope.menu2.obj.figure)) {
					const endPositionCartesian = $scope.menu2.obj.scene.camera.pickEllipsoid(movement.endPosition, $scope.menu2.obj.scene.globe.ellipsoid);
					
					if (Cesium.defined(endPositionCartesian)) {
						const endPositionCartographic = $scope.menu2.obj.scene.globe.ellipsoid.cartesianToCartographic(endPositionCartesian);
										
						switch ($scope.menu2.obj.shapeType) {
							case 'triangle':
								const triangleGeodesic = new Cesium.EllipsoidGeodesic(startPositionCartographic, endPositionCartographic, scene.globe.ellipsoid);
								const baseLengthMeters = triangleGeodesic.surfaceDistance; // 밑변 길이 (미터)
                				const midPointCartographic = triangleGeodesic.interpolateUsingFraction(0.5); // 밑변 중점
								const baseAngleRadians = Math.atan2(endPositionCartographic.latitude - startPositionCartographic.latitude, endPositionCartographic.longitude - startPositionCartographic.longitude);
								
								// 나머지 두 꼭짓점 계산
								const vertex1AngleRadians = baseAngleRadians + Math.PI / 6; // 60도 더하기
								const vertex2AngleRadians = baseAngleRadians - Math.PI / 6; // 60도 빼기
										
								// 꼭짓점 거리 계산 (미터)
								const vertexDistanceMeters = baseLengthMeters / 2 / Math.cos(Math.PI / 6); // 밑변/2 / cos(30도)
										
								// 꼭짓점 좌표 계산 (Cartographic)
								const vertex1 = new Cesium.Cartographic(
									midPointCartographic.longitude + vertexDistanceMeters / scene.globe.ellipsoid.maximumRadius * Math.cos(vertex1AngleRadians),
									midPointCartographic.latitude + vertexDistanceMeters / scene.globe.ellipsoid.maximumRadius * Math.sin(vertex1AngleRadians)
								);
								const vertex2 = new Cesium.Cartographic(
									midPointCartographic.longitude + vertexDistanceMeters / scene.globe.ellipsoid.maximumRadius * Math.cos(vertex2AngleRadians),
									midPointCartographic.latitude + vertexDistanceMeters / scene.globe.ellipsoid.maximumRadius * Math.sin(vertex2AngleRadians)
								);
								// 꼭짓점 좌표 업데이트
								const newPositions = Cesium.Cartesian3.fromRadiansArray([
									startPositionCartographic.longitude, startPositionCartographic.latitude,
									vertex1.longitude, vertex1.latitude,
									vertex2.longitude, vertex2.latitude
								]);

								$scope.menu2.obj.figure.polygon.hierarchy = new Cesium.PolygonHierarchy(newPositions);
								$scope.$applyAsync();
								break;
							case 'rectangle':
								const west = Math.min(startPositionCartographic.longitude, endPositionCartographic.longitude);
								const south = Math.min(startPositionCartographic.latitude, endPositionCartographic.latitude);
								const east = Math.max(startPositionCartographic.longitude, endPositionCartographic.longitude);
								const north = Math.max(startPositionCartographic.latitude, endPositionCartographic.latitude);
								$scope.menu2.obj.figure.rectangle.coordinates = new Cesium.Rectangle( west, south, east, north );
								break;
							case 'circle':
								const circleGeodesic = new Cesium.EllipsoidGeodesic(startPositionCartographic, endPositionCartographic, scene.globe.ellipsoid);
								const circleRadius = circleGeodesic.surfaceDistance;												
								$scope.menu2.obj.figure.ellipse.semiMinorAxis.setValue(circleRadius);
								$scope.menu2.obj.figure.ellipse.semiMajorAxis.setValue(circleRadius);
								$scope.$applyAsync();
											
								break;
						}
						$scope.$applyAsync();
					}
				} else {
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableRotate = true; // 회전 비활성화
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableTranslate = true; // 이동 비활성화
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableZoom = true;
									
					$scope.menu2.func.handleCameraMovement(movement);
				}
			},
			handleCompleteShape : function(){
				if ($scope.menu2.obj.isAreaSelectionMode && $scope.menu2.obj.figure) {
						
					const rectangleCoordinates = $scope.menu2.obj.figure;
					// ... (rectangleCoordinates를 사용하여 필요한 작업 수행)
						 
					switch ($scope.menu2.obj.shapeType) {
						case 'triangle':
							console.log(rectangleCoordinates.polygon);
							break;
						case 'rectangle':
							console.log(rectangleCoordinates.rectangle);
							break;
						case 'circle':
							console.log(rectangleCoordinates.ellipse);
							break;
						case 'line':
							console.log(rectangleCoordinates);
							break;
					}
						
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableRotate = true; // 회전 비활성화
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableTranslate = true; // 이동 비활성화
					$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableZoom = true;
					$scope.menu2.obj.isAreaSelectionMode = !$scope.menu2.obj.isAreaSelectionMode;
					$scope.menu2.obj.handler.removeInputAction(updateShapeId);
					$scope.$applyAsync();
				}
			},
			clickPoint : function(click){
				$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableRotate = false; // 회전 비활성화
				$scope.menu2.obj.viewer.scene.screenSpaceCameraController.enableTranslate = false; // 이동 비활성화
						
				const cartesian = $scope.menu2.obj.camera.pickEllipsoid(click.position, $scope.menu2.obj.viewer.scene.globe.ellipsoid);
						
					if (Cesium.defined(cartesian)) {
      					$scope.menu2.obj.points.push(cartesian); // 점 좌표 배열에 추가

						// 도형 생성 (임시)
						if ($scope.menu2.obj.points.length > 1) {
							if ($scope.menu2.obj.figure) {
								$scope.menu2.obj.viewer.entities.remove($scope.menu2.obj.figure);
							}
							$scope.menu2.obj.figure = $scope.menu2.func.createShape($scope.menu2.obj.points);
						}

						$scope.$applyAsync();
					}
			},
			createShape : function(positions){
				if (positions.length < 3) { // 점이 2개 이하인 경우 선 생성
					return $scope.menu2.obj.viewer.entities.add({
						polyline: {
							positions: positions,
							width: 2,
							material: Cesium.Color.YELLOW
						}
					});
				} else { // 점이 3개 이상인 경우 다각형 생성
					return $scope.menu2.obj.viewer.entities.add({
						polygon: {
							hierarchy: positions,
							material: Cesium.Color.YELLOW.withAlpha(0.5)
						}
					});
				}	
			},
			showCartographic : function(movement){
				const cartesian = $scope.menu2.obj.viewer.camera.pickEllipsoid(movement.endPosition, $scope.menu2.obj.viewer.scene.globe.ellipsoid);
          			if (cartesian) {
						const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
						//const cartographic = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
						$scope.menu2.obj.coordinates.longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
						$scope.menu2.obj.coordinates.latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
						console.log($scope.menu2.obj.coordinates);
					} else {
						$scope.menu2.obj.coordinates.longitude = null;
						$scope.menu2.obj.coordinates.latitude = null;
					}
				$scope.$applyAsync(); // 변경 감지
			}

		}
	}
});