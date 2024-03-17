/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반출관리 - 반출피킹 - 반출피킹상세[PPdaRoPickSearchRoApp]
 * Program Code     : PWMPDARO101E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 05.  		First Draft.
 */
var PdaRoPickingDetailPopApp = function () {
	"use strict";

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRoPickingDetailPop';

	//부모에게 전달 받은 데이터
	var getData = $("#pdaRoPickingDetailPop").PopAppGetData().rowData;

    return {
        init: function () {

        	setUI();
        	WMSUtil.fnCombo.selectBox('pdaRoPickingDetailPopRsGbnCd', 'RO_RS_CD');
        	getEvents();
        	getRoPickingDtlInfo();

	    }
    };

    function getRoPickingDtlInfo(){

			$('#pdaRoPickingDetailPopPickLocfront').val(getData.LOC);
			$('#pdaRoPickingDetailPopItemCd').val(getData.ITEM_CD);
			$('#pdaRoPickingDetailPopItemNm').val(getData.ITEM_NM);

			$('#pdaRoPickingDetailPopPltIdFront').val(getData.PLT_ID);

			$('#pdaRoPickingDetailPopInstQtyUnit').val(getData.INST_BOX_QTY);
			$('#pdaRoPickingDetailPopInstQtyEa').val(getData.INST_EA_QTY);

			$('#pdaRoPickingDetailPopMakeLot').val(getData.MAKE_LOT);
			$('#pdaRoPickingDetailPopMakeYmd').val(getData.MAKE_YMD);
			$('#pdaRoPickingDetailPopDExpirtYmd').val(getData.DIST_EXPIRY_YMD);

			$('#pdaRoPickingDetailPopLotAttr1').val(getData.LOT_ATTR1);
			$('#pdaRoPickingDetailPopLotAttr2').val(getData.LOT_ATTR2);
			$('#pdaRoPickingDetailPopLotAttr3').val(getData.LOT_ATTR3);
			$('#pdaRoPickingDetailPopLotAttr4').val(getData.LOT_ATTR4);
			$('#pdaRoPickingDetailPopLotAttr5').val(getData.LOT_ATTR5);

	}

    function setUI(){

    	WMSUtil.pwaGridDynamicArea(proNm);

    }

    function getEvents(){

    	$('#pPdaRoPickConfirmRoBtn').click(function(){
    		fnSave();
    	});

    }

    function fnSave(){
console.log("pdaRoPickingDetailPop_fnSave_Complete!");
    }

}();

$(document).ready(function() {
	PdaRoPickingDetailPopApp.init();
});