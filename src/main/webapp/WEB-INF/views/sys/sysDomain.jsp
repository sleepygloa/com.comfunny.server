<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div id="sysDomainContainer" class="container" >
    <div id="sysDomainHeaderGrp" class="col-xs-w100">
        <form class="form-inline" onsubmit="return false;">

            <div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
                <div class="input-group input-group-sm col-xs-w100">
                    <span class="input-group-addon col-xs-w30" data-domain-id="CODE_GROUP_NM"></span>
                    <input id="sysDomainDomainId" type="text" class="form-control input-sm" autocomplete="off" />
                </div>
            </div>
        </form>
    </div>
    <!-- 중복되는 부분 -->
    <div class="form-group col-xs-w100 m-b-5">
        <div class="input-group pull-right">
            <button id="sysDomainHSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
                <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
            </button>
            <button id="sysDomainHAddBtn" type="button" class="btn btn-sm btn-info m-r-5"
            <%--						data-authRule="AUTH_NEW"--%>
            >
                <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
            </button>
            <button id="sysDomainHSaveBtn"  type="button" class="btn btn-sm btn-success m-r-5"
            <%--						data-authRule="AUTH_NEW AUTH_MOD"--%>
            >
                <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
            </button>
            <button id="sysDomainHDelBtn" type="button" class="btn btn-sm btn-danger m-r-5"
            <%--						data-authRule="AUTH_DEL"--%>
            >
                <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
            </button>
            <button id="sysDomainHExcelBtn" type="button" class="btn btn-sm btn-primary"
            <%--						data-authRule="AUTH_DOWN"--%>
            >
                <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
            </button>
        </div>
    </div>

    <!-- 그리드 -->
    <div id="sysDomainHGridGrp" class="col-xs-w100 m-b-5">
        <table id="sysDomainHGrid" class="pda-program-detail"></table>
        <div id="sysDomainHGridNavi"></div>
    </div>

</div>
<script src="/js/views/sys/sysDomain.js"></script>
