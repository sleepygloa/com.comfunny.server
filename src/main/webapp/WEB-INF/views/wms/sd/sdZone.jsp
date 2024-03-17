<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="sdZoneContainer" class="container" >
		<div id="sdZoneHeaderGrp" class="col-xs-w100">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="AREA"></span>
						<input id="sdZoneZoneCd" type="text" class="form-control input-sm" autocomplete="off" />
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="USE_YN"></span>
						<select id="sdZoneUseYn" class="form-control" >
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
					<label id="tab1" ><input type="radio" name="sdZoneTab" value="1" />전체보기</label>
					<label id="tab2" ><input type="radio" name="sdZoneTab" value="2" />단계별</label>
				</div>
				<button id="sdZoneSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
					<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
				</button>
				<button id="sdZoneAddBtn" type="button" class="btn btn-sm btn-info m-r-5"
<%--						data-authRule="AUTH_NEW"--%>
				>
					<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
				</button>
				<button id="sdZoneSaveBtn"  type="button" class="btn btn-sm btn-success m-r-5"
<%--						data-authRule="AUTH_NEW AUTH_MOD"--%>
				>
					<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
				</button>
				<button id="sdZoneDelBtn" type="button" class="btn btn-sm btn-danger m-r-5"
<%--						data-authRule="AUTH_DEL"--%>
				>
					<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
				</button>
				<button id="sdZoneExcelBtn" type="button" class="btn btn-sm btn-primary"
<%--						data-authRule="AUTH_DOWN"--%>
				>
					<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
				</button>
			</div>
		</div>

		<div class="col-xs-w100">
			<div id="sdZoneHGridDiv" class="col-xs-w100">
				<!-- 그리드 -->
				<div id="sdZoneHGridGrp" class="col-xs-w100">
					<table id="sdZoneHGrid" class="pda-program-detail"></table>
					<div id="sdZoneHGridNavi"></div>
				</div></div>
			<div id="sdZoneLevelGridDiv" class="col-xs-w100">
				<!-- 그리드 -->
				<div id="sdZoneLevelDcGridGrp" class="col-xs-w20">
					<table id="sdZoneLevelDcGrid" class="pda-program-detail"></table>
					<div id="sdZoneLevelDcGridNavi"></div>
				</div>
				<!-- 그리드 -->
				<div id="sdZoneLevelAreaGridGrp" class="col-xs-w20">
					<table id="sdZoneLevelAreaGrid" class="pda-program-detail"></table>
					<div id="sdZoneLevelAreaGridNavi"></div>
				</div>
				<!-- 그리드 -->
				<div id="sdZoneLevelZoneGridGrp" class="col-xs-w60">
					<table id="sdZoneLevelZoneGrid" class="pda-program-detail"></table>
					<div id="sdZoneLevelZoneGridNavi"></div>
				</div>
			</div>
		</div>


	</div>
	<script src="/js/views/wms/sd/sdZone.js"></script>
