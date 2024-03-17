<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="pdaStMoveContainer" class="container" >
	<div id="pdaStMoveHeaderGrp" class="col-xs-w100" style="overflow:auto; z-index:9">
			<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaStMovePltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaStMoveItemCd" type="text" class="form-control input-sm col-xs-w70"  autocomplete="off" disabled />
					<input id="pdaStMoveMoveProcNm" type="text" class="form-control input-sm col-xs-w30"  autocomplete="off" disabled style="text-align:center;"/>
					<input id="pdaStMoveMoveLocTypeCd" type="text" class="form-control input-sm"  style="display:none;"/>
<!-- 					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_PKQTY"></span>
					<input id="pdaStMovePltPkqty" type="text" class="form-control input-sm"  autocomplete="off" disabled /> -->
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
					<input id="pdaStMoveItemNm" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="QTY"></span>
					<div class="input-group input-group-sm col-xs-w100">
						<input id="pdaStMoveInstBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" disabled />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStMoveInstBoxQtyBtn">
							</button>
						</div>
					</div>
<!-- 					<div class="input-group input-group-sm col-xs-w50">
						<input id="pdaStMoveInstEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" disabled />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStMoveInstEaQtyBtn">
							</button>
						</div>
					</div> -->

				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="FR_LOC"></span>
					<input id="pdaStMoveFrLoc" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TO_LOC"></span>
					<input id="pdaStMoveToLoc" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
					<input id="pdaStMoveMakeLot" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
					<input id="pdaStMoveMakeYmd" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="DIST_EXPIRY_YMD"></span>
					<input id="pdaStMoveDistExpiryYmd" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
					<input id="pdaStMoveLotAttr1" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
					<input id="pdaStMoveLotAttr2" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
					<input id="pdaStMoveLotAttr3" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>

		</form>
	</div>

	<div id="pdaStMoveBtnGrp" class="pda-bottom-group" style="position:fixed !important; bottom:0px; width:97%; background:white; z-index:10">
<!-- 		<button id="pdaStMoveSearchBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="SEARCH_BTN" > </i>
		</button>
		<button class="col-spacer-w5"></button> -->
		<button id="pdaStMoveConfirmBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="CONF" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStMove.js"></script>