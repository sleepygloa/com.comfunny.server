<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>

<!DOCTYPE html>
<html lang="en">

	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture"  >닫기</button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body" >
<!-- Bootstrap Modal Common  End -->

			<div id="pPdaLoginContainer" class="container">
				<div id="pPdaLoginHeaderGrp" class="col-xs-w100" >
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ID"></span>
								<input id="loginUserId" type="text" class="form-control input-sm"  />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PW"></span>
								<input id="loginUserPwd" type="password" class="form-control input-sm"  />
							</div>
						</div>

					</form>
				</div>
			</div>

		</div>
		<div class="modal-footer" >
			<a href="javascript:;" id="popupLoginBtn" class="btn btn-sm btn-danger">로그인</a>
			<!-- <a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a> -->
		</div>


		<!-- end page container -->
		<script src="/js/views/login/loginPopup.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>