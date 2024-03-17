<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div id="pdaRiPutwContainer" class="container" >
	<div id="pdaRiPutwHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaRiPutwPltId" type="text" class="form-control input-sm" autocomplete="off"/>
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRiPutwPltIdSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="INST_LOC"></span>
					<input id="pdaRiPutwInstLocCd" type="text" class="form-control input-sm" autocomplete="off" disabled readonly/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TO_LOC"></span>
					<input id="pdaRiPutwToLocCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
		</form>
	</div>

	<div id="pdaRiPutwBtnGrp" class="col-xs-w100 pda-bottom-group" >
		<button id="pdaRiPutwPltSearchBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="AUTH_VIEW" > </i>
		</button>
		<button class="col-spacer-w5"></button>
		<button id="pdaRiPutwConfirmBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="CONF"></i>
		</button>
	</div>
</div>

<!-- end page container -->
<script src="/js/views/pda/returnInbound/pdaRiPutw.js"></script>
