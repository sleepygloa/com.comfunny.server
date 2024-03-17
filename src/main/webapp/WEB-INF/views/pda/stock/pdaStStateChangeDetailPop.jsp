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
			<div id="pdaStStateChangeDetailPopContainer" class="container" >

				<div id="pdaStStateChangeDetailPopHeaderGrp" class="col-xs-w100" style="overflow-y:scroll">
					<form class="form-inline" onsubmit="return false;">

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM"></span>
								<input id="pdaStStateChangeDetailPopItemCd" type="text" class="form-control input-sm"  autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaStStateChangeDetailPopItemNm" type="text" class="form-control input-sm"  autocomplete="off" readonly disabled/>
							</div>
						</div>

						<!-- Readonly ComboBox는 selectBox로 구현할  편의를  모름 -->
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
								<input id="pdaStStateChangeDetailPopItemStGbnCd" type="text" class="form-control input-sm"  autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaStStateChangeDetailPopUom" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" readonly disabled/>
								<input id="pdaStStateChangeDetailPopPkqty" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="FR_LOC"></span>
								<input id="pdaStStateChangeDetailPopFromLocCd" type="text" class="form-control input-sm"  autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="FR_PLT_ID"></span>
								<input id="pdaStStateChangeDetailPopFromPltId" type="text" class="form-control input-sm"  autocomplete="off" readonly disabled/>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="STOCK_QTY"></span>
								<div>
									<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
										<div class="input-group input-group-sm col-xs-w100">
											<input id="pdaStStateChangeDetailPopStockQty" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" />
											<input id="pdaStStateChangeDetailPopStockUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" readonly disabled/>
										</div>
									</div>
									<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
										<div class="input-group input-group-sm col-xs-w100">
											<input id="pdaStStateChangeDetailPopStockQtyEa" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off"/>
											<input id="pdaStStateChangeDetailPopStockQtyEaUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" readonly disabled/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="TO_LOC"></span>
								<input id="pdaStStateChangeDetailPopToLocCd" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="TO_PLT_ID"></span>
								<input id="pdaStStateChangeDetailPopToPltId" type="text" class="form-control input-sm"  autocomplete="off" />
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="MOVE_QTY"></span>
								<div>
									<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
										<div class="input-group input-group-sm col-xs-w100">
											<input id="pdaStStateChangeDetailPopMoveQty" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" />
											<input id="pdaStStateChangeDetailPopMoveUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" readonly disabled/>
										</div>
									</div>
									<div class="col-xs-w50 col-sm-w50 col-md-w33f3">
										<div class="input-group input-group-sm col-xs-w100">
											<input id="pdaStStateChangeDetailPopMoveQtyEa" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off"/>
											<input id="pdaStStateChangeDetailPopMoveQtyEaUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" readonly disabled/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="TGT_ITEM_ST"></span><!-- TO 제품상태 -->
								<select id="pdaStStateChangeDetailPopToItemStGbnCd" class="form-control input-sm"></select>
							</div>
						</div>
					</form>
				</div>

				<div id="pdaStStateChangeDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group" >
					<button id="pdaStStateChangeDetailPopBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="CONF" > </i>
					</button>
				</div>

			</div>
		</div>

		<!-- end page container -->
		<script src="/js/views/pda/stock/pdaStStateChangeDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
