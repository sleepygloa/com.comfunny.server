<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture" ><i class="material-icons">arrow_back</i></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->

			<div id="pdaObPickingDetailPopContainer" class="container" >
				<div id="pdaObPickingDetailPopHeaderGrp" class="col-xs-w100">
					<form class="form-inline" onsubmit="return false;">
						<div class="col-xs-w100 form-group">
							<span id="pdaObPickingDetailPopObNo" class="input-group-addon col-xs-w100 span-split" ></span>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
								<input id="pdaObPickingDetailPopItemCd" type="text" class="form-control input-sm" style="color:#555;background:#e5e9ed" autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaObPickingDetailPopItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaObPickingDetailPopUom" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly disabled/>
								<input id="pdaObPickingDetailPopPkqty" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="INST_LOC"></span>
								<input id="pdaObPickingDetailPopInstLocCd" type="text" class="form-control input-sm" autocomplete="off" readonly disabled />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_LOC"></span>
								<input id="pdaObPickingDetailPopPickLocCd" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="FR_PLT_ID"></span>
									<input id="pdaObPickingDetailPopPltId" type="text" class="form-control input-sm col-xs-w100" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="TO_PLT_ID"></span>
									<input id="pdaObPickingDetailPopToPltId" type="text" class="form-control input-sm col-xs-w100" />
							</div>
						</div>


						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="INST_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObPickingDetailPopInstBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly disabled/>
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingDetailPopInstBoxQtyBtn">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObPickingDetailPopInstEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly disabled/>
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingDetailPopInstEaQtyBtn">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObPickingDetailPopPickingBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingDetailPopPickingBoxQtyBtn">
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaObPickingDetailPopPickingEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingDetailPopPickingEaQtyBtn">
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="NOB_RS"></span>
								<select id="pdaObPickingDetailPopNobRs" class="form-control input-sm" >
									<option data-domain-id="NOB_RS" value="" ></option>
								</select>
							</div>
						</div>

                   <!-- 사전피킹 피킹존로케이션 보충으로 하기때문에 사용안함 주석 처리
  						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_ZONE_LOC"></span>
								<input id="pdaObPickingDetailPopPickingZoneLocCd" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div> -->

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
								<input id="pdaObPickingDetailPopItemSt" type="text" class="form-control input-sm" autocomplete="off" disabled/>
								<!-- <select id="pdaObPickingDetailPopItemSt" class="form-control input-sm" disabled></select> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
								<input id="pdaObPickingDetailPopMakeLot" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
								<input id="pdaObPickingDetailPopMakeYmd" type="text" class="form-control input-sm form-scrollTop"  disabled />
<!-- 								<div class="input-group-btn">
								  	<button  type="button" class="btn btn-sm btn-primary " id="pdaObPickingDetailPopMakeYmdBtn" >
								  		<i class="fa fa-calendar"></i>
									</button>
								</div> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="DIST_YMD"></span>
								<input id="pdaObPickingDetailPopDistExpiryYmd" type="text" class="form-control input-sm form-scrollTop"  disabled />
<!-- 								<div class="input-group-btn">
								  	<button  type="button" class="btn btn-sm btn-primary " id="pdaObPickingDetailPopDistExpiryYmdBtn" >
								  		<i class="fa fa-calendar"></i>
									</button>
								</div> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
<!-- 								<select id="pdaObPickingDetailPopLotAttr1" class="form-control input-sm" disabled>
									<option value="" ></option>
								</select> -->
								<input id="pdaObPickingDetailPopLotAttr1" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
<!-- 								<select id="pdaObPickingDetailPopLotAttr2" class="form-control input-sm" disabled>
									<option value="" ></option>
								</select> -->
								<input id="pdaObPickingDetailPopLotAttr2" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaObPickingDetailPopLotAttr3" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaObPickingDetailPopLotAttr4" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaObPickingDetailPopLotAttr5" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" disabled readonly />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaObPickingDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaObPickingDetailPopConfBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="CONF" > </i>
					</button>
				</div>

			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/outbound/pdaObPickingDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
