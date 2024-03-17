<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaRiExamContainer" class="container" >
		<div id="pdaRiExamHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="RI_NO"></span>
						<input id="pdaRiExamRiNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaRiExamRiNoSearchBtn" >
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaRiExamItemCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="STORE_NM"></span>
						<input id="pdaRiExamStoreNm" type="text" class="form-control input-sm" readonly autocomplete="off" />
					</div>
				</div>
			</form>
		</div>
		<div id="pdaRiExamHGridGrp" class="col-xs-w100">
			<table id="pdaRiExamHGrid" class="pda-program-detail">
			</table>
		</div>
		<div id="pdaRiExamBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaRiExamAllCheckBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
				<i data-domain-id="ALL_SEL_BTN" > </i>
			</button>
			<button class="col-spacer-w5"></button>
			<button id="pdaRiExamDeleteBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
				<i data-domain-id="DEL_BTN" > </i>
			</button>
			<button class="col-spacer-w5"></button>
			<button id="pdaRiExamConfirmBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
				<i data-domain-id="EXAM_CONF"></i>
			</button>

		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/returnInbound/pdaRiExam.js"></script>
