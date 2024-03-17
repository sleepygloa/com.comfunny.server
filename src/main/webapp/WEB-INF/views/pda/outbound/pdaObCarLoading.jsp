<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="pdaObCarLoadingContainer" class="container" >
	<div id="pdaObCarLoadingHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="CAR_NO"></span>
					<input id="pdaObCarLoadingCarNo" type="text" class="form-control input-sm" autocomplete="off" />
					<div class="input-group-btn">
					  	<button  type="button" class="btn btn-sm btn-primary" id="pdaObCarLoadingCarNoSearchBtn" >
					  		<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div id="pdaObCarLoadingHGridGrp" class="col-xs-w100">
		<table id="pdaObCarLoadingHGrid" class="pda-program-detail">
		</table>
	</div>
	<div id="pdaObCarLoadingBtnGrp" class="col-xs-w100 pda-bottom-group" >
<!-- 		<button id="pdaObCarLoadingAllCheckBtn" type="button" class="col-xs-w30 btn btn-sm btn-primary">
			<i data-domain-id="ALL_SEL_BTN"></i>
		</button> -->
		<button id="pdaObCarLoadingBatchCreationBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="QTY_CONF_FNSH"></i>
		</button>
		<button class="col-spacer-w5"></button>
		<button id="pdaObCarLoadingConfirmBtn" type="button" class="col-xs-w47f5 btn btn-sm btn-primary">
			<i data-domain-id="CARLD_CONF"></i>
		</button>
	</div>
</div>

<!-- end page container -->
<script src="/js/views/pda/outbound/pdaObCarLoading.js"></script>

