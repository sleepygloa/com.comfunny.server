/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹- 파렛트의 제품조회(P,N)-오리온 [PdaObPickingSearchObNoApp]
 * Program Code     : PWMPDAOB201E_P3
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2019. 03. 20.  		First Draft.
 */
var pdaObPickingOFVItemInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaObPickingOFVItemInquiryPopHGrid = $('#pdaObPickingOFVItemInquiryPopHGrid');

	//
	var getData = $("#modalObPickingItemInqPopup").PopAppGetData();

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB201E_P3';
	var proNm = 'pdaObPickingOFVItemInquiryPop';

//	var gridObGbnCd;
//	var gridLotAttr1;
//	var gridLotAttr2;

    return {
        init: function () {

//        	gridLotAttr1 	= WMSUtil.fnCombo.grid('COUNTRY_CD');
//
//        	gridLotAttr2 	= WMSUtil.fnCombo.grid('YN');
//
//        	gridObGbnCd	= WMSUtil.fnCombo.grid_selectBox('pdaObPickingOFVItemInquiryPopObGbnCd', 'OB_GBN_CD','','',' ');

    		fnEvents();

    		fnList();

	    }
    };


    //그리드 초기화
    function fnList(){
    	$pdaObPickingOFVItemInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVItemInquiryPop',
            shrinkToFit 	: false,
            postData		: getData,
            colModel		: [
                   		   	{editable: false, name:'PROMOTION_GBN',	width:"40px", 	align:"center"},
                   		   	{editable: false, name:'ITEM', 			width:"200px", 	align:"left"},
                            {editable: false, name:'INST', 			width:"60px", 	align:"right",  formatter:"integer"},
                            {editable: false, name:'PICK', 			width:"60px", 	align:"right",  formatter:"integer"},
                            {editable: false, name:'LOT_ATTR1',		width:"120px", 	align:"center",
//                            	edittype:'select', formatter:'select', editoptions: { value : gridLotAttr1 }
                            },
                            {editable: false, name:'LOT_ATTR2',		width:"80px", 	align:"center", hidden:true,
//                            	edittype:'select', formatter:'select', editoptions: { value : gridLotAttr2 }
                            },
                            {editable: false, name:'LOT_ATTR3', 		width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'LOT_ATTR4', 		width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'LOT_ATTR5', 		width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'MAKE_LOT', 			width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'MAKE_YMD', 			width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'DIST_EXPIRY_YMD', 		width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'INST_QTY', 		width:"60px", 	align:"right",  formatter:"integer", hidden:true},
                            {editable: false, name:'PICK_QTY', 		width:"60px", 	align:"right",  formatter:"integer", hidden:true},
                            {editable: false, name:'ITEM_CD', 		width:"80px", 	align:"center", hidden:true},
                            {editable: false, name:'ITEM_NM', 		width:"200px", 	align:"left",	hidden:true},
                            {editable: false, name:'PROMOTION_GBN_CD',	width:"50px", 	align:"center", hidden:true},
                            {editable: false, name:'PLT_ID', 		width:"200px", 	align:"center", hidden:true  },
                            {editable: false, name:'LOT_ID', 		width:"200px", 	align:"center", hidden:true  },
                            {editable: false, name:'AGING_YN', 		width:"200px", 	align:"center", hidden:true  },
                            {editable: false, name:'HOLD_QTY', 		width:"200px", 	align:"center", hidden:true  },
                            {editable: false, name:'PICK_BOX_QTY', 		width:"200px", 	align:"center", hidden:true  },
                            {editable: false, name:'PICK_QTY_C', 		width:"200px", 	align:"center", hidden:true  },
                            {editable: false, name:'AVAIL_QTY', 		width:"200px", 	align:"center", hidden:true  },

            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaObPickingOFVItemInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
//                App.callBackCasting(rowData);
                $("#modalObPickingItemInqPopup").popupCallback(rowData);
                $("#modalObPickingItemInqPopup").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObPickingOFVItemInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaObPickingOFVItemInquiryPopHGrid.data('loadCount', 1);
            	}
//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObPickingOFVItemInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

    //이벤트
    function fnEvents(){

    }

}();

$(document).ready(function() {
	pdaObPickingOFVItemInquiryPopApp.init();
});