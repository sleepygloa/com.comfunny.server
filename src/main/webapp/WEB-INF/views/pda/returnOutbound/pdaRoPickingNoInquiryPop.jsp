<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
<body class="popupContainer">
	<div class="modal-header ">
		<button type="button" class="close" data-close-btn="ture"  >닫기</button>
		<h4 class="modal-title" ></h4>
	</div>
	<div class="modal-body">
<!-- Bootstrap Modal Common  End -->
		<div id="pdaRoPickingNoInquiryPopContainer" class="container" >

			<div id="pdaRoPickingNoInquiryPopHeaderGrp" class="col-xs-w100">
				<form class="form-inline" onsubmit="return false;">
					<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
						<div class="input-group input-group-sm col-xs-w100">
							<span class="input-group-addon col-xs-w30" data-domain-id="RO_YMD"></span>
							<input id="pdaRoPickingNoInquiryPopRoYmd" type="text" class="form-control input-sm"  />
							<div class="input-group-btn">
							  	<button  type="button" class="btn btn-sm btn-primary" >
							  		<i class="fa fa-calendar"></i>
								</button>
							</div>
						</div>
					</div>

					<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
						<div class="input-group input-group-sm col-xs-w100">
							<span class="input-group-addon col-xs-w30" data-domain-id="RO_GBN"></span>
							<select id="pdaRoPickingNoInquiryPopGbnCd" class="form-control input-sm"></select>
						</div>
					</div>
				</form>
			</div>

			<div id="pdaRoPickingNoInquiryPopHGridGrp" class="col-xs-w100">
				<table id="pdaRoPickingNoInquiryPopHGrid" class="pda-program-detail">
				</table>
			</div>

			<div id="pdaRoPickingNoInquiryPopBtnGrp" class="col-xs-w100" >
				<button id="pdaRoPickingNoInquiryPopBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
					<i data-domain-id="AUTH_VIEW" > </i>
				</button>
				<!-- <button class="col-spacer-w5"></button>  -->
			</div>

		</div>
	</div>
	<!-- end page container -->
	<script src="/js/views/pda/returnOutbound/pdaRoPickingNoInquiryPop.js"></script>
<!-- Bootstrap Modal Common -->
</body>
</html>
<!-- Bootstrap Modal Common End -->
