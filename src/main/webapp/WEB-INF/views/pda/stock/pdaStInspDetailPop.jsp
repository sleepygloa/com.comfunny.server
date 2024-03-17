<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<!-- 반출피킹 상세 -->
<html>
	<body class="popupContainer">
 		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture"  ><i class="material-icons">arrow_back</i></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->
			<div id="pdaStInspDetailPopContainer" class="container" >

				<div id="pdaStInspDetailPopHeaderGrp" class="col-xs-w100" style="overflow-y:scroll">
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOC"></span>
								<input id="pdaStInspDetailPopLocCd" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="ITEM_CD"></span>
								<input id="pdaStInspDetailPopItemCd" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="ITEM_NM"></span>
								<input id="pdaStInspDetailPopItemNm" type="text" class="form-control input-sm"  autocomplete="off" readonly/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="PKQTY"></span>
								<!-- <input id="pdaStInspDetailPopUom" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" readonly/> -->
								<input id="pdaStInspDetailPopPkqty" type="text" class="form-control input-sm"  autocomplete="off" readonly/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="ITEM_ST"></span>
								<select id="pdaStInspDetailPopItemStCd" class="form-control input-sm"  disabled>
								</select>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w45" data-domain-id="STOCK_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaStInspDetailPopStockBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspDetailPopStockBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaStInspDetailPopStockEaQty" type="hidden" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspDetailPopStockEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w45" data-domain-id="INSP_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaStInspDetailPopStockInspBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspDetailPopStockInspBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaStInspDetailPopStockInspEaQty" type="hidden" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspDetailPopStockInspEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="FR_PLT_ID"></span>
								<input id="pdaStInspDetailPopPltId" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="TO_PLT_ID"></span>
								<input id="pdaStInspDetailPopToPltId" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="MAKE_LOT"></span>
								<input id="pdaStInspDetailPopMakeLot" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="MAKE_YMD"></span>
								<input id="pdaStInspDetailPopMakeYmd" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="DIST_EXPIRY_YMD"></span>
								<input id="pdaStInspDetailPopDistExpiryYmd" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR1"></span>
								<select id="pdaStInspDetailPopLotAttr1" class="form-control input-sm" disabled></select>
								<!-- <input id="pdaStInspDetailPopLotAttr1" type="text" class="form-control input-sm"  autocomplete="off" readonly/> -->
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR2"></span>
								<select id="pdaStInspDetailPopLotAttr2" class="form-control input-sm" disabled></select>
								<!-- <input id="pdaStInspDetailPopLotAttr2" type="text" class="form-control input-sm"  autocomplete="off" readonly/> -->
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaStInspDetailPopLotAttr3" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaStInspDetailPopLotAttr4" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaStInspDetailPopLotAttr5" type="text" class="form-control input-sm"  autocomplete="off" disabled/>
							</div>
						</div>

					</form>
				</div>

				<div id="pdaStInspDetailPopBtnGrp" class="pda-bottom-group" >
					<button id="pdaStInspDetailPopSaveBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="SAVE_BTN" > </i>
					</button>
				</div>

			</div>
		</div>

		<!-- end page container -->
		<script src="/js/views/pda/stock/pdaStInspDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
