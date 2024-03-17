<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="pdaObProgressContainer" class="container" >
	<div id="pdaObProgressHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">
			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="OB_YMD"></span>
					<div id="pdaObProgressObYmdDatePicker" class="col-xs-w100 input-group-sm date">
						<input id="pdaObProgressObYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
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
				    <span class="input-group-addon col-xs-w30" data-domain-id="ITEM_CLASS"></span>
				        <select id="pdaObProgressLargeClassCd" class="form-control input-sm col-xs-w50 col-sm-w50 p-0 input-medium">
				            <option value="" data-domain-id=""></option>
				        </select>
				        <select id="pdaObProgressMiddleClassCd" class="form-control input-sm col-xs-w50 col-sm-w50 p-0 input-medium">
				            <option value="" data-domain-id=""></option>
				        </select>
<!-- 				        <select id="pdaObProgressSku" class="form-control input-sm p-0 input-medium" >
				            <option value="" data-domain-id=""></option>
				        </select> -->
			   </div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="OB_GBN"></span>
					<select id="pdaObProgressObGbnCd" class="form-control input-sm">
                    	<option value=""> </option>
					</select>
				</div>
			</div>
		</form>
	</div>
	<div id="pdaObProgressHGridGrp" class="col-xs-w100">
		<table id="pdaObProgressHGrid" class="pda-program-detail">
		</table>
	</div>

 	<div id="pdaObProgressDGridGrp" class="col-xs-w100">
		<table id="pdaObProgressDGrid" class="pda-program-detail">
		</table>
	</div>

</div>

<!-- end page container -->
<script src="/js/views/pda/outbound/pdaObProgress.js"></script>

