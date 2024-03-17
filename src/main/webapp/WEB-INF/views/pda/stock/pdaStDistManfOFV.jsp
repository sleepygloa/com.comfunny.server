<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="pdaStDistManfOFVContainer" class="container" >
	<div id="pdaStDistManfOFVHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="DIST_MANF_NO"></span>
					<input id="pdaStDistManfOFVDistManfNo" type="text" class="form-control input-sm" autocomplete="off" />
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStDistManfOFVDistManfNoSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM"></span>
					<input id="pdaStDistManfOFVItemCd" type="text" class="form-control input-sm" autocomplete="off" />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaStDistManfOFVPltId" type="text" class="form-control input-sm" autocomplete="off" />
				</div>
			</div>
		</form>
	</div>

	<div id="pdaStDistManfOFVHGridGrp" class="col-xs-w100">
		<table id="pdaStDistManfOFVHGrid" class="pda-program-detail">
		</table>
	</div>
	<div id="pdaStDistManfOFVDGridGrp" class="col-xs-w100">
		<table id="pdaStDistManfOFVDGrid" class="pda-program-detail">
		</table>
	</div>

</div>

<!-- end page container -->
<script src="/js/views/pda/stock/pdaStDistManfOFV.js"></script>
