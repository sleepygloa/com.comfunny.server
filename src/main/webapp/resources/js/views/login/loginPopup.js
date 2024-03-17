/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 사용자 관리 [LoginPopApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 10. 20.  		First Draft.
 */
var LoginPopApp = function () {
	"use strict";

	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/

	// 메인화면 로그인, 팝업로그인 체크
	var flag = 0;
	var cookieId = getCookie("cookieId");

    return {
        init: function () {
        	//로그인 이벤트
        	fnLoginEvents();
        	//쿠키 값 있는지 체크
        	keepIdCheck();
	    },
    };

    //
    function fnLoginEvents(){
    	//로그인 ID 엔터키 이벤드
    	$("#loginUserId").keydown(function(e) {
    		if(e.keyCode == 13){
    			$('#loginUserPwd').focus();
    		}
    	});

    	//로그인 PWD 엔터키 이벤드
    	$("#loginUserPwd").keydown(function(e) {
    		if(e.keyCode == 13){
    			$('#popupLoginBtn').trigger('click');
    		}
    	});

    	//로그인 버튼
    	$("#popupLoginBtn").click(function(){
    		flag = 1;
    		fnLogin();
    	});
    }

    //쿠키 저장
	function setCookie(cookieName, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value)
				+ ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
		document.cookie = cookieName + "=" + cookieValue;
	}

	//쿠키 삭제
	function deleteCookie(cookieName) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		document.cookie = cookieName + "= " + "; expires="
				+ expireDate.toGMTString();
	}


	//쿠키 값
	function getCookie(cookieName) {
		cookieName = cookieName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cookieName);
		var cookieValue = '';
		if (start != -1) {
			start += cookieName.length;
			var end = cookieData.indexOf(';', start);
			if (end == -1)
				end = cookieData.length;
			cookieValue = cookieData.substring(start, end);
		}
		return unescape(cookieValue);
	}

    //[Fn] 쿠키 값 체크
    function keepIdCheck(){
    	var cookieId = getCookie("cookieId");
    		if (cookieId) {
    			$("#keepId").attr("checked", true);
    			$("#loginUserId").val(cookieId);
    		}
    }

    //[Fn] 스크립트 암호키 생성
    function fnGenerateKey(){
    	var time = new Date().getTime();
    	var random = Math.floor(65536*Math.random());
    	return (time*random).toString();
    }

    //[Fn] TEA키 암호화
    function EncryptTEA(k, text){
    	return Tea.encrypt(text, k);
    }

    //[Fn] RSA 암호화
    function EncryptRSA(m, e, text){
    	var rsa = new RSAKey();
    	rsa.setPublic(m, e);
    	return rsa.encrypt(text);
    }

	//로그인 버튼
    function fnLogin(){
    	if($("#loginUserId").val() == ""){
    		alert("아이디를 입력해주세요");
    		$("#loginUserId").focus();
    		return;
    	}else if($("#loginUserPwd").val() == ""){
    		alert("비밀번호를 입력해주세요");
    		$("#loginUserPwd").focus();
    		return;
    	}
    	var pwdChgData = {};
    	var userId = $("#loginUserId").val();
    	var userPwd = $("#loginUserPwd").val();

    	var data = {
    	        userId : userId
    	    ,   userPwd : userPwd
    	}

    	if(pwdChgData.pwd != undefined){
    	    data["userPwd"] = pwdChgData.pwd;
    	}

    	var getEKey = WMSUtil.getEKey(data);

    	var sendData = {
    			"userId"  : getEKey.userId,
    			"userPwd" : getEKey.userPwd,
    			"eKey"	  : getEKey.eKey,
    			"flag"	  : flag
    	};

        if(pwdChgData.pwd != undefined){
            sendData["userPwdChg"] = "Y";
        }
        App.prcsStart();
    	$.ajax({
    		url : "/ctrl/sign/login",
    	    data : sendData,
    		type : "POST",
    		dataType : "json",
    	    success : function(data) {
    	    	var sysCd = data.sysCd;
    	    	var stsCd = data.stsCd;
    	    	var msgTxt = data.msgTxt;

	    		switch (stsCd){
	    			case 100 :
    					$("#loginPopup").remove();
    					toMainPage();
    					break;
	    			case 101 : {
	    			    alert(msgTxt);
	    			    if(confirm("비밀번호를 변경하시겠습니까?")){
	    			        $('#loginRegularPwdChg').trigger('click');
	    			    }
	    			    break;
    			    }
    	    		case 102 : {
    	    			toMainPage();
    	    			break;
    	    		}
    	    		case 103 : alert(msgTxt);  break;
    	    		case 104 : $('#loginRegularPwdChg').trigger('click'); break;
	    		}
    	    },
    	    complete : function(){
    	        App.prcsEnd();
    	    }
    	});
    }


}();

$(document).ready(function() {
	LoginPopApp.init();
});