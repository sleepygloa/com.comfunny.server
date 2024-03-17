<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaStDistManfOFVSetExamPopContainer" class="container" >
		<div id="pdaStDistManfOFVSetExamPopHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaStDistManfOFVSetExamPopItemCd" type="text" class="form-control input-sm col-xs-w100" autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
						<div id="pdaStDistManfOFVSetExamPopItemNm" class="form-control input-sm" style="height:60px;word-break: break-all;-webkit-line-clamp: 2;"></div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="QTY"></span>
						<input id="pdaStDistManfOFVSetExamPopQty" type="number" class="form-control input-sm" />
						<div class="input-group-btn">
						  	<button id="pdaStDistManfOFVSetExamPopUomCd"  type="button" class="btn btn-sm btn-primary" >
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
						<div id="pdaStDistManfOFVSetExamPopMakeYmdPicker" class="col-xs-w100 input-group-sm date">
							<input id="pdaStDistManfOFVSetExamPopMakeYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
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
						<span class="input-group-addon col-xs-w30" data-domain-id="DIST_EXPIRY_YMD"></span>
						<div id="pdaStDistManfOFVSetExamPopDistExpiryYmdPicker" class="col-xs-w100 input-group-sm date">
							<input id="pdaStDistManfOFVSetExamPopDistExpiryYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
							<div class="input-group-btn">
							  	<button  type="button" class="btn btn-sm btn-primary" >
							  		<i class="fa fa-calendar"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

			</form>
		</div>
	</div>

	<!-- end page container -->
	<script src="/js/views/pda/stock/pdaStDistManfOFVSetExamPop.js"></script>
