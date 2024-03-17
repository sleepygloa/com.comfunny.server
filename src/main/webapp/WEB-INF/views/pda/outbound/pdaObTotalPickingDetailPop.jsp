<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture" ></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->

			<div id="pdaObTotalPickingDetailPopContainer" class="container" >
				<div id="pdaObTotalPickingDetailPopHeaderGrp" class="col-xs-w100" style="padding-bottom:300px;">
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
								<input id="pdaObTotalPickingDetailPopItemCd" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaObTotalPickingDetailPopItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaObTotalPickingDetailPopUom" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly />
								<input id="pdaObTotalPickingDetailPopPkqty" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
								<select id="pdaObTotalPickingDetailPopItemSt" class="form-control input-sm" disabled></select>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="INST_LOC"></span>
								<input id="pdaObTotalPickingDetailPopInstLocCd" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_LOC"></span>
								<input id="pdaObTotalPickingDetailPopPickLocCd" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
								<input id="pdaObTotalPickingDetailPopPltId" type="text" class="form-control input-sm col-xs-w50" readonly />
								<input id="pdaObTotalPickingDetailPopPltIdScan" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="INST_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObTotalPickingDetailPopInstBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObTotalPickingDetailPopInstBoxQtyBtn" data-domain-id="BOX">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObTotalPickingDetailPopInstEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObTotalPickingDetailPopInstEaQtyBtn" data-domain-id="EA">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObTotalPickingDetailPopPickingBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObTotalPickingDetailPopPickingBoxQtyBtn"  data-domain-id="BOX">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObTotalPickingDetailPopPickingEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObTotalPickingDetailPopPickingEaQtyBtn" data-domain-id="EA">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
								<input id="pdaObTotalPickingDetailPopMakeLot" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
								<input id="pdaObTotalPickingDetailPopMakeYmd" type="text" class="form-control input-sm form-scrollTop"  disabled />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="D_EXPIRY_YMD"></span>
								<input id="pdaObTotalPickingDetailPopDistExpiryYmd" type="text" class="form-control input-sm form-scrollTop"  disabled />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
								<input id="pdaObTotalPickingDetailPopLotAttr1" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
								<input id="pdaObTotalPickingDetailPopLotAttr2" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaObTotalPickingDetailPopLotAttr3" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaObTotalPickingDetailPopLotAttr4" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaObTotalPickingDetailPopLotAttr5" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" readonly />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaObTotalPickingDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaObTotalPickingDetailPopBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="CONF" > </i>
					</button>
				</div>

			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/outbound/obTotalPickingDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
