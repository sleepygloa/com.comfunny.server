/**
 * 사용자의 세션정보를 담는다.
 * 1. 비로그인 : 사용자 디바이스 접속 정보 저장
 * 2. 로그인 : 사용자 ID정보를 저장
 * */
Util.SessionInit();
Util.DomainInit();
Util.MessageInit();

var MainJs = function(){
	"use strict";
	return {
		init : function(){
			fnEvents();

			fnInit();
		},
	}
	function fnEvents(){
		$("#mainMasterBody").addClass("master-grid-M");
	}


	//메인화면 불러오기
	function fnInit(){
		$.ajax({
			url		: '/api/sys/index/toMainContents',
			type	: 'GET',
			async	: false,
			dataType : 'html',
			success	: function(data){
				$('#mainMasterBody').empty();
				$('#mainMasterBody').html(data);
			}
		})
	}
}();

$(document).ready(function(){
	MainJs.init();
});