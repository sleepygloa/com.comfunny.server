<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaObTotalPickingContainer" class="container" >
		<div id="pdaObTotalPickingHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="WAVE_NO"></span>
						<input id="pdaObTotalPickingWaveNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObTotalPickingWaveNoSearchBtn" >
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaObTotalPickingItemCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>

			</form>
		</div>

		<div id="pdaObTotalPickingHGridGrp" class="col-xs-w100">
			<table id="pdaObTotalPickingHGrid" class="pda-program-detail">
			</table>
		</div>

		<div id="pdaObTotalPickingBtnGrp" class="col-xs-w100 pda-bottom-group" >
<!-- 			<button id="pdaObTotalPickingSearchBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
				<i data-domain-id="SEARCH_BTN" > </i>
			</button>
			<button class="col-spacer-w5"></button> -->
			<button id="pdaObTotalPickingDivideBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary" data-domain-id="DIV">
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/outbound/pdaObTotalPicking.js"></script>
