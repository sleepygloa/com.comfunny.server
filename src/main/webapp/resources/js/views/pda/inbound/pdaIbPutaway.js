/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고적치 [PdaIbPutawayApp]
 * Program Code     : PWMPDAIB102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 18.  		First Draft.
 */
var PdaIbPutawayApp = function () {
	"use strict";

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaIbPutaway';

	var callBackData = {};

    return {
        init: function () {

        	setUI();

        	fnEvents();

	    }
    };

    //UI 세팅
    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    };

    //이벤트
    function fnEvents(){

    	//엔터 이벤트
		$('#pdaIbPutawayPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbPutawayPltId').blur();
				$('#pdaIbPutawayPltIdSearchBtn').trigger('click');
			}
		});

    	//처음 불러올때 입고번호 포커스
    	$('#pdaIbPutawayPltId').focus();

		//조회버튼 클릭
    	$('#pdaIbPutawayPltIdSearchBtn').click(function(){
    		$(this).blur();
    		fnSearch();
    	});

    	//확정 버튼 클릭
    	$('#pdaIbPutawayConfirmBtn').click(function(){
    		fnSave('CONFIRM', 'MSG_INRI_CFM_009'); //적치 하시겠습니까?
    	});

    }

    //조회
    function fnSearch(){

		var sendData = {
				pltId 		: $('#pdaIbPutawayPltId').val(),
				instLocCd 	: $('#pdaIbPutawayInstLocCd').val()
		}

		App.prcsStart();
   		$.ajax({
   			url			: '/pda/ctrl/inbound/pdaIbPutaway/listPdaPltIdCountInquiry',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
   			success 	: function(data){
   				var dt_data = data.dt_grid;

   				if(dt_data.length > 1){
   		            PopApp.coreOpenPopup({
   		                ajaxUrl		: "/pda/ctrl/inbound/pdaIbPutaway/pdaIbPutawayPltIdInquiryPop",
   		                id			: "pdaIbPutawayPltIdInquiryPop",
   		                domainId	: "PWMPDAIB102E_P1",
   		                fullScreen 	: true,
   		                onload		: function(modal) {
   		                    // 팝업화면 클릭 시 code, name.
   		                    var callBack = {
   		                        "PLT_ID"		: "pdaIbPutawayPltId",
   		                        "INST_LOC_CD" 	: "pdaIbPutawayInstLocCd"
   		                    };
   		                    App.setElIds(callBack);
   		                    modal.show();
   		                }
   		            });
   				}else if(dt_data.length == 1){
					$('#pdaIbPutawayInstLocCd').val(dt_data[0].INST_LOC_CD);
   				}
   			}
   		})
	}

  //UPDATE 로직.
    function fnSave(flag, msgCd){

        var sendData = {
        		flag		: flag,
        		pltId		: $('#pdaIbPutawayPltId').val(),
        		instLocCd	: $('#pdaIbPutawayInstLocCd').val(),
        		putwLocCd	: $('#pdaIbPutawayToLocCd').val(),
        }

        //필수입력 체크
        if(sendData.pltId == ''){
        	Util.alert('MSG_OUTRI_VAL_031'); //파렛트ID 항목은 필수 입력입니다.
        	return false;
        }
        if(sendData.instLocCd == ''){
        	Util.alert('MSG_RI_VAL_023'); //지시로케이션 항목은 필수입력입니다.
        	return false;
        }
        if(sendData.putwLocCd == ''){
        	Util.alert('MSG_ST_VAL_006'); //TO로케이션 항목은 필수입력입니다.
        	return false;
        }


    	//확정 진행
    	if (!confirm((Util.confirm(msgCd)).msgTxt)) return;

        App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaIbPutaway/updatePdaIbPutaway',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			if(data.stsCd == 200){
    				Util.alert('MSG_COM_SUC_003'); //저장되었습니다.
    				fnInit();
    			}else if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}
    			//App.prcsEnd();
    		},
    		complete : function(data){
    			//App.prcsEnd();
    		}
    	})

    }

    //초기화
    function fnInit(){
		$('#pdaIbPutawayPltId').val(''),
		$('#pdaIbPutawayInstLocCd').val(''),
		$('#pdaIbPutawayToLocCd').val('')
    }

}();

$(document).ready(function() {
	PdaIbPutawayApp.init();
});
