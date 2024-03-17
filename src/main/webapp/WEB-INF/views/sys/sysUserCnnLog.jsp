<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="sysUserCnnLogContainer" class="container" >
    <div id="sysUserCnnLogHeaderGrp" class="col-xs-w100">
        <form class="form-inline" onsubmit="return false;">

            <div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
                <div class="input-group input-group-sm col-xs-w100">
                    <span class="input-group-addon col-xs-w30" data-domain-id="USER_NM"></span>
                    <input id="sysUserCnnLogUserId" type="text" class="form-control input-sm" autocomplete="off" />
                </div>
            </div>
        </form>
    </div>
    <!-- 중복되는 부분 -->
    <div class="form-group col-xs-w100 m-b-5">
        <div class="input-group pull-right">
            <button id="sysUserCnnLogHSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
                <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
            </button>
            <button id="sysUserCnnLogHExcelBtn" type="button" class="btn btn-sm btn-primary"
            <%--						data-authRule="AUTH_DOWN"--%>
            >
                <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
            </button>
        </div>
    </div>

    <!-- 그리드 -->
    <div id="sysUserCnnLogHGridGrp" class="col-xs-w100 m-b-5">
        <table id="sysUserCnnLogHGrid" class="pda-program-detail"></table>
        <div id="sysUserCnnLogHGridNavi"></div>
    </div>

</div>
<script src="/js/views/sys/sysUserCnnLog.js"></script>
