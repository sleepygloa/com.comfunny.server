/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고실사 - 재고실사신규팝업[PWMPDAST103E_P3]
 * Program Code     : PWMPDAST103E_P3
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 24.  		First Draft.
 */
var PdaStInspNewPopApp = function () {
	"use strict";

	var getData = $("#pdaStInspNewPop").PopAppGetData();

	var proCd = 'PWMPDAST103E_P3';
	var proNm = 'pdaStInspNewPop';


    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaStInspNewPopLotAttr1', 'COUNTRY_CD');

        	WMSUtil.fnCombo.selectBox('pdaStInspNewPopLotAttr2', 'YN', 'N');

        	WMSUtil.fnCombo.selectBox('pdaStInspNewPopItemStCd', 'ITEM_ST_CD');

        	setUI();

    		fnEvents();

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
    		//제품바코드 확인
			var length = barcode.length;
			if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
    			||barcode.length == WMSUtil.barcodeTextLength('BOX_BOARCODE')){
					$('#pdaStInspNewPopItemCd').val(barcode);
					var data = {
							proCd	: proCd,
							itemCd 	: barcode
					}

					fnItemSearch(data);
			//로케이션 확인
			}else if(length <= WMSUtil.barcodeTextLength('LOC_CD')){
				$('#pdaStInspNewPopTgtLoc').val(barcode);
			//파렛트 확인
			}else if(length == WMSUtil.barcodeTextLength('PLT_ID')){
				$('#pdaStInspNewPopPltId').val(barcode);
			}
    	}
    }

    //UI 세팅
    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //이벤트
    function fnEvents(){
    	$('#pdaStInspNewPopMakeYmdDatePicker').datepicker("setDate", '');
    	$('#pdaStInspNewPopDistExpiryYmdDatePicker').datepicker("setDate", '');

		//엔터 이벤트
		$('#pdaStInspNewPopItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				var data = {
						proCd	: proCd,
						itemCd 	: $('#pdaStInspNewPopItemCd').val()
				}
				$('#pdaStInspNewPopItemCd').blur();
				fnItemSearch(data);
			}
		});

		//저장버튼 클릭
       	$('#pdaStInspNewPopSaveBtn').on('click', function(){
       		fnSave();
		});

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});

    }

    //제품바코드 조회
    function fnItemSearch(itemData){

    	$.ajax({
    		url		: '/pda/ctrl/common/listStInspItem',
    		type 	: "POST",
    		data	: itemData,
//            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			var dt_grid = data.dt_grid;

    			if(dt_grid.length == 0){

    			}else if(dt_grid.length == 1){
    				$('#pdaStInspNewPopItemCd').val(dt_grid[0].ITEM_CD);
    				$('#pdaStInspNewPopItemNm').val(dt_grid[0].ITEM_NM);
    				$('#pdaStInspNewPopUom').val(dt_grid[0].UOM);
    				$('#pdaStInspNewPopPkqty').val(dt_grid[0].PKQTY);
    				$('#pdaStInspNewPopStockBoxQtyBtn').text(dt_grid[0].BOX_UOM_CD);
    				$('#pdaStInspNewPopStockEaQtyBtn').text(dt_grid[0].EA_UOM_CD);
    				$('#pdaStInspNewPopStockInspBoxQtyBtn').text(dt_grid[0].BOX_UOM_CD);
    				$('#pdaStInspNewPopStockInspEaQtyBtn').text(dt_grid[0].EA_UOM_CD);

    			}else{
    		        PopApp.coreOpenPopup({
	    	            ajaxUrl 	: '/pda/ctrl/common/pdaItemPop',
	    	            id 			: 'modalItemPopup',
	    	            width 		: '550',
	    	            domainId	: "PWMCM111Q_P1",
	    	            data		: itemData,
	    	            visible		: true,
	    	            fullScreen 	: true,
	    	            onload 		: function(modal) {
	    	                var callBack ={
	    	                        "ITEM_CD"           : "pdaStInspNewPopItemCd",

	    	                };
	    	                App.setElIds(callBack);
	    	                modal.show();
	    	            },
	    	            callback 	: function(data){
	    	            	getInfo();
	    	            }
	    	        });
    			}
    		}
    	});
    }

    //제품정보 조회
    function getInfo(){

    	$.ajax({
//    		url		: '/ctrl/stockStInsp/listStInspDetail',
    		url		: '/pda/ctrl/common/listStInspItem',
    		data	: {
    			stInspNo	: getData.stInspNo,
    			itemCd 		: $('#pdaStInspNewPopItemCd').val(),
    		},
    		success : function(data){

    			var dt_grid = null;

    			if(data.dt_grid.length != 0){
    				dt_grid = data.dt_grid[0];
    			}else{
    				dt_grid = getData;
    			}

    			$('#pdaStInspNewPopLocCd').val(dt_grid.TGT_LOC);
    			$('#pdaStInspNewPopItemCd').val(dt_grid.ITEM_CD);
    			$('#pdaStInspNewPopItemNm').val(dt_grid.ITEM_NM);
    			$('#pdaStInspNewPopUom').val(dt_grid.UOM);
    			$('#pdaStInspNewPopPkqty').val(dt_grid.PKQTY);
//    			$('#pdaStInspNewPopItemStCd').val(dt_grid.ITEM_ST_CD);

    			$('#pdaStInspNewPopStockBoxQty').val('0');
    			$('#pdaStInspNewPopStockEaQty').val('0');
    			$('#pdaStInspNewPopStockInspBoxQty').val('0');
    			$('#pdaStInspNewPopStockInspEaQty').val('0');

//    			$('#pdaStInspNewPopStockBoxQty').val(dt_grid.STOCK_BOX_QTY);
    			$('#pdaStInspNewPopStockBoxQtyBtn').text(dt_grid.BOX_UOM_CD);
//    			$('#pdaStInspNewPopStockEaQty').val(dt_grid.STOCK_EA_QTY);
    			$('#pdaStInspNewPopStockEaQtyBtn').text(dt_grid.EA_UOM_CD);

//    			$('#pdaStInspNewPopStockInspBoxQty').val(dt_grid.STOCK_BOX_QTY);
    			$('#pdaStInspNewPopStockInspBoxQtyBtn').text(dt_grid.BOX_UOM_CD);
//    			$('#pdaStInspNewPopStockInspEaQty').val(dt_grid.STOCK_EA_QTY);
    			$('#pdaStInspNewPopStockInspEaQtyBtn').text(dt_grid.EA_UOM_CD);

//    			$('#pdaStInspNewPopPltId').val(dt_grid.PLT_ID);
//    			$('#pdaStInspNewPopToPltId').val(dt_grid.PLT_ID);
//    			$('#pdaStInspNewPopMakeLot').val(dt_grid.MAKE_LOT);
//    			$('#pdaStInspNewPopMakeYmd').val(dt_grid.MAKE_YMD);
//    			$('#pdaStInspNewPopDistExpiryYmd').val(dt_grid.DIST_EXPIRY_YMD);
//    			$('#pdaStInspNewPopLotAttr1').val(dt_grid.LOT_ATTR1);
//    			$('#pdaStInspNewPopLotAttr2').val(dt_grid.LOT_ATTR2);
//    			$('#pdaStInspNewPopLotAttr3').val(dt_grid.LOT_ATTR3);
//    			$('#pdaStInspNewPopLotAttr4').val(dt_grid.LOT_ATTR4);
//    			$('#pdaStInspNewPopLotAttr5').val(dt_grid.LOT_ATTR5);

    		}
    	});

	}

    //저장
    function fnSave(){

		var sendData = {
				stInspNo		: getData.stInspNo,
				workStCd 		: 10,
				itemCd 			: $('#pdaStInspNewPopItemCd').val(),
				itemStCd 		: $('#pdaStInspNewPopItemStCd').val(),
				locCd	 		: $('#pdaStInspNewPopTgtLoc').val(),
				ibYmd			: '',
				inspQty			: Number($('#pdaStInspNewPopStockInspBoxQty').val())
								* Number($('#pdaStInspNewPopPkqty').val())
								+ Number($('#pdaStInspNewPopStockInspEaQty').val()),
				makeLot 		: $('#pdaStInspNewPopMakeLot').val(),
				makeYmd 		: $('#pdaStInspNewPopMakeYmd').val(),
				distExpiryYmd	: $('#pdaStInspNewPopDistExpiryYmd').val(),
				lotId 			: $('#pdaStInspNewPopLotId').val(),
				pltId 			: $('#pdaStInspNewPopPltId').val(),
				lotAttr1 		: $('#pdaStInspNewPopLotAttr1 option:selected').val(),
				lotAttr2 		: $('#pdaStInspNewPopLotAttr2 option:selected').val(),
				lotAttr3 		: $('#pdaStInspNewPopLotAttr3').val(),
				lotAttr4 		: $('#pdaStInspNewPopLotAttr4').val(),
				lotAttr5 		: $('#pdaStInspNewPopLotAttr5').val(),
		};

		if(sendData.itemCd == '' || sendData.itemNm == ''){
			Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력 입니다.
			return false;
		}
		if(sendData.pltId == ''){
			Util.alert('MSG_OUTRI_VAL_031'); //PLT ID 항목은 필수 입력입니다.
			return false;
		}

//		if(Number(sendData.stBoxQty) == 0 && Number(sendData.stEaQty) == 0){
//			Util.alert('MSG_ST_VAL_094'); //재고수량 0을 초과하여 입력해야 합니다.
//			return false;
//		}

		if(Number(sendData.inspQty) == 0){
			Util.alert('MSG_ST_VAL_075'); //실사수량은 0을 초과하여 입력해야 합니다.
			return false;
		}

		App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/stock/pdaStInsp/insertStInspNew',
    		data	: sendData,
    		success : function(data){
				if(data.stsCd == 200){
					alert(data.msgTxt);
                    $("#pdaStInspNewPop").popupCallback();
                    $("#pdaStInspNewPop").coreClosePopup();
				}else if(data.stsCd == 100){
					alert(data.msgTxt);
				}
    		}
    	})
    }

}();

$(document).ready(function() {

	MobileUtil.getBarcode({
		callback : "PdaStInspNewPopApp.fnCallbackBarcode",
	});
	PdaStInspNewPopApp.init();
});