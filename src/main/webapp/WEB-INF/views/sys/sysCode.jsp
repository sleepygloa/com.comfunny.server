<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="sysCodeContainer" class="container" >
	<div id="sysCodeHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="CODE_GROUP_NM"></span>
					<input id="sysCodeCodeGroupCd" type="text" class="form-control input-sm" autocomplete="off" />
					<div class="input-group-btn">
						<button  type="button" class="btn btn-sm btn-primary" id="sysCodeCodeGroupPop" >
							<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" data-domain-id="USE_YN"></span>
					<select id="sysCodeUseYn" class="form-control" >
						<option value=""></option>
					</select>
				</div>
			</div>

		</form>
	</div>
	<!-- 중복되는 부분 -->
	<div class="form-group col-xs-w100 m-b-5">
		<div class="input-group pull-right">
			<button id="sysCodeHSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
			</button>
			<button id="sysCodeHAddBtn" type="button" class="btn btn-sm btn-info m-r-5"
			<%--						data-authRule="AUTH_NEW"--%>
			>
				<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
			</button>
			<button id="sysCodeHSaveBtn"  type="button" class="btn btn-sm btn-success m-r-5"
			<%--						data-authRule="AUTH_NEW AUTH_MOD"--%>
			>
				<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
			</button>
			<button id="sysCodeHDelBtn" type="button" class="btn btn-sm btn-danger m-r-5"
			<%--						data-authRule="AUTH_DEL"--%>
			>
				<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
			</button>
			<button id="sysCodeHExcelBtn" type="button" class="btn btn-sm btn-primary"
			<%--						data-authRule="AUTH_DOWN"--%>
			>
				<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
			</button>
		</div>
	</div>

	<!-- 그리드 -->
	<div id="sysCodeHGridGrp" class="col-xs-w100 m-b-5">
		<table id="sysCodeHGrid" class="pda-program-detail"></table>
		<div id="sysCodeHGridNavi"></div>
	</div>


	<!-- 중복되는 부분 -->
	<div class="form-group col-xs-w100 m-b-5">
		<div class="input-group pull-right">
			<button id="sysCodeDAddBtn" type="button" class="btn btn-sm btn-info m-r-5"
			<%--						data-authRule="AUTH_NEW"--%>
			>
				<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
			</button>
			<button id="sysCodeDSaveBtn"  type="button" class="btn btn-sm btn-success m-r-5"
			<%--						data-authRule="AUTH_NEW AUTH_MOD"--%>
			>
				<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
			</button>
			<button id="sysCodeDDelBtn" type="button" class="btn btn-sm btn-danger m-r-5"
			<%--						data-authRule="AUTH_DEL"--%>
			>
				<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
			</button>
		</div>
	</div>

	<!-- 그리드 -->
	<div id="sysCodeDGridGrp" class="col-xs-w100 m-b-5">
		<table id="sysCodeDGrid" class="pda-program-detail"></table>
		<div id="sysCodeDGridNavi"></div>
	</div>
</div>
<script src="/js/views/sys/sysCode.js"></script>
