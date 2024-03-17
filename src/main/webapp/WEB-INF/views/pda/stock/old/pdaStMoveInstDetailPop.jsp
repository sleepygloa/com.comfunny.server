<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<!-- 반출피킹 상세 -->
<html>
<body class="popupContainer">
	<div class="modal-header ">
		<button type="button" class="close" data-close-btn="ture"  >닫기</button>
		<h4 class="modal-title" ></h4>
	</div>
	<div class="modal-body">
<!-- Bootstrap Modal Common  End -->
	<div id="pdaStMoveInstDetailPopContainer" class="container" >

		<div id="pdaStMoveInstDetailPopHeaderGrp" class="col-xs-w100" style="overflow-y:scroll">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaStMoveInstDetailPopItemCd" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
						<input id="pdaStMoveInstDetailPopItemNm" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
						<input id="pdaStMoveInstDetailPopUnit" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
						<input id="pdaStMoveInstDetailPopPkqty" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
						<input id="pdaStMoveInstDetailPopItemSt" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="INST_QTY"></span>
						<div class="col-xs-w50 col-sm-w50 col-md-w50">
							<div class="input-group input-group-sm col-xs-w100">
								<input id="pdaStMoveInstDetailPopInstQty" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
								<input id="pdaStMoveInstDetailPopInstUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
							</div>
						</div>
						<div class="col-xs-w50 col-sm-w50 col-md-w50">
							<div class="input-group input-group-sm col-xs-w100">
								<input id="pdaStMoveInstDetailPopInstQtyEa" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
								<input id="pdaStMoveInstDetailPopInstQtyEaUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
							</div>
						</div>
					</div>
				</div>
<!-- 5 -->
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="MOVE_QTY_LABEL"></span>
						<div class="col-xs-w50 col-sm-w50 col-md-w50">
							<div class="input-group input-group-sm col-xs-w100">
								<input id="pdaStMoveInstDetailPopMoveQty" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" />
								<input id="pdaStMoveInstDetailPopMoveUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
							</div>
						</div>
						<div class="col-xs-w50 col-sm-w50 col-md-w50">
							<div class="input-group input-group-sm col-xs-w100">
								<input id="pdaStMoveInstDetailPopMoveQtyEa" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off"/>
								<input id="pdaStMoveInstDetailPopMoveQtyEaUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="TGT_LOC_LABEL"></span>
						<input id="pdaStMoveInstDetailPopTgtLoc" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="MOVE_LOC_LABEL"></span>
						<input id="pdaStMoveInstDetailPopMoveLoc" type="text" class="form-control input-sm"  autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="TGT_PLT_ID"></span>
						<input id="pdaStMoveInstDetailPopTgtPltId" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="MOVE_PLT_ID_LABEL"></span>
						<input id="pdaStMoveInstDetailPopMovePltId" type="text" class="form-control input-sm"  autocomplete="off" />
					</div>
				</div>
			</form>
		</div>

		<div id="pdaStMoveInstDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaStMoveInstDetailPopBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
				<i data-domain-id="CONF" > </i>
			</button>
		</div>

	</div>
</div>

<!-- end page container -->
<script src="/js/views/pda/stock/pdaStMoveInstDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
</body>
</html>
<!-- Bootstrap Modal Common End -->
