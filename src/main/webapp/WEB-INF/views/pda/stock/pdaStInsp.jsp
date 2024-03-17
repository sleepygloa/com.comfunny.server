<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStInspContainer" class="container" >
	<div id="pdaStInspHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<input type="hidden" id="pdaStInspStInspDtlSeq" value="">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="STOCK_INSP_NO"></span>
					<input id="pdaStInspStInspNo" type="text" class="form-control input-sm"  autocomplete="off"/>
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStInspStInspNoBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ZONE"></span>
					<select id="pdaStInspZoneCd" class="form-control input-sm">
						<option value=""></option>
					</select>
					<!-- <input id="pdaStInspZoneCd" type="text" class="form-control input-sm"  autocomplete="off"/> -->
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOC"></span>
					<input id="pdaStInspTgtLoc" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaStInspItemCd" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaStInspPltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>

		</form>
	</div>
		<div id="pdaStInspHGridGrp" class="col-xs-w100">
		<table id="pdaStInspHGrid" class="pda-program-detail">
		</table>
	</div>
	<div id="pdaStInspBtnGrp" class="pda-bottom-group" >
		<button id="pdaStMoveInstNewBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="NEW_BTN" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStInsp.js"></script>
