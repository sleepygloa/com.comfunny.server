<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="view-form">
		<form class="form-horizontal  form-bordered">
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10" >
		        	<p class="form-control-static">버텍스 프레임 워크</p>
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
		        <label class="col-md-2 control-label">최대 활성화 Tab</label>
		        <div class="col-md-10">
		        	<div class="col-xs-4">
						<input type="text" id="customValue_rangeSlider_Form" name="default_rangeSlider" value="" />
					</div>
					<button type="button" id="programSaveRowBtn"  class="btn btn-sm btn-success">
						<i class="fa fa-download"></i> <i data-domain-id="SAVE_BTN" >저장</i>
					</button>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">내용</label>
		        <div class="col-md-10">
		            <textarea class="form-control" placeholder="Textarea" rows="5"></textarea>
		        </div>
		    </div>
		</form>
	</div>
	<div class="search-form clearfix">
		<form class="form-horizontal">
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <p class="form-control-static">email@example.com</p>
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">내용</label>
		        <div class="col-md-10">
		            <textarea class="form-control" placeholder="Textarea" rows="5"></textarea>
		        </div>
		        <select class="form-group" id="printDriverTestSelect" >
		        	<option>프린터 없음</option>
		        </select>
		        <a class="btn btn-default" id="printDriverTest" >프린터 드라이버 테스트 </a>

		        <select class="form-group" id="printCmdSocketTestSelect" >
		        	<option value="10.10.21.3">신도리코</option>
		        	<option value="10.10.21.240">운영팀라벨기</option>
		        </select>

		        <a class="btn btn-default" id="printSocketCmd"  >프린터 드라이버 테스트 </a>
		    </div>
		</form>
	</div>
	<div class="grid-wrapper" >
	<table id="systemProgramGrid"  ></table>
	<div id="systemProgramGridNavi"></div>
</div>
<script src="/js/views/template/common_form.js"></script>
</body>
</html>