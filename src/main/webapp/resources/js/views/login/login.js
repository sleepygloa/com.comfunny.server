var LoginApp = function () {

	// 메인화면 로그인, 팝업로그인 체크
	var flag = 0;
	var cookieId = getCookie("cookieId");

    return {
        init: function () {
        	//로그인 이벤트
        	fnEvents();

        	//쿠키 값 있는지 체크
        	keepIdCheck();

			var dd = [{"VALUE" : "web", "NAME" : "웹"},{"VALUE" : "mobile", "NAME" : "모바일"}]
			Util.MakeSelectOptions($('#loginOs'), dd, '', '');
			// WMSUtil.fnCombo.selectBox('loginOs', 'OS_INFO', '');
	    }
    };

	/*******************************************************************************************************************
	 * 1.Events
	 ******************************************************************************************************************/
	function fnEvents(){
    	//키보드입력이벤트 (로그인ID)
    	$("#loginUserId").keydown(function(key) {
    		if (key.keyCode == 13) {
    			$('#loginUserPwd').focus();
    		}
    	});

		//키보드입력이벤트 (비밀번호)
    	$("#loginUserPwd").keydown(function(key) {
    		if (key.keyCode == 13) {
				//로그인처리
    			$('#loginBtn').trigger('click');
    		}
    	});

		//버튼클릭이벤트 (로그인)
    	$("#loginBtn").click(function(){
			fnLoginCheck();
    	});


		//버튼클릭이벤트 (신규가입)
    	$('#loginRegularSaveBtn').click(function(){
    	    var pwd        = $('#loginRegularPwd').val();
    	    var pwdCheck   = $('#loginRegularPwdCheck').val();

    	    var sendData = {
    	            "pwd" : pwd
    	    }

    	    if(pwd == pwdCheck) {
    	        fnLoginCheck(sendData);
    	    }else{
    	        alert('새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.'); //
    	    }

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

    //[Fn] ID PWD Validation 및 서버키 생성후 가져옴
    function fnAjaxIdCheck(){
    	if($("#loginUserId").val() == ""){
    		alert("아이디를 입력해주세요");
    		$("#loginUserId").focus();
    		return;
    	}else if($("#loginUserPwd").val() == ""){
    		alert("비밀번호를 입력해주세요");
    		$("#loginUserPwd").focus();
    		return;
    	}
    	var sendData = {};
    	fnLoginCheck(sendData);

    }

    //[Fn] ID, PWD, 암호키 암호화 후 로그인
    function fnLoginCheck(pwdChgData){
    	var userId = $("#loginUserId").val();
    	var userPwd = $("#loginUserPwd").val();
		var loginOs = $("#loginOs").val();

		//필수값 체크
		if(userId == ""){
			alert("아이디를 입력해주세요");
			$("#loginUserId").focus();
			return;
		}
		if(userPwd == ""){
			alert("비밀번호를 입력해주세요");
			$("#loginUserPwd").focus();
			return;
		}

		//
    	// if(pwdChgData.pwd != undefined){
    	//     data["userPwd"] = pwdChgData.pwd;
    	// }
		//
    	// var getEKey = WMSUtil.getEKey(data);
		//
    	// var sendData = {
    	// 		"userId"  : getEKey.userId,
    	// 		"userPwd" : getEKey.userPwd,
    	// 		"eKey"	  : getEKey.eKey,
    	// 		"flag"	  : flag
    	// };
		//
        // if(pwdChgData.pwd != undefined){
        //     sendData["userPwdChg"] = "Y";
        // }
		var sendData = JSON.stringify({
			'userId' : userId,
			'password' : userPwd,
			'loginOs' : loginOs,
			'bizCd' :"COMFUNNY_DEVELOPERS",
		})
		console.log(sendData);
        App.prcsStart();
    	$.ajax({
    		url 	: "/login/login",
    	    data 	: sendData,
			dataType : 'json',
			type     : 'POST',
			cache    : false,
			contentType : 'application/json; charset=utf-8',
    	    success : function(data) {
				location.href="/"
//     	    	var sysCd = data.sysCd;
//     	    	var stsCd = data.stsCd;
//     	    	var msgTxt = data.msgTxt;
//
//     	    	if(stsCd == 102){
//     	    		if($("input:checkbox[id='keepId']").is(":checked") == true){
//     	    			setCookie("cookieId", $("#loginUserId").val(), 30);
//     	    		}else{
//     	    			deleteCookie("cookieId");
//     	    		}
//     	    	}
// //    	    	100 // 응답 성공
// //    	    	101 // 응답 성공 msg
// //    	    	102 // 응답 성공 url
// //    	    	103 // 응답 성공 msg+url
// //    	    	500 // 시스템 에러
// //    	    	501 // 시스템 에러 msg
// //    	    	502 // 시스템 에러 url
//
// 	    		switch (stsCd){
// 	    			case 100 : $("#loginPopup").remove(); break;
// 	    			case 101 : {
// 	    			    alert(msgTxt);
// 	    			    if(confirm("비밀번호를 변경하시겠습니까?")){
// 	    			        $('#loginRegularPwdChg').trigger('click');
// 	    			    }
// 	    			    break;
//     			    }
//     	    		case 102 : location.href="/"; break;
//     	    		case 103 : alert(msgTxt);  break;
//     	    		case 104 : $('#loginRegularPwdChg').trigger('click'); break;
// 	    		}

    	    },
    	    complete : function(){
    	        App.prcsEnd();
    	    }
    	});
    }
}();

$(document).ready(function() {
	App.init();
	LoginApp.init();
});