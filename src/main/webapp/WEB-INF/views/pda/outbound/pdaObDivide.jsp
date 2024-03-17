<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaObDivideContainer" class="container" >
		<div id="pdaObDivideHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="WAVE_NO"></span>
						<input id="pdaObDivideWaveNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObDivideWaveNoSearchBtn" >
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaObDivideItemCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>

			</form>
		</div>

		<div id="pdaObDivideHGridGrp" class="col-xs-w100">
			<table id="pdaObDivideHGrid" class="pda-program-detail">
			</table>
		</div>

		<div id="pdaObDivideBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaObDivideSearchBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
				<i data-domain-id="SEARCH_BTN" > </i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/outbound/pdaObDivide.js"></script>
