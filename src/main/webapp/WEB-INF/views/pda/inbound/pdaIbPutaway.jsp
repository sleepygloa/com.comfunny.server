<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaIbPutawayContainer" class="container" >
	<div id="pdaIbPutawayHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaIbPutawayPltId" type="text" class="form-control input-sm" autocomplete="off"/>
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbPutawayPltIdSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="INST_LOC"></span>
					<input id="pdaIbPutawayInstLocCd" type="text" class="form-control input-sm" autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TO_LOC"></span>
					<input id="pdaIbPutawayToLocCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
		</form>
	</div>

	<div id="pdaIbPutawayBtnGrp" class="col-xs-w100 pda-bottom-group" >
		<button id="pdaIbPutawayConfirmBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="PUTW"></i>
		</button>
	</div>
</div>

<!-- end page container -->
<script src="/js/views/pda/inbound/pdaIbPutaway.js"></script>
