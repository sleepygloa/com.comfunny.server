<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="sdLocContainer" class="container" >
		<div id="sdLocHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LOC"></span>
						<input id="sdLocLocCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="USE_YN"></span>
						<select id="sdLocUseYn" class="form-control" >
							<option value=""></option>
						</select>
					</div>
				</div>

			</form>
		</div>
		<!-- 중복되는 부분 -->
		<div class="form-group col-xs-w100 m-b-5">
			<div class="" style="display: flex;justify-content: flex-end;">
				<div class="col-xs-2">
					<label id="tab1" ><input type="radio" name="sdLocTab" value="1" />전체보기</label>
					<label id="tab2" ><input type="radio" name="sdLocTab" value="2" />단계별</label>
				</div>
				<button id="sdLocSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
					<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
				</button>
				<button id="sdLocAddBtn" type="button" class="btn btn-sm btn-info m-r-5"
<%--						data-authRule="AUTH_NEW"--%>
				>
					<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
				</button>
				<button id="sdLocSaveBtn"  type="button" class="btn btn-sm btn-success m-r-5"
<%--						data-authRule="AUTH_NEW AUTH_MOD"--%>
				>
					<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
				</button>
				<button id="sdLocDelBtn" type="button" class="btn btn-sm btn-danger m-r-5"
<%--						data-authRule="AUTH_DEL"--%>
				>
					<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
				</button>
				<button id="sdLocExcelBtn" type="button" class="btn btn-sm btn-primary"
<%--						data-authRule="AUTH_DOWN"--%>
				>
					<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
				</button>
			</div>
		</div>

		<div class="col-xs-w100">
			<div id="sdLocHGridDiv" class="col-xs-w100">
				<!-- 그리드 -->
				<div id="sdLocHGridGrp" class="col-xs-w100">
					<table id="sdLocHGrid" class="pda-program-detail"></table>
					<div id="sdLocHGridNavi"></div>
				</div></div>
			<div id="sdLocLevelGridDiv" class="col-xs-w100">
				<!-- 그리드 -->
				<div id="sdLocLevelDcGridGrp" class="col-xs-w20">
					<table id="sdLocLevelDcGrid" class="pda-program-detail"></table>
					<div id="sdLocLevelDcGridNavi"></div>
				</div>
				<!-- 그리드 -->
				<div id="sdLocLevelDcZoneGridGrp" class="col-xs-w20" >
					<table id="sdLocLevelDcZoneGrid" class="pda-program-detail"></table>
					<div id="sdLocLevelDcZoneGridNavi"></div>
				</div>
				<!-- 그리드 -->
				<div id="sdLocLevelDcZoneLocGridGrp" class="col-xs-w60" style="overflow: auto">
					<table id="sdLocLevelDcZoneLocGrid" class="pda-program-detail"></table>
					<div id="sdLocLevelDcZoneLocGridNavi"></div>
				</div>
			</div>
		</div>


	</div>
	<script src="/js/views/wms/sd/sdLoc.js"></script>
