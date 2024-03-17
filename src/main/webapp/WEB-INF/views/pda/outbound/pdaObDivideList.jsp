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

	<div id="pdaObDivideListContainer" class="container" >
		<div id="pdaObDivideListHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaObDivideListItemCd" type="text" class="form-control input-sm" autocomplete="off" readonly />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
						<input id="pdaObDivideListItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly />
					</div>
				</div>

			</form>
		</div>

		<div id="pdaObDivideListHGridGrp" class="col-xs-w100">
			<table id="pdaObDivideListHGrid" class="pda-program-detail">
			</table>
		</div>

		<div id="pdaObDivideListBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaObDivideListSearchBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
				<i data-domain-id="SEARCH_BTN" > </i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/outbound/pdaObDivideList.js"></script>


<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->

