<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStPltMergeContainer" class="container" >
	<div id="pdaStPltMergeHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="TGT_PLT_ID"></span>
					<input id="pdaStPltMergeTgtPltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="MERGE_PLT_ID"></span>
					<input id="pdaStPltMergeMergePltId" type="text" class="form-control input-sm"  autocomplete="off"/>
				</div>
			</div>
		</form>
	</div>
	<div id="pdaStPltMergeHGridGrp" class="col-xs-w100">
		<table id="pdaStPltMergeHGrid" class="pda-program-detail">
		</table>
	</div>
	<div id="pdaStPltMergeBtnGrp" class="col-xs-w100 pda-bottom-group" >
		<button id="pdaStPltMergeAddBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="ADD_BTN" > </i>
		</button>
		<button class="col-spacer-w5"></button>
		<button id="pdaStPltMergeBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="MERGE_BTN" > </i>
		</button>
	</div>
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStPltMerge.js"></script>
