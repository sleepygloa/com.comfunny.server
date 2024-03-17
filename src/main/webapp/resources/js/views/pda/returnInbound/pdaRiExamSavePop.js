/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반입검수 - 반입검수상세 [PdaRiExamSavePopApp]
 * Program Code     : 2PWMPDARI101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 10. 11.  		First Draft.
 */
var PdaRiExamSavePopApp = function () {
	"use strict";


	//그리드
	var getData = $("#pdaRiExamSavePop").PopAppGetData().rowData;

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRiExamSavePop';
	//협의에 따라 $('#' + proNm + 'id')

    return {
        init: function () {

//        	WMSUtil.webAppInit();

        	setUI();

        	WMSUtil.fnCombo.selectBox('pdaRiExamSavePopLotAttr1', 'COUNTRY_CD');

        	WMSUtil.fnCombo.selectBox('pdaRiExamSavePopLotAttr2', 'YN');

        	WMSUtil.fnCombo.selectBox('pdaRiExamSavePopItemSt', 'ITEM_ST_CD');

        	getInfo();

    		getEvents();

	    }
    };

    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //부모그리드의 행 데이터를 가져와 자식모달 의 form 에 data set
    function getInfo(){
    	$('#pdaRiExamSavePopLotAttr2').val('N');

    	$.ajax({
    		url		: '/pda/ctrl/returnInbound/pdaRiExam/listPdaRiExamSave',
    		data	: {
    			riNo		: getData.RI_NO,
    			riDetailSeq : getData.RI_DETAIL_SEQ
    		},
    		success : function(data){

    			if(data.dt_grid.length != 0){
    				var data = data.dt_grid[0];

    				$('#pdaRiExamSavePopRiNo').text(data.RI_NO + " - " + data.STORE_NM);

        			$('#pdaRiExamSavePopItemCd').val(data.ITEM_CD);
        			$('#pdaRiExamSavePopItemNm').val(data.ITEM_NM);
        			$('#pdaRiExamSavePopUom').val(data.UOM);
        			$('#pdaRiExamSavePopPkqty').val(data.PKQTY);
        			$('#pdaRiExamSavePopItemSt option[value="'+data.ITEM_ST_CD+'"]').attr("selected", "selected");

        			//검수수량
        			$('#pdaRiExamSavePopPlanBoxQty').val(data.PLAN_BOX_QTY);
        			$('#pdaRiExamSavePopPlanEaQty').val(data.PLAN_EA_QTY);
        			$('#pdaRiExamSavePopExamBoxQty').val('0');
        			$('#pdaRiExamSavePopExamEaQty').val('0');

        			$('#pdaRiExamSavePopMakeLot').val(data.MAKE_LOT);
//        			$('#pdaRiExamSavePopMakeYmd').val(data.MAKE_YMD);
//        			$('#pdaRiExamSavePopDistExpiryYmd').val(data.DIST_EXPIRY_YMD);

        			$('#pdaRiExamSavePopLotAttr1').val(data.LOT_ATTR1);
//        			$('#pdaRiExamSavePopLotAttr2').val(data.LOT_ATTR2);
        			$('#pdaRiExamSavePopLotAttr3').val('');
        			$('#pdaRiExamSavePopLotAttr4').val(data.LOT_ATTR4);
        			$('#pdaRiExamSavePopLotAttr5').val(data.LOT_ATTR5);

        			$('#pdaRiExamSavePopPlanBoxQtyBtn').text(data.BOX_UOM_CD);
        			$('#pdaRiExamSavePopPlanEaQtyBtn').text(data.EA_UOM_CD);
        			$('#pdaRiExamSavePopExamBoxQtyBtn').text(data.BOX_UOM_CD);
        			$('#pdaRiExamSavePopExamEaQtyBtn').text(data.EA_UOM_CD);

    			}else{
    				$('#pdaRiExamSavePopRiNo').text(getData.RI_NO + " - " + getData.STORE_NM);

        			$('#pdaRiExamSavePopItemCd').val(getData.ITEM_CD);
        			$('#pdaRiExamSavePopItemNm').val(getData.ITEM_NM);
        			$('#pdaRiExamSavePopUom').val(getData.UOM);
        			$('#pdaRiExamSavePopPkqty').val(getData.PKQTY);
        			$('#pdaRiExamSavePopItemSt option[value="'+getData.ITEM_ST_CD+'"]').attr("selected", "selected");
//        			$('#pdaRiExamSavePopPlanQty').val(getData.EXAM_QTY);

        			//검수수량
        			$('#pdaRiExamSavePopPlanBoxQty').val(getData.PLAN_BOX_QTY);
        			$('#pdaRiExamSavePopPlanEaQty').val(getData.PLAN_EA_QTY);
        			$('#pdaRiExamSavePopExamBoxQty').val(getData.EXAM_BOX_QTY);
        			$('#pdaRiExamSavePopExamEaQty').val(getData.EXAM_EA_QTY);

        			$('#pdaRiExamSavePopMakeLot').val(getData.MAKE_LOT);
        			$('#pdaRiExamSavePopMakeYmd').val(getData.MAKE_YMD);
        			$('#pdaRiExamSavePopDistExpiryYmd').val(getData.DIST_EXPIRY_YMD);
        			$('#pdaRiExamSavePopLotAttr1').val(getData.LOT_ATTR1);
//        			$('#pdaRiExamSavePopLotAttr2').val(getData.LOT_ATTR2);
        			$('#pdaRiExamSavePopLotAttr3').val(getData.LOT_ATTR3);
        			$('#pdaRiExamSavePopLotAttr4').val(getData.LOT_ATTR4);
        			$('#pdaRiExamSavePopLotAttr5').val(getData.LOT_ATTR5);

        			$('#pdaRiExamSavePopPlanBoxQtyBtn').text(getData.BOX_UOM_CD);
        			$('#pdaRiExamSavePopPlanEaQtyBtn').text(getData.EA_UOM_CD);
        			$('#pdaRiExamSavePopExamBoxQtyBtn').text(getData.BOX_UOM_CD);
        			$('#pdaRiExamSavePopExamEaQtyBtn').text(getData.EA_UOM_CD);
    			}
    		}
    	});
    };


    function getEvents(){

    	//DALAT 여부
console.log(getData);

    	if(getData.LARGE_CLASS_CD == '04' && getData.LOCAL_EXPORT_GBN_CD == 'D'){
    		$('#pdaRiExamSavePopLotAttr2').attr('disabled', false);
    	}else{
    		$('#pdaRiExamSavePopLotAttr2').attr('disabled', 'disabled');
    	}

    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(function () {
    		$(document).keydown(function(event){
    			if(event.keyCode == 13) {

    				var objId = event.target.id;

    				if (objId == 'pdaRiExamSavePopExamBoxQty'){
    					$('#pdaRiExamSavePopExamEaQty').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopExamEaQty'){
    					$('#pdaRiExamSavePopPltId').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopPltId'){
    					$('#pdaRiExamSavePopMakeLot').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopMakeLot'){
    					$('#pdaRiExamSavePopMakeYmd').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopMakeYmd'){
    					$('#pdaRiExamSavePopDistExpiryYmd').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopDistExpiryYmd'){
    					$('#pdaRiExamSavePopLotAttr1').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopLotAttr1'){
    					$('#pdaRiExamSavePopLotAttr2').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopLotAttr2'){
    					$('#pdaRiExamSavePopLotAttr3').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopLotAttr3'){
    					$('#pdaRiExamSavePopLotAttr4').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopLotAttr4'){
    					$('#pdaRiExamSavePopLotAttr5').focus();
    				}
    				else if (objId == 'pdaRiExamSavePopLotAttr5'){
    					$('#pdaRiExamSavePopLotAttr5').blur();

//    					if(confirm(Util.confirm('MSG_INRI_CFM_005').msgTxt)){
    						$('pdaRiExamSavePopBtn').trigger('click');
//    					}
    				}
    				event.preventDefault();
    				return false;
    			}
    		});
    	});

    	//팝업초기화(열림) 후 검수수량 포커스
//    	$('#pdaRiExamSavePopExamQty').focus();

    	//제조일자, 유통기한일자 datepicker 세팅
    	$('#pdaRiExamSavePopMakeYmd').datepicker();
    	$('#pdaRiExamSavePopDistExpiryYmd').datepicker();

    	$('#pdaRiExamSavePopBtn').click(function(){
    		fnSave();
    	})
    }

    function fnSave(){
		var sendData = {
				riNo		: getData.RI_NO,
				riDetailSeq : getData.RI_DETAIL_SEQ,
    			itemCd		: $('#pdaRiExamSavePopItemCd').val(),
    			itemNm		: $('#pdaRiExamSavePopItemNm').val(),
    			itemStCd	: $('#pdaRiExamSavePopItemSt option:selected').val(),
    			planQty		: getData.PLAN_QTY,
    			examQty		: (Number($('#pdaRiExamSavePopExamBoxQty').val()) * Number($('#pdaRiExamSavePopPkqty').val())) + Number($('#pdaRiExamSavePopExamEaQty').val()),
    			examBoxQty	: $('#pdaRiExamSavePopExamBoxQty').val(),
    			examEaQty	: $('#pdaRiExamSavePopExamEaQty').val(),
    			makeLot		: $('#pdaRiExamSavePopMakeLot').val(),
    			makeYmd		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaRiExamSavePopMakeYmd').val()),
    			distExpiryYmd : WMSUtil.fnDateSetting.yyyymmdd($('#pdaRiExamSavePopDistExpiryYmd').val()),
    			lotAttr1	: $('#pdaRiExamSavePopLotAttr1').val(),
    			lotAttr2	: $('#pdaRiExamSavePopLotAttr2').val(),
    			lotAttr3	: $('#pdaRiExamSavePopLotAttr3').val(),
    			lotAttr4	: $('#pdaRiExamSavePopLotAttr4').val(),
    			lotAttr5	: $('#pdaRiExamSavePopLotAttr5').val(),
    			riGbnCd		: getData.RI_GBN_CD
    	}

		/** 검수 확정 로직*/
    	if(sendData.examQty == 0 || sendData.examQty == ''){
    		Util.alert('MSG_INRI_ERR_005'); //검수수량이 없습니다.
    		return false;
    	}

		if(!fnValidation(sendData)) return false;

		if(!confirm((Util.confirm('MSG_INRI_CFM_005')).msgTxt)) return false; //검수하시겠습니까?

		/** 검수 확정 로직 끝 */
    	$.ajax({
    		url		: '/pda/ctrl/returnInbound/pdaRiExam/insertPdaRiExamD',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
    		async	: false,
            contentType: 'application/json; charset=utf-8',
    		success : function(data){

    			if(data.stsCd == 200){
    				alert(data.msgTxt);

                    $("#pdaRiExamSavePop").popupCallback();
                    $("#pdaRiExamSavePop").coreClosePopup();
    			}else{
    				alert(data.msgTxt);
    			}
    		},
    		complete : function(data){

    		}
    	})
    }

    function fnValidation(sendData){
    	//1. Null Check
//		if(sendData.pltIdScan == ''){
//			alert('파레트ID는 필수입력입니다.');
//			$('#pdaRiExamSavePopPltIdScan').focus();
//			return false;
//		}
//		if(sendData.makeLot == ''){
//			alert('제조LOT은 필수입력입니다.');
//			$('#pdaRiExamSavePopMakeLot').focus();
//			return false;
//		}
		if(sendData.examBoxQty == ''){
			Util.alert('MSG_INRI_VAL_011'); //검수박스수량 항목은 필수입력 입니다.
			$('#pdaRiExamSavePopExamBoxQty').focus();
			return false;
		}
		if(sendData.examEaQty == ''){
			Util.alert('MSG_INRI_VAL_013'); //검수낱개수량 항목은 필수입력 입니다.
			$('#pdaRiExamSavePopExamEaQty').focus();
			return false;
		}

		/** 검수 확정 로직*/
    	if(sendData.examQty == 0 || sendData.examQty == ''){
    		Util.alert('MSG_INRI_ERR_005'); //검수수량이 없습니다.
    		return false;
    	}
//    	if(Number(sendData.planQty) < Number(sendData.examQty)){
//    		alert('검수수량이 지시수량보다 많습니다.')
//    		return false;
//    	}

		return true;
    }

}();

$(document).ready(function() {
	PdaRiExamSavePopApp.init();
});
