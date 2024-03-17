<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="pdaObPickingOFVContainer" class="container" >
	<div id="pdaObPickingOFVHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="OB_NO"></span>
					<input id="pdaObPickingOFVObNo" type="text" class="form-control input-sm" autocomplete="off" />
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingOFVObNoSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="STORE"></span>
					<input id="pdaObPickingOFVStoreNm" type="text" class="form-control input-sm" readonly autocomplete="off" />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaObPickingOFVPltId" type="text" class="form-control input-sm" autocomplete="off" />
				</div>
			</div>
		</form>
	</div>

	<div id="pdaObPickingOFVHGridGrp" class="col-xs-w100">
		<table id="pdaObPickingOFVHGrid" class="pda-program-detail">
		</table>
	</div>

	<div id="pdaObPickingOFVBtnGrp" class="col-xs-w100 pda-bottom-group" >
<!-- 		<button id="pdaObPickingOFVAllCheckBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
			<i data-domain-id="ALL_SEL_BTN" > </i>
		</button> -->
        <button id="pdaObPickingOFVAllCancleBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
            <i data-domain-id="CANCL" > </i>
        </button>
		<button class="col-spacer-w5"></button>
		<button id="pdaObPickingOFVDeleteBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
			<i data-domain-id="DEL_BTN" > </i>
		</button>
		<button class="col-spacer-w5"></button>
		<button id="pdaObPickingOFVConfirmBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
			<i data-domain-id="CONF"></i>
		</button>
	</div>

</div>

<!-- end page container -->
<script src="/js/views/pda/outbound/pdaObPickingOFV.js"></script>
