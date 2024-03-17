/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품 팝업 [MasterZoneApp]
 * Program Code     :
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Sung Guk       2017. 3. 02.        First Draft.
 */

var commonItemPopApp = function(){
    "use strict";

	//프로그램 코드, 명
	var proCd = '';
	var proNm = 'itemPop';

    var $itemPopGrid = $("#itemPopHGrid");
    var $callBackInput;

	var getData = $("#modalItemPopup").PopAppGetData();

	var pProCd = getData.proCd;

    return{
        init: function(){


        	//재고실사
        	if(pProCd.indexOf('PWMPDAST103E') > -1){
        		fnStInspList();
        	}else if(pProCd.indexOf('PWMPDAIB101E') > -1){
        		fnIbExamList();
        	}else if(pProCd.indexOf('PWMPDAOB104E_P1') > -1){
        		fnCarNoList();
        	}else if(pProCd.indexOf('PWMPDAST107E') > -1){
        		fnStItemList();
        	}else{
        		fnProdList();
        	}
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //생산검수 그리드
    function fnProdList(){
      $itemPopGrid.paragonGrid({
	        url			: '/pda/ctrl/common/listProdItem',
	        sortable	: true,
	        postData 	: getData,
	//        rownumbers	: true,
	        shrinkToFit	: false,
	        colModel	: [
	            {name:'ITEM_CD',         		width:"70px",	align: "center" },
	            {name:'ITEM_NM',          		width:"200px",	align: "left",
              	  cellattr: function(rowId, tv, rowObject, cm, rdata) {
        			  return 'style="white-space:normal;text-overflow:ellipsis;-webkit-line-clamp:2;overflow: hidden; word-break: break-all;-webkit-box-orient: vertical;"' //RED
            	  }
	            },
	            {name:'QTY',          			width:"60px",	align: "center"	},
	            {name:'SHIFT_GROUP_CD',    		width:"100px",	align: "center",	hidden:true },
	            {name:'SHIFT_GROUP',    		width:"100px",	align: "center" },
	//            {name:'EXPORT_COUNTRY_CD',		width:"100px",	align: "center" },
	//            {name:'EXPORT_COUNTRY',    		width:"100px",	align: "center" },
	            {name:'LARGE_CLASS_CD',    		width:"100px",	align: "center",	hidden:true	},
	            {name:'UOM_CD',        			width:"80px",	align: "center",	hidden:true	},
	            {name:'LOCAL_EXPORT_GBN_CD',	width:"80px",	align: "center",	hidden:true	},
	            {name:'LOCAL_EXPORT_GBN',		width:"120px",	align: "center"},
	            {name:'PROD_GRP_CD',			width:"80px",	align: "center",	hidden:true },
	            {name:'PROD_LINE_CD',			width:"80px",	align: "center",	hidden:true },
	            {name:'PLT_PKQTY',				width:"80px",	align: "center",	hidden:true },
	            {name:'USER_COL2',				width:"80px",	align: "center",	hidden:true },
	            {name:'PROD_INST_YMD',			width:"80px",	align: "center"
//	            	,	hidden:true
	            	},
	        ],
	//        domainId	: "ITEM_LIST",
	        ondblClickRow: function(id, iRow, iCol, e){
	            var rowData = $itemPopGrid.getRowData( iRow );
	            App.callBackCasting(rowData);
	            $("#modalItemPopup").popupCallback(rowData);
	            $("#modalItemPopup").coreClosePopup();
	        },
	        gridComplete	: function(){
	        	//그리드 로딩 첫, 아님 유무 --> focus 여부
	        	if($itemPopGrid.data('loadCount') == 0){
	        		WMSUtil.pwaGridDynamicArea(proNm);
	        		//처음 불러올때 입고번호 포커스
	        		$itemPopGrid.data('loadCount', 1);
	        	}

	    		var ids = $itemPopGrid.getDataIDs();
	    		var rowData = $itemPopGrid.getRowData();
	    		for(var i = 0 ; i < rowData.length; i++){
	    			$itemPopGrid.setRowData(ids[i], false, {background: WMSUtil.gridFocus.init() });

	    			if(rowData[i].PROD_INST_YMD == ''){
	    				$itemPopGrid.setRowData(ids[i], false, {background: WMSUtil.gridFocus.caution()});
	    			}
	    		}
	        }
      })
    }
    function fnIbExamList(){
      $itemPopGrid.paragonGrid({
        url			: '/pda/ctrl/common/listIbExamItem',
        sortable	: true,
        postData 	: getData,
//        rownumbers	: true,
        shrinkToFit	: false,
        colModel	: [
            {name:'ITEM_CD',         		width:"100px",	align: "center" },
            {name:'ITEM_NM',          		width:"200px",	align: "center"	},
        ],
//        domainId	: "ITEM_LIST",
        ondblClickRow: function(id, iRow, iCol, e){
            var rowData = $itemPopGrid.getRowData( iRow );
            App.callBackCasting(rowData);
            $("#modalItemPopup").popupCallback(rowData);
            $("#modalItemPopup").coreClosePopup();
        },
        gridComplete	: function(){
        	//그리드 로딩 첫, 아님 유무 --> focus 여부
        	if($itemPopGrid.data('loadCount') == 0){
        		WMSUtil.pwaGridDynamicArea(proNm);
        		//처음 불러올때 입고번호 포커스
        		$itemPopGrid.data('loadCount', 1);
        	}
        }
      });
    }

    //출고상차 그리드
    function fnCarNoList(){
        $itemPopGrid.paragonGrid({
        	url			: '/pda/ctrl/common/listCarNoItem',
            sortable	: true,
            postData 	: getData,
//            rownumbers	: true,
            shrinkToFit	: false,
            colModel	: [
                           {editable: false, name:'ITEM_CD', 		width:"70px", 	align:"center"},
                           {editable: false, name:'ITEM_NM', 		width:"180px", 	align:"left"  },
                           {editable: false, name:'PICK_QTY', 		width:"60px", 	align:"right" , formatter:"integer"},
                           {editable: false, name:'OB_DETAIL_SEQ', 	width:"60px", 	align:"center"},
                           {editable: false, name:'OB_NO', 			width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'PICK_EA_QTY', 	width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'UOM', 			width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'PKQTY', 			width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'BOX_QTY', 		width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'EA_QTY', 		width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'BOX_UOM_CD', 	width:"80px", 	align:"center", hidden:true},
                           {editable: false, name:'EA_UOM_CD', 		width:"80px", 	align:"center", hidden:true},
            ],
//            domainId	: "ITEM_LIST",
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $itemPopGrid.getRowData( iRow );
                App.callBackCasting(rowData);
                $("#modalItemPopup").popupCallback(rowData);
                $("#modalItemPopup").coreClosePopup();
            },
            gridComplete	: function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($itemPopGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$itemPopGrid.data('loadCount', 1);
            	}
            }
          });
    }

    //재고조회 그리드
    function fnStInspList(){
      $itemPopGrid.paragonGrid({
        url			: '/pda/ctrl/common/listStInspItem',
        sortable	: true,
        postData 	: getData,
//        rownumbers	: true,
        shrinkToFit	: false,
        colModel	: [
            {name:'ITEM_CD',         		width:"100px",	align: "center" },
            {name:'ITEM_NM',          		width:"200px",	align: "center"	},
//            {name:'QTY',          			width:"80px",	align: "center"	},
//            {name:'SHIFT_GROUP_CD',    		width:"100px",	align: "center",	hidden:true },
//            {name:'SHIFT_GROUP',    		width:"100px",	align: "center" },
////            {name:'EXPORT_COUNTRY_CD',		width:"100px",	align: "center" },
////            {name:'EXPORT_COUNTRY',    		width:"100px",	align: "center" },
//            {name:'LARGE_CLASS_CD',    		width:"100px",	align: "center",	hidden:true	},
//            {name:'UOM_CD',        			width:"80px",	align: "center",	hidden:true	},
//            {name:'LOCAL_EXPORT_GBN_CD',	width:"80px",	align: "center",	hidden:true	},
//            {name:'LOCAL_EXPORT_GBN',		width:"120px",	align: "center"},
//            {name:'PROD_GRP_CD',			width:"80px",	align: "center",	hidden:true },
//            {name:'PROD_LINE_CD',			width:"80px",	align: "center",	hidden:true },
        ],
//        domainId	: "ITEM_LIST",
        ondblClickRow: function(id, iRow, iCol, e){
            var rowData = $itemPopGrid.getRowData( iRow );
            App.callBackCasting(rowData);
            $("#modalItemPopup").popupCallback(rowData);
            $("#modalItemPopup").coreClosePopup();
        },
        gridComplete	: function(){
        	//그리드 로딩 첫, 아님 유무 --> focus 여부
        	if($itemPopGrid.data('loadCount') == 0){
        		WMSUtil.pwaGridDynamicArea(proNm);
        		//처음 불러올때 입고번호 포커스
        		$itemPopGrid.data('loadCount', 1);
        	}
        }
      });
    }

    //제품별 재고조회 그리드
    function fnStItemList(){
      $itemPopGrid.paragonGrid({
        url			: '/pda/ctrl/common/listStItemInq',
        sortable	: true,
        postData 	: getData,
//        rownumbers	: true,
        shrinkToFit	: false,
        colModel	: [
            {name:'ITEM_CD',         		width:"100px",	align: "center" },
            {name:'ITEM_NM',          		width:"200px",	align: "center"	},
//            {name:'QTY',          			width:"80px",	align: "center"	},
//            {name:'SHIFT_GROUP_CD',    		width:"100px",	align: "center",	hidden:true },
//            {name:'SHIFT_GROUP',    		width:"100px",	align: "center" },
////            {name:'EXPORT_COUNTRY_CD',		width:"100px",	align: "center" },
////            {name:'EXPORT_COUNTRY',    		width:"100px",	align: "center" },
//            {name:'LARGE_CLASS_CD',    		width:"100px",	align: "center",	hidden:true	},
//            {name:'UOM_CD',        			width:"80px",	align: "center",	hidden:true	},
//            {name:'LOCAL_EXPORT_GBN_CD',	width:"80px",	align: "center",	hidden:true	},
//            {name:'LOCAL_EXPORT_GBN',		width:"120px",	align: "center"},
//            {name:'PROD_GRP_CD',			width:"80px",	align: "center",	hidden:true },
//            {name:'PROD_LINE_CD',			width:"80px",	align: "center",	hidden:true },
        ],
//        domainId	: "ITEM_LIST",
        ondblClickRow: function(id, iRow, iCol, e){
            var rowData = $itemPopGrid.getRowData( iRow );
            App.callBackCasting(rowData);
            $("#modalItemPopup").popupCallback(rowData);
            $("#modalItemPopup").coreClosePopup();
        },
        gridComplete	: function(){
        	//그리드 로딩 첫, 아님 유무 --> focus 여부
        	if($itemPopGrid.data('loadCount') == 0){
        		WMSUtil.pwaGridDynamicArea(proNm);
        		//처음 불러올때 입고번호 포커스
        		$itemPopGrid.data('loadCount', 1);
        	}
        }
      });
    }

}();

$(document).ready(function() {
    commonItemPopApp.init();
});
