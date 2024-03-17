/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 공통 - 파레트 조회 [PdaCommPltIdPopApp]
 * Program Code     : PWMPDAIB102E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2019. 01. 31.  		First Draft.
 */
var PdaCommPltIdPopApp = function () {
	"use strict";

	//그리드
	var $pdaCommPltIdPopHGrid = $('#pdaCommPltIdPopHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAIB102E_P1';
	var proNm = 'pdaCommPltIdPop';

	//부모에게 전달 받은 데이터
	var getData = $("#pdaCommPltIdPop").PopAppGetData();

    return {
        init: function () {


        	if(getData != undefined){
        		console.log(getData);
    			if(getData.proCd == "PWMPDAST109E"){
    				fnStMoveList();
    			}else if(getData.proCd == 'PWMPDAST410E' || getData.proCd == 'PWMPDAST409E'){
    				fnStHoldList();
    			}else if(getData.proCd == 'PWMPDAOB101E_P1' || getData.proCd == 'PWMPDAOB201E'){
    				fnObPickickList();
    			}
    		}else{
    			fnList();
    		}

	    }
    };

    //재고이동 그리드
    function fnStMoveList(){
    	console.log(getData);
    	$pdaCommPltIdPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStMove/listPdaStMovePltIdInq',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
//            multiselect	: true,
            postData		: {
            	pltId	: getData.pltId
            },
            colModel	: [
                {editable: false, name:'PLT_ID', 			width:"100px", align:"center"},
                {editable: false, name:'LOC_CD', 			width:"80px",  align:"center"},
                {editable: false, name:'ITEM_CD',			width:"100px", align:"center"},
                {editable: false, name:'ITEM_NM', 			width:"220px", align:"left"	},
                {editable: false, name:'QTY',				width:"220px", align:"center", hidden:true},
                {editable: false, name:'BOX_CD',			width:"220px", align:"center", hidden:true},
                {editable: false, name:'MAKE_LOT',			width:"220px", align:"center", hidden:true},
                {editable: false, name:'MAKE_YMD', 			width:"220px", align:"center", hidden:true},
                {editable: false, name:'DIST_EXPIRY_YMD',	width:"220px", align:"center", hidden:true},
                {editable: false, name:'LOT_ATTR1', 		width:"220px", align:"center", hidden:true},
                {editable: false, name:'LOT_ATTR2', 		width:"220px", align:"center", hidden:true},
                {editable: false, name:'LOT_ATTR3', 		width:"220px", align:"center", hidden:true},
                {editable: false, name:'LOC_TYPE_CD', 		width:"220px", align:"center", hidden:true},
                {editable: false, name:'MOVE_PROC_NM', 		width:"220px", align:"center", hidden:true},
//                000000010007
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaCommPltIdPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaCommPltIdPop").popupCallback(rowData);
                $("#pdaCommPltIdPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaCommPltIdPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaCommPltIdPopHGrid.data('loadCount', 1);
            	}

            }
    	})
    }

    //제품상태변경, 재고보류해제 그리드
    function fnStHoldList(){
    	$pdaCommPltIdPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStMove/listPdaStMovePltIdInq',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
//            multiselect	: true,
            postData		: {
            	pltId	: getData.pltId
            },
            colModel	: [
                {editable: false, name:'PLT_ID', 		width:"100px", align:"center"},
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
                var rowData = $pdaCommPltIdPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaCommPltIdPop").popupCallback(rowData);
                $("#pdaCommPltIdPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaCommPltIdPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaCommPltIdPopHGrid.data('loadCount', 1);
            	}

            }
    	})
    }

    //입고적치 그리드
    function fnList(){
    	$pdaCommPltIdPopHGrid.paragonGrid({
            url			: '/pda/ctrl/inbound/pdaIbPutaway/listPdaPltIdInquiry',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'ITEM_CD', 		width:"150px", align:"center", 	hidden:true},
                {editable: false, name:'INST_LOC_CD', 	width:"100px", align:"center"	},
                {editable: false, name:'ITEM_NM',		width:"150px", align:"left"		},
                {editable: false, name:'PLT_ID', 		width:"120px", align:"center"	},
                {editable: false, name:'INST_QTY', 		width:"60px", align:"right"		},
                {editable: false, name:'IB_NO', 		width:"60px", align:"right", 	hidden:true},
                {editable: false, name:'IB_DETAIL_SEQ', width:"60px", align:"right", 	hidden:true},
                {editable: false, name:'IB_INST_NO', 	width:"60px", align:"right", 	hidden:true}
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaCommPltIdPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaCommPltIdPop").popupCallback(rowData);
                $("#pdaCommPltIdPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaCommPltIdPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaCommPltIdPopHGrid.data('loadCount', 1);
            	}

            }
    	})
    }

    //출고피킹 그리드
    function fnObPickickList(){
    	$pdaCommPltIdPopHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVDetailPltList',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            postData	: getData,
            colModel	: [
            	   {editable: false, name:'LOC_CD', 	width:"100px", align:"center"	},
            	   {editable: false, name:'PLT_ID', 	width:"120px", align:"center"	},
            	   {editable: false, name:'LOT_ID', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'LOC_TYPE_CD',width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'MAKE_LOT', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'MAKE_YMD', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'DIST_EXPIRY_YMD', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'LOT_ATTR1', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'LOT_ATTR2', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'LOT_ATTR3', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'LOT_ATTR4', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'LOT_ATTR5', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'BOX_UOM_CD', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'EA_UOM_CD', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'PICK_BOX_QTY', 	width:"120px", align:"center", hidden:true	},
            	   {editable: false, name:'AVAIL_QTY', 	width:"120px", align:"center", hidden:true	},

//                {editable: false, name:'ITEM_CD', 		width:"150px", align:"center", 	hidden:true},
//                {editable: false, name:'ITEM_NM',		width:"150px", align:"left"		},
//                {editable: false, name:'INST_QTY', 		width:"60px", align:"right"		},
//                {editable: false, name:'IB_NO', 		width:"60px", align:"right", 	hidden:true},
//                {editable: false, name:'IB_DETAIL_SEQ', width:"60px", align:"right", 	hidden:true},
//                {editable: false, name:'IB_INST_NO', 	width:"60px", align:"right", 	hidden:true}
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaCommPltIdPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaCommPltIdPop").popupCallback(rowData);
                $("#pdaCommPltIdPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaCommPltIdPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaCommPltIdPopHGrid.data('loadCount', 1);
            	}

            }
    	})
    }

}();

$(document).ready(function() {
	PdaCommPltIdPopApp.init();
});