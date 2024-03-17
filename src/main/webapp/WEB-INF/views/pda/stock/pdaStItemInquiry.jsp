<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="pdaStItemInquiryContainer" class="container" >
	<div id="pdaStItemInquiryHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaStItemInquiryItemCd" type="text" class="form-control input-sm"  autocomplete="off" />
					<div class="input-group-btn">
					  	<button id="pdaStItemInquiryItemBtn" type="button" class="btn btn-sm btn-primary" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
					<input id="pdaStItemInquiryItemNm" type="text" class="form-control input-sm" style="text-align:center;" autocomplete="off" disabled readonly/>
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="col-xs-w100 input-group input-group-sm ">
						<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
						<input id="pdaStItemInquiryUom" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
						<input id="pdaStItemInquiryPkqty" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
				</div>
			</div>

<!-- 			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
					<input id="pdaStItemInquiryItemSt" type="text" class="form-control input-sm"  autocomplete="off" disabled readonly/>
				</div>
			</div> -->
		</form>
	</div>

	<div id="pdaStItemInquiryHGridGrp" class="col-xs-w100">
		<table id="pdaStItemInquiryHGrid" class="pda-program-detail">
		</table>
	</div>

	<div id="pdaStItemInquiryBtnGrp" class="pda-bottom-group" >
		<button id="pdaStItemInquiryBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="SEARCH_BTN" > </i>
		</button>
	</div>

</div>
<!-- end page container -->

<script src="/js/views/pda/stock/pdaStItemInquiry.js"></script>
