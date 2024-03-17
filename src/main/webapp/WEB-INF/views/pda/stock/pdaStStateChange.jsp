<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStStateChangeContainer" class="container" >
	<div id="pdaStStateChangeHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<input type="hidden" id="pdaStStateChangeStInspDtlSeq" value="">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST_CHG_NO"></span>
					<input id="pdaStStateChangeItemStChgNo" type="text" class="form-control input-sm"  autocomplete="off"/>
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspNoBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TGT_LOC"></span>
					<input id="pdaStStateChangeTgtLocCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaStStateChangeItemCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
		</form>
	</div>
		<div id="pdaStStateChangeHGridGrp" class="col-xs-w100">
		<table id="pdaStStateChangeHGrid" class="pda-program-detail">
		</table>
	</div>
	<div id="pdaStStateChangeBtnGrp" class="pda-bottom-group" >
		<button id="pdaStStateChangeAuthBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="AUTH_VIEW" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStStateChange.js"></script>
