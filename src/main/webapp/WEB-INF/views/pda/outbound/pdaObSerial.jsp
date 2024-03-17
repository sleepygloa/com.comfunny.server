<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="pdaObSerialContainer" class="container" >
		<div id="pdaObSerialHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="OB_NO"></span>
						<input id="pdaObSerialObNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObSerialObNoSearchBtn" >
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CD"></span>
						<input id="pdaObSerialItemCd" type="text" class="form-control input-sm" autocomplete="off"  />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">

					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="OB_SERIAL_NO"></span>
						<input id="pdaObSerialObSerialNo" type="text" class="form-control input-sm" autocomplete="off" />
						<div class="input-group-btn">
						  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObSerialObSerialNoAddBtn" >
						  		<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="col-xs-w50 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w60 col-sm-w30" data-domain-id="EXAM_QTY"></span>
						<input id="pdaObSerialPickQty" type="text" class="form-control input-sm"  autocomplete="off" readonly />
					</div>
				</div>

				<div class="col-xs-w50 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w60 col-sm-w30" data-domain-id="SCAN_QTY"></span>
						<input id="pdaObSerialScanQty" type="text" class="form-control input-sm"  autocomplete="off" readonly />
					</div>
				</div>

			</form>
		</div>

		<div id="pdaObSerialHGridGrp" class="col-xs-w100">
			<table id="pdaObSerialHGrid" class="pda-program-detail">
			</table>
		</div>

		<div id="pdaObSerialBtnGrp" class="col-xs-w100 pda-bottom-group" >
			<button id="pdaObSerialDeleteBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
				<i data-domain-id="DEL_BTN"></i>
			</button>
			<button class="col-spacer-w5"></button>
			<button id="pdaObSerialSaveBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
				<i data-domain-id="SAVE_BTN"></i>
			</button>
		</div>
	</div>


	<!-- end page container -->
	<script src="/js/views/pda/outbound/pdaObSerial.js"></script>
