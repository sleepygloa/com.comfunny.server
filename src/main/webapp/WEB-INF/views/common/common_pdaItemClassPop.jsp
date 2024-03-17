<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->
<html>
	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture"  ><i class="material-icons">arrow_back</i></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->
			<div id="pdaItemClassPopContainer" class="container" >

				<div id="pdaItemClassPopHeaderGrp" class="col-xs-w100" style="overflow-y:scroll">
					<form class="form-inline" onsubmit="return false;">
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
						    	<span class="input-group-addon col-xs-w30" data-domain-id="CATEGORY"></span>
						        <select id="pdaItemClassPopLargeClassCd" class="form-control input-sm p-0 input-medium">
<!-- 						            <option value="" data-domain-id=""></option> -->
						        </select>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
						    	<span class="input-group-addon col-xs-w30" data-domain-id="BRAND"></span>
						        <select id="pdaItemClassPopMiddleClassCd" class="form-control input-sm  p-0 input-medium">
						            <!-- <option value="" data-domain-id=""></option> -->
						        </select>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
						    	<span class="input-group-addon col-xs-w30" data-domain-id="SKU"></span>
						        <select id="pdaItemClassPopSmallClassCd" class="form-control input-sm  p-0 input-medium">
						            <!-- <option value="" data-domain-id=""></option> -->
						        </select>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
								<input id="pdaItemClassPopItemCd" type="text" class="form-control input-sm"  style="display:none;"/>
								<input id="pdaItemClassPopItemNm" type="text" class="form-control input-sm"  />
<!-- 						  		<div class="input-group-btn">
							  		<button  type="button" class="btn btn-sm btn-primary" id="pdaItemClassPopItemBtn" >
								  		<i class="fa fa-search"></i>
									</button>
								</div> -->
							</div>
						</div>

					</form>
				</div>

				<div id="pdaItemClassPopHGridGrp" class="col-xs-w100">
					<table id="pdaItemClassPopHGrid" class="pda-program-detail">
					</table>
				</div>
				<div id="pdaItemClassPopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaItemClassPopSearchBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="SEARCH_BTN" > </i>
					</button>
				</div>
			</div>
		</div>
		<!-- end page container -->
		<script src="/js/views/common/common_pdaItemClassPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
