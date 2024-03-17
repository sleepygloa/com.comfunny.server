/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고보류해제[PdaStHoldAndCancleOFVApp]
 * Program Code     : PWMPDAST409E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaStHoldAndCancleOFVApp = function () {
	"use strict";

	var proCd = 'PWMPDAST409E';
	var proNm = 'pdaStHoldAndCancleOFV';


    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaStHoldAndCancleOFVHoldGbn', 'HOLD_GBN_CD');

        	WMSUtil.fnCombo.selectBox('pdaStHoldAndCancleOFVHoldRs', 'HOLD_RS_CD');

    		getEvents();

	    },
	    //바코드 콜백
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    }
    };

    //바코드 콜백
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{
    		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
        		//바코드 스캔시마다 PLT ID 입력, 존재시 데이터 교체
    			$('#pdaStHoldAndCancleOFVPltId').val(barcode).blur();
    			fnSearchPltId();
    		}

    	}
    }

    //이벤트
    function getEvents(){
    	//UI 세팅
    	WMSUtil.pwaGridDynamicArea(proNm);

		//엔터 이벤트
		$('#pdaStHoldAndCancleOFVPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStHoldAndCancleOFVPltId').blur();
				fnSearchPltId();
			}
		});

		//확정
		$('#pdaStHoldAndCancleOFVConfirmBtn').click(function(){
			fnConf();
		});
    }

    //조회
    function fnSearchPltId(){

   		var pltId = $('#pdaStHoldAndCancleOFVPltId').val();

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
   	   		                    };
   	   		                    App.setElIds(callBack);
   	   		                    modal.show();
   	   		                }, callback : function (data){
   	   		                	var dt = data;
//   	   		                	$('#pdaStHoldAndCancleOFVPltId').val(dt.PLT_ID);
   	    	   					$('#pdaStHoldAndCancleOFVLocCd').val(dt.LOC_CD);
	   	   	   					$('#pdaStHoldAndCancleOFVHoldBoxQty').val(dt.HOLD_BOX_QTY);
	   	   	   					$('#pdaStHoldAndCancleOFVHoldEaQty').val(dt.HOLD_EA_QTY);
	   	   	   					$('#pdaStHoldAndCancleOFVHoldBoxQtyBtn').text(dt.BOX_UOM_CD);
	   	   	   					$('#pdaStHoldAndCancleOFVHoldEaQtyBtn').text(dt.EA_UOM_CD);

   	   		                }
   	   		            });
   					}else{
   	   					var dt = dt_grid[0];

   	   					$('#pdaStHoldAndCancleOFVLocCd').val(dt.LOC_CD);
//   	   					$('#pdaStHoldAndCancleOFVHoldGbn option:selected').val(dt.HOLD_GBN_CD);
//   	   					$('#pdaStHoldAndCancleOFVHoldRs option:selected').val(dt.HOLD_RS_CD);
   	   					$('#pdaStHoldAndCancleOFVHoldBoxQty').val(dt.HOLD_BOX_QTY);
   	   					$('#pdaStHoldAndCancleOFVHoldEaQty').val(dt.HOLD_EA_QTY);
   	   					$('#pdaStHoldAndCancleOFVHoldBoxQtyBtn').text(dt.BOX_UOM_CD);
   	   					$('#pdaStHoldAndCancleOFVHoldEaQtyBtn').text(dt.EA_UOM_CD);
   					}
   				}


   			}
   		});
	}

    //확정
    function fnConf(){
   		var pltId 			= $('#pdaStHoldAndCancleOFVPltId').val();
   		var locCd 			= $('#pdaStHoldAndCancleOFVLocCd').val();
   		var holdGbnCd 		= $('#pdaStHoldAndCancleOFVHoldGbn option:selected').val();
   		var holdRsCd 		= $('#pdaStHoldAndCancleOFVHoldRs option:selected').val();

   		//유효성 검사
   		if(pltId == ""){
   			Util.alert("MSG_OUTRI_VAL_031"); //파렛트ID 항목은 필수 입력입니다.
   			return false;
   		}

   		if(holdGbnCd == ""){
   			Util.alert("MSG_ST_VAL_057"); //보류구분 항목은 필수 입력입니다.
   			return false;
   		}
   		if(holdRsCd == ""){
   			Util.alert("MSG_ST_VAL_059"); //보류사유 항목은 필수 입력입니다.
   			return false;
   		}

   		//데이터 조회 체크
   		if(locCd == ""){
   			Util.alert("MSG_WMS_ERR_002"); //조회 데이터가 없습니다.
   			return false;
   		}

   		App.prcsStart();
   		$.ajax({
   			url		: '/pda/ctrl/stock/pdaStHoldAndCancleOFV/updatePdaStHoldAndCancleOFVConfirm',
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
			pltId	 	: $('#pdaStHoldAndCancleOFVPltId').val(),
			locCd 		: $('#pdaStHoldAndCancleOFVLocCd').val(),
			holdGbnCd	: $('#pdaStHoldAndCancleOFVHoldGbn option:selected').val(),
			holdRsCd	: $('#pdaStHoldAndCancleOFVHoldRs option:selected').val(),
    	}
    }

    //데이터 초기화
    function fnInit(){
    	$('#pdaStHoldAndCancleOFVPltId').val('');
    	$('#pdaStHoldAndCancleOFVLocCd').val('');
    	$('#pdaStHoldAndCancleOFVHoldBoxQty').val('0');
    	$('#pdaStHoldAndCancleOFVHoldEaQty').val('0');
		$('#pdaStHoldAndCancleOFVHoldBoxQtyBtn').text('');
		$('#pdaStHoldAndCancleOFVHoldEaQtyBtn').text('');
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStHoldAndCancleOFVApp.fnCallbackBarcode",
	});
	PdaStHoldAndCancleOFVApp.init();
});