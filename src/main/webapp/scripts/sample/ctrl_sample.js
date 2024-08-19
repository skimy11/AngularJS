var APP_NAME = "sampleApp";
//var app = angular.module(APP_NAME, ["ui.bootstrap", "ngRoute"]);
//var app = angular.module(APP_NAME, ["ui.bootstrap"]);
var app = angular.module(APP_NAME, ["ngRoute", "ui.bootstrap", "date-picker"]);

app.run(function($rootScope) {
	$rootScope.test = new Date();
});

app.directive('dragable', function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {
			$(elem).draggable();
		}
	}
});

app.directive('datePickerDirective', [
	function() {
		return {
			require: 'ngModel',
			link: function(scope, el, attr, ngModel) {
				$(el).datepicker({
					dateFormat: "yymmdd",
					changeMonth: true,
					changeYear: true,
					onSelect: function(dateText) {
						scope.$apply(function() {
							ngModel.$setViewValue(dateText);
						});
					}
				});
			}
		}
	}
]);

/**
 * http 통신
 * @param $http
 * @returns
 */
app.factory('http_method', function($http) {
	var http_method = {}

	http_method.putMessage = function(url, param, success, fail) {

		console.log("url : " + url);
		$http({
			headers: { "Content-type": 'application/json; charset=UTF-8' },
			method: "PUT",
			url: url,
			data: param,
		}).then(success, fail);
	}

	http_method.getMessage = function(url, param, success, fail) {
		console.log("url : " + url);
		$http({
			headers: { "Content-type": 'application/json; charset=UTF-8' },
			method: "GET",
			url: url,
			params: param,
		}).then(success, fail);
	}

	http_method.deleteMessage = function(url, param, success, fail) {
		$http({
			method: "DELETE",
			url: url,
			params: param,
		}).then(success, fail);
	}

	http_method.postMessage = function(url, param, success, fail) {
		$http({
			headers: { "Content-type": 'application/json; charset=UTF-8' },
			method: "POST",
			url: url,
			data: param,
		}).then(success, fail);
	}

	return http_method;
});

/**
 * 정규식
 * @returns
 */
app.factory('normalization', function() {
	var normalization = {}

	// Email 형식 체크
	normalization.checkEmail = function(email) {
		const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (email_regex.test(email)) { return true; }
		else { return false; }
	}

	// 연락처 형식으로 변경
	normalization.formatContact = function(contact) {
		var cleaned = ('' + contact).replace(/\D/g, '');
		var formatted;

		if (cleaned.length === 9 && cleaned.startsWith('02')) {	// 전화번호 형식: 123-456-7890
			formatted = cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
		} else if (cleaned.length === 10) {	// 전화번호 형식: 123-456-7890
			formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			//} else if (cleaned.length === 11 && cleaned.startsWith('1')) {	// 핸드폰 번호 형식: 010-1234-5678
		} else if (cleaned.length === 11) {	// 핸드폰 번호 형식: 010-1234-5678
			formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '010-$2-$3');
		} else {
			formatted = cleaned;
		}

		return formatted;
	}

	// 연락처 형식 체크
	normalization.checkContact = function(contact) {
		const contact_regex = /^\d{2,3}-\d{3,4}-\d{4}$/;

		if (contact_regex.test(contact)) { return true; }
		else { return false; }
	}

	// 데이터 Null 체크
	normalization.isNull = function(data) {
		if (data == null || data == undefined || data == "") { return true; }
		else { return false; }
	}

	return normalization;
});

/**
 * 시간 포맷
 * @returns
 */
app.factory('timeFormat', function() {
	var timeFormat = {}

	timeFormat.converter_string_to_date = function(str) {
		var y = str.substr(0, 4);
		var m = str.substr(4, 2);
		var d = str.substr(6, 2);
		if (str.length > 8) {
			var h = str.substr(8, 2);
			var mi = str.substr(10, 2);
			var s = str.substr(12, 2);
			return new Date(y, m - 1, d, h, mi, s);
		} else {
			return new Date(y, m - 1, d);
		}
	}

	timeFormat.format_yyyymmddhhmiss_to_yyyy_mm_dd_hh_mi_ss = function(date) {
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);
		const hour = date.substring(8, 10);
		const minute = date.substring(10, 12);
		const second = date.substring(12, 14);
		if (date.length < 5)
			return year;
		else if (date.length < 7)
			return year + "-" + month;
		else if (date.length < 9)
			return year + "-" + month + "-" + day;
		else if (date.length < 11)
			return year + "-" + month + "-" + day + " " + hour;
		else if (date.length < 13)
			return year + "-" + month + "-" + day + " " + hour + ":" + minute;
		else
			return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	}

	timeFormat.format_yyyymmddhhmiss_to_yyyy_mm_dd = function(date) {
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);
		const hour = date.substring(8, 10);
		const minute = date.substring(10, 12);
		const second = date.substring(12, 14);
		if (date.length < 5)
			return year;
		else if (date.length < 7)
			return year + "-" + month;
		else if (date.length < 9)
			return year + "-" + month + "-" + day;
		else if (date.length < 11)
			return year + "-" + month + "-" + day + " " + hour;
		else if (date.length < 13)
			return year + "-" + month + "-" + day + " " + hour + ":" + minute;
		else
			return year + "-" + month + "-" + day;
	}

	timeFormat.format_yyyymmddhhmiss_to_korean = function(date) {
		const year = date.substring(0, 4);
		const month = date.substring(4, 6);
		const day = date.substring(6, 8);
		const hour = date.substring(8, 10);
		const minute = date.substring(10, 12);
		const second = date.substring(12, 14);
		if (date.length < 5)
			return year;
		else if (date.length < 7)
			return year + "년 " + month;
		else if (date.length < 9)
			return year + "년 " + month + "월 " + day + "일";
		else if (date.length < 11)
			return year + "년 " + month + "월 " + day + "일" + hour;
		else if (date.length < 13)
			return year + "년 " + month + "월 " + day + "일" + " " + hour + ":" + minute;
		else
			return year + "년 " + month + "월 " + day + "일";
	}

	timeFormat.getTime_from_yyyymmddhhmiss = function(date) {
		var d = timeFormat.converter_string_to_date(date.replace(/[^0-9]/g, ''));
		return d.getTime();
	}

	timeFormat.getFull_from_yyyymmddhhmiss = function(date) {
		var d = timeFormat.converter_string_to_date(date.replace(/[^0-9]/g, ''));
		return timeFormat.getDate_from_yyyymmddhhmiss(d);
	}

	timeFormat.get_yyyy_mm_dd_from_Date = function(date) {
		var d = timeFormat.getDate_from_yyyymmddhhmiss(date);
		return timeFormat.format_yyyymmddhhmiss_to_korean(d);
	}

	timeFormat.get_yyyy_mm_dd_from_DateFormat = function(date) {
		var d = timeFormat.getDate_from_yyyymmddhhmiss(date);
		return timeFormat.format_yyyymmddhhmiss_to_yyyy_mm_dd(d);
	}

	timeFormat.getDate_from_yyyymmddhhmiss = function(date) {
		var year = date.getFullYear().toString();

		var month = date.getMonth() + 1;
		month = month < 10 ? '0' + month.toString() : month.toString();

		var day = date.getDate();
		day = day < 10 ? '0' + day.toString() : day.toString();

		var hour = date.getHours();
		hour = hour < 10 ? '0' + hour.toString() : hour.toString();

		var minites = date.getMinutes();
		minites = minites < 10 ? '0' + minites.toString() : minites.toString();

		var seconds = date.getSeconds();
		seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

		return year + month + day + hour + minites + seconds;
	}

	timeFormat.getEndDate_from_yyyymmddhhmiss = function(date) {
		var year = date.getFullYear().toString();

		var month = date.getMonth() + 1;
		month = month < 10 ? '0' + month.toString() : month.toString();

		var day = date.getDate();
		day = day < 10 ? '0' + day.toString() : day.toString();

		return year + month + day + "235959";
	}

	return timeFormat;
});

app.controller("sampleCtrl", function($scope, $location, $modal, $timeout, $window) {

	$scope.routeContents = [{
		url: ctx + "/",
		display: "메뉴 1",
		code: 1,
		selected: false,
		disabled: false,
		className: ""
	}, {
		url: ctx + "/menu2",
		display: "세슘JS",
		code: 2,
		selected: false,
		disabled: false,
		className: ""
	}, {
		url: ctx + "/menu3",
		display: "메뉴 3",
		code: 3,
		selected: false,
		disabled: false,
		className: "has-submenu",
		subMenu: [{
			url: ctx + "/menu3/1",
			display: "메뉴 3-1",
			code: 31,
			selected: false
		}, {
			url: ctx + "/menu3/2",
			display: "메뉴 3-2",
			code: 32,
			selected: false
		}, {
			url: ctx + "/menu3/3",
			display: "메뉴 3-3",
			code: 33,
			selected: false
		}]
	}, {
		url: ctx + "/menu4",
		display: "게시판",
		code: 4,
		selected: false,
		disabled: false,
		className: ""
	}, {
		url: ctx + "/soo",
		display: "신수연",
		code: 5,
		selected: false,
		disabled: false,
		className: ""
	}];

	$scope.$on("$destroy", function(e) {
	});


});

/*app.config(function($routeProvider, $locationProvider, $qProvider) {*/
app.config(function($routeProvider, $locationProvider) {
	//$qProvider.errorOnUnhandledRejections(false);

	$routeProvider.when("/", {
		templateUrl: ctx + "/templates/menu1/tpl_content_menu1.html" + "?" + Date.now(),
		controller: "Menu1Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu2", {
		templateUrl: ctx + "/templates/menu2/tpl_content_menu2.html" + "?" + Date.now(),
		controller: "Menu2Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu3", {
		templateUrl: ctx + "/templates/menu3/tpl_content_menu3.html" + "?" + Date.now(),
		controller: "Menu3Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu3/1", {
		templateUrl: ctx + "/templates/menu31/tpl_content_menu31.html" + "?" + Date.now(),
		controller: "Menu31Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu3/2", {
		templateUrl: ctx + "/templates/menu32/tpl_content_menu32.html" + "?" + Date.now(),
		controller: "Menu32Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu3/3", {
		templateUrl: ctx + "/templates/menu33/tpl_content_menu33.html" + "?" + Date.now(),
		controller: "Menu33Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu4", {
		templateUrl: ctx + "/templates/menu4/tpl_content_menu4.html" + "?" + Date.now(),
		controller: "Menu4Ctrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/menu5", {
		templateUrl: ctx + "/templates/menu4/tpl_content_login.html" + "?" + Date.now(),
		controller: "LoginCtrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$routeProvider.when("/soo", {
		templateUrl: ctx + "/templates/soo/tpl_content_soo.html" + "?" + Date.now(),
		controller: "SooCtrl",
		resolve: {
			content: function() {
				return {};
			}
		},
		redirectTo: null
	});

	$locationProvider.html5Mode(true);
});