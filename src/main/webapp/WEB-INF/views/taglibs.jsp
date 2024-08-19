<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%-- <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%> --%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script type="text/javascript">
	// context for 'Global Use'
	var ctx = "${ctx}";
	sessionStorage.setItem("contextPath", ctx);
	var userId = "${userId}";
	var isAdmin = "${grant}";
</script>

<%-- <link rel="stylesheet" href="${ctx}/resources/css/bootstrap/bootstrap.min.css"> --%>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" href="${ctx}/resources/css/common/common.css">
<link rel="stylesheet" href="${ctx}/resources/css/common/board.css">
<link rel="stylesheet" href="${ctx}/resources/css/common/modal.css">
<link rel="stylesheet" href="${ctx}/resources/css/common/cesium.css">
<link rel="stylesheet" href="${ctx}/resources/css/common/login.css">
<link rel="stylesheet" href="${ctx}/resources/css/datepicker/datepicker.css">

<script type="text/javascript" src="${ctx}/resources/js/angular/angular.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/angular/angular-route.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/angular/angular-resource.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/angular/ui-bootstrap-tpls-0.11.0.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/jquery/jquery.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/datepicker.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/sweetalert2.all.min.js"></script>

<script type="text/javascript" src="${ctx}/scripts/sample/ctrl_url_info.js"></script>

<!-- CesiumJS js, css™ -->
<script src="https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Cesium.js"></script>
<link href="https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Widgets/widgets.css" rel="stylesheet">


