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
	<div id="pdaRoPickingDetailPopContainer" class="container" >
		<div id="pdaRoPickingDetailPopHeaderGrp" class="col-xs-w100" style="overflow-y:scroll">
			<form class="form-inline" onsubmit="return false;">
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="col-xs-w100 input-group input-group-sm">
						<span class="input-group-addon col-xs-w30" data-domain-id="PICK_LOC"></span>
						<input id="pdaRoPickingDetailPopPickLocfront" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
						<input id="pdaRoPickingDetailPopPickLocBack" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaRoPickingDetailPopItemCd" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
						<input id="pdaRoPickingDetailPopItemNm" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="col-xs-w100 input-group input-group-sm ">
						<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
						<input id="pdaRoPickingDetailPopPltIdFront" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
						<input id="pdaRoPickingDetailPopPltIdBack" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="INST_QTY"></span>
						<div>
							<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaRoPickingDetailPopInstQtyUnit" type="text" class="form-control input-sm col-xs-w100"  autocomplete="off" disabled readonly/>
									<span class="input-group-addon col-xs-w30" data-domain-id="UOM_CDBOX">BOX</span>
								</div>
							</div>
							<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaRoPickingDetailPopInstQtyEa" type="text" class="form-control input-sm col-xs-w100"  autocomplete="off" disabled readonly/>
									<span class="input-group-addon col-xs-w30" data-domain-id="UOM_CDEA">EA</span>
								</div>
							</div>
						</div>
					</div>
				</div>
<!-- 5 -->
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PICK_QTY"></span>
						<div>
							<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaRoPickingDetailPopPickQtyUnit" type="text" class="form-control input-sm col-xs-w100"  autocomplete="off" />
									<span class="input-group-addon col-xs-w30" data-domain-id="UOM_CDBOX">BOX</span>
								</div>
							</div>
							<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaRoPickingDetailPopPickQtyEa" type="text" class="form-control input-sm col-xs-w100"  autocomplete="off" />
									<span class="input-group-addon col-xs-w30" data-domain-id="UOM_CDEA">EA</span>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="RO_RS"></span>
						<select id="pdaRoPickingDetailPopRsGbnCd" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
						<input id="pdaRoPickingDetailPopMakeLot" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w50 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w60 col-sm-w30" data-domain-id="MAKE_YMD"></span>
						<input id="pdaRoPickingDetailPopMakeYmd" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>
				<div class="col-xs-w50 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w60 col-sm-w30" data-domain-id="D_EXPIRY_YMD"></span>
						<input id="pdaRoPickingDetailPopDExpirtYmd" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
						<input id="pdaRoPickingDetailPopLotAttr1" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>
<!-- 10 -->
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
						<input id="pdaRoPickingDetailPopLotAttr2" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
						<input id="pdaRoPickingDetailPopLotAttr3" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
						<input id="pdaRoPickingDetailPopLotAttr4" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
						<input id="pdaRoPickingDetailPopLotAttr5" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
					</div>
				</div>

			</form>
		</div>

		<div id="pdaRoPickingDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pPdaRoPickConfirmRoBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
				<i data-domain-id="CONF" > </i>
			</button>
		</div>

	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/returnOutbound/pdaRoPickingDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
</body>
</html>
<!-- Bootstrap Modal Common End -->
