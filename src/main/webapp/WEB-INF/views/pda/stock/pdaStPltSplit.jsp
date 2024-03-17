<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStPltSplitContainer" class="container" >
	<div id="pdaStPltSplitHeaderGrp" class="col-xs-w100">
		|<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TGT_PLT_ID"></span>
					<input id="pdaStPltSplitTgtPltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>



<!-- Bottom Area -->
<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
		<input id="pdaStPltSplitItemCd" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
	</div>
</div>

<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
		<input id="pdaStPltSplitItemNm" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
	</div>
</div>

<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
		<input id="pdaStPltSplitItemSt" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
	</div>
</div>

<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
		<input id="pdaStPltSplitUom" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
		<input id="pdaStPltSplitPkqty" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
	</div>
</div>

<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ID"></span>
		<input id="pdaStPltSplitLotId" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
	</div>
</div>

<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="SPLIT_QTY"></span>
		<div>
			<div class="col-xs-w50 col-sm-w50 col-md-w50">
				<div class="input-group input-group-sm col-xs-w100">
					<input id="pdaStPltSplitMoveQty" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" />
					<input id="pdaStPltSplitMoveUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
				</div>
			</div>
			<div class="col-xs-w50 col-sm-w50 col-md-w50">
				<div class="input-group input-group-sm col-xs-w100">
					<input id="pdaStPltSplitMoveQtyEa" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off"/>
					<input id="pdaStPltSplitMoveQtyEaUnit" type="text" class="form-control input-sm col-xs-w50"  autocomplete="off" disabled readonly/>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
	<div class="input-group input-group-sm col-xs-w100">
		<span class="input-group-addon col-xs-w30" data-domain-id="SPLIT_PLT"></span>
		<input id="pdaStPltSplitSplitPlt" type="text" class="form-control input-sm"  autocomplete="off"/>
	</div>
</div>
<!-- Bottom Area End-->



		</form>
	</div>
	<div id="pdaStPltSplitHGridGrp" class="col-xs-w100">
		<table id="pdaStPltSplitHGrid" class="pda-program-detail">
		</table>
	</div>

	<div id="pdaStPltSplitBtnGrp" class="col-xs-w100 pda-bottom-group" >
		<button id="pdaStPltSplitSearchBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="AUTH_VIEW" > </i>
		</button>
		<button class="col-spacer-w5"></button>
		<button id="pdaStPltSplitBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="SPLIT_BTN" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStPltSplit.js"></script>
