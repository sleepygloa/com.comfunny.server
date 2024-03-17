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

			<div id="pdaObPickingNoInquiryPopContainer" class="container" >
				<div id="pdaObPickingNoInquiryPopHeaderGrp" class="col-xs-w100" >
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="OB_YMD"></span>
								<div id="pdaObPickingNoInquiryPopObYmdDatePicker" class="col-xs-w100 input-group-sm date">
									<input id="pdaObPickingNoInquiryPopObYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
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
								<select id="pdaObPickingNoInquiryPopObGbnCd" class="form-control input-sm">
									<!-- <option value=""></option> -->
								</select>
							</div>
						</div>

					</form>
				</div>
				<div id="pdaObPickingNoInquiryPopHGridGrp" class="col-xs-w100">
					<table id="pdaObPickingNoInquiryPopHGrid" class="pda-program-detail">
					</table>
				</div>
			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/outbound/pdaObPickingNoInquiryPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
