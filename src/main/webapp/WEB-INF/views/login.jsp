<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/taglibs.jsp"%>



<html lang="ko">
<head>

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>앵글러 로그인</title>
<script type="text/javascript">
	var errormsg = "${msg}";
	console.log(errormsg);
	if ((errormsg != null) && (errormsg != undefined) && (errormsg != "")) {
		alert(errormsg);
		errormsg = "";
	}
</script>
<base href="/" />
</head>
<body>
	<!-- content 영역입니다. -->
	<div id="loginWrap"
		style="display: grid; justify-content: center; height: 100%; align-content: center;">

		<div class="login-box">
			<div>
				<div class="login-top">
					<h1 class="login-title">AngularJS Egov 로그인</h1>
				</div>
				<form action="/j_security_check" method="POST">
					<div class="input-group">
						<div class="items">
							<!-- <label for="id" class="form-label">ID</label> -->
							<input type="text" id="id" name="j_username">
						</div>
					</div>
					<div class="input-group">
						<div class="items">
							<!-- <label for="password" class="form-label">PW</label> -->
							<input type="password" id="password" name="j_password">
						</div>
					</div>
					<div>
						<button class="login-btn">LOGIN</button>
					</div>
				</form>
			</div>
		</div>
		<input name="userSe" type="hidden" value="GNR">
	</div>
	<!-- //content 영역입니다. -->
</body>
</html>