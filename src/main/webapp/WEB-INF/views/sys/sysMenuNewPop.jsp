<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title">메뉴 등록</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body">
	        <form class="form-horizontal">
                <input id="authGroupSeq" type="hidden"  >
                <input id="authGroupModFlag" type="hidden"  >

	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8" data-domain-id="TOP_MENU">상위메뉴</label>
	                <div class="col-md-10">
	                    <select id="popMenuParentSeq" class="form-control">
	                        <option value="0" data-domain-id="TOP_LEVEL" >최상위</option>
	                    </select>
	                </div>
	            </div>
	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8">메뉴명</label>
	                <div class="col-md-10">
	                    <input  id="popMenuNm"  type="text" class="form-control" >
	                </div>
	            </div>
	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8">도메인아이디</label>
	                <div class="col-md-10">
	                    <input  id="popDomainId"  type="text" class="form-control" >
	                </div>
	            </div>
	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8">프로그램코드</label>
	                <div class="col-md-10">
	                    <input id="popMenuProCd"  type="text" class="form-control" >
	                </div>
	            </div>
	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8">순번</label>
	                <div class="col-md-10">
	                    <input id="popMenuOrder"  type="text" class="form-control" >
	                </div>
	            </div>
	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8" id="popMenuIconLabel" ><i class="" ></i> 아이콘</label>
	                <div class="col-md-10">
	                    <input id="popMenuIcon" type="text" class="form-control" >
	                </div>
	            </div>
	            <div class="form-group m-b-10">
	                <label class="col-md-2 p-t-8">사용여부</label>
	                <div class="col-md-10">
	                    <label class="radio-inline">
	                        <input type="radio" name="popMenuUseYn" value="Y" checked />
	                        Y
	                    </label>
	                    <label class="radio-inline">
	                        <input type="radio" name="popMenuUseYn" value="N" />
	                        N
	                    </label>
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture"  data-domain-id="CLOSE_BTN" >닫기</a>
	<a href="javascript:;" id="menuPopupSaveBtn" class="btn btn-sm btn-success"  data-domain-id="SAVE_BTN" >저장</a>
</div>

<script type="text/javascript">

</script>
</html>