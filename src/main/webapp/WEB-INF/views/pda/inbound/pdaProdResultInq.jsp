<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<style>

.gridAndTable > thead > tr, .gridAndTable > thead > tr >td,
.gridAndTable > tbody > tr, .gridAndTable > tbody > tr >td {
	size:1em;
	height:20px;
	border : 1px solid #DDDDDD;
}
.gridAndTable{
	border : 1px solid gray;
	margin: 5px 0px;

}
.input-group-addon{
	display:table-cell;
}
.divTable{
	vertical-align:middle;
	height:100%;
}
.spanItemList{
    word-break: break-all;
    display: -webkit-box;
    width: 155px !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden
   }
td[id$=Qty]{
	text-align:right;
	padding-right:10px;
}
</style>

	<div id="pdaProdResultInqContainer" class="container" >
		<div id="pdaProdResultInqHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

			<!-- fold -->
				<div class="col-xs-12 fold active">
	 				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
						<div class="input-group input-group-sm col-xs-w100">
							<span class="input-group-addon col-xs-w30" data-domain-id="PROD_YMD"></span>
							<div id="pdaProdResultInqProdYmdDatePicker" class="col-xs-w100 input-group-sm date">
								<input id="pdaProdResultInqProdYmd" type="text" class="form-control input-sm" readonly />
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
							<span class="input-group-addon col-xs-w30" data-domain-id="PROD_DEPT"></span>
							<select id="pdaProdResultInqProdDept" class="form-control input-sm"></select>
						</div>
					</div>

					<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
						<div class="input-group input-group-sm col-xs-w100">
							<span class="input-group-addon col-xs-w30" data-domain-id="PROD_LINE"></span>
							<select id="pdaProdResultInqProdLine" class="form-control input-sm"></select>
						</div>
					</div>

					<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
						<div class="input-group input-group-sm col-xs-w100">
							<span class="input-group-addon col-xs-w30" data-domain-id="PROD_GRP"></span>
							<select id="pdaProdResultInqProdGrp" class="form-control input-sm"></select>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 foldToggle m-b-20"></div>

				<div class="col-xs-w100 form-group" style="height:50px">
					<div class="input-group input-group-sm col-xs-w100 divTable">
						<span class="input-group-addon col-xs-w30 spanDiv" data-domain-id="ITEM_CD"></span>
						<!-- <span class="input-group-addon col-xs-w20" data-domain-id="ITEM_CD"></span> -->
						<div class="input-group divTable">
							<!-- <span class="input-group-addon">◀</span>
							<input id="pdaProdExamItemCd" type="text" class="form-control input-md" autocomplete="off" />
							<span class="input-group-addon">▶</span> -->
							<span id="pdaProdResultInqLeftBtn" class="input-group-addon col-xs-w5 fa fa-angle-left"></span>
							<div id="pdaProdResultInqItemCd" class="form-group col-xs-w100 spanItemList" ></div>
							<span id="pdaProdResultInqRightBtn" class="input-group-addon col-xs-w5 fa fa-angle-right" ></span>
						</div>
					</div>
				</div>


			</form>
		</div>
		<div id="pdaProdResultInqHGridGrp" class="col-xs-w100">
			<table id="pdaProdResultInqHGrid" class="pda-program-detail">
			</table>

			<table class="col-xs-w100 gridAndTable" style="border:1px solid gray; text-align:center;">
				<thead>
					<tr>
						<td class="col-xs-w50"></td>
						<td class="col-xs-w25" data-domain-id="PLT"></td>
						<td class="col-xs-w25" data-domain-id="BOX"></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="col-xs-w50" data-domain-id="PLAN"></td>
						<td class="col-xs-w25" id="pdaProdResultInqPlanPltQty"></td>
						<td class="col-xs-w25" id="pdaProdResultInqPlanBoxQty"></td>

					</tr>
					<tr>
						<td class="col-xs-w50" data-domain-id="RESULT"></td>
						<td class="col-xs-w25" id="pdaProdResultInqResultPltQty"></td>
						<td class="col-xs-w25" id="pdaProdResultInqResultBoxQty"></td>

					</tr>
					<tr>
						<td class="col-xs-w50" data-domain-id="DIFFR"></td>
						<td class="col-xs-w25" id="pdaProdResultInqDiffrPltQty"></td>
						<td class="col-xs-w25" id="pdaProdResultInqDiffrBoxQty"></td>

					</tr>
				</tbody>


			</table>
		</div>
		<div id="pdaProdResultInqBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaProdResultDeleteBtn" type="button" class="col-xs-w20 btn btn-sm btn-danger" data-authRule="AUTH_DEL">
				<i data-domain-id="DEL_BTN"></i>
			</button>
			<button class="col-spacer-w5" data-authRule="AUTH_DEL"></button>
			<button id="pdaProdResultInqPrintBtn" type="button" class="col-xs-w70 btn btn-sm btn-primary pull-right">
				<i data-domain-id="LABEL_RE_PRINT_BTN"></i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/inbound/pdaProdResultInq.js"></script>
