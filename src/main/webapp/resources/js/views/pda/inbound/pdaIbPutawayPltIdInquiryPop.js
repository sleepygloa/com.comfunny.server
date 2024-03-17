/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고적치- 파레트 조회 [PdaIbPutawayPltIdInquiryApp]
 * Program Code     : PWMPDAIB102E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 18.  		First Draft.
 */
var PdaIbPutawayPltIdInquiryApp = function () {
	"use strict";

	//그리드
	var $pdaIbPutawayPltIdInquiryPopHGrid = $('#pdaIbPutawayPltIdInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaIbPutawayPltIdInquiryPop';

	//부모에게 전달 받은 데이터
	var getData = $("#pdaIbPutawayPltIdInquiryPop").PopAppGetData();

    return {
        init: function () {



    		if(getData != undefined){
    			if(getData.proCd == 'PWMPDAST410E' || getData.proCd == 'PWMPDAST409E'){
    				getStList();
    				console.log(getData.pltId);
    			}else{
    				getList();
    			}
    		}else{
    			getList();
    		}

	    }
    };

    //제품상태변경, 재고보류해제 그리드
    function getStList(){
    	$pdaIbPutawayPltIdInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStMove/listPdaStMovePltIdInq',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
//            multiselect	: true,
            postData		: {
            	pltId	: getData.pltId
            },
            colModel	: [
                {editable: false, name:'PLT_ID', 		width:"150px", align:"center"},
                {editable: false, name:'LOC_CD', 		width:"80px", align:"center"},
                {editable: false, name:'ITEM_CD',		width:"100px", align:"center"},
                {editable: false, name:'ITEM_NM', 		width:"220px", align:"left"	},
                {editable: false, name:'ITEM_ST_CD',	width:"220px", align:"center", hidden:true},
                {editable: false, name:'ITEM_ST', 		width:"220px", align:"center", hidden:true},
                {editable: false, name:'HOLD_BOX_QTY',	width:"220px", align:"center", hidden:true},
                {editable: false, name:'HOLD_EA_QTY', 	width:"220px", align:"center", hidden:true},
                {editable: false, name:'BOX_UOM_CD', 	width:"220px", align:"center", hidden:true},
                {editable: false, name:'EA_UOM_CD', 	width:"220px", align:"center", hidden:true},
//                000000010007
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaIbPutawayPltIdInquiryPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaIbPutawayPltIdInquiryPop").popupCallback(rowData);
                $("#pdaIbPutawayPltIdInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaIbPutawayPltIdInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaIbPutawayPltIdInquiryPopHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaIbPutawayPltIdInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

    //입고적치 그리드
    function getList(){
    	$pdaIbPutawayPltIdInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/inbound/pdaIbPutaway/listPdaPltIdInquiry',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'ITEM_CD', 		width:"150px", align:"center", 	hidden:true},
                {editable: false, name:'INST_LOC_CD', 	width:"100px", align:"center"	},
                {editable: false, name:'ITEM_NM',		width:"150px", align:"left"		},
                {editable: false, name:'PLT_ID', 		width:"150px", align:"center"	},
                {editable: false, name:'INST_QTY', 		width:"60px", align:"right"		},
                {editable: false, name:'IB_NO', 		width:"60px", align:"right", 	hidden:true},
                {editable: false, name:'IB_DETAIL_SEQ', width:"60px", align:"right", 	hidden:true},
                {editable: false, name:'IB_INST_NO', 	width:"60px", align:"right", 	hidden:true}
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaIbPutawayPltIdInquiryPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaIbPutawayPltIdInquiryPop").popupCallback(rowData);
                $("#pdaIbPutawayPltIdInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaIbPutawayPltIdInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaIbPutawayPltIdInquiryPopHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaIbPutawayPltIdInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

}();

$(document).ready(function() {
	PdaIbPutawayPltIdInquiryApp.init();
});