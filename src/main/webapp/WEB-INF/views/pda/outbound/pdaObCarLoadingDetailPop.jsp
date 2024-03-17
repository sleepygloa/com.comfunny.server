<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Bootstrap Modal Common -->


<html>

<head>
<style>
.pdaObCarLoadingDetailSpan{
	height:20px !important;
	padding:0px 10px !important;
	font-size:0.9em !important;
}

.pdaObCarLoadingDetailInput{
	height:20px !important;
	font-size:0.9em !important;
}
.pdaObCarLoadingDetailBtn{
	height:20px !important;
	padding:0px !important;
}
</style>
</head>


	<body class="popupContainer">
		<div class="modal-header ">
			<button type="button" class="close" data-close-btn="ture" ><i class="material-icons">arrow_back</i></button>
			<h4 class="modal-title" ></h4>
		</div>
		<div class="modal-body">
<!-- Bootstrap Modal Common  End -->

			<div id="pdaObCarLoadingDetailPopContainer" class="container" >
				<div id="pdaObCarLoadingDetailPopHeaderGrp" class="col-xs-w100">
					<form class="form-inline" onsubmit="return false;">
						<input type="hidden" id="pdaObCarLoadingDetailPopPickTotQty" value="">
						<input type="hidden" id="pdaObCarLoadingDetailPopPickBoxQty" value="">


						<!-- <div class="col-xs-w100 col-sm-w50 col-md-w33f3form-group">
							<span id="pdaObCarLoadingDetailPopObNo" class="input-group-addon col-xs-w100 span-split" ></span>
						</div> -->
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30 pdaObCarLoadingDetailSpan" data-domain-id="STORE_NM"></span>
								<input id="pdaObCarLoadingDetailPopStoreCd" type="text" class="form-control input-sm pdaObCarLoadingDetailInput" autocomplete="off" style="display:none;" />
								<input id="pdaObCarLoadingDetailPopStoreNm" type="text" class="form-control input-sm pdaObCarLoadingDetailInput" autocomplete="off" disabled readonly />
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100 ">
								<span class="input-group-addon col-xs-w30 pdaObCarLoadingDetailSpan" data-domain-id="OB_NO"></span>
								<input id="pdaObCarLoadingDetailPopObNo" type="text" class="form-control input-sm pdaObCarLoadingDetailInput" autocomplete="off" disabled readonly />
							</div>
						</div>
<!-- 						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30" data-domain-id="PICK_ZONE_LOC"></span>
								<input id="pdaObCarLoadingDetailPopPickingZone" type="text" class="form-control input-sm" autocomplete="off" disabled readonly />
							</div>
						</div> -->
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
							<div class="col-xs-w100 input-group input-group-sm ">
								<span class="input-group-addon col-xs-w30 pdaObCarLoadingDetailSpan" data-domain-id="UOM_PKQTY"></span>
								<input id="pdaObCarLoadingDetailPopUom" type="text"  class="form-control input-sm  col-xs-w50 col-sm-w50 pdaObCarLoadingDetailInput"  autocomplete="off" readonly/>
								<input id="pdaObCarLoadingDetailPopPkqty" type="text"  class="form-control input-sm col-xs-w50 col-sm-w50 pdaObCarLoadingDetailInput"  autocomplete="off" readonly/>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30 pdaObCarLoadingDetailSpan" data-domain-id="ITEM_CD"></span>
								<input id="pdaObCarLoadingDetailPopItemCd" type="text" class="form-control input-sm pdaObCarLoadingDetailInput" autocomplete="off"/>
							</div>
						</div>
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="input-group input-group-sm col-xs-w100">
								<span class="input-group-addon col-xs-w30 pdaObCarLoadingDetailSpan" data-domain-id="ITEM"></span>
								<input id="pdaObCarLoadingDetailPopItemNm" type="text" class="form-control input-sm pdaObCarLoadingDetailInput" autocomplete="off" disabled />
							</div>
						</div>
<!-- 						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
							<div class="col-xs-w100 input-group input-group-sm ">
								<span class="input-group-addon col-xs-w30" data-domain-id="LOAD_QTY"></span>
								<input id="pdaObCarLoadingDetailPopLoadBoxQty" type="text" style = "text-align:right;" class="form-control input-sm  col-xs-w50 col-sm-w50"  autocomplete="off"/>
								<input id="pdaObCarLoadingDetailPopLoadEaQty" type="text" style = "text-align:right;" class="form-control input-sm col-xs-w50 col-sm-w50"  autocomplete="off"/>
							</div>
						</div> -->
						<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
						    <div class="input-group input-group-sm col-xs-w100">

						        <span class="input-group-addon col-xs-w30 pdaObCarLoadingDetailSpan" data-domain-id="LOAD_QTY"></span>
						        <div class="input-group input-group-sm col-xs-w70">
						            <input id="pdaObCarLoadingDetailPopLoadBoxQty" type="number" class="form-control input-sm col-xs-w100 pdaObCarLoadingDetailInput" autocomplete="off" disabled />
						            <div class="input-group-btn">
						                <button  id="pdaObCarLoadingDetailPopLoadBoxQtyBtn" type="button" class="btn btn-sm btn-primary pdaObCarLoadingDetailBtn" style="margin-left:5px;"  >
						                </button>
						            </div>
						        </div>
						        <div class="input-group input-group-sm col-xs-w20 pull-right">
									<button id="pdaObCarLoadingDetailPopDelBtn" type="button" class="col-xs-w100 btn btn-sm btn-danger pdaObCarLoadingDetailBtn" >
										<i data-domain-id="DEL_BTN" > </i>
									</button>
						        </div>
<!-- 						        <div class="input-group input-group-sm col-xs-w50">
						            <input id="pdaObCarLoadingDetailPopLoadEaQty" type="number" class="form-control input-sm col-xs-w100" autocomplete="off"  />
						            <div class="input-group-btn">
						                <button id="pdaObCarLoadingDetailPopLoadEaQtyBtn"  type="button" class="btn btn-sm btn-primary" >
						                </button>
						            </div>
						        </div> -->

						    </div>
						</div>
					</form>
				</div>

				<div id="pdaObCarLoadingDetailPopHGridGrp" class="col-xs-w100">
					<table id="pdaObCarLoadingDetailPopHGrid" class="pda-program-detail">
					</table>
				</div>

				<div id="pdaObCarLoadingDetailPopBtnGrp" class="col-xs-w100 pda-bottom-group">
					<button id="pdaObCarLoadingDetailPopSaveBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary">
						<i data-domain-id="SAVE_BTN" > </i>
					</button>
				</div>

			</div>

		</div>
		<!-- end page container -->
		<script src="/js/views/pda/outbound/pdaObCarLoadingDetailPop.js"></script>

<!-- Bootstrap Modal Common -->
	</body>
</html>
<!-- Bootstrap Modal Common End -->
