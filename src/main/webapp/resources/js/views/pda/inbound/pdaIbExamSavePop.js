/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고검수 - 입고검수상세 [PdaIbExamSavePopApp]
 * Program Code     : PWMPDAIB101E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaIbExamSavePopApp = function () {
	"use strict";


	//그리드
	var getData = $("#pdaIbExamSavePop").PopAppGetData().rowData;

	//프로그램 코드, 명
	var proCd = 'PWMPDAIB101E_P2';
	var proNm = 'pdaIbExamSavePop';
	//협의에 따라 $('#' + proNm + 'id')

    return {
        init: function () {

//        	WMSUtil.webAppInit();

        	setUI();

        	WMSUtil.fnCombo.selectBox('pdaIbExamSavePopLotAttr1', 'COUNTRY_CD');

        	WMSUtil.fnCombo.selectBox('pdaIbExamSavePopLotAttr2', 'YN');

        	WMSUtil.fnCombo.selectBox('pdaIbExamSavePopItemSt', 'ITEM_ST_CD');

        	fnInfo();

    		fnEvents();

	    }
    };

    //UI 세팅
    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //부모그리드의 행 데이터를 가져와 자식모달 의 form 에 data set
    function fnInfo(){
    	$('#pdaIbExamSavePopLotAttr2').val('N');

//    	$.ajax({
//    		url		: '/pda/ctrl/inbound/pdaIbExam/listPdaIbExamSave',
//    		data	: {
//    			ibNo 		: getData.IB_NO,
//    			ibDetailSeq : getData.IB_DETAIL_SEQ
//    		},
//    		success : function(data){
//
//    			if(data.dt_grid.length != 0){
//    				var data = data.dt_grid[0];
//
//    				$('#pdaIbExamSavePopIbNo').text(data.IB_NO + " - " + data.SUPPLIER_NM);
//
//        			$('#pdaIbExamSavePopItemCd').val(data.ITEM_CD);
//        			$('#pdaIbExamSavePopItemNm').val(data.ITEM_NM);
//        			$('#pdaIbExamSavePopUom').val(data.UOM);
//        			$('#pdaIbExamSavePopPkqty').val(data.PKQTY);
//        			$('#pdaIbExamSavePopItemSt option[value="'+data.ITEM_ST_CD+'"]').attr("selected", "selected");
//
//        			//검수수량
//        			$('#pdaIbExamSavePopApprBoxQty').val(data.APPR_BOX_QTY);
//        			$('#pdaIbExamSavePopApprEaQty').val(data.APPR_EA_QTY);
//        			$('#pdaIbExamSavePopExamBoxQty').val('0');
//        			$('#pdaIbExamSavePopExamEaQty').val('0');
//
//        			$('#pdaIbExamSavePopMakeLot').val(data.MAKE_LOT);
////        			$('#pdaIbExamSavePopMakeYmd').val(data.MAKE_YMD);
////        			$('#pdaIbExamSavePopDistExpiryYmd').val(data.DIST_EXPIRY_YMD);
//
//        			$('#pdaIbExamSavePopLotAttr1').val(data.LOT_ATTR1);
////        			$('#pdaIbExamSavePopLotAttr2').val(data.LOT_ATTR2);
//        			$('#pdaIbExamSavePopLotAttr3').val('');
//        			$('#pdaIbExamSavePopLotAttr4').val(data.LOT_ATTR4);
//        			$('#pdaIbExamSavePopLotAttr5').val(data.LOT_ATTR5);
//
//        			$('#pdaIbExamSavePopApprBoxQtyBtn').text(data.BOX_UOM_CD);
//        			$('#pdaIbExamSavePopApprEaQtyBtn').text(data.EA_UOM_CD);
//        			$('#pdaIbExamSavePopExamBoxQtyBtn').text(data.BOX_UOM_CD);
//        			$('#pdaIbExamSavePopExamEaQtyBtn').text(data.EA_UOM_CD);
//    			}else{

    				$('#pdaIbExamSavePopIbNo').text(getData.IB_NO + " - " + getData.SUPPLIER_NM);

        			$('#pdaIbExamSavePopItemCd').val(getData.ITEM_CD);
        			$('#pdaIbExamSavePopItemNm').val(getData.ITEM_NM);
        			$('#pdaIbExamSavePopUom').val(getData.UOM);
        			$('#pdaIbExamSavePopPkqty').val(getData.PKQTY);
        			$('#pdaIbExamSavePopItemSt option[value="'+getData.ITEM_ST_CD+'"]').attr("selected", "selected");

        			console.log(WMSUtil.numberComma(getData.APPR_BOX_QTY))
        			//검수수량
        			$('#pdaIbExamSavePopApprBoxQty').val(WMSUtil.numberComma(getData.APPR_BOX_QTY));
        			//$('#pdaIbExamSavePopApprEaQty').val(WMSUtil.numberComma(getData.APPR_EA_QTY));
        			$('#pdaIbExamSavePopExamBoxQty').val('0');
        			$('#pdaIbExamSavePopExamEaQty').val('0');

        			$('#pdaIbExamSavePopMakeLot').val(getData.MAKE_LOT);
//        			$('#pdaIbExamSavePopMakeYmd').val(getData.MAKE_YMD);
//        			$('#pdaIbExamSavePopDistExpiryYmd').val(getData.DIST_EXPIRY_YMD);

        			$('#pdaIbExamSavePopLotAttr1').val(getData.LOT_ATTR1);
//        			$('#pdaIbExamSavePopLotAttr2').val('N');
        			$('#pdaIbExamSavePopLotAttr3').val('');
        			$('#pdaIbExamSavePopLotAttr4').val(getData.LOT_ATTR4);
        			$('#pdaIbExamSavePopLotAttr5').val(getData.LOT_ATTR5);

        			$('#pdaIbExamSavePopApprBoxQtyBtn').text(getData.BOX_UOM_CD);
        			//$('#pdaIbExamSavePopApprEaQtyBtn').text(getData.EA_UOM_CD);
        			$('#pdaIbExamSavePopExamBoxQtyBtn').text(getData.BOX_UOM_CD);
        			//$('#pdaIbExamSavePopExamEaQtyBtn').text(getData.EA_UOM_CD);
//    			}
//    		}
//    	})
    };


    //이벤트
    function fnEvents(){

    	//DALAT 활성화
    	//스낵 제품 및 내수구분이 내수(LOCAL)일때
    	if(getData.LARGE_CLASS_CD == '04' && getData.LOCAL_EXPORT_GBN_CD == 'D'){
    		$('#pdaIbExamSavePopLotAttr2').attr('disabled', false);
    	}else{
    		$('#pdaIbExamSavePopLotAttr2').attr('disabled', 'disabled');
    	}


		//엔터 이벤트
		$('#pdaIbExamSavePopExamBoxQty').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopExamEaQty').focus();
			}
		});
		$('#pdaIbExamSavePopExamEaQty').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopMakeLot').focus();
			}
		});
		$('#pdaIbExamSavePopMakeLot').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopMakeYmd').focus();
			}
		});
		$('#pdaIbExamSavePopMakeYmd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopDistExpiryYmd').focus();
			}
		});
		$('#pdaIbExamSavePopDistExpiryYmd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopLotAttr1').focus();
			}
		});
		$('#pdaIbExamSavePopLotAttr1').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopLotAttr2').focus();
			}
		});
		$('#pdaIbExamSavePopLotAttr2').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopLotAttr3').focus();
			}
		});
		$('#pdaIbExamSavePopLotAttr3').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopLotAttr4').focus();
			}
		});
		$('#pdaIbExamSavePopLotAttr4').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopLotAttr5').focus();
			}
		});
		$('#pdaIbExamSavePopLotAttr5').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamSavePopLotAttr5').blur();
			}
		});
    	//엔터 이벤트

    	//제조일자, 유통기한일자 datepicker 세팅
    	$('#pdaIbExamSavePopMakeYmdDatePicker').datepicker();
    	$('#pdaIbExamSavePopDistExpiryYmdDatePicker').datepicker();

    	//검수 버튼 클릭
    	$('#pdaIbExamSavePopBtn').click(function(){
    		fnSave();
    	})

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});

    }


    //검수
    function fnSave(){
		var sendData = {
				ibNo		: getData.IB_NO,
				ibDetailSeq : getData.IB_DETAIL_SEQ,
    			itemCd		: $('#pdaIbExamSavePopItemCd').val(),
    			itemNm		: $('#pdaIbExamSavePopItemNm').val(),
//        			uom			: $('#pdaIbExamSavePopUom').val(),
//        			pkqty		: $('#pdaIbExamSavePopPkqty').val(),
    			itemStCd	: $('#pdaIbExamSavePopItemSt option:selected').val(),
    			apprQty		: getData.APPR_QTY,
    			examQty		: (Number($('#pdaIbExamSavePopExamBoxQty').val()) * Number($('#pdaIbExamSavePopPkqty').val())) + Number($('#pdaIbExamSavePopExamEaQty').val()),
    			examBoxQty	: $('#pdaIbExamSavePopExamBoxQty').val(),
    			examEaQty	: $('#pdaIbExamSavePopExamEaQty').val(),
    			makeLot		: $('#pdaIbExamSavePopMakeLot').val(),
    			makeYmd		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaIbExamSavePopMakeYmd').val()),
    			distExpiryYmd : WMSUtil.fnDateSetting.yyyymmdd($('#pdaIbExamSavePopDistExpiryYmd').val()),
    			lotAttr1	: $('#pdaIbExamSavePopLotAttr1').val(),
    			lotAttr2	: $('#pdaIbExamSavePopLotAttr2').val(),
    			lotAttr3	: $('#pdaIbExamSavePopLotAttr3').val(),
    			lotAttr4	: $('#pdaIbExamSavePopLotAttr4').val(),
    			lotAttr5	: $('#pdaIbExamSavePopLotAttr5').val(),
    			ibGbnCd		: getData.IB_GBN_CD,
    			dcCd		: getData.DC_CD,
    			poNo		: getData.PO_NO

    	}

		//검수수량 0과 빈값 체크
    	if(sendData.examQty == 0 || sendData.examQty == ''){
    		Util.alert('MSG_INRI_ERR_005'); //검수수량이 없습니다.
    		return false;
    	}

    	//검수박스수량
		if(sendData.examBoxQty == ''){
			Util.alert('MSG_INRI_VAL_011'); //검수박스수량 항목은 필수입력 입니다.
			$('#pdaIbExamSavePopExamBoxQty').focus();
			return false;
		}
		//검수낱개수량
		if(sendData.examEaQty == ''){
			Util.alert('MSG_INRI_VAL_013'); //검수낱개수량 항목은 필수입력 입니다.
			$('#pdaIbExamSavePopExamEaQty').focus();
			return false;
		}
//		if(sendData.makeLot == ''){
//			Util.alert('MSG_INRI_VAL_060'); //생산LOT 항목은 필수입력입니다.
//			$('#pdaIbExamSavePopMakeLot').focus();
//			return false;
//		}

		//검수 총 수량 0인지 확인
    	if(sendData.examBoxQty == 0 && sendData.examEaQty == 0){
    		Util.alert('MSG_INRI_VAL_039'); //검수박스수량, 낱개수량은 0을 초과하여 입력해야 합니다.
    		return false;
    	}
//    	if(Number(sendData.apprQty) < Number(sendData.examQty)){
//    		Util.alert('MSG_INRI_VAL_061'); //검수수량이 승인수량보다 많습니다.
//    		return false;
//    	}

    	//생산일자 필수
        if(sendData.makeYmd == ''){
            Util.alert('MSG_INRI_VAL_068'); //생산일자 항목은 필수 입력입니다.
            $('#pdaIbExamSavePopMakeYmd').focus();
            return false;
        }

//		//생산일시 필수
//		if(sendData.lotAttr3 == ''){
//			Util.alert('MSG_INRI_VAL_069'); //생산일시 항목은 필수입력입니다.
//			$('#pdaIbExamSavePopLotAttr3').focus();
//			return false;
//		}else{
//			/*if((data.lotAttr3).length != 4){
//				Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//				return false;
//			}else{*/
//			var str = sendData.lotAttr3.split(":");
//
//			if (str.length > 1) {
//				if(Number(str[0]) >= 24){
//					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//					return false;
//				}
//				if(Number(str[1]) >= 60){
//					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//					return false;
//				}
//				sendData.lotAttr3= str[0]+str[1];
//				// :없음
//			} else if (str.length == 1) {
//				var hh24 = str[0].substr(0, 2);
//				var dd = str[0].substr(2, 2);
//
//				if(Number(hh24) >= 24){
//					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//					return false;
//				}
//				if(Number(dd) >= 60){
//					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//					return false;
//				}
//				sendData.lotAttr3= hh24+dd;
//			}
//			//}
//		}

		if (!confirm((Util.confirm('MSG_INRI_CFM_005')).msgTxt)) return; //검수하시겠습니까?

		/** 검수 로직 끝 */
		App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/inbound/pdaIbExam/insertPdaIbExam',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){
    			if(data.stsCd == 200){
    				alert(data.msgTxt);
                    $("#pdaIbExamSavePop").popupCallback();
                    $("#pdaIbExamSavePop").coreClosePopup();
    			}else{
    				alert(data.msgTxt);
    				return false;
    			}
    		}
    	})
    }

    function fnValidation(data){
    	//검수박스수량
		if(data.examBoxQty == ''){
			Util.alert('MSG_INRI_VAL_011'); //검수박스수량 항목은 필수입력 입니다.
			$('#pdaIbExamSavePopExamBoxQty').focus();
			return false;
		}
		//검수낱개수량
		if(data.examEaQty == ''){
			Util.alert('MSG_INRI_VAL_013'); //검수낱개수량 항목은 필수입력 입니다.
			$('#pdaIbExamSavePopExamEaQty').focus();
			return false;
		}
//		if(sendData.makeLot == ''){
//			Util.alert('MSG_INRI_VAL_060'); //생산LOT 항목은 필수입력입니다.
//			$('#pdaIbExamSavePopMakeLot').focus();
//			return false;
//		}

		//검수 총 수량 0인지 확인
    	if(data.examBoxQty == 0 && data.examEaQty == 0){
    		Util.alert('MSG_INRI_VAL_039'); //검수박스수량, 낱개수량은 0을 초과하여 입력해야 합니다.
    		return false;
    	}
//    	if(Number(sendData.apprQty) < Number(sendData.examQty)){
//    		Util.alert('MSG_INRI_VAL_061'); //검수수량이 승인수량보다 많습니다.
//    		return false;
//    	}

    	//생산일자 필수
        if(data.makeYmd == ''){
            Util.alert('MSG_INRI_VAL_068'); //생산일자 항목은 필수 입력입니다.
            $('#pdaIbExamSavePopMakeYmd').focus();
            return false;
        }

		//생산일시 필수
		if(data.lotAttr3 == ''){
//			Util.alert('MSG_INRI_VAL_069'); //생산일시 항목은 필수입력입니다.
//			$('#pdaIbExamSavePopLotAttr3').focus();
//			return false;
		}else{
			/*if((data.lotAttr3).length != 4){
				Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
				return false;
			}else{*/
			var str = data.lotAttr3.split(":");

			if (str.length > 1) {
				if(Number(str[0]) >= 24){
					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
					return false;
				}
				if(Number(str[1]) >= 60){
					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
					return false;
				}
				data.lotAttr3= str[0]+str[1];
				// :없음
			} else if (str.length == 1) {
				var hh24 = str[0].substr(0, 2);
				var dd = str[0].substr(2, 2);

				if(Number(hh24) >= 24){
					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
					return false;
				}
				if(Number(dd) >= 60){
					Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
					return false;
				}
				data.lotAttr3= hh24+dd;
			}
			//}
		}

		return true;
    }

}();

$(document).ready(function() {
	PdaIbExamSavePopApp.init();
});
