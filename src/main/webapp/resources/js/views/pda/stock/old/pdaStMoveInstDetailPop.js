/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반출관리 - 지시이동 - 지시이동상세[pdaStMoveInstDetailPopApp]
 * Program Code     : PWMPDAST101E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 15.  		First Draft.
 */
var pdaStMoveInstDetailPopApp = function () {
	"use strict";

	var getData = $("#pdaStMoveInstDetailPop").PopAppGetData().rowData;

	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStMoveInstDetailPop';

    return {
        init: function () {

        	setUI();

    		getEvents();

    		getMoveInstDtlInfo();

	    }
    };

    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    function getEvents(){

       	$('#pdaStMoveInstDetailPopBtn').on('click', function(){
			fnSave();
		});

    }

    function fnSave(){
console.log('StMoveInstConfirm fnSave Complete!');
    }

    //fnStMoveInstDetail
    function getMoveInstDtlInfo(){

		$('#pdaStMoveInstDetailPopItemCd').val(getData.ITEM_CD);
		$('#pdaStMoveInstDetailPopItemNm').val(getData.ITEM_NM);

		$('#pdaStMoveInstDetailPopUnit').val(getData.UOM);
		$('#pdaStMoveInstDetailPopPkqty').val(getData.CONV_UOM_QTY);
		$('#pdaStMoveInstDetailPopItemSt').val(getData.ITEM_ST_CD);

		$('#pdaStMoveInstDetailPopInstQty').val(getData.INST_QTY);
		$('#pdaStMoveInstDetailPopInstUnit').val(getData.STD_UOM_CD);
		$('#pdaStMoveInstDetailPopInstQtyEa').val(getData.CONV_UOM_QTY);
		$('#pdaStMoveInstDetailPopInstQtyEaUnit').val(getData.CONV_UOM_CD);

		$('#pdaStMoveInstDetailPopMoveUnit').val(getData.STD_UOM_CD);
		$('#pdaStMoveInstDetailPopMoveQtyEaUnit').val(getData.CONV_UOM_CD);

		$('#pdaStMoveInstDetailPopTgtLoc').val(getData.TGT_LOC);
		$('#pdaStMoveInstDetailPopTgtPltId').val(getData.TO_PLT_ID);

	}

}();

$(document).ready(function() {
	pdaStMoveInstDetailPopApp.init();
});