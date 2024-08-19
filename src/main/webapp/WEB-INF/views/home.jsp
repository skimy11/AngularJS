<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/taglibs.jsp"%>
<%@ include file="/WEB-INF/views/scripts.jsp"%>
<%-- <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%> --%>

<html ng-app="sampleApp">
<head>
<title>Home</title>
<base href="/" />
</head>
<body ng-controller="sampleCtrl">
	<div class="container">
		<div class="vertical-menu" style="display: flex;">
			<button type="button" class="btn logout"
				onclick="document.location='${ctx}/j_security_logout'">
				로그아웃</button>
			<ul>
				<li ng-repeat="menu in routeContents" ng-class="menu.className"
					ng-click="selectMenu(menu.code)"><a href="{{menu.url}}">
						{{menu.display}} </a>
					<div class="submenu">
						<ul>
							<li ng-repeat="sub_menu in menu.subMenu"><a
								href="{{sub_menu.url}}">{{sub_menu.display}}</a></li>
						</ul>
					</div></li>
			</ul>
		</div>

		<div class="content">
			<ng-view></ng-view>
		</div>
	</div>
</body>
</html>
