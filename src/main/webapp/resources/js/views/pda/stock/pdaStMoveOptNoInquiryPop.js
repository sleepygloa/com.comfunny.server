/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고이동(임의) [PdaStMoveOptNoInquiryPopApp]
 * Program Code     : PWMPDAST102E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 16.  		First Draft.
 */
var PdaStMoveOptNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaStMoveOptNoInquiryPopHGrid = $('#pdaStMoveOptNoInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStMoveOptNoInquiryPop';

	//부모에게 전달 받은 데이터
	//var getData = $("#modalPPdaIbPutwSearchPltId").PopAppGetData();

    return {
        init: function () {

        	getEvents();
    		getList();

	    }
    };


    function getEvents(){

    	/** To Do: */

    }

    function getList(){
    	$pdaStMoveOptNoInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStMoveOpt/listPdaStMoveOptNoInquiryPopD',
            cellEditable: true,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            /* postData	:
            {
            	pltId 	: "gridDrawing",
        	},*/
            colModel	: [
                {editable: false, name:'LOC', 		width:"150px", align:"center"},
                {editable: false, name:'PLT_ID',  	width:"150px", align:"left"},
                {editable: false, name:'BOX_QTY',  	width:"150px", align:"left"},
                {editable: false, name:'EA_QTY',  	width:"150px", align:"left"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStMoveOptNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStMoveOptNoInquiryPop").popupCallback(rowData);
                $("#pdaStMoveOptNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	WMSUtil.pwaGridDynamicArea(proNm);
            	//caption 총건수
            	/*$('.captionRowCount').remove();
            	var count = $pdaStMoveOptNoInquiryPopHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');*/
            }
    	})
    }

}();

$(document).ready(function() {
	PdaStMoveOptNoInquiryPopApp.init();
});