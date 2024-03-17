/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고실사[PdaStInspDetailPopApp]
 * Program Code     : PWMPDARO101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 18.  		First Draft.
 */
var PdaStInspDetailPopApp = function () {
	"use strict";

	var getData = $("#pdaStInspDetailPop").PopAppGetData().rowData;

	var proCd = 'PWMPDAST103E_P2';
	var proNm = 'pdaStInspDetailPop';

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaStInspDetailPopItemStCd', 'ITEM_ST_CD');

        	WMSUtil.fnCombo.selectBox('pdaStInspDetailPopLotAttr1', 'COUNTRY_CD');

        	WMSUtil.fnCombo.selectBox('pdaStInspDetailPopLotAttr2', 'YN');

        	setUI();

        	getInfo();

        	fnEvents();

	    },
    };

    //UI 세팅
    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //이벤트
    function fnEvents(){
    	//저장 버튼 클릭
       	$('#pdaStInspDetailPopSaveBtn').on('click', function(){
       		fnSave();
		});

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});

    }


    //실사 상세정보 조회
    function getInfo(){
    	$.ajax({
    		url		: '/pda/ctrl/stock/pdaStInsp/listStInspDetail',
    		data	: {
    			stInspNo	: getData.STOCK_INSP_NO,
    			itemCd 		: getData.ITEM_CD,
    			pltId		: getData.PLT_ID
    		},
    		success : function(data){

    			var dt_grid = null;
    			if(data.dt_grid.length != 0){
    				dt_grid = data.dt_grid[0];
    			}else{
    				dt_grid = getData;
    			}

    			$('#pdaStInspDetailPopLocCd').val(dt_grid.TGT_LOC);
    			$('#pdaStInspDetailPopItemCd').val(dt_grid.ITEM_CD);
    			$('#pdaStInspDetailPopItemNm').val(dt_grid.ITEM_NM);
    			$('#pdaStInspDetailPopUom').val(dt_grid.UOM);
    			$('#pdaStInspDetailPopPkqty').val(dt_grid.PKQTY);
    			$('#pdaStInspDetailPopItemStCd').val(dt_grid.ITEM_ST_CD);

    			$('#pdaStInspDetailPopStockBoxQty').val(dt_grid.STOCK_BOX_QTY);
    			$('#pdaStInspDetailPopStockBoxQtyBtn').text(dt_grid.BOX_UOM_CD);
//    			$('#pdaStInspDetailPopStockEaQty').val(dt_grid.STOCK_EA_QTY);
//    			$('#pdaStInspDetailPopStockEaQtyBtn').text(dt_grid.EA_UOM_CD);

    			$('#pdaStInspDetailPopStockInspBoxQty').val(dt_grid.STOCK_BOX_QTY);
    			$('#pdaStInspDetailPopStockInspBoxQtyBtn').text(dt_grid.BOX_UOM_CD);
    			//$('#pdaStInspDetailPopStockInspEaQty').val(dt_grid.STOCK_EA_QTY);
    			//$('#pdaStInspDetailPopStockInspEaQtyBtn').text(dt_grid.EA_UOM_CD);

    			$('#pdaStInspDetailPopPltId').val(dt_grid.PLT_ID);
    			$('#pdaStInspDetailPopToPltId').val(dt_grid.PLT_ID);
    			$('#pdaStInspDetailPopMakeLot').val(dt_grid.MAKE_LOT);
    			$('#pdaStInspDetailPopMakeYmd').val(dt_grid.MAKE_YMD);
    			$('#pdaStInspDetailPopDistExpiryYmd').val(dt_grid.DIST_EXPIRY_YMD);
    			$('#pdaStInspDetailPopLotAttr1').val(dt_grid.LOT_ATTR1);
    			$('#pdaStInspDetailPopLotAttr2').val(dt_grid.LOT_ATTR2);
    			$('#pdaStInspDetailPopLotAttr3').val(dt_grid.LOT_ATTR3);
    			$('#pdaStInspDetailPopLotAttr4').val(dt_grid.LOT_ATTR4);
    			$('#pdaStInspDetailPopLotAttr5').val(dt_grid.LOT_ATTR5);
    		}
    	});
	}


    //저장
    function fnSave(){

    	//유효성검사
    	if($('#pdaStInspDetailPopPltId').val() != $('#pdaStInspDetailPopToPltId').val()){
    		Util.alert('MSG_ST_VAL_095'); //파렛트 정보가 틀립니다.
    		return false;
    	}

		var sendData = {
				stInspNo		: getData.STOCK_INSP_NO,
				stInspDetailSeq	: getData.STOCK_INSP_DETAIL_SEQ,
				inspQty			: Number($('#pdaStInspDetailPopPkqty').val()) * Number($('#pdaStInspDetailPopStockInspBoxQty').val())
								+ Number($('#pdaStInspDetailPopStockInspEaQty').val()),
				pltId			: $('#pdaStInspDetailPopToPltId').val()
		};

		App.prcsStart();
		$.ajax({
			url		: '/pda/ctrl/stock/pdaStInsp/updateStInspDetailPop',
			data	: sendData,
			success : function(data){
				if(data.stsCd == 200){
					alert(data.msgTxt);
                    $("#pdaStInspDetailPop").popupCallback();
                    $("#pdaStInspDetailPop").coreClosePopup();
				}else if(data.stsCd == 100){
					alert(data.msgTxt);
					return false;
				}
			}
		})

    }

}();

$(document).ready(function() {
	PdaStInspDetailPopApp.init();
});