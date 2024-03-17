<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="pdaStMoveOptContainer" class="container" >
	<div id="pdaStMoveOptHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TGT_PLT_ID"></span>
					<input id="pdaStMoveOptTgtPltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TGT_LOC"></span>
					<input id="pdaStMoveOptTgtLoc" type="text" class="form-control input-sm"  autocomplete="off"/>
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStMoveOptTgtLocBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TO_LOC"></span>
					<input id="pdaStMoveOptToLoc" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
		</form>
	</div>

	<div id="pdaStMoveOptBtnGrp" class="pda-bottom-group" >
		<button id="pdaStMoveOptSearchBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="AUTH_VIEW" > </i>
		</button>
		<button class="col-spacer-w5"></button>
		<button id="pdaStMoveOptConfirmBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="CONF" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStMoveOpt.js"></script>