<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStLocInquiryContainer" class="container" >
	<div id="pdaStLocInquiryHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOC"></span>
					<input id="pdaStLocInquiryLocCd" type="text"  maxlength="6" class="form-control input-sm"  autocomplete="off" />
				</div>
			</div>
		</form>
	</div>
	<div id="pdaStLocInquiryHGridGrp" class="col-xs-w100">
		<table id="pdaStLocInquiryHGrid" class="pda-program-detail">
		</table>
	</div>
	<div id="pdaStLocInquiryBtnGrp" class="pda-bottom-group" >
		<button id="pdaStLocInquirySearchBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="SEARCH_BTN" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStLocInquiry.js"></script>

