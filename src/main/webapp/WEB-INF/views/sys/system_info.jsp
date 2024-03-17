<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<!-- <div class="view-form" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i>
				</span>
			</div>
			중복되는 부분
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programCode" size="10" placeholder="">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programName" placeholder="">
				</div>
			</div>
		</form>
	</div> -->
	<div class="view-form">
		<form class="form-horizontal  form-bordered">
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">버텍스 프레임 워크</p>
		        </div>
		        <label class="col-md-2 control-label">Version</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">1.0.0.0.1</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">Server IP</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">192.168.0.1</p>
		        </div>
		        <label class="col-md-2 control-label">DataBase</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">Maria DB</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">WAS</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">Tomcat 8</p>
		        </div>
		        <label class="col-md-2 control-label">CPU</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">2Core 3GHz</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">MEMORY</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">32G</p>
		        </div>
		        <label class="col-md-2 control-label">HDD</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">12TB</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템 MODE</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">개발모드</p>
		        </div>
		        <label class="col-md-2 control-label">deploy</label>
		        <div class="col-md-4" >
		        	<button type="button" id="systemInfoDevDeployBtn"  class="btn btn-sm btn-danger">
							<i class="fa fa-refresh"></i> 개발
					</button>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">최대 활성화 Tab</label>
		        <div class="col-md-10">
		        	<div class="col-xs-4">
						<input type="text" id="customValue_rangeSlider" name="default_rangeSlider" value="" />
					</div>
						<button type="button" id="saveTabCountBtn"  class="btn btn-sm btn-success">
							<i class="fa fa-download"></i> <i data-domain-id="SAVE_BTN" >저장</i>
						</button>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">내용</label>
		        <div class="col-md-10">
		            <pre>
시스템 입니다.
감사합니다.
		            </pre>
		        </div>
		    </div>
		</form>
	</div>
<!-- <div class="grid-wrapper" > -->
<!-- 	<table id="systemInfoGrid"  ></table> -->
<!-- 	<div id="systemInfoGridNavi"></div> -->
<!-- </div> -->
<!-- <script src="/js/views/settings/system/system_info.js"></script> -->
<script src="/js/views/settings/system/system_info.js"></script>
</body>
</html>