/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반입관리 - 반입적치
 * Program Code     : PWMPDARI102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 09. 27.  		First Draft.
 */
var PdaRiPutwApp = function () {
		"use strict";

		//그리드
//		var $pdaIbPutwGrid = $('#pdaIbPutwGrid');

		//프로그램 코드, 명
		var proCd = $('a[class="active"]').data('procd');
		var proNm = 'pdaRiPutw';

	    return {
	        init: function () {

	        	setUI();
	        	getEvents();

		    }
	    };

	    function setUI(){
	    	WMSUtil.pwaGridDynamicArea(proNm);
	    }

	    function getEvents(){
	    	/**
	    	 * 전역 Enter 검사
	    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
	    	 */
	    	$(document).keydown(function(event){
	    		if(event.keyCode == 13) {

	    			var objId = event.target.id;

	    			if (objId == 'pdaRiPutwPltId'){
	    				$('#pdaRiPutwPltId').blur();
	    				$('#pdaRiPutwPltIdSearchBtn').trigger('click');
	    			}
	    			event.preventDefault();
	    			return false;
	    		}
	    	});

	    	//처음 불러올때 입고번호 포커스
	    	$('#pdaRiPutwPltId').focus();

	    	$('#pdaRiPutwPltIdSearchBtn').click(function(){
	    		$(this).blur();
	    		fnRiPutwSearchPltId();
	    	});
	    	$('#pdaRiPutwPltSearchBtn').click(function(){
	    		$(this).blur();
	    		fnRiPutwSearchPltId();
	    	});

	    	$('#pdaRiPutwConfirmBtn').click(function(){
	    		fnSave('CONFIRM', 'MSG_INRI_CFM_009'); //적치 하시겠습니까?
	    	});

	    }

	    function fnRiPutwSearchPltId(){

	   		var pltId = $('#pdaRiPutwPltId').val();

			if(pltId == ''){
	            PopApp.coreOpenPopup({
	                ajaxUrl		: "/pda/ctrl/returnInbound/pdaRiPutw/pdaRiPutwPltIdInquiryPop",
	                id			: "pdaRiPutwPltIdInquiryPop",
	                domainId	: "PWMPDARI102E_P1",
	                fullScreen 	: true,
	                onload		: function(modal) {
	                    // 팝업화면 클릭 시 code, name.
	                    var callBack = {
	                        "PLT_ID"		: "pdaRiPutwPltId",
	                        "INST_LOC_CD" 	: "pdaRiPutwInstLocCd"
	                    };
	                    App.setElIds(callBack);
	                    modal.show();
	                }
	            });
			}
		}

	  //UPDATE 로직.
	    function fnSave(flag, msgCd){

	    	//확정 진행
	    	if (!confirm((Util.confirm(msgCd)).msgTxt)) return;

	        var sendData = {
	        		flag		: flag,
	        		pltId		: $('#pdaRiPutwPltId').val(),
	        		instLocCd	: $('#pdaRiPutwInstLocCd').val(),
	        		locCd		: $('#pdaRiPutwToLocCd').val()
	        }

	        if(sendData.pltId == ''){
	        	alert('파레트 ID항목은 필수입력입니다.');
	        	return false;
	        }
	        if(sendData.instLocCd == ''){
	        	alert('지시로케이션 항목은 필수입력입니다.');
	        	return false;
	        }
	        if(sendData.locCd == ''){
	        	alert('TO로케이션 항목은 필수입력입니다.');
	        	return false;
	        }

	    	$.ajax({
	    		url		: '/pda/ctrl/returnInbound/pdaRiPutw/updatePdaRiPutw',
	    		type 	: "POST",
	    		data	: JSON.stringify(sendData),
	    		async	: false,
	            contentType: 'application/json; charset=utf-8',
	    		success : function(data){
	    			console.log(data);
	    			if(data.stsCd == '100'){
	    				Util.alert('MSG_COM_SUC_003'); //저장되었습니다.
	    				fnClearData();
	    			}else if(data.stsCd == '200'){
	    				alert(data.msgTxt);
	    				return false;
	    			}
	    		},
	    		complete : function(data){
	    			//App.prcsEnd();
	    		}
	    	})

	    }

	    function fnClearData(){
			$('#pdaRiPutwPltId').val(''),
			$('#pdaRiPutwInstLocCd').val(''),
			$('#pdaRiPutwToLocCd').val('')
	    }
}();

$(document).ready(function() {
	PdaRiPutwApp.init();
});
