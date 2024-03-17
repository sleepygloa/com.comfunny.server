<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaIbSerialContainer" class="container" >
		<div id="pdaIbSerialHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="IB_NO"></span>
						<input id="pdaIbSerialIbNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbSerialIbNoSearchBtn" >
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaIbSerialItemCd" type="text" class="form-control input-sm" autocomplete="off"  />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">

					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="IB_SERIAL_NO"></span>
						<input id="pdaIbSerialIbSerialNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaIbSerialIbSerialNoAddBtn" >
						  		<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w50 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w60 col-sm-w30" data-domain-id="EXAM_QTY"></span>
						<input id="pdaIbSerialExamQty" type="text" class="form-control input-sm"  autocomplete="off" readonly />
					</div>
				</div>

				<div class="col-xs-w50 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w60 col-sm-w30" data-domain-id="SCAN_QTY"></span>
						<input id="pdaIbSerialScanQty" type="text" class="form-control input-sm"  autocomplete="off" readonly />
					</div>
				</div>

			</form>
		</div>

		<div id="pdaIbSerialHGridGrp" class="col-xs-w100">
			<table id="pdaIbSerialHGrid" class="pda-program-detail">
			</table>
		</div>

		<div id="pdaIbSerialBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaIbSerialDeleteBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
				<i data-domain-id="DEL_BTN"></i>
			</button>
			<button class="col-spacer-w5"></button>
			<button id="pdaIbSerialSaveBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
				<i data-domain-id="SAVE_BTN"></i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/inbound/pdaIbSerial.js"></script>
