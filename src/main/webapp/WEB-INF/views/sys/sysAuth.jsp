<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<div id="sysCodeContainer" class="container" >
	<div id="sysCodeHeaderGrp" class="col-xs-w100">
		<form class="form-inline" onsubmit="return false;">

			<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-Grp">
				<div class="input-group input-group-sm col-xs-w100">
					<span class="input-group-addon col-xs-w30" <%--data-domain-id=""--%>>사원명</span>
					<input type="text" class="form-control input-sm" size="30" id="authUserSearchWords" placeholder="사원명, 사번, 아이디,직무"  autocomplete="off" >
				</div>
			</div>
		</form>
	</div>


	<!-- 중복되는 부분 -->
	<div class="form-group col-xs-w100 m-b-5">
		<div class="input-group pull-right">
			<button id="sysAuthGrpModBtn" type="button" data-authRule="AUTH_MOD"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-edit"></i><i data-domain-id="SEARCH_BTN" > </i>그룹수정
			</button>
			<button id="sysAuthGrpAddBtn" type="button" data-authRule="AUTH_NEW"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-plus"></i><i data-domain-id="SEARCH_BTN" > </i>그룹등록
			</button>
			<button id="sysAuthSaveRowBtn" type="button" data-authRule="AUTH_NEW"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-download"></i><i data-domain-id="SAVE_BTN" > </i>저장
			</button>
		</div>
	</div>

<%--	<div class="col-xs-w100">--%>
<%--		<select id="authUserLeft"  multiple class="form-control" style="height: 190px" >--%>
<%--		</select>--%>
<%--		<select id="authUserRight" multiple class="form-control" style="min-height: 190px">--%>
<%--		</select>--%>

<%--		<button type="button" id="authAddUserSelected" title="선택 추가" class="btn btn-success m-t-10" style="min-width: 65px ">--%>
<%--			<i class="fa fa-angle-right"></i>--%>
<%--		</button>--%>
<%--		<button type="button" id="authRemoveUserSelected" title="선택 제거" class="btn btn-success m-t-10" style="min-width: 65px ">--%>
<%--			<i class="fa fa-angle-left"></i>--%>
<%--		</button>--%>
<%--		<button type="button" id="authAddUserAll" title="모두 추가"  class="btn btn-success m-t-10" style="min-width: 65px ">--%>
<%--			<i class="fa fa-angle-double-right"></i>--%>
<%--		</button>--%>
<%--		<button type="button" id="authRemoveUserAll" title="모두 제거" class="btn btn-success m-t-10" style="min-width: 65px ">--%>
<%--			<i class="fa fa-angle-double-left"></i>--%>
<%--		</button>--%>

<%--	</div>--%>


	<!-- 그리드 -->
	<div class="col-xs-w100">
		<div id="sysAuthHGridGrp" class="col-xs-w50 m-b-5">
			<table id="sysAuthHGrid" class="pda-program-detail"></table>
			<div id="sysAuthHGridNavi"></div>
		</div>
		<div id="sysAuthDGridGrp" class="col-xs-w50 m-b-5">
			<table id="sysAuthDGrid" class="pda-program-detail"></table>
			<div id="sysAuthDGridNavi"></div>
		</div>
	</div>
	<div class="col-xs-w100">
		<div id="sysAuthD2GridGrp" class="col-xs-100 m-b-5">
			<table id="sysAuthD2Grid" class="pda-program-detail"></table>
			<div id="sysAuthD2GridNavi"></div>
		</div>
	</div>
</div>


<script src="/js/views/sys/sysAuth.js"></script>