/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹 - 출고피킹상세 [PdaObTotalPickingDetailPopApp]
 * Program Code     : PWMPDAOB102E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 10. 02.  		First Draft.
 */
var PdaObTotalPickingDetailPopApp = function () {
	"use strict";


	//그리드
	var getData = $("#modalPPdaObTotalPickingConfirm").PopAppGetData().rowData;

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaObTotalPickingDetailPop';
	//협의에 따라 $('#' + proNm + 'id')

    return {
        init: function () {

//        	WMSUtil.webAppInit();

        	setUI();

        	WMSUtil.fnCombo.selectBox('pdaObTotalPickingDetailPopItemSt', 'ITEM_ST_CD');

        	getInfo();

    		getEvents();

	    }
    };

    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //부모그리드의 행 데이터를 가져와 자식모달 의 form 에 data set
    function getInfo(){
		$('#pdaObTotalPickingDetailPopItemCd').val(getData.ITEM_CD);
		$('#pdaObTotalPickingDetailPopItemNm').val(getData.ITEM_NM);
		$('#pdaObTotalPickingDetailPopUom').val(getData.UOM);
		$('#pdaObTotalPickingDetailPopPkqty').val(getData.PKQTY);
		$('#pdaObTotalPickingDetailPopItemSt option[value="'+getData.ITEM_ST_CD+'"]').attr("selected", "selected");

		$('#pdaObTotalPickingDetailPopInstLocCd').val(getData.INST_LOC_CD);
		$('#pdaObTotalPickingDetailPopPltId').val(getData.PLT_ID);

		$('#pdaObTotalPickingDetailPopInstBoxQty').val(getData.INST_BOX_QTY);
		$('#pdaObTotalPickingDetailPopInstEaQty').val(getData.INST_EA_QTY);

		$('#pdaObTotalPickingDetailPopPickingBoxQty').val(getData.INST_BOX_QTY);
		$('#pdaObTotalPickingDetailPopPickingEaQty').val(getData.INST_EA_QTY);

		$('#pdaObTotalPickingDetailPopMakeLot').val(getData.MAKE_LOT);
		$('#pdaObTotalPickingDetailPopMakeYmd').val(getData.MAKE_YMD);
		$('#pdaObTotalPickingDetailPopDistExpiryYmd').val(getData.DIST_EXPIRY_YMD);

		$('#pdaObTotalPickingDetailPopLotAttr1').val(getData.LOT_ATTR1);
		$('#pdaObTotalPickingDetailPopLotAttr2').val(getData.LOT_ATTR2);
		$('#pdaObTotalPickingDetailPopLotAttr3').val(getData.LOT_ATTR3);
		$('#pdaObTotalPickingDetailPopLotAttr4').val(getData.LOT_ATTR4);
		$('#pdaObTotalPickingDetailPopLotAttr5').val(getData.LOT_ATTR5);
    };


    function getEvents(){

    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(function () {
    		$(document).keydown(function(event){
    			if(event.keyCode == 13) {

    				var objId = event.target.id;

    				if (objId == 'pdaObTotalPickingDetailPopPickLocCd'){
    					$('#pdaObTotalPickingDetailPopPltIdScan').focus();
    				}
    				else if (objId == 'pdaObTotalPickingDetailPopPltIdScan'){
    					$('#pdaObTotalPickingDetailPopPickingBoxQty').focus();
    				}
    				else if (objId == 'pdaObTotalPickingDetailPopPickingBoxQty'){
    					$('#pdaObTotalPickingDetailPopPickingEaQty').focus();
    				}
    				else if (objId == 'pdaObTotalPickingDetailPopPickingEaQty'){
    					$('#pdaObTotalPickingDetailPopPickingEaQty').blur();
				        if (confirm((Util.confirm('MSG_COM_CFM_015')).msgTxt)){ //확정하시겠습니까?
    						$('pdaObTotalPickingDetailPopBtn').trigger('click');
    					}
    				}
    				event.preventDefault();
    				return false;
    			}
    		});
    	});

    	//팝업초기화(열림) 후 검수수량 포커스
    	$('#pdaObTotalPickingDetailPopPickLocCd').focus();

    	$('#pdaObTotalPickingDetailPopBtn').click(function(){
    		fnSave();
    	})
    }

    function fnSave(){
		var sendData = {
				waveNo		: getData.WAVE_NO,
				obNo		: getData.OB_NO,
				obDetailSeq : getData.OB_DETAIL_SEQ,
				obInstNo	: getData.OB_INST_NO,
    			itemCd		: $('#pdaObTotalPickingDetailPopItemCd').val(),
    			itemNm		: $('#pdaObTotalPickingDetailPopItemNm').val(),
    			itemStCd	: $('#pdaObTotalPickingDetailPopItemSt option:selected').val(),
    			instLocCd	: $('#pdaObTotalPickingDetailPopInstLocCd').val(),
    			pickLocCd	: $('#pdaObTotalPickingDetailPopPickLocCd').val(),
    			pickQty		: (Number($('#pdaObTotalPickingDetailPopPickingBoxQty').val()) * Number($('#pdaObTotalPickingDetailPopPkqty').val())) + Number($('#pdaObTotalPickingDetailPopPickingEaQty').val()),
    			pickBoxQty	: $('#pdaObTotalPickingDetailPopPickingBoxQty').val(),
    			pickEaQty	: $('#pdaObTotalPickingDetailPopPickingEaQty').val(),
    			makeLot		: $('#pdaObTotalPickingDetailPopMakeLot').val(),
    			makeYmd		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObTotalPickingDetailPopMakeYmd').val()),
    			distExpiryYmd : WMSUtil.fnDateSetting.yyyymmdd($('#pdaObTotalPickingDetailPopDistExpiryYmd').val()),
      			lotAttr1	: $('#pdaObTotalPickingDetailPopLotAttr1').val(),
    			lotAttr2	: $('#pdaObTotalPickingDetailPopLotAttr2').val(),
    			lotAttr3	: $('#pdaObTotalPickingDetailPopLotAttr3').val(),
    			lotAttr4	: $('#pdaObTotalPickingDetailPopLotAttr4').val(),
    			lotAttr5	: $('#pdaObTotalPickingDetailPopLotAttr5').val(),
    			lotId		: getData.LOT_ID
    	}

		if(!fnValidation(sendData)) return false;

    	if(!confirm((Util.confirm('MSG_COM_CFM_015')).msgTxt)) return false; //확정 하시겠습니까?

		/** 검수 확정 로직*/
    	if(sendData.pickQty == 0 || sendData.pickQty == ''){
    		Util.alert('MSG_OUTRI_ERR_010'); //출고피킹 확정을 할 수 없습니다. 다시 확인 부탁드립니다.
    		return false;
    	}

    	App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/obMain/obTotalPicking/updateObTotalConfirmPickingPda',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				$("#modalPPdaObTotalPickingConfirm").popupCallback();
    				$("#modalPPdaObTotalPickingConfirm").coreClosePopup();
    			}
    		},
    		complete : function(data){

    		}
    	})
    }
    function fnValidation(sendData){
    	//1. Null Check
		if(sendData.pickLocCd == ''){
			alert('피킹로케이션코드는 필수입력입니다.');
			$('#pdaObTotalPickingDetailPopPickLocCd').focus();
			return false;
		}
		if(sendData.pltIdScan == ''){
			alert('파레트ID는 필수입력입니다.');
			$('#pdaObTotalPickingDetailPopPltIdScan').focus();
			return false;
		}
		if(sendData.pickBoxQty == ''){
			alert('피킹박스수량은 필수입력입니다.');
			$('#pdaObTotalPickingDetailPopPickingBoxQty').focus();
			return false;
		}
		if(sendData.pickEaQty == ''){
			alert('피킹낱개수량은 필수입력입니다.');
			$('#pdaObTotalPickingDetailPopPickingEaQty').focus();
			return false;
		}
		/** 검수 확정 로직*/
    	if(sendData.pickQty == 0 || sendData.pickQty == ''){
    		Util.alert('MSG_OUTRI_ERR_010'); //출고피킹 확정을 할 수 없습니다. 다시 확인 부탁드립니다.
    		return false;
    	}
    	return true;
    }

}();

$(document).ready(function() {
	PdaObTotalPickingDetailPopApp.init();
});

