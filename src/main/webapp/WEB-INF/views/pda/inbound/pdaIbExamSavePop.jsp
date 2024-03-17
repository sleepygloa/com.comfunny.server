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

			<div id="pdaIbExamSavePopContainer" class="container" >
				<div id="pdaIbExamSavePopHeaderGrp" class="col-xs-w100" >
					<form class="form-inline" onsubmit="return false;">
						<div class="col-xs-w100 form-group">
							<span id="pdaIbExamSavePopIbNo" class="input-group-addon col-xs-w100 span-split"></span>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
								<input id="pdaIbExamSavePopItemCd" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaIbExamSavePopItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaIbExamSavePopUom" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly />
								<input id="pdaIbExamSavePopPkqty" type="text" class="form-control input-sm col-xs-w50" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
								<select id="pdaIbExamSavePopItemSt" class="form-control input-sm"></select>
							</div>
						</div>

<!-- 						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="APPR_QTY"></span>
								<input id="pdaIbExamSavePopApprQty" type="text" class="form-control input-sm" autocomplete="off" readonly />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="EXAM_QTY"></span>
								<input id="pdaIbExamSavePopExamQty" type="text" class="form-control input-sm" autocomplete="off" />
							</div>
						</div> -->

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="APPR_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaIbExamSavePopApprBoxQty" type="text" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbExamSavePopApprBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaIbExamSavePopApprEaQty" type="hidden" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbExamSavePopApprEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">

								<span class="input-group-addon col-xs-w30" data-domain-id="EXAM_QTY"></span>
								<div class="input-group input-group-sm col-xs-w100">
									<input id="pdaIbExamSavePopExamBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off"  />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbExamSavePopExamBoxQtyBtn" >
										</button>
									</div>
								</div>
								<div class="input-group input-group-sm col-xs-w50">
									<input id="pdaIbExamSavePopExamEaQty" type="hidden" class="form-control input-sm col-xs-w100" autocomplete="off"  />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbExamSavePopExamEaQtyBtn" >
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
								<input id="pdaIbExamSavePopMakeLot" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100" >
								<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
								<div id="pdaIbExamSavePopMakeYmdDatePicker" class="col-xs-w100 input-group-sm date ">
									<input id="pdaIbExamSavePopMakeYmd" type="text" class="form-control  form-scrollTop" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary " id="pdaIbExamSavePopMakeYmdBtn" >
									  		<i class="fa fa-calendar"></i>
										</button>
									</div>

								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100" >
								<span class="input-group-addon col-xs-w30" data-domain-id="DIST_EXPIRY_YMD"></span>
								<div id="pdaIbExamSavePopDistExpiryYmdDatePicker" class="col-xs-w100 input-group-sm date">
									<input id="pdaIbExamSavePopDistExpiryYmd" type="text" class="form-control  form-scrollTop" readonly />
									<div class="input-group-btn">
									  	<button  type="button" class="btn btn-sm btn-primary " id="pdaIbExamSavePopDistExpiryYmdBtn" >
									  		<i class="fa fa-calendar"></i>
										</button>
									</div>

								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
								<select id="pdaIbExamSavePopLotAttr1" class="form-control input-sm"></select>
								<!-- <input id="pdaIbExamSavePopLotAttr1" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" /> -->
							</div>
						</div>


						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
								<select id="pdaIbExamSavePopLotAttr2" class="form-control input-sm"></select>
								<!-- <input id="pdaIbExamSavePopLotAttr2" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" /> -->
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
								<input id="pdaIbExamSavePopLotAttr3" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
								<input id="pdaIbExamSavePopLotAttr4" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
								<input id="pdaIbExamSavePopLotAttr5" type="text" class="form-control input-sm form-scrollTop" autocomplete="off" />
							</div>
						</div>

					</form>
				</div>

				<div id="pdaIbExamSavePopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaIbExamSavePopBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="EXAM" > </i>
					</button>
				</div>

			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/inbound/pdaIbExamSavePop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
