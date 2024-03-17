
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
			<div id="pdaStInspNewPopContainer" class="container" >

				<div id="pdaStInspNewPopHeaderGrp" class="col-xs-w100" style="overflow-y:scroll">
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="ITEM_CD"></span>
								<input id="pdaStInspNewPopItemCd" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="ITEM_NM"></span>
								<input id="pdaStInspNewPopItemNm" type="text" class="form-control input-sm"  autocomplete="off" readonly/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaStInspNewPopUom" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" disabled/>
								<input id="pdaStInspNewPopPkqty" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" readonly/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="ITEM_ST"></span>
								<select id="pdaStInspNewPopItemStCd" class="form-control input-sm"></select>
							</div>
						</div>


						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w45" data-domain-id="STOCK_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaStInspNewPopStockBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspNewPopStockBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaStInspNewPopStockEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspNewPopStockEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w45" data-domain-id="INSP_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaStInspNewPopStockInspBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspNewPopStockInspBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaStInspNewPopStockInspEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspNewPopStockInspEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOC"></span>
								<input id="pdaStInspNewPopTgtLoc" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>


						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="PLT_ID"></span>
								<input id="pdaStInspNewPopPltId" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ID"></span>
								<input id="pdaStInspNewPopLotId" type="text" class="form-control input-sm"  autocomplete="off" disabled />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="MAKE_LOT"></span>
								<input id="pdaStInspNewPopMakeLot" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="MAKE_YMD"></span>
								<div id="pdaStInspNewPopMakeYmdDatePicker" class="col-xs-w100 input-group-sm date ">
									<input id="pdaStInspNewPopMakeYmd" type="text" class="form-control input-sm"  />
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
								<span class="input-group-addon col-xs-w45" data-domain-id="DIST_EXPIRY_YMD"></span>
								<div id="pdaStInspNewPopDistExpiryYmdDatePicker" class="col-xs-w100 input-group-sm date ">
									<input id="pdaStInspNewPopDistExpiryYmd" type="text" class="form-control input-sm"  />
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
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR1"></span>
								<select id="pdaStInspNewPopLotAttr1" class="form-control input-sm"></select>
								<!-- <input id="pdaStInspNewPopLotAttr1" type="text" class="form-control input-sm"  autocomplete="off" /> -->
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR2"></span>
								<select id="pdaStInspNewPopLotAttr2" class="form-control input-sm"></select>
								<!-- <input id="pdaStInspNewPopLotAttr2" type="text" class="form-control input-sm"  autocomplete="off" /> -->
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaStInspNewPopLotAttr3" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaStInspNewPopLotAttr4" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w45" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaStInspNewPopLotAttr5" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaStInspNewPopBtnGrp" class="pda-bottom-group" >
					<button id="pdaStInspNewPopSaveBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="SAVE_BTN" > </i>
					</button>
				</div>

			</div>
		</div>

		<!-- end page container -->
		<script src="/js/views/pda/stock/pdaStInspNewPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
