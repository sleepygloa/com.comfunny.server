<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
	<head>
		<style>
			.ui-jqgrid tr.jqgrow td{
				white-space:inherit;
			}
		</style>
	</head>

	<div id="pdaProdCloseContainer" class="container" >
		<div id="pdaProdCloseHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_YMD"></span>
						<div id="pdaProdCloseProdYmdDatePicker" class="col-xs-w100 input-group-sm date">
							<input id="pdaProdCloseProdYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
							<div class="input-group-btn">
							  	<button  type="button" class="btn btn-sm btn-primary" >
							  		<i class="fa fa-calendar"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_LINE"></span>
						<select id="pdaProdCloseProdLine" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_GRP"></span>
						<select id="pdaProdCloseProdGrp" class="form-control input-sm"></select>
					</div>
				</div>

			</form>
		</div>
		<div id="pdaProdCloseHGridGrp" class="col-xs-w100">
			<table id="pdaProdCloseHGrid" class="pda-program-detail">
			</table>
		</div>
		<div id="pdaProdCloseBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaProdCloseConfirmBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
				<i data-domain-id="PROD_CLOSE_BTN"></i>
			</button>
			<button id="pdaProdCloseEndBtn" type="button" class="col-xs-w100 btn btn-sm btn-danger" disabled style="display:none;">
				<i data-domain-id="PROD_CLOSE_END_BTN"></i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/inbound/pdaProdClose.js"></script>
