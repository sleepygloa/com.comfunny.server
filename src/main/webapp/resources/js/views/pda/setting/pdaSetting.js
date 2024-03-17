var PdaSetting = function(){
	"use strict"

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaSetting';

	var userInfo = null;

	return {
		init : function(){

			setUI();

//			fnUserInfo();

			fnEvents();

		}
	}

	function setUI(){
		WMSUtil.pwaGridDynamicArea(proNm);
	}

	function fnEvents(){

		fnSetting();

		//환경설정 보기
		$('#pdaSettingSettingView').click(function(){
			$('.pdaSettingSetting').css('display', 'block');
			$('.pdaSettingPw').css('display', 'none');
		});

		//사용자암호 보기
		$('#pdaSettingUserPasswdView').click(function(){
			$('.pdaSettingSetting').css('display', 'none');
			$('.pdaSettingPw').css('display', 'block');
		});

		//환경설정 저장 버튼
		$('#pdaSettingSaveBtn').click(function(){
			fnSave();
		});

		//사용자 암호 변경 버튼
		$('#pdaSettingPwSaveBtn').click(function(){
			fnPwSave();
		});


//		//비밀번호
//		//valid-feedback
//		//invalid-feedback
//		$('#pdaSettingNewPw').keydown(function(){
//			//정규식
////			var regex = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
//			var regex = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8-16}$/;
//			var pw = $(this).val();
//			console.log(pw);
//			console.log(regex.test(pw));
//			if(!regex.test(pw)){
//				$('#pdaSettingNewPwValid').css('display', 'none');
//				$('#pdaSettingNewPwInValid').css('display', 'block');
//			}else{
//				$('#pdaSettingNewPwValid').css('display', 'block');
//				$('#pdaSettingNewPwInValid').css('display', 'none');
//			}
//
//		});
	}

//	//사용자정보 불러오기
//	function fnUserInfo(){
//
//        var gKey = WMSUtil.generateKey();
//
//        var RSAdata = WMSUtil.RSAgetKey();
//        var eKey = WMSUtil.encryptRSA(RSAdata.publicKeyM, RSAdata.publicKeyE, gKey);
//
//        var data = {
//        		eKey	: eKey
//        }
//
//    	$.ajax({
//    		url		: '/pda/ctrl/setting/getUserInfo',
//    		data	: data,
//    		success : function(data){
//    			userInfo = data.dt_grid[0];
//    			console.log(userInfo);
//    		}
//    	});
//	}

	function fnSetting(){
		Util.SessionInit();
		//물류센터
		var dcCd = CoreSession.s_dcCd_Prioord;
		WMSUtil.fnCombo.dcCd('pdaSettingDcCd', dcCd);

		//고객사
		var clientCd = CoreSession.s_clientCd_Prioord;
		WMSUtil.fnCombo.clientCd('pdaSettingClientCd', clientCd);

		//작업일자
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaSettingWorkYmdDatePikcer').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaSettingWorkYmdDatePikcer').datepicker("setDate", new Date());
		}

		//언어
		var lang = CoreSession.s_language;
		WMSUtil.fnCombo.selectBox('pdaSettingLang', 'SC0013', lang);


		//폰트
		//window 객체에 font 스타일을 저장.
		//해당 font를 이용하여 body(id값)에 클래스를 넣어 전체 폰트를 관여
//	    var saveFont = localStorage.getItem('saveFont');
//
//        if(saveFont == "S"){
//            $("#mainMasterBody").addClass("master-grid-S ");
//            $("#RadomainFontSizeS").prop("checked",true)
//        }else if(saveFont == "M"){
//            $("#mainMasterBody").addClass("master-grid-M ");
//            $("#RadomainFontSizeM").prop("checked",true)
//        }else if(saveFont == "L"){
//            $("#mainMasterBody").addClass("master-grid-L ");
//            $("#RadomainFontSizeL").prop("checked",true)
//        }else{
//
//            $("#RadomainFontSizeM").prop("checked",true)
//        }
	}


	//환경설정 저장
	function fnSave(){
		var sendData = {
				dcCd		: $('#pdaSettingDcCd').val(),
				dcNm		: $('#pdaSettingDcCd option:selected').text(),
				clientCd	: $('#pdaSettingClientCd').val(),
				clientNm	: $('#pdaSettingClientCd option:selected').text(),
				ymd			: $('#pdaSettingWorkYmd').val(),
				lang		: $('#pdaSettingLang').val(),
				langNm		: $('#pdaSettingLang option:selected').text(),
				//font 		: $("input[name='RadomainFontSize']:checked").val()
		}
		App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/setting/savePdaSetting',
    		data	: sendData,
    		success : function(data){

    			//
/*    			var sucFont = sendData.font;
		        if(sucFont == "S"){
		            $("body").addClass("master-grid-S ");
		            $("body").removeClass("master-grid-M ");
		            $("body").removeClass("master-grid-L ");
		            localStorage.setItem('saveFont', "S");

		        }else if(sucFont == "M"){
		            $("body").addClass("master-grid-M ");
		            $("body").removeClass("master-grid-S ");
		            $("body").removeClass("master-grid-L ");
		            localStorage.setItem('saveFont', "M");

		        }else if(sucFont == "L"){
		            $("body").addClass("master-grid-L ");
		            $("body").removeClass("master-grid-S ");
		            $("body").removeClass("master-grid-M ");
		            localStorage.setItem('saveFont', "L");
		        }*/

//    			toMainPage();

    			window.location.href="/";
    		},
    		complete : function(data){
    		}
    	})
	}


	//사용자 암호 저장
	function fnPwSave(){

		var currPw = $('#pdaSettingCurrPw').val();
		var newPw = $('#pdaSettingNewPw').val();
		var newPwConf = $('#pdaSettingNewPwConf').val();

		if(currPw == '' && currPw.trim() == ''){
			Util.alert('MSG_LGN_ERR_200'); //현재 비밀번호를 입력하세요.
			return false;
		}
		if(newPw == '' && newPw.trim() == ''){
			Util.alert('MSG_LGN_ERR_210'); //새로운 비밀번호를 입력하세요.
			return false;
		}
		if(newPwConf == '' && newPwConf.trim() == ''){
			Util.alert('MSG_LGN_ERR_220'); //확인 비밀번호를 입력하세요.
			return false;
		}

		if(newPw.length < 8 || newPw.length > 16){
			Util.alert('MSG_COM_VAL_111'); //비밀번호는 8~16자로 입력해주세요
			return false;
		}

		var passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
		if(!passwordRules.test(newPw)){
			Util.alert('MSG_COM_VAL_110'); //암호는 영문, 숫자, 특수문자를 혼합하여 8~16로 입력해야합니다. 다시 입력해주세요
			return false;
		}

		if(currPw == newPw){
			Util.alert('MSG_COM_ERR_038'); //새로운 비밀번호와 현재 비밀번호가 일치합니다
			return false;
		}
		if(newPw != newPwConf){
			Util.alert('MSG_LGN_ERR_230'); //비밀번호와 확인 비밀번호가 일치하지 않습니다.
			return false;
		}

		var data = {
				userPwd : currPw,
				newPwd : newPw,
		}

    	//암호화
    	var getEKey = WMSUtil.getEKey(data);

	    data.userPwd = getEKey.userPwd;
	    data.newPwd = getEKey.newPwd;
	    data.eKey = getEKey.eKey;


		App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/setting/updatePdaSettingUserPw',
    		data	: data,
    		success : function(data){

    			if(data.stsCd == 200){
    				alert(data.msgTxt);
    				window.location.href="/";
    			}else{
    				alert(data.msgTxt);
    				return false;
    			}
    		},
    	})
	}
}();

$(document).ready(function(){
	PdaSetting.init();
});