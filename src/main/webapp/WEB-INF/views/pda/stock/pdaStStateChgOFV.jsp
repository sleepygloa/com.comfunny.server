<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<div id="pdaStStateChgOFVContainer" class="container" >
	<div id="pdaStStateChgOFVHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaStStateChgOFVPltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOC"></span>
					<input id="pdaStStateChgOFVLocCd" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="CUR_ITEM_ST"></span>
					<input id="pdaStStateChgOFVCurItemStCd" type="text" class="form-control input-sm"  autocomplete="off" style="display:none;" />
					<input id="pdaStStateChgOFVCurItemSt" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
					<select id="pdaStStateChgOFVItemSt" class="form-control input-sm">
						<option value=""></option>
					</select>
				</div>
			</div>
		</form>

	</div>

	<div id="pdaStStateChgOFVBtnGrp" class="pda-bottom-group" >
		<button id="pdaStStateChgOFVConfirmBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="CONF" > </i>
		</button>
	</div>

</div>

<!-- end page container -->
<script src="/js/views/pda/stock/pdaStStateChgOFV.js"></script>
