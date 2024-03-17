<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<div id="pdaStHoldAndCancleOFVContainer" class="container" >
	<div id="pdaStHoldAndCancleOFVHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaStHoldAndCancleOFVPltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOC"></span>
					<input id="pdaStHoldAndCancleOFVLocCd" type="text" class="form-control input-sm"  autocomplete="off" disabled />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="HOLD_GBN"></span>
					<select id="pdaStHoldAndCancleOFVHoldGbn" class="form-control input-sm">
						<option value=""></option>
					</select>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="HOLD_RS"></span>
					<select id="pdaStHoldAndCancleOFVHoldRs" class="form-control input-sm">
						<option value=""></option>
					</select>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="HOLD_QTY"></span>
					<div class="input-group input-group-sm col-xs-w100">
						<input id="pdaStHoldAndCancleOFVHoldBoxQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" value="0" disabled />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStHoldAndCancleOFVHoldBoxQtyBtn" >
							</button>
						</div>
					</div>
					<div class="input-group input-group-sm col-xs-w50" style="display:none;">
						<input id="pdaStHoldAndCancleOFVHoldEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off" value="0" disabled />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStHoldAndCancleOFVHoldEaQtyBtn" >
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>

	<div id="pdaStHoldAndCancleOFVBtnGrp" class="pda-bottom-group" >
		<button id="pdaStHoldAndCancleOFVConfirmBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="CONF" > </i>
		</button>
	</div>

</div>

<!-- end page container -->
<script src="/js/views/pda/stock/pdaStHoldAndCancleOFV.js"></script>
