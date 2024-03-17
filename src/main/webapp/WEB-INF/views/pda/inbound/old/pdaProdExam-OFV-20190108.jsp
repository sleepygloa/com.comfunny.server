<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaProdExamContainer" class="container" >
		<div id="pdaProdExamHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_YMD"></span>
						<input id="pdaProdExamProdYmd" type="text" class="form-control input-sm" readonly />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" >
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_GRP"></span>
						<select id="pdaProdExamProdGrp" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_LINE"></span>
						<select id="pdaProdExamProdLine" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaProdExamItemCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
						<input id="pdaProdExamItemNm" type="text" class="form-control input-sm" autocomplete="off" readonly />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="QTY"></span>
						<input id="pdaProdExamQty" type="number" class="form-control input-sm" />
						<div class="input-group-btn">
						  	<button id="pdaProdExamUomCd"  type="button" class="btn btn-sm btn-primary" >
						  		<!-- <i class="fa fa-calendar"></i> -->
<!-- 						  		BOX -->
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="COUNTRY"></span>
						<input id="pdaProdExamCountryCd" type="text" class="form-control input-sm" readonly style="display:none;"/>
						<input id="pdaProdExamCountryNm" type="text" class="form-control input-sm" readonly style="background-color:white;"/>
						<div class="input-group-btn" id="pdaProdExamCountryBtn">
						  	<button  type="button" class="btn btn-sm btn-primary" >
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="DALAT"></span>
						<select id="pdaProdExamDalat" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="SHIFT_GROUP"></span>
						<!-- <select id="pdaProdExamShiftGrpCd" class="form-control input-sm"></select> -->
						<input id="pdaProdExamShiftGrpCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>

			</form>
		</div>
		<div id="pdaProdExamHGridGrp" class="col-xs-w100">
			<table id="pdaProdExamHGrid" class="pda-program-detail">
			</table>
		</div>
		<div id="pdaProdExamBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaProdExamConfirmBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
				<i data-domain-id="EXAM_CONF"></i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/inbound/pdaProdExam.js"></script>
