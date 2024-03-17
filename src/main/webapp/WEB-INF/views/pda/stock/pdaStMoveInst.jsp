<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStMoveInstContainer" class="container" >
	<div id="pdaStMoveInstHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<input type="hidden" id="pdaStMoveInstStMoveGbnCd" value="">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="STOCK_MOVE_NO"></span>
					<input id="pdaStMoveInstStMoveNo" type="text" class="form-control input-sm"  autocomplete="off" />
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStMoveInstNoBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaStMoveInstItemCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TGT_LOC"></span>
					<input id="pdaStMoveInstTgtLoc" type="text" class="form-control input-sm"  autocomplete="off" readonly/>
				</div>
			</div>
		</form>
	</div>

	<div id="pdaStMoveInstHGridGrp" class="col-xs-w100">
		<table id="pdaStMoveInstHGrid" class="pda-program-detail">
		</table>
	</div>

	<div id="pdaStMoveInstBtnGrp" class="col-xs-w100 pda-bottom-group" >
		<button id="pdaStMoveInstBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="AUTH_VIEW" > </i>
		</button>
		<!-- <button class="col-spacer-w5"></button>  -->
	</div>

</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStMoveInst.js"></script>
