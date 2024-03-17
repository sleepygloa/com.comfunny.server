<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="pdaObPickingContainer" class="container" >
	<div id="pdaObPickingHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="OB_NO"></span>
					<input id="pdaObPickingObNo" type="text" class="form-control input-sm" autocomplete="off" />
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObPickingObNoSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="STORE"></span>
					<input id="pdaObPickingStoreNm" type="text" class="form-control input-sm" readonly autocomplete="off" />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaObPickingPltId" type="text" class="form-control input-sm" autocomplete="off" />
				</div>
			</div>
		</form>
	</div>

	<div id="pdaObPickingHGridGrp" class="col-xs-w100">
		<table id="pdaObPickingHGrid" class="pda-program-detail">
		</table>
	</div>
</div>

<!-- end page container -->
<script src="/js/views/pda/outbound/pdaObPicking.js"></script>
