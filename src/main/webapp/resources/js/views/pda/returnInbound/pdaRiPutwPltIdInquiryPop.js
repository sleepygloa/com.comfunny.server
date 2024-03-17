/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반입관리 - 반입적치 - 파레트 조회 [PPdaRiPutwSearchPltIdApp]
 * Program Code     : PWMPDARO101E_P1
 * Description      :
 * Revision History
 * Author          		Date           		Description
 * -------------		-------------		------------------
 * Hong Jeong Bo 	 	2018. 10. 22.  		First Draft.
 */
var pdaRiPutwPltIdInquiryPop = function () {
	"use strict";

	//그리드
	var $pdaRiPutwPltIdInquiryPopHGrid = $('#pdaRiPutwPltIdInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRiPutwPltIdInquiryPop';

    return {
        init: function () {

        	setUI();
    		getList();

	    }
    };

    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    function getList(){
    	$pdaRiPutwPltIdInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/returnInbound/pdaRiPutw/listPdaRiPutwPltIdInquiry',
            cellEditable: true,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'INST_LOC_CD', 	width:"100px", align:"center"},
                {editable: false, name:'ITEM_NM', 		width:"120px", align:"left"  },
                {editable: false, name:'PLT_ID', 		width:"150px", align:"center"},
                {editable: false, name:'INST_QTY', 		width:"60px",  align:"right" },
                {editable: false, name:'IB_NO', 		width:"60px",  align:"right" , hidden:true},
                {editable: false, name:'IB_DETAIL_SEQ', width:"60px",  align:"right" , hidden:true},
                {editable: false, name:'IB_INST_NO', 	width:"60px",  align:"right" , hidden:true},
                {editable: false, name:'ITEM_CD', 		width:"150px", align:"center", hidden:true},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaRiPutwPltIdInquiryPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaRiPutwPltIdInquiryPop").popupCallback(rowData);
                $("#pdaRiPutwPltIdInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	WMSUtil.pwaGridDynamicArea(proNm);

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaRiPutwPltIdInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

}();

$(document).ready(function() {
	pdaRiPutwPltIdInquiryPop.init();
});