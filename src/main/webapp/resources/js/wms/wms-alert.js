/**
 * wms-alert.js
 * function is for custom alert
 * major : confirm. alert. error
 * */


/* 01. Handle Scrollbar
------------------------------------------------ */
var wmsCustomModal = function() {
    "use strict";

    //txt
    var title;
    var message;

    //option
    var modalType; //success, info, warning, error
    var position; //top-right, top-left, bottom-right, bottom-left, top-full-width,bottom-full-width,top-center,bottom-center

    var hideFlag = false;
    var showDuration; //나타나는 시간s
    var hideDuration; //사리지는 시간s
    var duarion; //나타나서 유지되는 시간s
    var showMethod; //나타나는 방법
    var hideMethod; //사라지는방법

    var closeImg = true; //우측상단 닫기 버튼
    var closeBtn = false; //그냥 닫기 버튼

    var preventDuplication = false;
    var newestOnTop = false;; //위에서부터 나타날지 여부


    var closeBtnFlag;

    var modal = '';

    return {
    	init : function(initData){
    		if(initData != undefined){
    			//위치
    			if(initData.position != undefined){
    				position = initData.position;
    			}
    			//닫기이미지
    			if(initData.closeImg != undefined){
    				closeImg = initData.closeImg;
    			}
    			//닫기버튼
    			if(initData.closeBtn != undefined){
    				closeBtn = initData.closeBtn;
    			}
    			//위에서나타남
    			if(initData.newestOnTop != undefined){
    				newestOnTop = initData.newestOnTop;
    			}
    		}

    	},
    	success : function(title, message){

    	},
    	info : function(){

    	},
    	warning : function(){

    	},
    	error : function(){

    	},
    	alert : function(){

    	},
    	confirm : function(){

    	}

    }

};

// 전역 변수 선언부
var $callBackEl01 ;
var $callBackEl02 ;

var callBackEls = {};
var $callBackGrid;
// 전역 변수 선언부

/* Application Controller
------------------------------------------------ */
var App = function () {
	"use strict";
	function test2() {
	    alert("APP바로 앞에있는거 실행");
	}

	return {
		//main function
		setCallBackEl: function (el) {
			$callBackEl01 = el;
		},
    };
}();
