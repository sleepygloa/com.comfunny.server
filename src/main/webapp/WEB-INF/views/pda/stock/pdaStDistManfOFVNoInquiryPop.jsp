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

			<div id="pdaStDistManfOFVNoInquiryPopContainer" class="container" >
 				<div id="pdaStDistManfOFVNoInquiryPopHeaderGrp" class="col-xs-w100" >
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="WORK_YMD"></span>
								<div id="pdaStDistManfOFVNoInquiryPopWorkYmdDatePicker" class="col-xs-w100 input-group-sm date">
									<input id="pdaStDistManfOFVNoInquiryPopWorkYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" >
									  		<i class="fa fa-calendar"></i>
										</button>
									</div>
								</div>
							</div>
						</div>

					</form>
				</div>

				<div id="pdaStDistManfOFVNoInquiryPopHGridGrp" class="col-xs-w100">
					<table id="pdaStDistManfOFVNoInquiryPopHGrid" class="pda-program-detail">
					</table>
				</div>
			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/stock/pdaStDistManfOFVNoInquiryPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
