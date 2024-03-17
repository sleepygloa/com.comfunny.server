/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹 - 출고피킹상세 [PdaObPickingDetailPopApp]
 * Program Code     : PWMPDAOB101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 29.  		First Draft.
 */
var PdaObPickingDetailPopApp = function () {
	"use strict";

	//그리드
	var getData = $("#pdaObPickingDetailPop").PopAppGetData().rowData;

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB101E_P1';
	var proNm = 'pdaObPickingDetailPop';
	//협의에 따라 $('#' + proNm + 'id')

	return {
        init: function () {

//WMSUtil.webAppInit();

        	setUI();

        	WMSUtil.fnCombo.selectBox('pdaObPickingDetailPopLotAttr1', 'COUNTRY_CD');
        	WMSUtil.fnCombo.selectBox('pdaObPickingDetailPopLotAttr2', 'YN');
        	WMSUtil.fnCombo.selectBox('pdaObPickingDetailPopItemSt', 'ITEM_ST_CD');
        	WMSUtil.fnCombo.selectBox('pdaObPickingDetailPopNobRs', 'NOB_RS_CD');

        	fnInfo();

    		fnEvents();

	    },
	    barcode : {
	    	fnSearchPltId : function (barcode){
	        	var sendData = {
	        			proCd			: proCd, //팝업
	        			workYmd			: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
	        			obNo			: getData.OB_NO,
	        			obDetailSeq		: getData.OB_DETAIL_SEQ,
	        			obInstNo 		: getData.OB_INST_NO,
	        			pltId			: barcode
	    		}

//	        	/pda/ctrl/outbound/pdaObPickingy/listPdaPltIdInquiry
	        	//PLT ID 확인
	        	$.ajax({
	        		url			: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVDetailPltList',
	        		type 		: "POST",
	        		data		: JSON.stringify(sendData),
	                contentType	: 'application/json; charset=utf-8',
	        		success		: function(data){

	        			var data = data.dt_grid;
	        			if(data.length == 0){
	        				Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
	        				return false;
	        			}else if(data.length == 1){
	        				fnScanPltId(sendData);
	        			}else{
	        				PopApp.coreOpenPopup({
	   	   		                ajaxUrl		: "/pda/ctrl/common/pdaPltIdPop",
	   	   		                id			: "pdaCommPltIdPop",
	   	   		                domainId	: "PWMPDAIB102E_P1",
	   	   		                fullScreen 	: true,
	   	   		                data		: sendData,
	   	   		                onload		: function(modal) {
	   	   		                    // 팝업화면 클릭 시 code, name.
	//   	   		                    var callBack = {
	//   	   		                    };
	//   	   		                    App.setElIds(callBack);
	   	   		                    modal.show();
	   	   		                }, callback : function (data){
	   	   		                	var  dt = data;

	   	   		                	//팝업에서 선택한 PLT_ID 로 변경
	   	   		                	sendData["pltId"] = dt.PLT_ID;
	   	   		                	sendData["locCd"] = dt.LOC_CD;
	   	   		                	sendData["lotId"] = dt.LOT_ID;
   	   		                		fnScanPltId(sendData);
	   	   		                }
	   	   		            });
	        			}
	        		}
	        	})
	        },
	    	fnSearchLocCd : function (barcode){
	        	var sendData = {
	        			proCd			: proCd, //팝업
	        			workYmd			: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
	        			obNo			: getData.OB_NO,
	        			obDetailSeq		: getData.OB_DETAIL_SEQ,
	        			obInstNo 		: getData.OB_INST_NO,
	        			locCd			: barcode
	    		}

	        	$.ajax({
	        		url			: '/pda/ctrl/outbound/pdaObPicking/listPdaObPickingOFVDetailPltList',
	        		type 		: "POST",
	        		data		: JSON.stringify(sendData),
	                contentType	: 'application/json; charset=utf-8',
	        		success		: function(data){

	        			var data = data.dt_grid;
	        			if(data.length == 0){
	        				Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
	        				return false;
	        			}else if(data.length == 1){
	        				$('#pdaObPickingDetailPopPickLocCd').val(barcode);
	        				$('#pdaObPickingDetailPopToPltId').val(data[0].PLT_ID);
	        			}else{
	        				PopApp.coreOpenPopup({
	   	   		                ajaxUrl		: "/pda/ctrl/common/pdaPltIdPop",
	   	   		                id			: "pdaCommPltIdPop",
	   	   		                domainId	: "PWMPDAIB102E_P1",
	   	   		                fullScreen 	: true,
	   	   		                data		: sendData,
	   	   		                onload		: function(modal) {
	   	   		                    // 팝업화면 클릭 시 code, name.
	//   	   		                    var callBack = {
	//   	   		                    };
	//   	   		                    App.setElIds(callBack);
	   	   		                    modal.show();
	   	   		                }, callback : function (data){
	   	   		                	var  dt = data;

	   	   		                	//팝업에서 선택한 PLT_ID 로 변경
	   	   		                	$('#pdaObPickingDetailPopPickLocCd').val(dt.LOC_CD);
	   	   		                	$('#pdaObPickingDetailPopToPltId').val(dt.PLT_ID);
	   	   		                }
	   	   		            });
	        			}
	        		}
	        	})
	        },
	    }
    };

    //PLT 파렛트 스캔 로직
    function fnScanPltId(sendData){
    	$.ajax({
    		url			: '/pda/ctrl/outbound/pdaObPickingOFV/pdaObPickingOFVPltChk',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){
    			console.log(data);
    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}

    			var data = data.dt_grid;
    			if(data.length == 0){
    				console.log('0');
//    				Util.alert(''); //조회된 데이터가 없습니다?
    			}else if(data.length == 1){
    				$('#pdaObPickingDetailPopPickLocCd').val(data[0].LOC_CD);
    				$('#pdaObPickingDetailPopToPltId').val(data[0].PLT_ID);
    				$('#pdaObPickingDetailPopLotId').val(data[0].LOT_ID);
    			}else{
    				console.log('else');
    			}
    		}
    	})
    }

    //UI 세팅
    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //부모그리드의 행 데이터를 가져와 자식모달 의 form 에 data set
    function fnInfo(){
    	$('#pdaObPickingDetailPopObNo').text(getData.OB_NO + " - " + getData.STORE_NM);

		$('#pdaObPickingDetailPopItemCd').val(getData.ITEM_CD);
		$('#pdaObPickingDetailPopItemNm').val(getData.ITEM_NM);
		$('#pdaObPickingDetailPopUom').val(getData.UOM);
		$('#pdaObPickingDetailPopPkqty').val(getData.PKQTY);
		/*$('#pdaObPickingDetailPopItemSt option[value="'+getData.ITEM_ST_CD+'"]').attr("selected", "selected");*/
		$('#pdaObPickingDetailPopItemSt').val(getData.ITEM_ST);
		$('#pdaObPickingDetailPopInstLocCd').val(getData.INST_LOC_CD);
	    $('#pdaObPickingDetailPopPickLocCd').val(getData.INST_LOC_CD);
		$('#pdaObPickingDetailPopPltId').val(getData.PLT_ID);
		$('#pdaObPickingDetailPopToPltId').val(getData.PLT_ID); //추가 스캔PLT ID leeJonghyuk 2019.01.14
		$('#pdaObPickingDetailPopInstBoxQty').val(getData.INST_BOX_QTY);
		$('#pdaObPickingDetailPopInstEaQty').val(getData.INST_EA_QTY);
//		if(getData.PICK_QTY != 0){
			$('#pdaObPickingDetailPopPickingBoxQty').val(getData.INST_BOX_QTY);
			$('#pdaObPickingDetailPopPickingEaQty').val(getData.INST_EA_QTY);
//		}else{
//			$('#pdaObPickingDetailPopPickingBoxQty').val(getData.PICK_BOX_QTY_D);
//			$('#pdaObPickingDetailPopPickingEaQty').val(getData.PICK_EA_QTY_D);
//		}
		$('#pdaObPickingDetailPopMakeLot').val(getData.MAKE_LOT);
		$('#pdaObPickingDetailPopMakeYmd').val(getData.MAKE_YMD);
		$('#pdaObPickingDetailPopDistExpiryYmd').val(getData.DIST_EXPIRY_YMD);
/*		$('#pdaObPickingDetailPopLotAttr1 option[value="'+getData.LOT_ATTR1+'"]').attr("selected", "selected");
		$('#pdaObPickingDetailPopLotAttr2 option[value="'+getData.LOT_ATTR2+'"]').attr("selected", "selected");*/
		$('#pdaObPickingDetailPopLotAttr1').val(getData.LOT_ATTR1);
		$('#pdaObPickingDetailPopLotAttr2').val(getData.LOT_ATTR2);
		$('#pdaObPickingDetailPopLotAttr3').val(getData.LOT_ATTR3);
		$('#pdaObPickingDetailPopLotAttr4').val(getData.LOT_ATTR4);
		$('#pdaObPickingDetailPopLotAttr5').val(getData.LOT_ATTR5);
//		$('#pdaObPickingDetailPopPickingZoneLocCd').val(getData.PICK_ZONE_LOC_CD);
		$('#pdaObPickingDetailPopInstBoxQtyBtn').text(getData.BOX_UOM_CD);
		$('#pdaObPickingDetailPopPickingBoxQtyBtn').text(getData.BOX_UOM_CD);
		$('#pdaObPickingDetailPopInstEaQtyBtn').text(getData.EA_UOM_CD);
		$('#pdaObPickingDetailPopPickingEaQtyBtn').text(getData.EA_UOM_CD);
    };

    //이벤트
    function fnEvents(){

    	//사용불가
//    	$('#pdaObPickingDetailPopPickLocCd').attr('disabled', 'disabled');

		//엔터 이벤트
		$('#pdaObPickingDetailPopPickLocCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				var locCd = $(this).val().trim();
				PdaObPickingDetailPopApp.barcode.fnSearchLocCd(locCd);
				return false;
			}
		});
		$('#pdaObPickingDetailPopToPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				var pltId = $(this).val().trim();
				PdaObPickingDetailPopApp.barcode.fnSearchPltId(pltId);
				return false;
			}
		});
		$('#pdaObPickingDetailPopPickingEaQty').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				var pickQty = 	Number($('#pdaObPickingDetailPopPickingBoxQty').val()) *
								Number(getData.PKQTY) +
								Number($('#pdaObPickingDetailPopPickingEaQty').val())
//				if(getData.INST_QTY > pickQty){
//				}else{
//					$('#pdaObPickingDetailPopMakeLot')[0].scrollIntoView();
//				}
			}
		});
//		$('#pdaObPickingDetailPopPickingZoneLocCd').keydown(function(e){
//			if(e.keyCode == 13 || e.keyCode == 9){
//
//				console.log($('input[id="pdaObPickingDetailPopPickingZoneLocCd"]:focus').length)
//				return false;
//			}
//		});

		//확정
    	$('#pdaObPickingDetailPopConfBtn').click(function(){
    		fnSave();
    	})

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});
    }

    //확정
    function fnSave(){
		var sendData = {
		        obNo            : getData.OB_NO,
		        obDetailSeq     : getData.OB_DETAIL_SEQ,
		        obInstNo        : getData.OB_INST_NO,
		        itemCd          : $('#pdaObPickingDetailPopItemCd').val(),
		        itemNm          : $('#pdaObPickingDetailPopItemNm').val(),
		        itemStCd        : $('#pdaObPickingDetailPopItemSt option:selected').val(),
		        pickLocCd       : $('#pdaObPickingDetailPopPickLocCd').val(),
		        instLocCd       : $('#pdaObPickingDetailPopInstLocCd').val(),
		        pltId           : $('#pdaObPickingDetailPopPltId').val(),
		        pltIdScan       : $('#pdaObPickingDetailPopToPltId').val(),
		        instQty         : (Number($('#pdaObPickingDetailPopInstBoxQty').val()) * Number(getData.PKQTY)) + Number($('#pdaObPickingDetailPopInstEaQty').val()),
		        pickQty         : (Number($('#pdaObPickingDetailPopPickingBoxQty').val()) * Number(getData.PKQTY)) + Number($('#pdaObPickingDetailPopPickingEaQty').val()),
		        pickBoxQty      : $('#pdaObPickingDetailPopPickingBoxQty').val(),
		        pickEaQty       : $('#pdaObPickingDetailPopPickingEaQty').val(),
		        makeLot         : $('#pdaObPickingDetailPopMakeLot').val(),
		        nobRsCd         : $('#pdaObPickingDetailPopNobRs option:selected').val(),
		        makeYmd         : WMSUtil.fnDateSetting.yyyymmdd($('#pdaObPickingDetailPopMakeYmd').val()),
		        distExpiryYmd   : WMSUtil.fnDateSetting.yyyymmdd($('#pdaObPickingDetailPopDistExpiryYmd').val()),
		        lotAttr1        : $('#pdaObPickingDetailPopLotAttr1').val(),
		        lotAttr2        : $('#pdaObPickingDetailPopLotAttr2').val(),
		        lotAttr3        : $('#pdaObPickingDetailPopLotAttr3').val(),
		        lotAttr4        : $('#pdaObPickingDetailPopLotAttr4').val(),
		        lotAttr5        : $('#pdaObPickingDetailPopLotAttr5').val(),
		        pickZoneLocCd   : $('#pdaObPickingDetailPopPickingZoneLocCd').val()
    	}

		//유효성 검사
		if(sendData.pickLocCd == ''){
			Util.alert('MSG_OUTRI_VAL_033'); // 피킹로케이션 항목은 필수 입력입니다.
			return false;
		}
		if(sendData.pltIdScan == ''){
			Util.alert('MSG_OUTRI_VAL_031'); //파렛트ID 항목은 필수 입력입니다.
			return false;
		}
		if(sendData.pickBoxQty == ''){
			Util.alert('MSG_OUTRI_VAL_035'); //피킹박스수량 항목은 필수 입력입니다.
			return false;
		}
		if(sendData.pickEaQty == ''){
			Util.alert('MSG_OUTRI_VAL_037'); //피킹낱개수량 항목은 필수 입력입니다.
			return false;
		}
/*		if(sendData.makeLot == ''){
			alert('제조LOT은 필수입력입니다.');
			$('#pdaObPickingDetailPopMakeLot').focus();
			return false;
		}*/
		/** 검수 확정 로직*/
    	if(sendData.pickQty == 0 || sendData.pickQty == ''){
    		Util.alert('MSG_OUTRI_VAL_039'); //피킹박스수량, 낱개수량은 0을 초과하여 입력해야 합니다.
    		return false;
    	}
    	//2. INST_QTY > PICK_QTY --> 미출고사유 필수 입력------------해당 부분이 Validation에 필요시 다시 주석 제거
/*		if(instQty > pickQty){
			if(sendData.nobRsCd == ''){
				alert('미출고사유를 입력해주세요.');
				$('#pdaObPickingDetailPopNobRs').focus();
				return false;
			}
		}*/
    	//1. 피킹 수량이 지시수량보다 적을경우 미출고사유입력해야함
    	if(Number(sendData.instQty) > Number(sendData.pickQty)){
    		if(sendData.nobRsCd == ''){
    			Util.alert('MSG_OUTRI_VAL_049'); //미출고사유를 입력 해주십시오.
    			return false;
    		}
    	}
    	//2. 피킹 수량이 지시수량보다 많을 경우 에러
    	if(Number(sendData.instQty) < Number(sendData.pickQty)){
    		Util.alert('MSG_OUTRI_ERR_011'); //피킹로케이션 수량은 지시수량 이상으로 저장 할 수 없습니다.
    		return false;
    	}
    	//3.
    	if(Number(sendData.instQty) == Number(sendData.pickQty)){
    		if(sendData.nobRsCd != ''){
    			Util.alert('MSG_OUTRI_VAL_065'); //미출고사유를 다시 입력해주세요
    			return false;
    		}
    	}

    	if(!confirm((Util.confirm('MSG_COM_CFM_015')).msgTxt)) return false; //확정 하시겠습니까?

    	App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/outbound/pdaObPicking/updatePdaObPickingDetailPop',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success 	: function(data){
    			if(data.stsCd == 200){
    				alert(data.msgTxt);
    				$("#pdaObPickingDetailPop").popupCallback();
    				$("#pdaObPickingDetailPop").coreClosePopup();
    			}else{
    				alert(data.msgTxt);
    			}
    		},
    	})
    }


}();

$(document).ready(function() {
	PdaObPickingDetailPopApp.init();
});

