/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고상태변경 - 재고상태변경상세[PPdaStStateChangeConfirmApp]
 * Program Code     : PWMPDARO101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 29.  		First Draft.
 */
var PdaStStateChangeDetailPopApp = function () {
	"use strict";

	var getData = $("#pdaStStateChangeDetailPop").PopAppGetData().rowData;

	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStStateChangeDetailPop';

    return {
        init: function () {

        	setUI();

        	getEvents();

    		WMSUtil.fnCombo.selectBox('pdaStStateChangeDetailPopToItemStGbnCd', 'ITEM_ST_CD');

			getStateChangeDtlInfo();

	    }
    };

    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    function getEvents(){

       	$('#pdaStStateChangeDetailPopBtn').on('click', function(){
			fnSave();
		});

    }

    //fnStStateChangeDetail
    function getStateChangeDtlInfo(){

		$('#pdaStStateChangeDetailPopItemCd').val(getData.ITEM_CD);
		$('#pdaStStateChangeDetailPopItemNm').val(getData.ITEM_NM);
		$('#pdaStStateChangeDetailPopItemStGbnCd').val(getData.ITEM_ST);
		$('#pdaStStateChangeDetailPopUom').val(getData.STD_UOM_CD);
		$('#pdaStStateChangeDetailPopPkqty').val(getData.STOCK_QTY);
		$('#pdaStStateChangeDetailPopFromLocCd').val(getData.LOC);
		$('#pdaStStateChangeDetailPopFromPltId').val(getData.FR_PLT_ID);

		$('#pdaStStateChangeDetailPopStockUnit').val(getData.STD_UOM_CD);
		$('#pdaStStateChangeDetailPopStockQtyEaUnit').val(getData.CONV_UOM_CD);
		$('#pdaStStateChangeDetailPopMoveUnit').val(getData.STD_UOM_CD);
		$('#pdaStStateChangeDetailPopMoveQtyEaUnit').val(getData.CONV_UOM_CD);

	}

    function fnSave(){
		var sendData = {
				stockInspNo			: getData.STOCK_INSP_NO,
				stockInspDetailSeq	: getData.STOCK_INSP_DETAIL_SEQ,
		};

		$.ajax({
			url		: '/pda/ctrl/stock/pdaStStateChange/updateStStateDetail',
			data	: sendData,
			async	: false,
			success : function(data){

			},
			complete : function(data){

			}
		})
    }

}();

$(document).ready(function() {
	PdaStStateChangeDetailPopApp.init();
});