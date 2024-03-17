<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" id="pdaObPickingOFVDetailPopCloseBtn" class="close"  ><i class="material-icons">arrow_back</i></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->

			<div id="pdaObPickingOFVDetailPopContainer" class="container" >
				<div id="pdaObPickingOFVDetailPopHeaderGrp" class="col-xs-w100">
					<form class="form-inline" onsubmit="return false;">
						<div class="col-xs-w100 form-group">
							<span id="pdaObPickingOFVDetailPopObNo" class="input-group-addon col-xs-w100 span-split" ></span>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
								<input id="pdaObPickingOFVDetailPopPromotionGbnCd" type="text" class="form-control input-sm col-xs-w20" autocomplete="off"  disabled/>
								<input id="pdaObPickingOFVDetailPopItemCd" type="text" class="form-control input-sm col-xs-w80" autocomplete="off"  disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaObPickingOFVDetailPopItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaObPickingOFVDetailPopUom" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly disabled/>
								<input id="pdaObPickingOFVDetailPopPkqty" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="INST_LOC"></span>
								<input id="pdaObPickingOFVDetailPopInstLocCd" type="text" class="form-control input-sm" autocomplete="off" readonly disabled />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_LOC"></span>
								<input id="pdaObPickingOFVDetailPopPickLocCd" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="FR_PLT_ID"></span>
									<input id="pdaObPickingOFVDetailPopFrPltId" type="text" class="form-control input-sm col-xs-w100" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="TO_PLT_ID"></span>
									<input id="pdaObPickingOFVDetailPopToPltId" type="text" class="form-control input-sm col-xs-w100" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ID"></span>
									<input id="pdaObPickingOFVDetailPopLotId" type="text" class="form-control input-sm col-xs-w100" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="INST_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaObPickingOFVDetailPopInstBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" disabled/>
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVDetailPopInstBoxQtyBtn">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50" style="display:none;">
									<input id="pdaObPickingOFVDetailPopInstEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off"  disabled/>
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVDetailPopInstEaQtyBtn">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_TOT_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaObPickingOFVDetailPopPickingTotBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" disabled />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVDetailPopPickingTotBoxQtyBtn">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50"  style="display:none;">
									<input id="pdaObPickingOFVDetailPopPickingTotEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" disabled />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVDetailPopPickingTotEaQtyBtn">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaObPickingOFVDetailPopPickingBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVDetailPopPickingBoxQtyBtn">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50" style="display:none;">
									<input id="pdaObPickingOFVDetailPopPickingEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVDetailPopPickingEaQtyBtn">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="NOB_RS"></span>
								<select id="pdaObPickingOFVDetailPopNobRs" class="form-control input-sm" >
									<option data-domain-id="" value="" ></option>
								</select>
							</div>
						</div>

                   <!-- 사전피킹 피킹존로케이션 보충으로 하기때문에 사용안함 주석 처리
  						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_ZONE_LOC"></span>
								<input id="pdaObPickingOFVDetailPopPickingZoneLocCd" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div> -->

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
								<input id="pdaObPickingOFVDetailPopItemSt" type="text" class="form-control input-sm" autocomplete="off" disabled/>
								<!-- <select id="pdaObPickingOFVDetailPopItemSt" class="form-control input-sm" disabled></select> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
								<input id="pdaObPickingOFVDetailPopMakeLot" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
								<input id="pdaObPickingOFVDetailPopMakeYmd" type="text" class="form-control input-sm form-scrollTop"  disabled />
<!-- 								<div class="input-group-btn">
								  	<button  type="button" class="btn btn-sm btn-primary " id="pdaObPickingOFVDetailPopMakeYmdBtn" >
								  		<i class="fa fa-calendar"></i>
									</button>
								</div> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="DIST_YMD"></span>
								<input id="pdaObPickingOFVDetailPopDistExpiryYmd" type="text" class="form-control input-sm form-scrollTop"  disabled />
<!-- 								<div class="input-group-btn">
								  	<button  type="button" class="btn btn-sm btn-primary " id="pdaObPickingOFVDetailPopDistExpiryYmdBtn" >
								  		<i class="fa fa-calendar"></i>
									</button>
								</div> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
<!-- 								<select id="pdaObPickingOFVDetailPopLotAttr1" class="form-control input-sm" disabled>
									<option value="" ></option>
								</select> -->
								<input id="pdaObPickingOFVDetailPopLotAttr1" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
<!-- 								<select id="pdaObPickingOFVDetailPopLotAttr2" class="form-control input-sm" disabled>
									<option value="" ></option>
								</select> -->
								<input id="pdaObPickingOFVDetailPopLotAttr2" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaObPickingOFVDetailPopLotAttr3" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaObPickingOFVDetailPopLotAttr4" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaObPickingOFVDetailPopLotAttr5" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaObPickingOFVDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaObPickingOFVDetailPopSaveBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="SAVE_BTN" > </i>
					</button>
				</div>

			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/outbound/pdaObPickingOFVDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
