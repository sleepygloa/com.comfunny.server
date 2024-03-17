<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture" >Close</button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->

			<div id="pdaRiExamSavePopContainer" class="container" >
				<div id="pdaRiExamSavePopHeaderGrp" class="col-xs-w100" style="padding-bottom:300px;">
					<form class="form-inline" onsubmit="return false;">
						<div class="col-xs-w100 form-group">
							<span id="pdaRiExamSavePopRiNo" class="input-group-addon col-xs-w100" ></span>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
								<input id="pdaRiExamSavePopItemCd" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaRiExamSavePopItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaRiExamSavePopUom" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly />
								<input id="pdaRiExamSavePopPkqty" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
								<select id="pdaRiExamSavePopItemSt" class="form-control input-sm"></select>
							</div>
						</div>

						<!-- <div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="APPR_QTY"></span>
								<input id="pdaRiExamSavePopPlanQty" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div> -->

<!-- 						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="EXAM_QTY"></span>
								<input id="pdaRiExamSavePopExamQty" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div> -->

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="APPR_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaRiExamSavePopPlanBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRiExamSavePopPlanBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaRiExamSavePopPlanEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRiExamSavePopPlanEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="EXAM_QTY"></span>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaRiExamSavePopExamBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off"  />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRiExamSavePopExamBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaRiExamSavePopExamEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off"  />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRiExamSavePopExamEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

<!-- 						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
								<input id="pdaRiExamSavePopPltId" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div>
 -->
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
								<input id="pdaRiExamSavePopMakeLot" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
								<input id="pdaRiExamSavePopMakeYmd" type="text" class="form-control input-sm form-scrollTop"  />
								<div class="input-group-btn">
								  	<button  type="button" class="btn btn-sm btn-primary " id="pdaRiExamSavePopMakeYmdBtn" >
								  		<i class="fa fa-calendar"></i>
									</button>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="DIST_EXPIRY_YMD"></span>
								<input id="pdaRiExamSavePopDistExpiryYmd" type="text" class="form-control input-sm form-scrollTop"  />
								<div class="input-group-btn">
								  	<button  type="button" class="btn btn-sm btn-primary " id="pdaRiExamSavePopDistExpiryYmdBtn" >
								  		<i class="fa fa-calendar"></i>
									</button>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
								<select id="pdaRiExamSavePopLotAttr1" class="form-control input-sm"></select>
								<!-- <input id="pdaRiExamSavePopLotAttr1" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" /> -->
							</div>
						</div>


						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
								<select id="pdaRiExamSavePopLotAttr2" class="form-control input-sm"></select>
								<!-- <input id="pdaRiExamSavePopLotAttr2" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" /> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaRiExamSavePopLotAttr3" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaRiExamSavePopLotAttr4" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaRiExamSavePopLotAttr5" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaRiExamSavePopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaRiExamSavePopBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="EXAM_CONF" > </i>
					</button>
				</div>

			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/returnInbound/pdaRiExamSavePop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
