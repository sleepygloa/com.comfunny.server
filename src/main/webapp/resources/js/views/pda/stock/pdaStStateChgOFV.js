/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고상태변경[PdaStStateChgOFVApp]
 * Program Code     : PWMPDAST410E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaStStateChgOFVApp = function () {
	"use strict";

	var proCd = 'PWMPDAST410E';
	var proNm = 'pdaStStateChgOFV';

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaStStateChgOFVItemSt', 'ITEM_ST_CD');

    		fnEvents();

	    },
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    }
    };

    //바코드 스캔
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{
    		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    			//바코드 스캔시마다 PLT ID 입력, 존재시 데이터 교체
    			$('#pdaStStateChgOFVPltId').val(barcode).blur();
    			fnSearchPltId();
    			return false;
    		}
    	}
    }

    //이벤트
    function fnEvents(){

    	//UI 세팅
    	WMSUtil.pwaGridDynamicArea(proNm);

		//엔터 이벤트
		$('#pdaStStateChgOFVPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStStateChgOFVPltId').blur();
				fnSearchPltId();
			}
		});

		//확정
		$('#pdaStStateChgOFVConfirmBtn').click(function(){
			fnConf();
		});
    }

    //조회
    function fnSearchPltId(){
   		var pltId = $('#pdaStStateChgOFVPltId').val();

   		$.ajax({
   			url		: '/pda/ctrl/stock/pdaStMove/listPdaStMovePltIdInq',
   			data	: {
   				pltId	: pltId
   			},
   			success	: function(data){
   				var dt_grid = data.dt_grid;

   				//조회된 데이터 없을때.
   				if(dt_grid.length == 0){
   					fnInit();

   				//조회된 데이터 있을때
   				}else{

   					//조회된 데이터가 2건 이상일때 팝업
   					if(dt_grid.length > 1){
   	   		            PopApp.coreOpenPopup({
   	   		                ajaxUrl		: "/pda/ctrl/common/PltIdPop",
   	   		                id			: "pdaCommPltIdPop",
   	   		                domainId	: "PWMPDAIB102E_P1",
   	   		                fullScreen 	: true,
   	   		                data		: sendData(),
   	   		                onload		: function(modal) {
   	   		                    // 팝업화면 클릭 시 code, name.
   	   		                    var callBack = {
   	   		                        "PLT_ID"		: "pdaStStateChgOFVPltId",
   	   		                        "LOC_CD" 		: "pdaStStateChgOFVLocCd",
   	   		                        "ITEM_ST_CD"	: "pdaStStateChgOFVCurItemStCd",
   	   		                        "ITEM_ST"		: "pdaStStateChgOFVCurItemSt"
   	   		                    };
   	   		                    App.setElIds(callBack);
   	   		                    modal.show();
   	   		                }
   	   		            });
   					}else{
   	   					var dt = dt_grid[0];

   	   					$('#pdaStStateChgOFVLocCd').val(dt.LOC_CD);
   	   					$('#pdaStStateChgOFVCurItemSt').val(dt.ITEM_ST);
   	   					$('#pdaStStateChgOFVCurItemStCd').val(dt.ITEM_ST_CD);
   					}
   				}
   			}
   		});
	}

    //확정
    function fnConf(){
   		var pltId 			= $('#pdaStStateChgOFVPltId').val();
   		var curItemStCd  	= $('#pdaStStateChgOFVCurItemStCd').val();
   		var itemStCd 		= $('#pdaStStateChgOFVItemSt option:selected').val();
   		var locCd 			= $('#pdaStStateChgOFVLocCd').val();

   		//필수값 체크
   		if(pltId == ""){
   			Util.alert("MSG_OUTRI_VAL_031"); //파렛트ID 항목은 필수 입력입니다.
   			return false;
   		}

   		if(itemStCd == ""){
   			Util.alert("MSG_INRI_VAL_009"); //제품상태 항목은 필수 입력입니다.
   			return false;
   		}

   		//데이터 조회 체크
   		if(locCd == ""){
   			Util.alert("MSG_WMS_ERR_002"); //조회 데이터가 없습니다.
   			return false;
   		}

   		//유효성체크
   		if(curItemStCd == itemStCd){
   			Util.alert('MSG_ST_VAL_083'); //제품상태는 같을 수 없습니다.
   			return false;
   		}

   		App.prcsStart();
   		$.ajax({
   			url		: '/pda/ctrl/stock/pdaStStateChgOFV/updatePdaStStateChgOFVConfirm',
   			data	: sendData(),
   			success	: function(data){
   				if(data.stsCd == 200){
   					alert(data.msgTxt);
   					fnInit();
   				}else if(data.stsCd == 100){
   					alert(data.msgTxt);
   					return false;
   				}

   			}
   		});
    }

    //데이터
    function sendData(){
    	return {
    		proCd		: proCd,
			pltId	 	: $('#pdaStStateChgOFVPltId').val(),
			locCd 		: $('#pdaStStateChgOFVLocCd').val(),
			itemStCd	: $('#pdaStStateChgOFVItemSt').val()
    	}
    }

    //데이터 초기화
    function fnInit(){
    	$('#pdaStStateChgOFVPltId').val('');
    	$('#pdaStStateChgOFVLocCd').val('');
    	$('#pdaStStateChgOFVCurItemSt').val('');
    	$('#pdaStStateChgOFVCurItemStCd').val('');
    	$('#pdaStStateChgOFVItemSt').val('');
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStStateChgOFVApp.fnCallbackBarcode",
	});
	PdaStStateChgOFVApp.init();
});