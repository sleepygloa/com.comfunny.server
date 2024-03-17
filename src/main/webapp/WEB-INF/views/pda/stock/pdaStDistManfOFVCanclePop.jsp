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

			<div id="pdaStDistManuOFVCanclePopContainer" class="container" >
 				<div id="pdaStDistManuOFVCanclePopHeaderGrp" class="col-xs-w100" >
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM"></span>
								<input id="pdaStDistManuOFVCanclePopItemCd" type="text" class="form-control input-sm col-xs-w100" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
								<input id="pdaStDistManuOFVCanclePopPltId" type="text" class="form-control input-sm col-xs-w100"  />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaStDistManuOFVCanclePopHGridGrp" class="col-xs-w100">
					<table id="pdaStDistManuOFVCanclePopHGrid" class="pda-program-detail">
					</table>
				</div>
			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/stock/pdaStDistManuOFVCanclePop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
