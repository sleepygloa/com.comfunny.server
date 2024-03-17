<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="pdaStPltHistInquiryContainer" class="container" >
	<div id="pdaStPltHistInquiryHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="PLT_ID"></span>
					<input id="pdaStPltHistInquiryPltId" type="text"  maxlength="12"  class="form-control input-sm"  autocomplete="off" />
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">

					<span class="input-group-addon col-xs-w30" data-domain-id="STOCK_QTY"></span>
					<div class="input-group input-group-sm col-xs-w100">
						<input id="pdaStPltHistInquiryStockQty" type="text" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
						<div class="input-group-btn" style="right:60px;">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStPltHistInquiryStockQtyUom" style="width:70px;padding-left:0px;text-align:right;">
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
					<input id="pdaStPltHistInquiryItemCd" type="text"    class="form-control input-sm" style="color:#555;background:#e5e9ed;" autocomplete="off" disabled readonly/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_NM"></span>
					<input id="pdaStPltHistInquiryItemNm" type="text"    class="form-control input-sm"  autocomplete="off" disabled readonly/>
				</div>
			</div>


			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">

					<span class="input-group-addon col-xs-w30" data-domain-id="WORK_QTY"></span>
					<div class="input-group input-group-sm col-xs-w100">
						<input id="pdaStPltHistInquiryWorkQty" type="text" class="form-control input-sm col-xs-w100" autocomplete="off" readonly />
						<div class="input-group-btn" style="right:60px;">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaStPltHistInquiryUom" style="width:70px;padding-left:0px;text-align:right;">
							</button>
						</div>
					</div>
				</div>
			</div>

<!-- 			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="col-xs-w100 input-group input-group-sm ">
						<span class="input-group-addon col-xs-w30" data-domain-id="UOM_PKQTY"></span>
						<input id="pdaStPltHistInquiryUom" type="text" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
						<input id="pdaStPltHistInquiryPkqty" type="text" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off" disabled readonly/>
				</div>
			</div> -->
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_ST"></span>
					<input id="pdaStPltHistInquiryItemStCd" type="text"    class="form-control input-sm" style="color:#555;background:#e5e9ed;" autocomplete="off" disabled readonly/>
					<!-- <select id="pdaStPltHistInquiryItemStCd" class="form-control input-sm"  disabled>
					</select>-->
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_LOT"></span>
					<input id="pdaStPltHistInquiryMakeLot" type="text"    class="form-control input-sm"   autocomplete="off" disabled readonly/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="MAKE_YMD"></span>
					<input id="pdaStPltHistInquiryMakeYmd" type="text"    class="form-control input-sm" style="color:#555;background:#e5e9ed;" autocomplete="off" disabled readonly/>
<!-- 					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" >
					  		<i class="fa fa-calendar"></i>
						</button>
					</div> -->
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="DIST_EXPIRY_YMD"></span>
					<input id="pdaStPltHistInquiryDistExpiryYmd" type="text"    class="form-control input-sm"  style="color:#555;background:#e5e9ed;"  autocomplete="off" disabled readonly/>
<!-- 					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" >
					  		<i class="fa fa-calendar"></i>
						</button>
					</div> -->
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR1"></span>
					<input id="pdaStPltHistInquiryLotAttr1" type="text"   class="form-control input-sm"  autocomplete="off" disabled readonly />
<!-- 					<select id="pdaStPltHistInquiryLotAttr1" class="form-control input-sm"  disabled>
					</select> -->
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR2"></span>
					<input id="pdaStPltHistInquiryLotAttr2" type="text"   class="form-control input-sm"  autocomplete="off" disabled readonly />
<!-- 					<select id="pdaStPltHistInquiryLotAttr2" class="form-control input-sm"  disabled>
					</select> -->
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR3"></span>
					<input id="pdaStPltHistInquiryLotAttr3" type="text"   class="form-control input-sm"  autocomplete="off" disabled readonly />
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR4"></span>
					<input id="pdaStPltHistInquiryLotAttr4" type="text"   class="form-control input-sm"  autocomplete="off" disabled readonly/>
				</div>
			</div>
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="LOT_ATTR5"></span>
					<input id="pdaStPltHistInquiryLotAttr5" type="text"   class="form-control input-sm"  autocomplete="off" disabled readonly/>
				</div>
			</div>
		</form>
	</div>
	<div id="pdaStPltHistInquiryHGridGrp" class="col-xs-w100">
		<table id="pdaStPltHistInquiryHGrid" class="pda-program-detail">
		</table>
	</div>
<!-- 	<div id="pdaStPltHistInquiryBtnGrp" class="pda-bottom-group" >
		<button id="pdaStPltHistInquiryBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
			<i data-domain-id="AUTH_VIEW" > </i>
		</button>
	</div> -->
</div>
<!-- end page container -->
<script src="/js/views/pda/stock/pdaStPltHistInquiry.js"></script>

