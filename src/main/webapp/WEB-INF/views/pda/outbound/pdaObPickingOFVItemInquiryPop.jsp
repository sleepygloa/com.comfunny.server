<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture"  ><i class="material-icons">arrow_back</i></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->

			<div id="pdaObPickingOFVItemInquiryPopContainer" class="container" >
<!--  				<div id="pdaObPickingOFVItemInquiryPopHeaderGrp" class="col-xs-w100" >
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="OB_YMD"></span>
								<div id="pdaObPickingOFVItemInquiryPopObYmdDatePicker" class="col-xs-w100 input-group-sm date">
									<input id="pdaObPickingOFVItemInquiryPopObYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" >
									  		<i class="fa fa-calendar"></i>
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="OB_GBN"></span>
								<select id="pdaObPickingOFVItemInquiryPopObGbnCd" class="form-control input-sm">
									<option value=""></option>
								</select>
							</div>
						</div>

					</form>
				</div> -->
				<div id="pdaObPickingOFVItemInquiryPopHGridGrp" class="col-xs-w100">
					<table id="pdaObPickingOFVItemInquiryPopHGrid" class="pda-program-detail">
					</table>
				</div>
			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/outbound/pdaObPickingOFVItemInquiryPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
