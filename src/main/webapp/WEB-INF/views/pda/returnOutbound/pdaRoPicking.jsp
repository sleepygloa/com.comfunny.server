<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaRoPickingContainer" class="container" >
	<div id="pdaRoPickingHeaderGrp" class="col-xs-w100">
		<!-- <form class="form-inline" onsubmit="return false;"> -->
		<form class="form-inline">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="RO_NO"></span>
					<input id="pdaRoPickingRoNo" type="text" class="form-control input-sm"  autocomplete="off" />
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRoPickingSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaRoPickingItemCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="SUPPLIER_NM"></span>
					<input id="pdaRoPickingSupplierNm" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
				</div>
			</div>
		</form>
	</div>
	<div id="pdaRoPickingHGridGrp" class="col-xs-w100">
		<table id="pdaRoPickingHGrid" class="pda-program-detail">
		</table>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/returnOutbound/pdaRoPicking.js"></script>

