<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>파일 업로드
<!-- 					<small>Search</small> -->
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="file"  class="form-control input-sm" multiple id="tempFileUpload" size="10" placeholder="파일선택">
					<button id="tempFileSaveBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>저장
					</button>
					<button id="tempAppBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>App호출
					</button>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="searchBtn" type="submit" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>검색
				</button>
				<button type="submit" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i>행추가
				</button>
			</div>
			</form>
	</div>
	<div id="imgDiv" class="superbox" data-offset="54">
	    <div class="superbox-list"><img src="/img/gallery/gallery-1.jpg" data-img="/img/gallery/gallery-1.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-2.jpg" data-img="/img/gallery/gallery-2.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-3.jpg" data-img="/img/gallery/gallery-3.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-4.jpg" data-img="/img/gallery/gallery-4.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-5.jpg" data-img="/img/gallery/gallery-5.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-6.jpg" data-img="/img/gallery/gallery-6.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-7.jpg" data-img="/img/gallery/gallery-7.jpg" alt="" class="superbox-img" /></div>
	</div>
<script>
        $(document).ready(function () {
       	    $('.superbox').SuperBox();
       		var files = new Array();
        	
        	$("#tempAppBtn").click(function(){
        		if(confirm("호출하시겠습니까?")){
        			if(checkOs() == "ios"){
	        			window.loction = "testMessage:testMessage"; // ParagonApp.testMessage("1","호출됨"); //ios
        			}else if(checkOs() == "android"){
	        			window.ParagonApp.testMessage("1","호출됨"); // android
        			}
        		}
        	});
        	$("#tempFileSaveBtn").click(function(){
        		fnFileSave();
        	});
        	$("#tempFileUpload").change(function(){
        		
                
                var input = $(this);
        		
        		
	        	var infiles = input[0].files;
	        	
	        	for (var i = 0; i < infiles.length; i++) {
	        		var addfile = infiles[i];
	        		var fileNm = addfile.name;
	        		var fsize = addfile.size;
	        		files.push(addfile);
	        		console.log(fileNm);
	        		console.log(fsize.fileSizeFormat());
        		}
	        	
        		
        	});

        });

        function fnAppFileSave(){
        	fnFileSave();
        }
        
        function fnFileSave(){
			var input = $("#tempFileUpload");       		
    		
        	var infiles = input[0].files;
			var formData = new FormData();
			
//				for (var i = 0; i < infiles.length; i++) {
//	        		var addfile = infiles[i];
//	        		var fileNm = addfile.name;
//	        		var fsize = addfile.size;
//	        		formData.append('files',addfile);
//	        		console.log(fileNm);
//	        		console.log(fsize.fileSizeFormat());
//     		}
			
//         	console.log("======================================");
//         	console.log(files.length);
        	if(infiles.length > 0) {
        		for (var i = 0; i < infiles.length; i++) {
	        		var addfile = infiles[i];
	        		var fileNm = addfile.name;
	        		var fsize = addfile.size;
	        		formData.append('files',addfile);
	        		formData.append('files2',addfile);
	        		console.log(fileNm);
	        		console.log(fsize.fileSizeFormat());
        		}
        	}else{
        		alert("파일 없음");
        		return;
        	}
  			formData.append('test111', "11111111111111");
        	$.ajax({
        		url : "/ctrl/template/common/fileSave2",
        		data : formData,
        		type : "POST",
        		dataType : "json",
        		cache: false,
                contentType: false,
                processData: false,
        		success : function(data) {
        			console.log(data);
        			var imgList = data.dt_saveFileInfo;
//	        			dr.setVal("fileName", fileName);
//	        			dr.setVal("saveName", sFileName);
//	        			dr.setVal("fileSize", fileSize);
//	        			dr.setVal("filePath", filePath);
//	        			dr.setVal("webPath", webPath);
        			for (var i = 0; i < imgList.length; i++) {
        				$("#imgDiv").append('<div class="superbox-list"><img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" /></div>')
					}
        			$("#imgDiv").SuperBox();
        			alert("저장 되었습니다.");
        		}
        	}); 	
		}
        function checkOs(){
        	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
        	 
        	if (mobile) {
        		// 유저에이전트를 불러와서 OS를 구분합니다.
        		var userAgent = navigator.userAgent.toLowerCase();
        		if (userAgent.search("android") > -1){
        			return "android";
        		}else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)|| (userAgent.search("ipad") > -1)){
        			return "ios";
        		}else{
        			return "etc";
        		}
        	} else {
        		return "web";
        	}
        }
    </script>
</body>
</html>